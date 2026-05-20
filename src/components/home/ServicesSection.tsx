"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = ["concept", "technical", "selection", "coordination"] as const;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t  = useTranslations("services");
  const tp = useTranslations("practice");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-ph]",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo("[data-ph2]",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1.1, delay: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(".pitem",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power2.out",
          scrollTrigger: { trigger: "[data-pgrid]", start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F7F6F4",
        padding: "var(--spacing-section) clamp(1.25rem, 3.2vw, 2.5rem)",
        borderTop: "1px solid #CFCDC9",
      }}
    >
      {/* ── Header: pill + body ── */}
      <div
        data-ph
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "clamp(2rem, 7vw, 9rem)",
          alignItems: "start",
          marginBottom: "clamp(2.5rem, 5vh, 4rem)",
          opacity: 0,
        }}
      >
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#F7F6F4",
          background: "#4D5257",
          padding: "0.45rem 1rem",
          borderRadius: 999,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          <span style={{ color: "#BC7856" }}>●</span> {tp("pill")}
        </span>

        <p style={{
          fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
          fontWeight: 300,
          fontSize: 14,
          lineHeight: 1.75,
          color: "#8B816E",
          maxWidth: "48ch",
          paddingTop: "0.15rem",
        }}>
          {tp("body")}
        </p>
      </div>

      {/* ── Headline ── */}
      <div data-ph2 style={{ marginBottom: "clamp(2.5rem, 5vh, 4rem)", opacity: 0 }}>
        <h2 style={{
          fontFamily: "var(--font-open-sauce-one, sans-serif)",
          fontWeight: 300,
          fontSize: "clamp(38px, 6.2vw, 92px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          color: "#4D5257",
        }}>
          {tp("headline_pre")}{" "}
          <em style={{
            fontFamily: "var(--font-forum, serif)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#8B816E",
          }}>
            {tp("headline_em1")}
          </em>
          <br />
          {tp("headline_mid")}{" "}
          <em style={{
            fontFamily: "var(--font-forum, serif)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#8B816E",
          }}>
            {tp("headline_em2")}
          </em>
        </h2>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "#CFCDC9" }} />

      {/* ── 2×2 grid ── */}
      <div
        data-pgrid
        className="practice-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderLeft: "1px solid #CFCDC9",
        }}
      >
        {SERVICE_KEYS.map((key, i) => (
          <div
            key={key}
            className="pitem"
            style={{
              padding: "clamp(1.75rem, 3.5vw, 2.75rem) clamp(1.25rem, 3vw, 2.5rem)",
              borderRight: "1px solid #CFCDC9",
              borderBottom: "1px solid #CFCDC9",
              opacity: 0,
            }}
          >
            <div style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#BC7856",
              marginBottom: "1.25rem",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{
              fontFamily: "var(--font-open-sauce-one, sans-serif)",
              fontWeight: 300,
              fontSize: "clamp(18px, 2.2vw, 28px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#4D5257",
              marginBottom: "0.9rem",
            }}>
              {t(`items.${key}.title`)}
            </h3>
            <p style={{
              fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.72,
              color: "#8B816E",
            }}>
              {t(`items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .practice-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
