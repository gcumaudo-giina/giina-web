"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: "01",
    first: "Villa",
    last: "Noura",
    meta: "Marbella · 2026",
    slug: "villa-noura",
    tag: "01 / Villa Noura",
    gradient: `
      radial-gradient(45% 35% at 76% 30%, rgba(232,196,148,.55) 0%, transparent 70%),
      radial-gradient(60% 50% at 22% 70%, rgba(120,82,55,.55) 0%, transparent 65%),
      linear-gradient(165deg, #3a322b 0%, #5a4536 45%, #7b5a40 70%, #2a2520 100%)
    `,
  },
  {
    num: "02",
    first: "Villa",
    last: "Chiara",
    meta: "Marbella · 2025",
    slug: "villa-chiara",
    tag: "02 / Villa Chiara",
    gradient: `
      radial-gradient(50% 60% at 60% 40%, rgba(210,185,155,.55) 0%, transparent 70%),
      radial-gradient(40% 50% at 30% 70%, rgba(100,75,50,.45) 0%, transparent 60%),
      linear-gradient(150deg, #2e2a26 0%, #4a3b2e 50%, #6a5040 70%, #252220 100%)
    `,
  },
  {
    num: "03",
    first: "Jardines de",
    last: "Andalucía",
    meta: "Marbella · 2024",
    slug: "jardines-de-andalucia",
    tag: "03 / Jardines de Andalucía",
    gradient: `
      radial-gradient(55% 45% at 40% 30%, rgba(195,170,130,.45) 0%, transparent 65%),
      radial-gradient(65% 55% at 75% 75%, rgba(140,95,60,.50) 0%, transparent 65%),
      linear-gradient(170deg, #3c3428 0%, #564232 45%, #7a5e45 65%, #282420 100%)
    `,
  },
];

