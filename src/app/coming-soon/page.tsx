import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giina Design — Coming Soon",
  description:
    "Estudio de diseño de interiores de lujo. Próximamente en giinadesign.com — Mijas, España.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://giinadesign.com" },
  openGraph: {
    title: "Giina Design — Coming Soon",
    description:
      "Estudio de diseño de interiores de lujo. Próximamente — Mijas, España.",
    url: "https://giinadesign.com",
    type: "website",
  },
};

export default function ComingSoonPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --white-warm: #f5f0eb;
          --white-mid:  rgba(245, 240, 235, 0.55);
          --white-dim:  rgba(245, 240, 235, 0.35);
        }

        html, body {
          width: 100%; height: 100%;
          overflow: hidden;
          background: #080808;
        }

        .video-bg { position: fixed; inset: 0; z-index: 0; }
        .video-bg video {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Sirve el video según orientación de pantalla */
        .video-horizontal { display: block; }
        .video-vertical   { display: none;  }

        @media (orientation: portrait) {
          .video-horizontal { display: none;  }
          .video-vertical   { display: block; }
        }

        .overlay-dark {
          position: fixed; inset: 0; z-index: 1;
          background: rgba(0, 0, 0, 0.48);
        }
        .overlay-scanlines {
          position: fixed; inset: 0; z-index: 2;
          background: repeating-linear-gradient(
            to bottom,
            transparent, transparent 2px,
            rgba(0,0,0,0.045) 2px, rgba(0,0,0,0.045) 4px
          );
          pointer-events: none;
        }

        .cs-content {
          position: fixed; inset: 0; z-index: 3;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 3rem 2rem;
        }

        .cs-logo {
          width: 72px;
          opacity: 0; transform: translateY(-14px);
          animation: cs-fadeUp 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          animation-delay: 0.5s;
          margin-bottom: 2.8rem;
        }

        .cs-line {
          width: 0; height: 1px;
          background: var(--white-dim);
          animation: cs-expandLine 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          animation-delay: 1.4s;
          margin-bottom: 2.8rem;
        }

        .cs-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(26px, 4.5vw, 50px);
          color: var(--white-warm);
          letter-spacing: 0.38em; text-indent: 0.38em;
          text-transform: uppercase;
          opacity: 0;
          animation: cs-fadeIn 1s ease forwards;
          animation-delay: 2.3s;
          margin-bottom: 1.6rem;
          text-align: center;
        }

        .cs-tagline {
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          font-size: clamp(9px, 1.1vw, 12px);
          color: var(--white-mid);
          letter-spacing: 0.22em; text-indent: 0.22em;
          text-transform: uppercase;
          opacity: 0;
          animation: cs-fadeIn 0.9s ease forwards;
          animation-delay: 3.1s;
          text-align: center;
        }

        .cs-bottom {
          position: fixed;
          bottom: 2.4rem; left: 2.4rem; right: 2.4rem;
          z-index: 3;
          display: flex; justify-content: space-between; align-items: flex-end;
          opacity: 0;
          animation: cs-fadeIn 0.9s ease forwards;
          animation-delay: 3.7s;
        }

        .cs-meta {
          font-family: 'DM Mono', monospace;
          font-weight: 400; font-size: 9.5px;
          color: rgba(245,240,235,0.38);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          line-height: 1.8;
        }

        .cs-instagram {
          display: flex; align-items: center; gap: 9px;
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; font-weight: 400;
          color: rgba(245,240,235,0.5);
          letter-spacing: 0.16em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.4s ease;
        }
        .cs-instagram:hover { color: var(--white-warm); }
        .cs-instagram svg { width: 15px; height: 15px; flex-shrink: 0; opacity: 0.55; transition: opacity 0.4s ease; }
        .cs-instagram:hover svg { opacity: 1; }

        @keyframes cs-fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes cs-fadeIn { to { opacity: 1; } }
        @keyframes cs-expandLine { to { width: 100px; } }

        @media (max-width: 640px) {
          .cs-logo { width: 56px; margin-bottom: 2.2rem; }
          .cs-title { letter-spacing: 0.25em; text-indent: 0.25em; }
          .cs-meta { display: none; }
          .cs-bottom { justify-content: center; }
          @keyframes cs-expandLine { to { width: 70px; } }
        }
      `}</style>

      {/* Video landscape — se oculta en portrait */}
      <div className="video-bg">
        <video
          className="video-horizontal"
          autoPlay muted loop playsInline preload="auto"
        >
          <source src="/videos/holder-horizontal.mp4" type="video/mp4" />
        </video>

        {/* Video portrait — se oculta en landscape */}
        <video
          className="video-vertical"
          autoPlay muted loop playsInline preload="none"
        >
          <source src="/videos/holder-vertical.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="overlay-dark" />
      <div className="overlay-scanlines" />

      <main className="cs-content" role="main">
        <img
          className="cs-logo"
          src="/brand/giina-mark-white.png"
          alt="Giina Design"
          width={72}
          height={72}
        />
        <div className="cs-line" role="presentation" />
        <h1 className="cs-title">Coming Soon</h1>
        <p className="cs-tagline">Making Design Transcendent</p>
      </main>

      <footer className="cs-bottom">
        <div className="cs-meta">
          Mijas, España<br />
          2026
        </div>
        <a
          className="cs-instagram"
          href="https://instagram.com/giinadesign"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Seguir a Giina Design en Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          @giinadesign
        </a>
      </footer>
    </>
  );
}
