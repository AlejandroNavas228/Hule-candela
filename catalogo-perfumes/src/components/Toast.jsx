// ---- Notificación (Toast) genérica, ej. "X añadido" ----
export function Toast({ mensaje }) {
  if (!mensaje) return null;
  return (
    <div className="fixed bottom-20 md:bottom-10 left-1/2 transform -translate-x-1/2 bg-[#f97316] text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full shadow-2xl z-[100] text-xs md:text-sm font-bold tracking-wide md:tracking-wider flex items-center gap-2 max-w-[85vw] md:max-w-md animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      <span className="truncate">{mensaje}</span>
    </div>
  );
}
