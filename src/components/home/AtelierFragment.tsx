"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AtelierFragment() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Images: clip-path curtain up, staggered
      gsap.fromTo(
        "[data-frag-img]",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.18,
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );

      // SVGs: fade + float up
      gsap.fromTo(
        "[data-frag-svg]",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Word: reveal left to right
      gsap.fromTo(
        "[data-frag-word]",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          delay: 0.55,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      // Parallax — images drift at different rates
      gsap.to("[data-frag-img-a]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to("[data-frag-img-b]", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        height:     "100vh",
        background: "#F7F6F4",
        overflow:   "hidden",
      }}
    >
      {/* ── Micro-label ─────────────────────────────────────────── */}
      <span style={{
        position:      "absolute",
        top:           "3.5vh",
        right:         "4vw",
        fontFamily:    "var(--font-mono, monospace)",
        fontSize:      "9px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color:         "rgba(77,82,87,0.30)",
        zIndex:        10,
      }}>
        Fragment · I
      </span>

      {/* ── IMAGE A — left portrait ──────────────────────────────── */}
      <div
        data-frag-img
        data-frag-img-a
        style={{
          position: "absolute",
          left:     "4vw",
          top:      "8vh",
          width:    "28vw",
          height:   "58vh",
          overflow: "hidden",
        }}
      >
        <Image
          src="/projects/villa-chiara/md/A7V06016.webp"
          alt="Atelier — light and stone"
          fill
          sizes="28vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* ── SVG-1 — Floor plan fragment ──────────────────────────── */}
      <svg
        data-frag-svg
        viewBox="0 0 220 180"
        fill="none"
        stroke="#4D5257"
        strokeWidth="0.6"
        style={{
          position: "absolute",
          left:     "32vw",
          top:      "12vh",
          width:    "22vw",
          height:   "22vh",
          opacity:  0.35,
        }}
        aria-hidden="true"
      >
        {/* L-shaped room perimeter */}
        <path d="M 20 20 L 200 20 L 200 120 L 140 120 L 140 160 L 20 160 Z" />
        {/* Interior wall */}
        <line x1="80" y1="20" x2="80" y2="90" />
        <line x1="80" y1="90" x2="140" y2="90" />
        {/* Door arc */}
        <path d="M 80 90 Q 65 75 50 90" />
        {/* Window ticks on top wall */}
        <line x1="110" y1="20" x2="110" y2="16" />
        <line x1="130" y1="20" x2="130" y2="16" />
        <line x1="150" y1="20" x2="150" y2="16" />
        {/* Dimension marks */}
        <line x1="20" y1="165" x2="20" y2="170" />
        <line x1="200" y1="165" x2="200" y2="170" />
        <line x1="20" y1="167" x2="200" y2="167" />
      </svg>

      {/* ── Editorial word ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left:     "33vw",
          top:      "16vh",
          zIndex:   5,
        }}
      >
        <span
          data-frag-word
          style={{
            display:      "block",
            fontFamily:   "var(--font-editorial, serif)",
            fontStyle:    "italic",
            fontWeight:   400,
            fontSize:     "clamp(11px, 1.1vw, 15px)",
            letterSpacing:"0.08em",
            color:        "#8B816E",
          }}
        >
          Atmosphère
        </span>
        <span style={{
          display:    "block",
          width:      "32px",
          height:     "1px",
          background: "#BC7856",
          marginTop:  "6px",
        }} />
      </div>

      {/* ── IMAGE B — central landscape ──────────────────────────── */}
      <div
        data-frag-img
        data-frag-img-b
        style={{
          position: "absolute",
          left:     "36vw",
          top:      "34vh",
          width:    "38vw",
          height:   "48vh",
          overflow: "hidden",
        }}
      >
        <Image
          src="/projects/epure/p09.jpg"
          alt="Atelier — space and proportion"
          fill
          sizes="38vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* ── IMAGE C — right sliver ───────────────────────────────── */}
      <div
        data-frag-img
        style={{
          position: "absolute",
          left:     "76vw",
          top:      "6vh",
          width:    "20vw",
          height:   "38vh",
          overflow: "hidden",
        }}
        className="frag-img-c"
      >
        <Image
          src="/projects/villa-omoi/p04.jpg"
          alt="Atelier — material and silence"
          fill
          sizes="20vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* ── SVG-2 — Organic blob ─────────────────────────────────── */}
      <svg
        data-frag-svg
        viewBox="0 0 180 220"
        fill="none"
        stroke="#BC7856"
        strokeWidth="0.8"
        style={{
          position: "absolute",
          left:     "68vw",
          top:      "52vh",
          width:    "18vw",
          height:   "28vh",
          opacity:  0.4,
        }}
        aria-hidden="true"
      >
        <path d="M 90 18 C 140 10 168 45 162 85 C 158 118 170 145 148 168 C 128 192 95 210 65 198 C 38 186 18 158 22 128 C 26 98 12 60 35 40 C 52 22 72 24 90 18 Z" />
      </svg>

      {/* ── Mobile layout override ───────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .frag-img-c { display: none !important; }
        }
      `}</style>
    </section>
  );
}
