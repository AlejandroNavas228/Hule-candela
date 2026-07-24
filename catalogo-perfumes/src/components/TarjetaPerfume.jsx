import { mostrarPrecio, precioActivo } from '../utils/precio';
import { formatBs } from '../utils/tasaBs';
import { stockFicticio } from '../utils/stock';

// ---- Tarjeta de producto ----
export function TarjetaPerfume({ perfume, modoPrecio, tasaBs, onSeleccionar, onAgregar }) {
  const precio = precioActivo(perfume, modoPrecio);
  return (
    <div className="flex flex-col group cursor-pointer" onClick={() => onSeleccionar(perfume)}>
      <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] border border-gray-800 rounded-3xl p-5 md:p-7 aspect-square flex items-center justify-center mb-4 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#f97316]/40 group-hover:shadow-[#f97316]/10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)' }}></div>
        <img src={perfume.imagen} alt={perfume.nombre} loading="lazy" decoding="async" className="relative object-contain h-full w-full drop-shadow-[0_12px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="flex justify-between items-start gap-2 px-1">
        <div className="flex-1">
          <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">{perfume.marca}</p>
          <h3 className="text-[#e5e5e5] text-xl md:text-2xl uppercase leading-none tracking-wide mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{perfume.nombre}</h3>
          <p className="text-[#f97316] font-bold text-sm md:text-base mt-2 tracking-widest" style={{ fontFamily: "'Aileron', sans-serif" }}>{mostrarPrecio(precio)}</p>
          {tasaBs && precio && (
            <p className="text-gray-500 text-[10px] mt-0.5 tracking-wide">{formatBs(precio, tasaBs)}</p>
          )}
          <p className="text-gray-600 text-[10px] mt-1 tracking-wide">{stockFicticio(perfume.id)} en stock</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onAgregar(perfume); }}
          className="mt-2 p-2 text-gray-500 hover:text-[#f97316] transition-colors duration-300 rounded-full hover:bg-[#f97316]/10 flex items-center justify-center"
          title="Añadir al carrito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
      </div>
    </div>
  );
}
