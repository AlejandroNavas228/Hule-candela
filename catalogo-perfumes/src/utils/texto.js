// ---- Utilidades de texto ----
// Quita las tildes/diacríticos (rango Unicode 0x0300-0x036F: "combining diacritical marks"),
// para poder comparar/búscar texto sin importar acentos.
const DIACRITICOS_INICIO = String.fromCharCode(0x0300);
const DIACRITICOS_FIN = String.fromCharCode(0x036f);
const REGEX_DIACRITICOS = new RegExp(`[${DIACRITICOS_INICIO}-${DIACRITICOS_FIN}]`, 'g');

export const norm = (s) => s.toLowerCase().normalize('NFD').replace(REGEX_DIACRITICOS, '');
