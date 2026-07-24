// ---- FOOTER ----
export function Footer({ onAbrirNosotros, onAbrirLegal }) {
  return (
    <footer className="mt-auto border-t border-gray-800 pt-10 pb-6 flex flex-col items-center justify-center w-full bg-[#111]">
      <h4 className="text-[#e5e5e5] text-2xl tracking-widest mb-6 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>HUELE CANDELA</h4>
      <div className="flex gap-6 mb-8">
        <a href="https://www.instagram.com/huelecandela?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        </a>
        <a href="https://www.tiktok.com/@huelecandela?_r=1&_t=ZS-97nDLwwixtM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.16-3.44-3.35-3.46-5.7-.02-2.14.93-4.18 2.59-5.46 1.49-1.14 3.42-1.57 5.23-1.19.16.03.32.08.47.14v4.11c-.42-.14-.87-.2-1.31-.17-1.14.04-2.22.61-2.92 1.52-.78 1.05-.98 2.47-.53 3.69.44 1.16 1.51 2 2.75 2.22 1.25.21 2.55-.13 3.43-1.03.95-.94 1.41-2.3 1.39-3.64V0h4.21z" /></svg>
        </a>
      </div>
      <button
        onClick={onAbrirNosotros}
        className="text-[#e5e5e5] hover:text-[#f97316] text-base tracking-[0.2em] uppercase font-bold transition-colors duration-300 mb-5"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Quiénes Somos
      </button>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4 px-6">
        <button onClick={() => onAbrirLegal('terminos')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Términos y Condiciones</button>
        <button onClick={() => onAbrirLegal('privacidad')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Política de Privacidad</button>
        <button onClick={() => onAbrirLegal('cookies')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Política de Cookies</button>
        <button onClick={() => onAbrirLegal('descargo')} className="text-gray-500 hover:text-[#f97316] text-xs tracking-wide transition-colors duration-300">Descargo de Responsabilidad</button>
      </div>
      <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Huele Candela. Todos los derechos reservados.</p>
    </footer>
  );
}
