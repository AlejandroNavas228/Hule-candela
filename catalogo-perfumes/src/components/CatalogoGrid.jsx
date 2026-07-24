import { Adorno } from './Adorno';
import { Reveal } from './Reveal';
import { TarjetaPerfume } from './TarjetaPerfume';

// ---- 3. CONTENIDO DEL CATÁLOGO ----
export function CatalogoGrid({
  perfumesFiltrados,
  mostrarSecciones,
  gruposPorMarca,
  marcaSeleccionada,
  modoPrecio,
  tasaBs,
  onSeleccionar,
  onAgregar,
}) {
  return (
    <div className="flex-1 px-4 md:px-8 mt-14 relative">

      {/* Adornos entre secciones (con parallax al hacer scroll) */}
      <Adorno src="/img/versace-eros.webp" speed={-0.06} className="w-32 md:w-72 -left-10 top-[12%] [--rot:-8deg]" />
      <Adorno src="/img/lattafa-khamrah-qahwa.webp" speed={0.05} className="w-28 md:w-56 -right-8 top-[26%] [--rot:9deg] hidden md:block" />
      <Adorno src="/img/nike-ultra-purple.webp" speed={-0.04} className="w-28 md:w-52 left-[4%] top-[41%] [--rot:-5deg] hidden md:block" />
      <Adorno src="/img/afnan-9pm.webp" speed={0.07} className="w-32 md:w-72 -right-12 top-[55%] [--rot:7deg]" />
      <Adorno src="/img/fragluxe-savage.webp" speed={-0.05} className="w-28 md:w-56 -left-6 top-[68%] [--rot:6deg] hidden md:block" />
      <Adorno src="/img/carolina-herrera-212-vip-black.webp" speed={0.05} className="w-28 md:w-64 -left-8 top-[84%] [--rot:5deg]" />
      <Adorno src="/img/versace-eros-parfum.webp" speed={-0.06} className="w-28 md:w-56 -right-10 top-[92%] [--rot:-7deg] hidden md:block" />

      {perfumesFiltrados.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-12 mb-24">No se encontraron perfumes.</p>
      ) : mostrarSecciones ? (
        /* --- Vista por secciones: cada marca con su espacio --- */
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32 mb-28 relative">
          {Object.entries(gruposPorMarca).map(([marca, items]) => (
            <Reveal key={marca}>
              <section>
                <div className="flex items-end justify-between mb-8 md:mb-10">
                  <div>
                    <h2 className="text-[#e5e5e5] text-4xl md:text-6xl uppercase tracking-wider leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{marca}</h2>
                    <div className="h-[3px] w-16 bg-[#f97316] rounded-full mt-3"></div>
                  </div>
                  <span className="text-gray-500 text-xs md:text-sm tracking-widest uppercase pb-1">{items.length} {items.length === 1 ? 'perfume' : 'perfumes'}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
                  {items.map((perfume) => (
                    <TarjetaPerfume key={perfume.id} perfume={perfume} modoPrecio={modoPrecio} tasaBs={tasaBs} onSeleccionar={onSeleccionar} onAgregar={onAgregar} />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      ) : (
        /* --- Vista filtrada: una sola cuadrícula --- */
        <div className="max-w-6xl mx-auto mb-28">
          <Reveal>
            <h1 className="text-[#e5e5e5] text-5xl md:text-7xl text-center mb-4 tracking-wider uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {marcaSeleccionada === 'TODAS' ? 'RESULTADOS' : marcaSeleccionada}
            </h1>
            <p className="text-center text-gray-500 text-xs tracking-[0.3em] uppercase mb-12">{perfumesFiltrados.length} {perfumesFiltrados.length === 1 ? 'perfume' : 'perfumes'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
              {perfumesFiltrados.map((perfume) => (
                <TarjetaPerfume key={perfume.id} perfume={perfume} modoPrecio={modoPrecio} tasaBs={tasaBs} onSeleccionar={onSeleccionar} onAgregar={onAgregar} />
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
