import { useEffect, useRef } from 'react';

// ---- Imagen decorativa (silueta fantasma con parallax opcional) ----
export function Adorno({ src, className = '', speed = 0 }) {
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
