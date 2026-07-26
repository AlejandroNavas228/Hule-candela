// Función serverless de Vercel: hace de intermediaria entre el sitio y Cotizave,
// para que la API key de Cotizave nunca quede expuesta en el código del navegador.
//
// Requiere una variable de entorno en Vercel llamada COTIZAVE_API_KEY
// (Project Settings → Environment Variables). NO debe llevar el prefijo "VITE_":
// así Vite nunca la incluye en el build del cliente y queda solo del lado del servidor.

export default async function handler(req, res) {
  const apiKey = process.env.COTIZAVE_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'COTIZAVE_API_KEY no está configurada en Vercel.' });
    return;
  }

  try {
    const respuesta = await fetch('https://api.cotizave.com/v1/fx/rates', {
      headers: {
        'X-API-Key': apiKey,
        Accept: 'application/json',
      },
    });

    if (!respuesta.ok) {
      res.status(502).json({ error: `Cotizave respondió ${respuesta.status}` });
      return;
    }

    const datos = await respuesta.json();
    const binance = Array.isArray(datos?.rates)
      ? datos.rates.find((r) => r.market === 'binance')
      : null;
    const price = binance?.mid ?? null;

    if (typeof price !== 'number' || price <= 0) {
      res.status(502).json({ error: 'Cotizave no devolvió una tasa binance válida.' });
      return;
    }

    // Cache corto en el borde de Vercel: evita golpear la cuota de Cotizave
    // en cada visita, sin dejar de estar razonablemente al día.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json({
      price,
      source: 'cotizave-binance-p2p',
      updatedAt: binance.updated_at ?? null,
    });
  } catch {
    res.status(502).json({ error: 'No se pudo consultar Cotizave.' });
  }
}