export default function ProjectsGrid() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1, ease: "cubic-bezier(0.2,0.8,0.2,1)",
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        }
      );
      // Rows stagger
      gsap.fromTo(".pgrid-row",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "cubic-bezier(0.2,0.8,0.2,1)",
          scrollTrigger: { trigger: listRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ padding: "8rem clamp(1.25rem, 3.2vw, 2.5rem) 6rem", position: "relative" }}
    >
      {/* ── Header ── */}
      <div
        ref={headRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "clamp(1.25rem, 3.2vw, 3rem)",
          alignItems: "end",
          paddingBottom: "2.5rem",
          borderBottom: "1px solid #CFCDC9",
          opacity: 0,
        }}
      >
        <div style={{
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
          color: "#A69885", lineHeight: 1.6,
        }}>
          <span style={{ color: "#BC7856" }}>◆</span> Index — Selected Work · MMXXIV — MMXXVI
        </div>

        <h2 style={{
          fontFamily: "var(--font-open-sauce-one, sans-serif)",
          fontWeight: 200,
          fontSize: "clamp(28px, 3.6vw, 48px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "#4D5257",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          Three spaces.<br />Three{" "}
          <em style={{ fontFamily: "var(--font-forum, serif)", fontStyle: "italic", fontWeight: 400, color: "#8B816E" }}>
            silences.
          </em>
        </h2>

        <div style={{
          textAlign: "right",
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
          color: "#A69885", lineHeight: 1.6,
        }}>
          <span style={{ color: "#4D5257", fontWeight: 400 }}>03</span> Projects · Marbella
        </div>
      </div>

      {/* ── List ── */}
      <div ref={listRef} style={{ position: "relative" }}>

        {/* Preview pane — slides in on hover */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "calc(clamp(1.25rem, 3.2vw, 2.5rem) * -1)",
            width: "50vw",
            maxWidth: 900,
            height: "calc(100% - 3rem)",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.num}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "clamp(1.25rem, 3.2vw, 2.5rem)",
                opacity: activeRow === p.num ? 1 : 0,
                transform: activeRow === p.num ? "none" : "translateX(8%)",
                transition: "opacity .65s cubic-bezier(.2,.8,.2,1), transform .9s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              <div style={{
                width: "100%",
                aspectRatio: "16 / 9",
                maxHeight: "100%",
                background: p.gradient,
                overflow: "hidden",
                position: "relative",
              }}>
                <span style={{
                  position: "absolute",
                  top: "1rem", left: "1rem",
                  fontFamily: "var(--font-ibm-plex-mono, monospace)",
                  fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
                  color: "#F7F6F4",
                  background: "rgba(40,40,40,.55)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 10px",
                  borderRadius: 999,
                  zIndex: 2,
                }}>
                  {p.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rows */}
        {PROJECTS.map((p) => {
          const dimmed = activeRow !== null && activeRow !== p.num;
          const hovered = activeRow === p.num;

          return (
            <Link
              key={p.num}
              href={`/${locale}/projects/${p.slug}`}
              className="pgrid-row"
              onMouseEnter={() => setActiveRow(p.num)}
              onMouseLeave={() => setActiveRow(null)}
              data-cursor-label="Open"
              style={{
                position: "relative",
                zIndex: 2,
                display: "grid",
                gridTemplateColumns: "minmax(120px, auto) auto 1fr minmax(160px, auto) auto",
                alignItems: "baseline",
                gap: "1.5rem",
                padding: "2rem 0",
                borderBottom: "1px solid #CFCDC9",
                textDecoration: "none",
                color: "#4D5257",
                opacity: dimmed ? 0.35 : 1,
                transition: "opacity .55s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
                color: "#4D5257",
                display: "inline-flex", alignItems: "center", gap: 10,
                whiteSpace: "nowrap",
              }}>
                <span style={{
                  color: hovered ? "#BC7856" : "#CFCDC9",
                  fontSize: 10, transition: "color .35s ease", lineHeight: 1,
                }}>◆</span>
                <span style={{
                  display: "inline-block",
                  width: 16, height: 1,
                  background: hovered ? "#BC7856" : "#CFCDC9",
                  transition: "background .35s ease",
                }} />
                N° {p.num}
              </span>

              {/* Title */}
              <span style={{
                fontFamily: "var(--font-open-sauce-one, sans-serif)",
                fontWeight: 200,
                fontSize: "clamp(34px, 4.4vw, 52px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.0,
                color: "#4D5257",
                whiteSpace: "nowrap",
              }}>
                {p.first}{" "}
                <span style={{
                  display: "inline-block",
                  fontFamily: hovered ? "var(--font-forum, serif)" : "var(--font-open-sauce-one, sans-serif)",
                  fontStyle: hovered ? "italic" : "normal",
                  fontWeight: hovered ? 400 : 200,
                  color: hovered ? "#8B816E" : "#4D5257",
                  letterSpacing: hovered ? "-0.005em" : "-0.02em",
                  transition: "color .35s ease",
                }}>
                  {p.last}
                </span>
              </span>

              {/* Dotted spacer */}
              <span
                aria-hidden="true"
                style={{
                  height: "1em",
                  alignSelf: "center",
                  backgroundImage: "radial-gradient(circle, #CFCDC9 1.2px, transparent 1.5px)",
                  backgroundSize: "9px 100%",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0 50%",
                  minWidth: 80,
                  display: "block",
                }}
              />

              {/* Meta */}
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
                color: "#A69885", whiteSpace: "nowrap", textAlign: "right",
              }}>
                {p.meta}
              </span>

              {/* Arrow */}
              <span style={{
                position: "relative",
                display: "inline-block",
                width: hovered ? 52 : 28,
                height: 1,
                background: "#4D5257",
                transition: "width .45s cubic-bezier(.2,.8,.2,1)",
                alignSelf: "center",
                marginLeft: ".5rem",
              }}>
                <span style={{
                  content: "",
                  position: "absolute",
                  right: 0, top: -4,
                  width: 9, height: 9,
                  borderTop: "1px solid #4D5257",
                  borderRight: "1px solid #4D5257",
                  transform: "rotate(45deg)",
                  transformOrigin: "top right",
                  display: "block",
                }} />
              </span>
            </Link>
          );
        })}

        {/* First row top border */}
        <style>{`.pgrid-row:first-of-type { border-top: 1px solid #CFCDC9; }`}</style>
      </div>

      {/* ── Footer row ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "2.5rem",
        fontFamily: "var(--font-ibm-plex-mono, monospace)",
        fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
        color: "#A69885",
      }}>
        <span>
          Press <span style={{ color: "#4D5257" }}>P</span> to view the full archive
        </span>
        <Link
          href={`/${locale}/projects`}
          style={{
            color: "#4D5257",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #4D5257",
            paddingBottom: 6,
          }}
          className="pgrid-full-index"
          data-cursor-label="All"
        >
          The Full Index
          <span style={{
            position: "relative",
            display: "inline-block",
            width: 22, height: 1,
            background: "#4D5257",
            transition: "width .4s ease",
          }}>
            <span style={{
              position: "absolute", right: 0, top: -3,
              width: 7, height: 7,
              borderTop: "1px solid #4D5257",
              borderRight: "1px solid #4D5257",
              transform: "rotate(45deg)",
              display: "block",
            }} />
          </span>
        </Link>
      </div>

      <style>{`
        .pgrid-row { opacity: 0; }
        .pgrid-full-index:hover span { width: 38px; }
      `}</style>
    </section>
  );
}