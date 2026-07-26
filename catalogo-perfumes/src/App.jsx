import { useState, useEffect } from 'react';
import { perfumes } from './productos';

import { norm } from './utils/texto';
import { parsePrecio, precioActivo } from './utils/precio';
import { formatBs, obtenerTasaBs } from './utils/tasaBs';

import { NOMBRES_FICTICIOS } from './data/nombresFicticios';

import { FondoDinamico } from './components/FondoDinamico';
import { GlobalStyles } from './components/GlobalStyles';
import { BotonCarritoFlotante } from './components/BotonCarritoFlotante';
import { Hero } from './components/Hero';
import { BarraBusqueda } from './components/BarraBusqueda';
import { CatalogoGrid } from './components/CatalogoGrid';
import { Footer } from './components/Footer';
import { ModalLegal } from './components/ModalLegal';
import { PaginaNosotros } from './components/PaginaNosotros';
import { BotonWhatsApp } from './components/BotonWhatsApp';
import { CompraRecienteToast } from './components/CompraRecienteToast';
import { Toast } from './components/Toast';
import { ModalDetalle } from './components/ModalDetalle';
import { CarritoPanel } from './components/CarritoPanel';
import { CheckoutModal } from './components/CheckoutModal';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [datosCliente, setDatosCliente] = useState({ nombre: '', direccion: '', notas: '' });
  const [busqueda, setBusqueda] = useState('');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('TODAS');
  const [modoPrecio, setModoPrecio] = useState('detal'); // 'detal' | 'mayor'
  const [detalle, setDetalle] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [paginaLegal, setPaginaLegal] = useState(null); // 'terminos' | 'privacidad' | 'cookies' | 'descargo' | null
  const [mostrarNosotros, setMostrarNosotros] = useState(false);
  const [compraReciente, setCompraReciente] = useState(null);
  const [tasaBs, setTasaBs] = useState(null);

  // Número de WhatsApp
  const numeroWhatsApp = "584164023732";

  // ---- Cargar tasa de conversión a Bs (Binance/USDT) al iniciar ----
  useEffect(() => {
    let activo = true;
    obtenerTasaBs().then((precio) => { if (activo) setTasaBs(precio); });
    return () => { activo = false; };
  }, []);
  const marcasUnicas = ['TODAS', ...new Set(perfumes.map(p => p.marca))];

  // ---- Notificación de "compra reciente" (ficticia, marketing) ----
  useEffect(() => {
    let timeoutMostrar;
    let timeoutOcultar;

    const programarSiguiente = () => {
      const espera = 18000 + Math.random() * 22000; // entre 18s y 40s
      timeoutMostrar = setTimeout(() => {
        const nombre = NOMBRES_FICTICIOS[Math.floor(Math.random() * NOMBRES_FICTICIOS.length)];
        const perfume = perfumes[Math.floor(Math.random() * perfumes.length)];
        const minutosAtras = 1 + Math.floor(Math.random() * 14);
        setCompraReciente({ nombre, perfume, minutosAtras });
        timeoutOcultar = setTimeout(() => {
          setCompraReciente(null);
          programarSiguiente();
        }, 6000);
      }, espera);
    };

    programarSiguiente();
    return () => {
      clearTimeout(timeoutMostrar);
      clearTimeout(timeoutOcultar);
    };
  }, []);

  const perfumesFiltrados = perfumes.filter((perfume) => {
    const q = norm(busqueda);
    const coincideBusqueda = !q || norm(perfume.nombre).includes(q) || norm(perfume.marca).includes(q);
    const coincideMarca = marcaSeleccionada === 'TODAS' || perfume.marca === marcaSeleccionada;
    return coincideBusqueda && coincideMarca;
  });

  // Agrupar por marca (manteniendo el orden de productos.js)
  const gruposPorMarca = perfumesFiltrados.reduce((acc, p) => {
    if (!acc[p.marca]) acc[p.marca] = [];
    acc[p.marca].push(p);
    return acc;
  }, {});
  const mostrarSecciones = marcaSeleccionada === 'TODAS' && !busqueda;

  const agregarAlCarrito = (perfume) => {
    const precioAplicado = precioActivo(perfume, modoPrecio);
    const productoExistente = carrito.find(item => item.id === perfume.id);
    if (productoExistente) {
      setCarrito(carrito.map(item => item.id === perfume.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...perfume, cantidad: 1, precioAplicado }]);
    }
    setNotificacion(`${perfume.nombre} añadido`);
    setTimeout(() => setNotificacion(null), 3000);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + parsePrecio(item.precioAplicado) * item.cantidad, 0);
  const totalFormateado = total.toLocaleString('es-ES');
  const hayPreciosPendientes = carrito.some(item => !item.precioAplicado);

  const handleCheckout = (e) => {
    e.preventDefault();
    let mensaje = `🔥 *¡Hola Huele Candela! Quiero hacer un pedido:*\n\n`;
    carrito.forEach(item => {
      const p = item.precioAplicado ? `$${item.precioAplicado}` : 'precio a consultar';
      const bs = item.precioAplicado && tasaBs ? ` / ${formatBs(item.precioAplicado, tasaBs)}` : '';
      mensaje += `▪️ ${item.cantidad}x ${item.nombre} (${p}${bs})\n`;
    });
    mensaje += `\n💰 *Total a pagar:* $${totalFormateado}${hayPreciosPendientes ? ' (+ productos a consultar)' : ''}\n`;
    if (tasaBs && !hayPreciosPendientes) {
      mensaje += `💵 *Total en Bs (tasa USDT):* ${formatBs(total, tasaBs)}\n`;
    }
    mensaje += `🏷️ *Modalidad:* ${modoPrecio === 'detal' ? 'Al detal' : 'Al mayor'}\n\n`;
    mensaje += `📦 *Mis datos de envío:*\n👤 Nombre: ${datosCliente.nombre}\n📍 Dirección: ${datosCliente.direccion}\n`;
    if (datosCliente.notas) mensaje += `📝 Notas: ${datosCliente.notas}\n`;

    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const consultarPorWhatsApp = (perfume) => {
    const mensaje = `¡Hola Huele Candela! 👋 Me interesa el perfume *${perfume.nombre}* de *${perfume.marca}*. ¿Me pueden dar más información?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative flex flex-col overflow-x-hidden" style={{ fontFamily: "'Aileron', sans-serif" }}>

      <GlobalStyles />

      {/* FONDO DINÁMICO (orbes + chispas de candela) */}
      <FondoDinamico />

      <BotonCarritoFlotante
        cantidadTotal={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        onAbrir={() => setIsCartOpen(true)}
      />

      <Hero />

      <BarraBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        modoPrecio={modoPrecio}
        setModoPrecio={setModoPrecio}
        marcasUnicas={marcasUnicas}
        marcaSeleccionada={marcaSeleccionada}
        setMarcaSeleccionada={setMarcaSeleccionada}
      />

      <CatalogoGrid
        perfumesFiltrados={perfumesFiltrados}
        mostrarSecciones={mostrarSecciones}
        gruposPorMarca={gruposPorMarca}
        marcaSeleccionada={marcaSeleccionada}
        modoPrecio={modoPrecio}
        tasaBs={tasaBs}
        onSeleccionar={setDetalle}
        onAgregar={agregarAlCarrito}
      />

      <Footer
        onAbrirNosotros={() => setMostrarNosotros(true)}
        onAbrirLegal={setPaginaLegal}
      />

      <ModalLegal paginaLegal={paginaLegal} onCerrar={() => setPaginaLegal(null)} />

      {mostrarNosotros && (
        <PaginaNosotros onCerrar={() => setMostrarNosotros(false)} />
      )}

      <BotonWhatsApp numeroWhatsApp={numeroWhatsApp} />

      <CompraRecienteToast compraReciente={compraReciente} />

      <Toast mensaje={notificacion} />

      <ModalDetalle
        detalle={detalle}
        onCerrar={() => setDetalle(null)}
        modoPrecio={modoPrecio}
        tasaBs={tasaBs}
        onAgregar={agregarAlCarrito}
        onConsultar={consultarPorWhatsApp}
      />

      <CarritoPanel
        isCartOpen={isCartOpen}
        onCerrar={() => setIsCartOpen(false)}
        carrito={carrito}
        onEliminar={eliminarDelCarrito}
        total={total}
        totalFormateado={totalFormateado}
        hayPreciosPendientes={hayPreciosPendientes}
        onFinalizarPedido={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        tasaBs={tasaBs}
      />

      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        onCerrar={() => setIsCheckoutOpen(false)}
        datosCliente={datosCliente}
        setDatosCliente={setDatosCliente}
        onSubmit={handleCheckout}
      />
    </div>
  );
}

export default App;
