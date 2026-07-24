// ---- PANEL LATERAL DEL CARRITO ----
export function CarritoPanel({
  isCartOpen,
  onCerrar,
  carrito,
  onEliminar,
  totalFormateado,
  hayPreciosPendientes,
  onFinalizarPedido,
}) {
  if (!isCartOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onCerrar}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>TU CARRITO</h2>
          <button onClick={onCerrar} className="text-gray-500 hover:text-[#f97316] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {carrito.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Tu carrito está vacío.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-xl p-2 flex-shrink-0"><img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" /></div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.nombre}</h4>
                  <p className="text-[#f97316] font-bold text-xs md:text-sm mt-1" style={{ fontFamily: "'Aileron', sans-serif" }}>{item.precioAplicado ? `$${item.precioAplicado}` : 'Consultar'}</p>
                  <p className="text-xs text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
                </div>
                <button onClick={() => onEliminar(item.id)} className="text-red-400 hover:text-red-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
              </div>
            ))
          )}
        </div>
        {carrito.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-900">Total:</span><span className="text-2xl font-bold text-[#f97316]" style={{ fontFamily: "'Aileron', sans-serif" }}>${totalFormateado}</span>
            </div>
            {hayPreciosPendientes && (
              <p className="text-xs text-gray-500 mb-4">* Algunos productos tienen precio a consultar y no están incluidos en el total.</p>
            )}
            <button onClick={onFinalizarPedido} className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30 tracking-wider text-sm mt-2">FINALIZAR PEDIDO</button>
          </div>
        )}
      </div>
    </div>
  );
}
