import { parsePrecio } from './precio';

// ---- Conversión a bolívares (tasa Binance/USDT) ----
const TASA_CACHE_KEY = 'hc_tasa_bs_v1';

export const formatBs = (usd, tasa) => {
  const monto = parsePrecio(usd) * tasa;
  return `Bs ${monto.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const guardarTasaCache = (price) => {
  try { localStorage.setItem(TASA_CACHE_KEY, JSON.stringify({ price, ts: Date.now() })); } catch {}
};

// Fuentes de la tasa, en orden de preferencia. Cada una intenta traer un precio en Bs por 1 USD/USDT.
const FUENTES_TASA = [
  async () => {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/paralelo', { cache: 'no-store' });
    if (!res.ok) throw new Error('dolarapi no ok');
    const data = await res.json();
    const price = data?.promedio ?? data?.venta ?? data?.compra ?? null;
    if (typeof price !== 'number' || price <= 0) throw new Error('dolarapi sin precio');
    return price;
  },
  async () => {
    const res = await fetch('https://pydolarve.org/api/v1/dollar?page=binance&monitor=usd', { cache: 'no-store' });
    if (!res.ok) throw new Error('pydolarve no ok');
    const data = await res.json();
    const price = data?.price ?? data?.monitors?.usd?.price ?? data?.monitors?.binance?.price ?? null;
    if (typeof price !== 'number' || price <= 0) throw new Error('pydolarve sin precio');
    return price;
  },
];

export const obtenerTasaBs = async () => {
  // 1) intenta cada fuente en vivo, en orden, hasta que una funcione
  for (const fuente of FUENTES_TASA) {
    try {
      const price = await fuente();
      guardarTasaCache(price);
      return price;
    } catch {
      // intenta la siguiente fuente
    }
  }
  // 2) respaldo: última tasa guardada en este navegador (aunque tenga horas/días)
  try {
    const cached = JSON.parse(localStorage.getItem(TASA_CACHE_KEY));
    if (cached?.price) return cached.price;
  } catch {}
  // 3) sin nada disponible
  return null;
};
