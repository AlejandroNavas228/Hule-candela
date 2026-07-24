// ---- Animaciones y estilos globales de la página (orbes, chispas, transiciones) ----
export function GlobalStyles() {
  return (
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
  );
}
