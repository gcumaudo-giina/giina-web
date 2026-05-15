"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { text: "A space that",        em: "listens."           },
  { text: "Materials before",    em: "moments."           },
  { text: "Light is the first",  em: "finish."            },
  { text: "Restraint, the loudest", em: "gesture."        },
];

export default function StudioChapter() {
  const sectionRef     = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const lineRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          // Activate lines progressively
          lineRefs.current.forEach((line, i) => {
            if (!line) return;
            const threshold = i / LINES.length;
            line.classList.toggle("is-active", p >= threshold);
          });

          // Fill progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleY(${p})`;
          }

          // Update counter
          if (counterRef.current) {
            const active = Math.min(Math.floor(p * LINES.length) + 1, LINES.length);
            counterRef.current.textContent = `0${active} / 0${LINES.length}`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Tall section — scroll drives the sticky inner */
    <section
      ref={sectionRef}
      style={{ position: "relative", minHeight: "260vh", padding: "0 clamp(1.25rem, 3.2vw, 2.5rem)" }}
    >
      {/* Top rule */}
      <div style={{ position: "absolute", top: 0, left: "clamp(1.25rem, 3.2vw, 2.5rem)", right: "clamp(1.25rem, 3.2vw, 2.5rem)", height: 1, background: "#CFCDC9" }} />

      {/* Sticky viewport-height inner */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "minmax(200px, 1.6fr) minmax(0, 5fr) minmax(40px, 0.5fr)",
        gap: "clamp(1.25rem, 3.2vw, 3rem)",
        alignItems: "stretch",
        padding: "4rem 0",
      }}>

        {/* Left column — metadata + aside */}
        <aside style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}>
          <div style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#A69885",
            display: "flex", flexDirection: "column", gap: ".3rem",
          }}>
            <span><span style={{ color: "#BC7856" }}>◆</span> Chapter I</span>
            <span>The Philosophy</span>
            <span ref={counterRef} style={{ color: "#4D5257" }}>01 / 04</span>
          </div>

          {/* Aside note */}
          <div style={{
            maxWidth: "26ch",
            fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
            fontWeight: 300,
            fontSize: 12,
            lineHeight: 1.65,
            color: "#8B816E",
            paddingTop: ".6rem",
            borderTop: "1px solid #CFCDC9",
            position: "relative",
            marginTop: "auto",
          }}
          className="accent-bar"
          >
            <span style={{
              display: "block",
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#A69885",
              marginBottom: ".6rem",
            }}>
              Note · 01
            </span>
            We believe an interior is not decorated — it is composed. Each measure, each material, each shadow chosen for the way it lets a space breathe.
          </div>

          <div style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#A69885",
            display: "flex", flexDirection: "column", gap: ".4rem",
          }}>
            <span>By Gina Marchiori</span>
            <span>Director · Founder</span>
          </div>
        </aside>

        {/* Center — animated chapter lines */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {LINES.map((line, i) => (
              <div
                key={i}
                ref={(el) => { lineRefs.current[i] = el; }}
                className={`chapter-line${i === 0 ? " is-active" : ""}`}
                style={{
                  fontFamily: "var(--font-open-sauce-one, sans-serif)",
                  fontWeight: 200,
                  fontSize: "clamp(40px, 7vw, 104px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                }}
              >
                {line.text} <em>{line.em}</em>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — thin progress bar */}
        <aside
          aria-hidden="true"
          style={{
            position: "relative",
            width: 1,
            background: "#CFCDC9",
            height: "100%",
            marginLeft: "auto",
          }}
        >
          <span
            ref={progressBarRef}
            style={{
              position: "absolute", left: 0, right: 0, top: 0,
              height: "100%",
              background: "#4D5257",
              transformOrigin: "top",
              transform: "scaleY(0)",
              display: "block",
            }}
          />
        </aside>
      </div>
    </section>
  );
}