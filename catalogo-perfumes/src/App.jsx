import { useState, useEffect, useRef, useMemo } from 'react';
import { perfumes } from './productos';

// ---- Utilidades ----
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const parsePrecio = (v) => (v ? parseFloat(String(v).replace(',', '.')) : 0);
const mostrarPrecio = (v) => (v ? `$${parsePrecio(v).toFixed(2)}` : 'Consultar');

// ---- Textos legales ----
const TEXTOS_LEGALES = {
  terminos: {
    titulo: 'Términos y Condiciones',
    contenido: (
      <>
        <p>Huele Candela es un catálogo digital operado por una persona natural, sin que ello implique la constitución de una sociedad mercantil. Al navegar y hacer uso de este sitio, aceptas los términos aquí descritos.</p>
        <h5>1. Naturaleza del sitio</h5>
        <p>Este sitio web funciona como catálogo virtual de perfumes. No se procesan pagos ni compras directamente en la página: cada pedido se coordina de forma manual a través de WhatsApp, donde se confirman disponibilidad, precio final, forma de pago y método de entrega antes de formalizar la venta.</p>
        <h5>2. Precios y disponibilidad</h5>
        <p>Los precios mostrados (al detal y al mayor) están expresados en dólares estadounidenses (USD) y pueden cambiar sin previo aviso debido a fluctuaciones del mercado o de proveedores. Los productos marcados como "Consultar" no tienen un precio publicado y deben cotizarse directamente por WhatsApp. La disponibilidad de cada perfume se confirma al momento del pedido, ya que el inventario puede variar.</p>
        <h5>3. Proceso de compra</h5>
        <p>Al añadir productos al carrito y pulsar "Enviar a WhatsApp", se genera un mensaje con el resumen de tu pedido que se envía a través de tu propia aplicación de WhatsApp. La venta se considera formalizada únicamente cuando ambas partes acuerdan los detalles finales (precio, pago y entrega) por ese medio.</p>
        <h5>4. Envíos y entregas</h5>
        <p>Las condiciones de envío (zona, costo y tiempo estimado) se coordinan caso por caso vía WhatsApp. Huele Candela no se hace responsable por retrasos ocasionados por empresas de mensajería o transporte externas una vez el pedido ha sido despachado.</p>
        <h5>5. Cambios y devoluciones</h5>
        <p>Por tratarse de productos de perfumería, no se aceptan devoluciones una vez el producto ha sido abierto o usado, salvo defecto de fábrica comprobado. Cualquier inconformidad debe reportarse dentro de las 24 horas siguientes a la entrega, a través de WhatsApp, adjuntando evidencia (fotos o video).</p>
        <h5>6. Marcas registradas</h5>
        <p>Los nombres de marcas, casas de perfumería y diseñadores que aparecen en este catálogo (como referencia de línea, familia olfativa o inspiración) son propiedad de sus respectivos dueños. Su mención tiene fines meramente descriptivos e identificativos, y no implica afiliación, patrocinio ni asociación comercial entre esas marcas y Huele Candela.</p>
        <h5>7. Legislación aplicable</h5>
        <p>Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier controversia se intentará resolver primero de forma amistosa a través de los canales de contacto del negocio.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
  privacidad: {
    titulo: 'Política de Privacidad',
    contenido: (
      <>
        <p>En Huele Candela respetamos tu privacidad. Esta página explica qué información se maneja cuando usas este catálogo y cómo se trata.</p>
        <h5>1. Responsable del tratamiento</h5>
        <p>Este sitio es operado por una persona natural bajo el nombre comercial "Huele Candela". Para cualquier consulta sobre tus datos puedes escribir por WhatsApp o Instagram, canales listados al pie de esta página.</p>
        <h5>2. Qué datos se recopilan</h5>
        <p>Este catálogo no tiene servidores propios de base de datos ni formularios que almacenen información en línea. Los únicos datos que se solicitan son los que tú mismo escribes voluntariamente en el formulario de "Datos de envío" (nombre, dirección y notas opcionales) al finalizar un pedido. Esa información se usa exclusivamente para armar el mensaje que se envía a través de tu propia app de WhatsApp — nunca se guarda en ningún servidor ni base de datos de Huele Candela.</p>
        <h5>3. Uso de la información</h5>
        <p>Los datos de envío que compartes se usan únicamente para coordinar tu pedido (confirmar dirección, forma de entrega y contacto). No se venden, alquilan ni comparten con terceros con fines publicitarios.</p>
        <h5>4. Servicios de terceros</h5>
        <p>Este sitio utiliza los siguientes servicios externos, cada uno con su propia política de privacidad:</p>
        <ul>
          <li><strong>WhatsApp / Meta:</strong> para recibir y coordinar pedidos y consultas.</li>
          <li><strong>Vercel:</strong> plataforma de hosting donde está alojado el sitio.</li>
          <li><strong>Google Fonts:</strong> para cargar las tipografías del sitio, lo que puede implicar que tu navegador se conecte a servidores de Google.</li>
        </ul>
        <h5>5. Tus derechos</h5>
        <p>Puedes solicitar en cualquier momento que se aclare qué información recibimos de ti o pedir que no se use más, escribiendo directamente por WhatsApp o Instagram.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
  cookies: {
    titulo: 'Política de Cookies',
    contenido: (
      <>
        <p>Este sitio no utiliza cookies de rastreo, publicidad ni analítica de terceros. No implementamos Google Analytics, píxeles de Facebook/Meta ni ningún sistema de seguimiento de comportamiento.</p>
        <h5>1. Almacenamiento local</h5>
        <p>El catálogo funciona completamente en tu navegador: el carrito de compras se guarda temporalmente en la memoria de la página mientras la tienes abierta, y se borra al cerrarla o recargarla. No se guarda información en cookies persistentes de nuestro lado.</p>
        <h5>2. Servicios externos</h5>
        <p>Al cargar las tipografías del sitio, tu navegador se conecta a servidores de Google Fonts, lo que técnicamente implica compartir tu dirección IP con Google, según su propia política. No usamos ningún dato adicional de esa conexión.</p>
        <h5>3. Control desde tu navegador</h5>
        <p>Aunque este sitio no depende de cookies para funcionar, siempre puedes revisar y borrar cualquier dato almacenado por tu navegador desde su configuración de privacidad.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
  descargo: {
    titulo: 'Descargo de Responsabilidad',
    contenido: (
      <>
        <p>La información y las imágenes presentadas en este catálogo se ofrecen con fines informativos y comerciales, y se procura que sean lo más precisas posible.</p>
        <h5>1. Imágenes de referencia</h5>
        <p>Las fotografías de los productos pueden provenir del fabricante o distribuidor y son usadas como referencia visual. El empaque, la presentación o el diseño de la botella real pueden variar ligeramente respecto a la imagen mostrada (por ediciones, lotes o actualizaciones del fabricante), sin que eso afecte la autenticidad del producto.</p>
        <h5>2. Perfumes originales e inspirados</h5>
        <p>El catálogo incluye tanto perfumes originales de casas reconocidas (Lattafa, Armaf, Afnan, entre otras) como fragancias de otras marcas de perfumería inspiradas en familias olfativas populares. Cuando corresponda, cualquier mención comparativa con marcas de diseñador es únicamente referencial y no implica que el producto sea fabricado, distribuido o respaldado por esa casa de moda.</p>
        <h5>3. Sin responsabilidad por uso indebido</h5>
        <p>Huele Candela no se hace responsable por reacciones alérgicas o efectos adversos derivados del uso de los productos. Se recomienda realizar una prueba de contacto antes del uso habitual si tienes piel sensible.</p>
        <h5>4. Disponibilidad de la información</h5>
        <p>Este sitio puede contener errores tipográficos o de precio de forma involuntaria. Nos reservamos el derecho de corregir dicha información en cualquier momento sin previo aviso.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
};

// ---- Componente de aparición al hacer scroll ----
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

// ---- Imagen decorativa (silueta fantasma con parallax opcional) ----
function Adorno({ src, className = '', speed = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!speed) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <span ref={ref} aria-hidden="true" className={`absolute pointer-events-none select-none hidden md:block ${className}`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full opacity-[0.13] animate-flotar"
        style={{ filter: 'invert(1) grayscale(1)' }}
      />
    </span>
  );
}

// ---- Fondo dinámico: orbes de luz + chispas de candela ----
function FondoDinamico() {
  const chispas = useMemo(() => {
    const esMovil = typeof window !== 'undefined' && window.innerWidth < 768;
    const total = esMovil ? 6 : 16;
    return Array.from({ length: total }, (_, i) => ({
      left: (i * 61 + 9) % 100,
      delay: (i * 1.9) % 14,
      dur: 10 + ((i * 2.7) % 11),
      size: 2 + ((i * 5) % 4),
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="orbe orbe-a"></div>
      <div className="orbe orbe-b"></div>
      <div className="orbe orbe-c"></div>
      {chispas.map((c, i) => (
        <span
          key={i}
          className="chispa"
          style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.dur}s`,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)' }}></div>
    </div>
  );
}

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

  // Número de WhatsApp
  const numeroWhatsApp = "584120994977";

  const marcasUnicas = ['TODAS', ...new Set(perfumes.map(p => p.marca))];

  const precioActivo = (p) => (modoPrecio === 'detal' ? p.precioDetal : p.precioMayor);

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
    const precioAplicado = precioActivo(perfume);
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
      mensaje += `▪️ ${item.cantidad}x ${item.nombre} (${p})\n`;
    });
    mensaje += `\n💰 *Total a pagar:* $${totalFormateado}${hayPreciosPendientes ? ' (+ productos a consultar)' : ''}\n`;
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

  // ---- Tarjeta de producto ----
  const TarjetaPerfume = ({ perfume }) => (
    <div className="flex flex-col group cursor-pointer" onClick={() => setDetalle(perfume)}>
      <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] border border-gray-800 rounded-3xl p-5 md:p-7 aspect-square flex items-center justify-center mb-4 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#f97316]/40 group-hover:shadow-[#f97316]/10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)' }}></div>
        <img src={perfume.imagen} alt={perfume.nombre} loading="lazy" decoding="async" className="relative object-contain h-full w-full drop-shadow-[0_12px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="flex justify-between items-start gap-2 px-1">
        <div className="flex-1">
          <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">{perfume.marca}</p>
          <h3 className="text-[#e5e5e5] text-xl md:text-2xl uppercase leading-none tracking-wide mt-1" style={{ fontFamily: "'Extenda', sans-serif" }}>{perfume.nombre}</h3>
          <p className="text-[#f97316] font-bold text-sm md:text-base mt-2 tracking-widest" style={{ fontFamily: "'Aileron', sans-serif" }}>{mostrarPrecio(precioActivo(perfume))}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); agregarAlCarrito(perfume); }}
          className="mt-2 p-2 text-gray-500 hover:text-[#f97316] transition-colors duration-300 rounded-full hover:bg-[#f97316]/10 flex items-center justify-center"
          title="Añadir al carrito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative flex flex-col overflow-x-hidden" style={{ fontFamily: "'Aileron', sans-serif" }}>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes logoFocus {
          0% { opacity: 0; filter: blur(24px); transform: scale(1.1); }
          60% { opacity: 1; }
          100% { opacity: 1; filter: blur(0); transform: scale(1); }
        }
        @keyframes flotar {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-18px) rotate(var(--rot, 0deg)); }
        }
        .animate-slide-in {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-logo-focus {
          animation: logoFocus 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-flotar {
          animation: flotar 9s ease-in-out infinite;
        }
        .orbe {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform;
        }
        .orbe-a {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(249,115,22,0.13), transparent 70%);
          top: -8%; left: -10%;
          animation: orbita-a 38s ease-in-out infinite;
        }
        .orbe-b {
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(249,115,22,0.09), transparent 70%);
          bottom: 4%; right: -8%;
          animation: orbita-b 46s ease-in-out infinite;
        }
        .orbe-c {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(229,229,229,0.06), transparent 70%);
          top: 42%; left: 32%;
          animation: orbita-c 52s ease-in-out infinite;
        }
        @keyframes orbita-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(16vw, 14vh) scale(1.15); }
          66% { transform: translate(5vw, 30vh) scale(0.95); }
        }
        @keyframes orbita-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-15vw, -16vh) scale(1.2); }
          70% { transform: translate(-4vw, -32vh) scale(0.9); }
        }
        @keyframes orbita-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(11vw, -18vh) scale(1.25); }
        }
        .chispa {
          position: absolute;
          bottom: -12px;
          border-radius: 9999px;
          background: #f97316;
          box-shadow: 0 0 8px 2px rgba(249, 115, 22, 0.45);
          animation-name: subir;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes subir {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          8%   { opacity: 0.55; }
          50%  { transform: translateY(-52vh) translateX(-14px); opacity: 0.4; }
          85%  { opacity: 0.3; }
          100% { transform: translateY(-108vh) translateX(16px); opacity: 0; }
        }

        /* En móvil: aligeramos el fondo animado para que el scroll vaya fluido */
        @media (max-width: 767px) {
          .orbe { filter: blur(45px); }
          .orbe-a, .orbe-b, .orbe-c { animation: none; }
          .orbe-a { width: 320px; height: 320px; }
          .orbe-b { width: 280px; height: 280px; }
          .orbe-c { width: 240px; height: 240px; }
          .animate-flotar { animation: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbe-a, .orbe-b, .orbe-c, .animate-flotar, .chispa { animation: none !important; }
        }
        .legal-texto h5 {
          color: #e5e5e5;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-top: 1.25rem;
          font-weight: 600;
        }
        .legal-texto ul {
          list-style: disc;
          padding-left: 1.25rem;
        }
        .legal-texto li { margin-bottom: 0.35rem; }
      `}</style>

      {/* FONDO DINÁMICO (orbes + chispas de candela) */}
      <FondoDinamico />

      {/* BOTÓN DEL CARRITO FLOTANTE Y FIJO */}
      <div className="fixed top-4 right-4 md:top-6 md:right-8 z-40">
        <button onClick={() => setIsCartOpen(true)} className="relative p-3 text-[#e5e5e5] hover:text-[#f97316] bg-[#1a1a1a] md:bg-[#1a1a1a]/80 md:backdrop-blur-md rounded-full transition-all duration-300 shadow-xl shadow-black/50 border border-gray-700 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {carrito.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#f97316] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
              {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </button>
      </div>

      {/* 1. HERO A PANTALLA COMPLETA */}
      <section className="relative w-full h-[100svh] bg-gradient-to-b from-black/80 via-black/60 to-transparent flex flex-col items-center justify-center overflow-hidden">
        {/* Adornos: siluetas de perfumes flotando */}
        <Adorno src="/img/lattafa-khamrah.webp" className="w-40 md:w-64 -left-6 top-[12%]" />
        <Adorno src="/img/armaf-club-de-nuit-intense-man.webp" className="w-36 md:w-56 -right-4 top-[18%] [--rot:8deg]" />
        <Adorno src="/img/yara.webp" className="w-32 md:w-52 left-[8%] bottom-[10%] [--rot:-6deg]" />
        <Adorno src="/img/jean-paul-gaultier-le-male.webp" className="w-32 md:w-48 right-[10%] bottom-[14%] [--rot:5deg]" />

        {/* Resplandor suave */}
        <div className="absolute w-[480px] h-[480px] rounded-full bg-[#f97316]/10 blur-[140px]"></div>

        {/* Logo con enfoque progresivo */}
        <div className="relative z-10 flex flex-col items-center px-6">
          <img
            src="/logo.svg"
            alt="Huele Candela"
            className="w-full max-w-[280px] md:max-w-[420px] h-auto object-contain drop-shadow-2xl animate-logo-focus"
          />
          <p
            className="font-light italic text-white/80 text-xs md:text-base leading-snug tracking-wide text-center -mt-14 md:-mt-45 max-w-[15rem] md:max-w-sm opacity-0 animate-fade-in"
            style={{ animationDelay: '1.2s', animationDuration: '1.2s', animationFillMode: 'forwards', fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Con un buen perfume<br />
            se alegra el corazón;<br />
            con la dulzura de la amistad<br />
            se vuelve a la vida.
            <span className="block mt-1 md:mt-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 not-italic">
              Proverbios 27:9
            </span>
          </p>

          <p className="text-gray-400 text-xs md:text-sm tracking-[0.35em] uppercase mt-0 md:mt-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.6s', animationDuration: '1s', animationFillMode: 'forwards' }}>
            Catálogo de perfumes
          </p>

          {/* Indicador de scroll: pegado justo debajo del texto */}
          <div className="flex flex-col items-center gap-2 mt-8 md:mt-10 opacity-0 animate-fade-in" style={{ animationDelay: '1.8s', animationDuration: '1s', animationFillMode: 'forwards' }}>
            <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Desliza</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#f97316] animate-bounce">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE BÚSQUEDA Y FILTROS (fija al hacer scroll) */}
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

      {/* 3. CONTENIDO DEL CATÁLOGO */}
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
                      <h2 className="text-[#e5e5e5] text-4xl md:text-6xl uppercase tracking-wider leading-none" style={{ fontFamily: "'Extenda', sans-serif" }}>{marca}</h2>
                      <div className="h-[3px] w-16 bg-[#f97316] rounded-full mt-3"></div>
                    </div>
                    <span className="text-gray-500 text-xs md:text-sm tracking-widest uppercase pb-1">{items.length} {items.length === 1 ? 'perfume' : 'perfumes'}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
                    {items.map((perfume) => (
                      <TarjetaPerfume key={perfume.id} perfume={perfume} />
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
              <h1 className="text-[#e5e5e5] text-5xl md:text-7xl text-center mb-4 tracking-wider uppercase" style={{ fontFamily: "'Extenda', sans-serif" }}>
                {marcaSeleccionada === 'TODAS' ? 'RESULTADOS' : marcaSeleccionada}
              </h1>
              <p className="text-center text-gray-500 text-xs tracking-[0.3em] uppercase mb-12">{perfumesFiltrados.length} {perfumesFiltrados.length === 1 ? 'perfume' : 'perfumes'}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
                {perfumesFiltrados.map((perfume) => (
                  <TarjetaPerfume key={perfume.id} perfume={perfume} />
                ))}
              </div>
            </Reveal>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-gray-800 pt-10 pb-6 flex flex-col items-center justify-center w-full bg-[#111]">
        <h4 className="text-[#e5e5e5] text-2xl tracking-widest mb-6 uppercase" style={{ fontFamily: "'Extenda', sans-serif" }}>HUELE CANDELA</h4>
        <div className="flex gap-6 mb-8">
          <a href="https://www.instagram.com/huelecandela?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          </a>
          <a href="https://www.tiktok.com/@huelecandela?_r=1&_t=ZS-97nDLwwixtM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.16-3.44-3.35-3.46-5.7-.02-2.14.93-4.18 2.59-5.46 1.49-1.14 3.42-1.57 5.23-1.19.16.03.32.08.47.14v4.11c-.42-.14-.87-.2-1.31-.17-1.14.04-2.22.61-2.92 1.52-.78 1.05-.98 2.47-.53 3.69.44 1.16 1.51 2 2.75 2.22 1.25.21 2.55-.13 3.43-1.03.95-.94 1.41-2.3 1.39-3.64V0h4.21z" /></svg>
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4 px-6">
          <button onClick={() => setPaginaLegal('terminos')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Términos y Condiciones</button>
          <button onClick={() => setPaginaLegal('privacidad')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Política de Privacidad</button>
          <button onClick={() => setPaginaLegal('cookies')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Política de Cookies</button>
          <button onClick={() => setPaginaLegal('descargo')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Descargo de Responsabilidad</button>
        </div>
        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Huele Candela. Todos los derechos reservados.</p>
      </footer>

      {/* MODAL PÁGINAS LEGALES */}
      {paginaLegal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setPaginaLegal(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#1a1a1a] border border-gray-700 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl md:text-2xl text-[#e5e5e5] tracking-wide uppercase" style={{ fontFamily: "'Extenda', sans-serif" }}>
                {TEXTOS_LEGALES[paginaLegal].titulo}
              </h3>
              <button onClick={() => setPaginaLegal(null)} className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 ml-4 shrink-0">
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
      )}

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent("¡Hola Huele Candela! Vengo del catálogo web y me gustaría hacer una consulta.")}`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Notificación (Toast) */}
      {notificacion && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#f97316] text-white px-6 py-3 rounded-full shadow-2xl z-[100] text-sm font-bold tracking-wider flex items-center gap-2 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          {notificacion}
        </div>
      )}

      {/* MODAL DE DETALLE DE PRODUCTO */}
      {detalle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setDetalle(null)}></div>
          <div className="relative w-full max-w-3xl bg-[#1f1f1f] border border-gray-700/70 rounded-3xl shadow-2xl animate-fade-in overflow-hidden max-h-[92svh] overflow-y-auto">
            <button onClick={() => setDetalle(null)} className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-[#f97316] bg-black/30 backdrop-blur-sm rounded-full transition-colors">
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
                <h2 className="text-[#e5e5e5] text-4xl md:text-5xl uppercase leading-none tracking-wide mt-2" style={{ fontFamily: "'Extenda', sans-serif" }}>{detalle.nombre}</h2>

                {detalle.descripcion && (
                  <p className="text-gray-400 text-sm leading-relaxed mt-5">{detalle.descripcion}</p>
                )}

                {/* Precios */}
                <div className="mt-6 space-y-3">
                  <div className={`flex items-center justify-between rounded-2xl border px-5 py-3.5 transition-colors ${modoPrecio === 'detal' ? 'border-[#f97316]/60 bg-[#f97316]/5' : 'border-gray-700 bg-[#2a2a2a]/50'}`}>
                    <span className="text-gray-400 text-xs tracking-widest uppercase">Al detal</span>
                    <span className={`font-bold tracking-widest ${modoPrecio === 'detal' ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>{mostrarPrecio(detalle.precioDetal)}</span>
                  </div>
                  <div className={`flex items-center justify-between rounded-2xl border px-5 py-3.5 transition-colors ${modoPrecio === 'mayor' ? 'border-[#f97316]/60 bg-[#f97316]/5' : 'border-gray-700 bg-[#2a2a2a]/50'}`}>
                    <span className="text-gray-400 text-xs tracking-widest uppercase">Al mayor</span>
                    <span className={`font-bold tracking-widest ${modoPrecio === 'mayor' ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>{mostrarPrecio(detalle.precioMayor)}</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => { agregarAlCarrito(detalle); }}
                    className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/20 tracking-wider text-sm"
                  >
                    AÑADIR AL CARRITO
                  </button>
                  <button
                    onClick={() => consultarPorWhatsApp(detalle)}
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
      )}

      {/* PANEL LATERAL DEL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 tracking-wide" style={{ fontFamily: "'Extenda', sans-serif" }}>TU CARRITO</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-[#f97316] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {carrito.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Tu carrito está vacío.</p>
              ) : (
                carrito.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl p-2 flex-shrink-0"><img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" /></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight" style={{ fontFamily: "'Extenda', sans-serif" }}>{item.nombre}</h4>
                      <p className="text-[#f97316] font-bold text-xs md:text-sm mt-1" style={{ fontFamily: "'Aileron', sans-serif" }}>{item.precioAplicado ? `$${item.precioAplicado}` : 'Consultar'}</p>
                      <p className="text-xs text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-400 hover:text-red-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
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
                <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30 tracking-wider text-sm mt-2">FINALIZAR PEDIDO</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE CHECKOUT */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[#1a1a1a] border border-gray-700 rounded-3xl p-8 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-[#e5e5e5] mb-6 tracking-wide" style={{ fontFamily: "'Extenda', sans-serif" }}>DATOS DE ENVÍO</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo *</label>
                <input type="text" required className="w-full bg-[#2a2a2a] text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:border-[#f97316] transition-colors" value={datosCliente.nombre} onChange={(e) => setDatosCliente({...datosCliente, nombre: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Dirección Completa *</label>
                <input type="text" required className="w-full bg-[#2a2a2a] text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:border-[#f97316] transition-colors" value={datosCliente.direccion} onChange={(e) => setDatosCliente({...datosCliente, direccion: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Comentarios (Opcional)</label>
                <textarea className="w-full bg-[#2a2a2a] text-white border border-gray-600 rounded-xl p-3 h-24 focus:outline-none focus:border-[#f97316] transition-colors resize-none placeholder-gray-600 text-sm" placeholder="Ej: Dejar en portería..." value={datosCliente.notas} onChange={(e) => setDatosCliente({...datosCliente, notas: e.target.value})}></textarea>
              </div>
              <div className="pt-4 flex flex-col-reverse md:flex-row gap-3">
                <button type="button" onClick={() => setIsCheckoutOpen(false)} className="w-full md:w-1/3 bg-transparent border border-gray-600 md:border-transparent text-gray-400 hover:text-white font-bold py-3 rounded-xl transition-colors text-sm">CANCELAR</button>
                <button type="submit" className="w-full md:w-2/3 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 text-sm tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  ENVIAR A WHATSAPP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
