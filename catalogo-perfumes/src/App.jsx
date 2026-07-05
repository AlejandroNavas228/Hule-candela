import { useState } from 'react';
import { perfumes } from './productos';

function App() {
  // Estados para manejar el carrito y el panel lateral
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función para añadir al carrito
  const agregarAlCarrito = (perfume) => {
    const productoExistente = carrito.find(item => item.id === perfume.id);
    if (productoExistente) {
      setCarrito(carrito.map(item => item.id === perfume.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...perfume, cantidad: 1 }]);
    }
    setIsCartOpen(true); // Abre el carrito automáticamente al añadir
  };

  // Función para eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  // Calcular el total (convirtiendo los strings como "4.000" a números)
  const total = carrito.reduce((acc, item) => {
    const precioNumerico = parseFloat(item.precio.replace('.', ''));
    return acc + (precioNumerico * item.cantidad);
  }, 0);

  // Formatear el total para que se vea como dinero
  const totalFormateado = total.toLocaleString('es-ES');

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8 font-sans relative">
      
      {/* Cabecera (Navbar) */}
      <nav className="flex justify-between items-center mb-12 border-b border-gray-700 pb-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Logo del Cliente (Asegúrate de que esté en la carpeta public como logo.svg o cambia la extensión) */}
          <img src="/logo.svg" alt="Logo Cliente" className="h-40 w-auto drop-shadow-md" />
          {/* <span className="text-[#f97316] text-2xl font-bold tracking-widest hidden md:block" style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}>
            HUELE CANDELA
          </span> */}
        </div>

        {/* Botón del Carrito en el Navbar */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-[#e5e5e5] hover:text-[#f97316] transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {carrito.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#f97316] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
              {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </button>
      </nav>

      {/* Título de la Marca */}
      <h1 className="text-[#e5e5e5] text-6xl text-center mb-10 tracking-wider" style={{ fontFamily: "'Oswald', 'Impact', sans-serif", transform: "scaleY(1.5)" }}>
        LATTAFA
      </h1>

      {/* Cuadrícula de Productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 max-w-4xl mx-auto">
        {perfumes.map((perfume) => (
          <div key={perfume.id} className="flex flex-col group">
            
            {/* Contenedor Blanco de la Imagen con efecto Hover y Auto-Ajuste */}
            <div className="bg-white rounded-3xl p-6 md:p-8 aspect-square flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[#f97316]/20 group-hover:shadow-2xl overflow-hidden">
              <img 
                src={perfume.imagen} 
                alt={perfume.nombre} 
                /* El mix-blend-multiply es el truco para desaparecer los fondos blancos de las fotos */
                className="object-contain h-full w-full drop-shadow-md transition-transform duration-300 group-hover:scale-110 mix-blend-multiply" 
              />
            </div>

            {/* Textos del Producto */}
            <h3 className="text-[#e5e5e5] text-xl uppercase leading-none tracking-wide mt-2" style={{ fontFamily: "'Oswald', 'Impact', sans-serif", transform: "scaleY(1.2)", transformOrigin: "left" }}>
              {perfume.nombre}
            </h3>
            <p className="text-[#f97316] font-bold text-lg mt-2">
              ${perfume.precio}
            </p>

            {/* Botón Añadir al Carrito */}
            <button 
              onClick={() => agregarAlCarrito(perfume)}
              className="mt-4 bg-transparent border border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm tracking-wider"
            >
              AÑADIR AL CARRITO
            </button>

          </div>
        ))}
      </div>

      {/* PANEL LATERAL DEL CARRITO (Modal) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Fondo oscuro semi-transparente */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          
          {/* Panel blanco del carrito */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
            
            {/* Cabecera del Panel */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>TU CARRITO</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-[#f97316] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Lista de Productos en el Carrito */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {carrito.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Tu carrito está vacío.</p>
              ) : (
                carrito.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl p-2 flex-shrink-0">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight">{item.nombre}</h4>
                      <p className="text-[#f97316] font-bold text-sm mt-1">${item.precio}</p>
                      <p className="text-xs text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-400 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Total y Botón de Checkout */}
            {carrito.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-[#f97316]">${totalFormateado}</span>
                </div>
                <button className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                  FINALIZAR PEDIDO
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}

export default App;