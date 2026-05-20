"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef      = useRef<HTMLAnchorElement>(null);
  const topRef       = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);
  const scanRef      = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Scan line — single sweep on load
      gsap.fromTo(scanRef.current,
        { y: "-100%", opacity: 1 },
        { y: "110vh", opacity: 1, duration: 1.6, delay: 0.1, ease: "none" }
      );

      // Top info row
      gsap.fromTo(topRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.3 }
      );

      // GIINA wordmark — rise + fade
      gsap.fromTo(markRef.current,
        { opacity: 0, y: "3%" },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.5, ease: "power3.out" }
      );

      // Bottom row
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.4 }
      );

      // Scroll cue
      gsap.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 2.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        color: "#F7F6F4",
        background: "#4D5257",
      }}
    >
      {/* Ambient gradient background — drifts slowly */}
      <div style={{
        position: "absolute",
        inset: "-10%",
        zIndex: 0,
        background: `
          radial-gradient(60% 80% at 30% 30%, #6a5a48 0%, transparent 60%),
          radial-gradient(80% 60% at 80% 90%, #8b6a4d 0%, transparent 60%),
          radial-gradient(40% 50% at 60% 20%, #b89478 0%, transparent 70%),
          linear-gradient(180deg, #3a3935 0%, #2b2a27 100%)
        `,
        filter: "blur(8px) saturate(1.05)",
        animation: "hero-drift 22s ease-in-out infinite alternate",
      }} />

      {/* Scan line — one-shot on load */}
      <div
        ref={scanRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0, right: 0,
          height: 1,
          background: "#F7F6F4",
          opacity: 0,
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      <video
        autoPlay muted loop playsInline
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          zIndex: 1,
          opacity: 0.75,
        }}
      >
        <source src="/videos/hero-cut.mp4" type="video/mp4" />
      </video>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: `
          linear-gradient(180deg, rgba(40,40,40,0) 40%, rgba(20,20,20,.55) 100%),
          linear-gradient(180deg, rgba(20,20,20,.35) 0%, rgba(20,20,20,0) 25%)
        `,
      }} />

      {/* Content grid */}
      <div style={{
        position: "relative", zIndex: 3,
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "clamp(6.5rem, 13vh, 8rem) clamp(1.25rem, 3.2vw, 2.5rem) clamp(2.5rem, 6vh, 4rem)",
      }}>

        {/* Top row */}
        <div
          ref={topRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "start",
            color: "rgba(247,246,244,.72)",
            opacity: 0,
          }}
        >
          <div style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase" }}>
            <span style={{ color: "#F7F6F4" }}>01</span> / 03 — Reel · MMXXVI
          </div>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", textAlign: "right" }}>
            36°30′N · 04°53′W <span style={{ color: "#BC7856" }}>◆</span>
          </div>
        </div>

        {/* Center — GIINA wordmark image */}
        <div style={{ alignSelf: "center", display: "flex", justifyContent: "center" }}>
          <a
            ref={markRef}
            href="#projects"
            aria-label="GIINA — The Design Atelier"
            data-cursor-hover="Explore"
            style={{
              display: "block",
              width: "min(48vw, 56vh, 680px)",
              maxWidth: "88%",
              opacity: 0,
            }}
          >
            <Image
              src="/brand/giina-mark-white.png"
              alt="GIINA"
              width={680}
              height={680}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </a>
        </div>

        {/* Bottom row */}
        <div
          ref={bottomRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "end",
            color: "rgba(247,246,244,.65)",
            opacity: 0,
          }}
        >
          <div style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase" }}>
            Making Design{" "}
            <em style={{ fontFamily: "var(--font-forum, serif)", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>
              Transcendent.
            </em>
          </div>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", textAlign: "right", lineHeight: 1.7 }}>
            Film · Casa Aurora<br />
            <span style={{ color: "rgba(247,246,244,.4)" }}>Marbella · 04:32</span>
          </div>
        </div>
      </div>

      {/* Scroll cue — absolute bottom center */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          left: "50%", bottom: "1.25rem",
          transform: "translateX(-50%)",
          zIndex: 4,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 9,
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: "rgba(247,246,244,.7)",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <span>Scroll</span>
        <span style={{
          width: 1, height: 36,
          background: "linear-gradient(180deg, transparent 0%, #F7F6F4 100%)",
          position: "relative", overflow: "hidden", display: "block",
        }}>
          <span style={{
            position: "absolute", left: 0, right: 0, top: "-30%",
            height: "30%", background: "#BC7856", display: "block",
            animation: "cue-run 2.4s ease-in-out infinite",
          }} />
        </span>
        <span>To Begin</span>
      </div>
    </section>
  );
}