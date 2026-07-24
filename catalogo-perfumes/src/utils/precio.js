// ---- Utilidades de precio ----
export const parsePrecio = (v) => (v ? parseFloat(String(v).replace(',', '.')) : 0);

export const mostrarPrecio = (v) => (v ? `$${parsePrecio(v).toFixed(2)}` : 'Consultar');

// Precio activo según el modo seleccionado ('detal' | 'mayor').
export const precioActivo = (perfume, modoPrecio) =>
  modoPrecio === 'detal' ? perfume.precioDetal : perfume.precioMayor;
