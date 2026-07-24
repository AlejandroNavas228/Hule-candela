import { mostrarPrecio } from '../utils/precio';
import { formatBs } from '../utils/tasaBs';
import { stockFicticio } from '../utils/stock';

// ---- MODAL DE DETALLE DE PRODUCTO ----
export function ModalDetalle({ detalle, onCerrar, modoPrecio, tasaBs, onAgregar, onConsultar }) {
  if (!detalle) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onCerrar}></div>
      <div className="relative w-full max-w-3xl bg-[#1f1f1f] border border-gray-700/70 rounded-3xl shadow-2xl animate-fade-in overflow-hidden max-h-[92svh] overflow-y-auto">
        <button onClick={onCerrar} className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-[#f97316] bg-black/30 backdrop-blur-sm rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="grid md:grid-cols-2">
          {/* Imagen */}
          <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center p-8 md:p-12 min-h-[280px] md:min-h-[420px] overflow-hidden">
            <div className="absolute w-3/4 h-3/4 rounded-full bg-[#f97316]/[0.07] blur-3xl"></div>
            <img src={detalle.imagen} alt={detalle.nombre} className="relative object-contain max-h-[240px] md:max-h-[360px] w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Información */}
          <div className="p-7 md:p-10 flex flex-col">
            <p className="text-[#f97316] text-xs tracking-[0.3em] uppercase font-bold">{detalle.marca}</p>
            <h2 className="text-[#e5e5e5] text-4xl md:text-5xl uppercase leading-none tracking-wide mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{detalle.nombre}</h2>
            <p className="text-gray-500 text-xs mt-2 tracking-wide">{stockFicticio(detalle.id)} en stock</p>

            {detalle.descripcion && (
              <p className="text-gray-400 text-sm leading-relaxed mt-5">{detalle.descripcion}</p>
            )}

            {/* Precios */}
            <div className="mt-6 space-y-3">
              <div className={`flex items-center justify-between rounded-2xl border px-5 py-3.5 transition-colors ${modoPrecio === 'detal' ? 'border-[#f97316]/60 bg-[#f97316]/5' : 'border-gray-700 bg-[#2a2a2a]/50'}`}>
                <span className="text-gray-400 text-xs tracking-widest uppercase">Al detal</span>
                <span className="text-right">
                  <span className={`block font-bold tracking-widest ${modoPrecio === 'detal' ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>{mostrarPrecio(detalle.precioDetal)}</span>
                  {tasaBs && detalle.precioDetal && (
                    <span className="block text-gray-500 text-[10px] font-normal tracking-wide mt-0.5">{formatBs(detalle.precioDetal, tasaBs)}</span>
                  )}
                </span>
              </div>
              <div className={`flex items-center justify-between rounded-2xl border px-5 py-3.5 transition-colors ${modoPrecio === 'mayor' ? 'border-[#f97316]/60 bg-[#f97316]/5' : 'border-gray-700 bg-[#2a2a2a]/50'}`}>
                <span className="text-gray-400 text-xs tracking-widest uppercase">Al mayor</span>
                <span className="text-right">
                  <span className={`block font-bold tracking-widest ${modoPrecio === 'mayor' ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>{mostrarPrecio(detalle.precioMayor)}</span>
                  {tasaBs && detalle.precioMayor && (
                    <span className="block text-gray-500 text-[10px] font-normal tracking-wide mt-0.5">{formatBs(detalle.precioMayor, tasaBs)}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => { onAgregar(detalle); }}
                className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/20 tracking-wider text-sm"
              >
                AÑADIR AL CARRITO
              </button>
              <button
                onClick={() => onConsultar(detalle)}
                className="w-full bg-transparent border border-[#25D366]/60 text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm tracking-wider"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                CONSULTAR POR WHATSAPP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
