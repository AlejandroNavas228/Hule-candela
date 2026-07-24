import { useMemo } from 'react';

// ---- Fondo dinámico: orbes de luz + chispas de candela ----
export function FondoDinamico() {
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
