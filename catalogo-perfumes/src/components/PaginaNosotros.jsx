import { PILARES } from '../data/pilares';
import { EQUIPO } from '../data/equipo';

// ---- PÁGINA QUIÉNES SOMOS ----
export function PaginaNosotros({ onCerrar }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a1a] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={onCerrar}
            className="flex items-center gap-2 text-gray-400 hover:text-[#f97316] transition-colors duration-300 text-sm tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al catálogo
          </button>
          <h4 className="text-[#e5e5e5] text-lg tracking-widest uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Huele Candela</h4>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-[#e5e5e5] text-5xl md:text-7xl tracking-wider uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Quiénes Somos
          </h1>
          <div className="w-20 h-1 bg-[#f97316] mx-auto mt-6 rounded-full"></div>
        </div>

        <section className="mb-20 md:mb-28">
          <h2 className="text-[#e5e5e5] text-3xl md:text-4xl tracking-wide uppercase text-center mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ¿Qué nos diferencia?
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed">
            Nos diferenciamos por tres pilares fundamentales que van más allá de la venta de un frasco de perfume.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILARES.map((pilar) => (
              <div key={pilar.titulo} className="bg-[#111] border border-gray-800 rounded-2xl p-7 hover:border-[#f97316]/40 transition-colors duration-300">
                <p className="text-[#f97316] font-bold text-sm uppercase tracking-widest mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {pilar.titulo}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">{pilar.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[#e5e5e5] text-3xl md:text-4xl tracking-wide uppercase text-center mb-10 md:mb-14" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPO.map((m) => (
              <div key={m.nombre} className="bg-[#111] border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#f97316]/40 transition-colors duration-300">
                <div
                  className="w-16 h-16 rounded-full bg-[#f97316]/15 border border-[#f97316]/40 text-[#f97316] flex items-center justify-center font-bold text-xl mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {m.iniciales}
                </div>
                <p className="text-[#e5e5e5] font-bold text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{m.nombre}</p>
                <p className="text-[#f97316] text-xs uppercase tracking-wide mt-1 mb-3">{m.cargo}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-20 md:mt-24">
          <button
            onClick={onCerrar}
            className="bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl transition-colors shadow-lg shadow-orange-500/20 tracking-wider text-sm"
          >
            VER CATÁLOGO
          </button>
        </div>
      </div>
    </div>
  );
}
