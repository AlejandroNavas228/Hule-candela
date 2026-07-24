// ---- 2. BARRA DE BÚSQUEDA Y FILTROS (fija al hacer scroll) ----
export function BarraBusqueda({
  busqueda,
  setBusqueda,
  modoPrecio,
  setModoPrecio,
  marcasUnicas,
  marcaSeleccionada,
  setMarcaSeleccionada,
}) {
  return (
    <div className="sticky top-0 z-30 bg-[#1a1a1a] md:bg-[#1a1a1a]/90 md:backdrop-blur-md border-b border-gray-800/60 py-4 px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          {/* Búsqueda */}
          <div className="relative w-full md:flex-1 max-w-xl">
            <input
              type="text" placeholder="Buscar por nombre o marca..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-full py-3 px-6 pl-12 focus:outline-none focus:border-[#f97316] transition-colors placeholder-gray-500 text-sm shadow-inner"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-3.5 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {busqueda && (
              <button onClick={() => setBusqueda('')} className="absolute right-4 top-3.5 text-gray-500 hover:text-[#f97316] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          {/* Toggle Detal / Mayor */}
          <div className="flex items-center bg-[#2a2a2a] border border-gray-700 rounded-full p-1 flex-shrink-0">
            {['detal', 'mayor'].map(modo => (
              <button key={modo} onClick={() => setModoPrecio(modo)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  modoPrecio === modo ? 'bg-[#f97316] text-white shadow-md shadow-orange-500/20' : 'text-gray-400 hover:text-[#e5e5e5]'
                }`}
              >{modo === 'detal' ? 'Al detal' : 'Al mayor'}</button>
            ))}
          </div>
        </div>

        {/* Filtro de marcas con scroll lateral */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-1 py-1 scrollbar-hide">
            {marcasUnicas.map(marca => (
              <button key={marca} onClick={() => setMarcaSeleccionada(marca)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wider transition-all duration-300 ${
                  marcaSeleccionada === marca ? 'bg-[#f97316] text-white shadow-lg shadow-orange-500/30' : 'bg-transparent border border-gray-600 text-gray-400 hover:border-[#f97316] hover:text-[#f97316]'
                }`}
              >{marca}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
