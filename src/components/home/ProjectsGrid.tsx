"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
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
    cover: "/projects/villa-noura/md/160.webp",
  },
  {
    num: "02",
    first: "Villa",
    last: "Chiara",
    meta: "Marbella · 2025",
    slug: "villa-chiara",
    tag: "02 / Villa Chiara",
    cover: "/projects/villa-chiara/md/A7V06013.webp",
  },
  {
    num: "03",
    first: "Jardines de",
    last: "Andalucía",
    meta: "Marbella · 2024",
    slug: "jardines-de-andalucia",
    tag: "03 / Jardines de Andalucía",
    cover: null,
  },
];

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const locale     = useLocale();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1, ease: "cubic-bezier(0.2,0.8,0.2,1)",
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        }
      );
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
      <div ref={listRef} className="pgrid-list" style={{ position: "relative" }}>

        {/* Big decorative number — appears behind rows on hover */}
        {PROJECTS.map((p) => (
          <span
            key={`bignum-${p.num}`}
            className="pgrid-bignum"
            data-for={p.num}
            aria-hidden="true"
          >
            {p.num}
          </span>
        ))}

        {/* Preview pane — CSS :has() controls visibility via clip-path */}
        <div className="pgrid-preview" aria-hidden="true">
          {PROJECTS.map((p) => (
            <div key={p.num} className={`pgrid-pane`} data-for={p.num}>
              <div style={{
                width: "100%",
                aspectRatio: "16 / 9",
                maxHeight: "100%",
                background: "#2e2a26",
                overflow: "hidden",
                position: "relative",
              }}>
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt={`${p.first} ${p.last}`}
                    fill
                    sizes="55vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
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
        {PROJECTS.map((p) => (
          <Link
            key={p.num}
            href={`/${locale}/projects/${p.slug}`}
            className="pgrid-row"
            data-row={p.num}
            data-cursor-hover="Open"
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
            }}
          >
            <span style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
              color: "#4D5257",
              display: "inline-flex", alignItems: "center", gap: 10,
              whiteSpace: "nowrap",
            }}>
              <span className="pgrid-diamond" style={{ fontSize: 10, lineHeight: 1 }}>◆</span>
              <span className="pgrid-rule" style={{ display: "inline-block", width: 16, height: 1, background: "#CFCDC9" }} />
              N° {p.num}
            </span>

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
              <span className="pgrid-last">{p.last}</span>
            </span>

            <span
              aria-hidden="true"
              style={{
                height: "1em", alignSelf: "center",
                backgroundImage: "radial-gradient(circle, #CFCDC9 1.2px, transparent 1.5px)",
                backgroundSize: "9px 100%",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0 50%",
                minWidth: 80,
                display: "block",
              }}
            />

            <span style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
              color: "#A69885", whiteSpace: "nowrap", textAlign: "right",
            }}>
              {p.meta}
            </span>

            <span className="pgrid-arrow" style={{
              position: "relative",
              display: "inline-block",
              width: 28, height: 1,
              background: "#4D5257",
              alignSelf: "center",
              marginLeft: ".5rem",
            }}>
              <span style={{
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
        ))}
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
        <span>Press <span style={{ color: "#4D5257" }}>P</span> to view the full archive</span>
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
          data-cursor-hover="All"
        >
          The Full Index
          <span style={{
            position: "relative",
            display: "inline-block",
            width: 22, height: 1,
            background: "#4D5257",
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
        /* Initial state — rows hidden until GSAP reveal */
        .pgrid-row { opacity: 0; }
        .pgrid-row:first-of-type { border-top: 1px solid #CFCDC9; }

        /* Big decorative number — background on hover */
        .pgrid-bignum {
          position: absolute;
          left: -0.04em;
          bottom: 0;
          font-family: var(--font-open-sauce-one, sans-serif);
          font-weight: 300;
          font-size: clamp(140px, 20vw, 300px);
          line-height: 0.82;
          letter-spacing: -0.04em;
          color: #BC7856;
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          transition: opacity .55s ease;
          user-select: none;
        }
        .pgrid-list:has(.pgrid-row[data-row="01"]:hover) .pgrid-bignum[data-for="01"],
        .pgrid-list:has(.pgrid-row[data-row="02"]:hover) .pgrid-bignum[data-for="02"],
        .pgrid-list:has(.pgrid-row[data-row="03"]:hover) .pgrid-bignum[data-for="03"] {
          opacity: 0.07;
        }

        /* Preview container */
        .pgrid-preview {
          position: absolute;
          top: 1.5rem;
          right: calc(clamp(1.25rem, 3.2vw, 2.5rem) * -1);
          width: 55vw;
          max-width: 1100px;
          height: calc(100% - 3rem);
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        /* Each pane: hidden via clip-path (left-to-right reveal) */
        .pgrid-pane {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: clamp(1.25rem, 3.2vw, 2.5rem);
          clip-path: inset(0 100% 0 0);
          transition: clip-path .85s cubic-bezier(.2,.8,.2,1);
          will-change: clip-path;
        }

        /* CSS :has() — reveal matching pane on row hover */
        .pgrid-list:has(.pgrid-row[data-row="01"]:hover) .pgrid-pane[data-for="01"],
        .pgrid-list:has(.pgrid-row[data-row="02"]:hover) .pgrid-pane[data-for="02"],
        .pgrid-list:has(.pgrid-row[data-row="03"]:hover) .pgrid-pane[data-for="03"] {
          clip-path: inset(0 0% 0 0);
        }

        /* Dim other rows when any is hovered */
        .pgrid-list:has(.pgrid-row:hover) .pgrid-row:not(:hover) {
          opacity: 0.35 !important;
          transition: opacity .55s cubic-bezier(.2,.8,.2,1);
        }

        /* Hover accents on the hovered row */
        .pgrid-row:hover .pgrid-diamond { color: #BC7856; }
        .pgrid-row:hover .pgrid-rule    { background: #BC7856 !important; }
        .pgrid-row:hover .pgrid-arrow   { width: 52px !important; transition: width .45s cubic-bezier(.2,.8,.2,1); }
        .pgrid-row:hover .pgrid-last {
          font-family: var(--font-forum, serif);
          font-style: italic;
          font-weight: 400;
          color: #8B816E;
          letter-spacing: -0.005em;
        }
      `}</style>
    </section>
  );
}
