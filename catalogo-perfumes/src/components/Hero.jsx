import { Adorno } from './Adorno';

// ---- 1. HERO A PANTALLA COMPLETA ----
export function Hero() {
  return (
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
          className="font-light italic text-white/80 text-xs md:text-base leading-snug tracking-wide text-center -mt-16 md:-mt-35 max-w-[15rem] md:max-w-sm opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationDuration: '1.2s', animationFillMode: 'forwards', fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          Con un buen perfume<br />
          se alegra el corazón;<br />
          con la dulzura de la amistad<br />
          se vuelve a la vida.
        </p>

        <p className="text-gray-400 text-xs md:text-sm tracking-[0.35em] uppercase mt-4 md:mt-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.6s', animationDuration: '1s', animationFillMode: 'forwards' }}>
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
  );
}
