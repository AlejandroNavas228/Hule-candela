import { parsePrecio } from './precio';

// ---- Conversión a bolívares (tasa Binance/USDT) ----
const TASA_CACHE_KEY = 'hc_tasa_bs_v1';

// Si la tasa guardada en el navegador es más vieja que esto, se descarta
// (mejor no mostrar el precio en Bs a mostrar uno desactualizado).
const MAX_CACHE_AGE_MS = 6 * 60 * 60 * 1000; // 6 horas

// Reintentos por fuente antes de pasar a la siguiente (algunas de estas APIs
// fallan de forma intermitente y suelen responder bien al segundo intento).
const INTENTOS_POR_FUENTE = 2;
const ESPERA_ENTRE_INTENTOS_MS = 700;
const TIMEOUT_FETCH_MS = 6000;

export const formatBs = (usd, tasa) => {
  const monto = parsePrecio(usd) * tasa;
  return `Bs ${monto.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const guardarTasaCache = (price) => {
  try { localStorage.setItem(TASA_CACHE_KEY, JSON.stringify({ price, ts: Date.now() })); } catch {}
};

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// fetch con límite de tiempo, para no quedarnos colgados si una fuente no responde.
const fetchConTimeout = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_FETCH_MS);
  try {
    return await fetch(url, { cache: 'no-store', signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

// Fuentes de la tasa, en orden de preferencia. Cada una intenta traer un precio en Bs por 1 USD/USDT.
const FUENTES_TASA = [
  async () => {
    // Nuestra propia función serverless (Vercel), que a su vez consulta Cotizave
    // y trae la tasa exacta de Binance P2P (USDT/VES). Su API key nunca llega al navegador.
    const res = await fetchConTimeout('/api/tasa-bs');
    if (!res.ok) throw new Error('tasa-bs (cotizave) no ok');
    const data = await res.json();
    const price = data?.price ?? null;
    if (typeof price !== 'number' || price <= 0) throw new Error('tasa-bs (cotizave) sin precio');
    return price;
  },
  async () => {
    const res = await fetchConTimeout('https://ve.dolarapi.com/v1/dolares/paralelo');
    if (!res.ok) throw new Error('dolarapi no ok');
    const data = await res.json();
    const price = data?.promedio ?? data?.venta ?? data?.compra ?? null;
    if (typeof price !== 'number' || price <= 0) throw new Error('dolarapi sin precio');
    return price;
  },
  async () => {
    const res = await fetchConTimeout('https://pydolarve.org/api/v1/dollar?page=binance&monitor=usd');
    if (!res.ok) throw new Error('pydolarve no ok');
    const data = await res.json();
    const price = data?.price ?? data?.monitors?.usd?.price ?? data?.monitors?.binance?.price ?? null;
    if (typeof price !== 'number' || price <= 0) throw new Error('pydolarve sin precio');
    return price;
  },
];

export const obtenerTasaBs = async () => {
  // 1) intenta cada fuente en vivo (con un par de reintentos cada una si falla),
  //    en orden, hasta que una funcione.
  for (const fuente of FUENTES_TASA) {
    for (let intento = 1; intento <= INTENTOS_POR_FUENTE; intento++) {
      try {
        const price = await fuente();
        guardarTasaCache(price);
        return price;
      } catch {
        if (intento < INTENTOS_POR_FUENTE) await esperar(ESPERA_ENTRE_INTENTOS_MS);
      }
    }
  }
  // 2) respaldo: última tasa guardada en este navegador, solo si no es demasiado vieja
  try {
    const cached = JSON.parse(localStorage.getItem(TASA_CACHE_KEY));
    if (cached?.price && Date.now() - cached.ts <= MAX_CACHE_AGE_MS) {
      return cached.price;
    }
  } catch {}
  // 3) sin nada disponible (ni fuente en vivo, ni caché reciente)
  return null;
};
