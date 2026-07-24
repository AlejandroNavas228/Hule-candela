// ---- Notificación de compra reciente (marketing) ----
export function CompraRecienteToast({ compraReciente }) {
  if (!compraReciente) return null;
  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:bottom-8 z-40 md:max-w-xs animate-fade-in">
      <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-3.5 flex items-center gap-3">
        <div className="relative shrink-0 w-12 h-12 rounded-xl bg-[#111] border border-gray-800 flex items-center justify-center overflow-hidden">
          <img src={compraReciente.perfume.imagen} alt="" className="object-contain w-full h-full p-1" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[#1a1a1a] animate-pulse"></span>
        </div>
        <div className="min-w-0">
          <p className="text-[#e5e5e5] text-xs leading-snug">
            <span className="font-bold">{compraReciente.nombre}</span> acaba de comprar <span className="text-[#f97316] font-bold">{compraReciente.perfume.nombre}</span>
          </p>
          <p className="text-gray-500 text-[10px] mt-0.5">hace {compraReciente.minutosAtras} min</p>
        </div>
      </div>
    </div>
  );
}
