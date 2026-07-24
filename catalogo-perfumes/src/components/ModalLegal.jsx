import { TEXTOS_LEGALES } from '../data/textosLegales';

// ---- MODAL PÁGINAS LEGALES ----
export function ModalLegal({ paginaLegal, onCerrar }) {
  if (!paginaLegal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCerrar}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#1a1a1a] border border-gray-700 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl md:text-2xl text-[#e5e5e5] tracking-wide uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {TEXTOS_LEGALES[paginaLegal].titulo}
          </h3>
          <button onClick={onCerrar} className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 ml-4 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="legal-texto text-gray-400 text-sm leading-relaxed space-y-4">
          {TEXTOS_LEGALES[paginaLegal].contenido}
        </div>
      </div>
    </div>
  );
}
