"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTE_WORDS = ["Space", "is", "the", "argument", "\u00a0", "between", "light", "and", "material."];

export default function MaterialEcho() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale     = useLocale();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // IMAGE A — curtain from bottom
      gsap.fromTo("[data-echo-img-a]",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      // IMAGE B — curtain from right + x drift
      gsap.fromTo("[data-echo-img-b]",
        { clipPath: "inset(0 100% 0 0)", x: -20 },
        {
          clipPath: "inset(0 0% 0 0)",
          x: 0,
          duration: 1.1,
          delay: 0.35,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      // IMAGE C — curtain from top
      gsap.fromTo("[data-echo-img-c]",
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1.3,
          delay: 0.6,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 60%" },
        }
      );

      // SVG-3 paths — draw-in via strokeDashoffset
      const svg3Paths = section.querySelectorAll<SVGPathElement | SVGLineElement>("[data-echo-svg3] [data-draw]");
      svg3Paths.forEach((path) => {
        const len = (path as SVGGeometryElement).getTotalLength?.() ?? 120;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: section, start: "top 65%" },
          stagger: 0.12,
        });
      });

      // SVG-4 texture — gentle fade
      gsap.fromTo("[data-echo-svg4]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2.0,
          delay: 0.8,
          ease: "power1.inOut",
          scrollTrigger: { trigger: section, start: "top 60%" },
        }
      );

      // Quote words stagger
      gsap.fromTo("[data-echo-word]",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: { trigger: "[data-echo-quote]", start: "top 72%" },
        }
      );

      // Parallax — differential drift
      gsap.to("[data-echo-img-a]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to("[data-echo-img-c]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background:  "#2b2926",
        minHeight:   "140vh",
        overflow:    "hidden",
        position:    "relative",
        display:     "grid",
        gridTemplateColumns: "var(--col-edge, 5vw) 1fr 1fr var(--col-edge, 5vw)",
        gridTemplateRows:    "12vh auto auto 10vh",
      }}
    >
      {/* ── Row 1: micro-label ──────────────────────────────────── */}
      <div style={{
        gridColumn:    "2 / 3",
        gridRow:       "1",
        display:       "flex",
        alignItems:    "flex-end",
        paddingBottom: "1.5rem",
      }}>
        <span style={{
          fontFamily:    "var(--font-mono, monospace)",
          fontSize:      "9px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color:         "#BC7856",
        }}>
          Matière · Lumière
        </span>
      </div>

      {/* ── Row 2 col 2: IMAGE A + SVG-3 ────────────────────────── */}
      <div style={{
        gridColumn: "2 / 3",
        gridRow:    "2",
        position:   "relative",
        height:     "60vh",
      }}>
        <div
          data-echo-img-a
          style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        >
          <Image
            src="/projects/villa-chiara/md/A7V06023.webp"
            alt="Material — texture and light"
            fill
            sizes="45vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* SVG-3 — constructive section, overlaid bottom-right */}
        <svg
          data-echo-svg3
          viewBox="0 0 160 120"
          fill="none"
          stroke="rgba(188,120,86,0.55)"
          strokeWidth="0.7"
          style={{
            position: "absolute",
            bottom:   "-4vh",
            right:    "-3vw",
            width:    "min(18vw, 240px)",
            zIndex:   5,
          }}
          aria-hidden="true"
        >
          <line data-draw x1="0" y1="100" x2="160" y2="100" />
          <path data-draw d="M 40 100 L 40 20 L 120 20 L 120 100" />
          <line data-draw x1="30" y1="20" x2="130" y2="20" />
          <line data-draw x1="30" y1="14" x2="130" y2="14" />
          <line data-draw x1="50" y1="14" x2="50" y2="20" />
          <line data-draw x1="70" y1="14" x2="70" y2="20" />
          <line data-draw x1="90" y1="14" x2="90" y2="20" />
          <line data-draw x1="110" y1="14" x2="110" y2="20" />
          <line data-draw x1="0" y1="105" x2="160" y2="105" />
          <line data-draw x1="25" y1="20" x2="25" y2="100" />
          <line data-draw x1="22" y1="20" x2="28" y2="20" />
          <line data-draw x1="22" y1="100" x2="28" y2="100" />
        </svg>
      </div>

      {/* ── Row 2 col 3: IMAGE B + SVG-4 ────────────────────────── */}
      <div style={{
        gridColumn:    "3 / 4",
        gridRow:       "2",
        display:       "flex",
        flexDirection: "column",
        gap:           "0",
        paddingLeft:   "4px",
      }}>
        <div
          data-echo-img-b
          style={{
            position: "relative",
            width:    "55%",
            height:   "38vh",
            marginLeft: "auto",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src="/projects/jardines-de-andalucia/p20.jpg"
            alt="Material — garden and shadow"
            fill
            sizes="25vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* SVG-4 — weave texture */}
        <svg
          data-echo-svg4
          viewBox="0 0 200 140"
          fill="none"
          stroke="rgba(166,152,133,0.25)"
          strokeWidth="0.5"
          style={{ width: "100%", height: "18vh", flexShrink: 0 }}
          aria-hidden="true"
        >
          {[14, 30, 46, 62, 78, 94, 110, 126].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} />
          ))}
          {[10, 28, 46, 64, 82, 100, 118, 136, 154, 172, 190].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="140" />
          ))}
          <line x1="0" y1="0" x2="200" y2="140" />
          <line x1="200" y1="0" x2="0" y2="140" />
        </svg>
      </div>

      {/* ── Row 3 col 2-3: Quote ─────────────────────────────────── */}
      <div
        data-echo-quote
        style={{
          gridColumn:  "2 / 4",
          gridRow:     "3",
          display:     "flex",
          alignItems:  "flex-end",
          paddingBottom: "clamp(4rem, 7vh, 6rem)",
          paddingTop:  "clamp(3rem, 5vh, 4rem)",
          position:    "relative",
        }}
      >
        <div>
          <p style={{
            fontFamily:  "var(--font-editorial, serif)",
            fontStyle:   "italic",
            fontWeight:  400,
            fontSize:    "clamp(26px, 3.8vw, 52px)",
            lineHeight:  1.3,
            color:       "#F7F6F4",
            margin:      0,
          }}>
            {["Space is the argument", "between light and material."].map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    data-echo-word
                    style={{ display: "inline-block", marginRight: "0.3em" }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <span style={{
            display:    "block",
            width:      "32px",
            height:     "1px",
            background: "#BC7856",
            marginTop:  "1.5rem",
          }} />
        </div>

        {/* IMAGE C — thin vertical strip, absolute right */}
        <div
          data-echo-img-c
          style={{
            position: "absolute",
            right:    0,
            top:      "-56vh",
            width:    "14vw",
            height:   "56vh",
            overflow: "hidden",
          }}
        >
          <Image
            src="/projects/epure/p17.jpg"
            alt="Material — restraint"
            fill
            sizes="14vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ── Row 4: Work link ─────────────────────────────────────── */}
      <div style={{
        gridColumn: "1 / 5",
        gridRow:    "4",
        position:   "relative",
      }}>
        <Link
          href={`/${locale}/projects`}
          style={{
            position:      "absolute",
            bottom:        "2.5rem",
            right:         "var(--col-edge, 5vw)",
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "#A69885",
            textDecoration:"none",
          }}
          data-cursor-hover="projects"
        >
          Work ↗
        </Link>
      </div>
    </section>
  );
}
