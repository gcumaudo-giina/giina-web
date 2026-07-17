"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { PROJECTS as ALL_PROJECTS } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

type GridItem = {
  num: string;
  first: string;
  last: string;
  meta: string;
  slug: string;
  tag: string;
  cover: string | null;
};

function toGridItem(p: (typeof ALL_PROJECTS)[0]): GridItem {
  return {
    num:   p.num,
    first: p.titleFirst,
    last:  p.titleLast,
    meta:  p.location + " · " + p.year,
    slug:  p.slug,
    tag:   (p.num + " / " + p.titleFirst + " " + p.titleLast).trim(),
    cover: p.gallery[0]?.src ?? null,
  };
}

const COUNT_WORD: Record<number, string> = {
  1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
  6: "Six", 7: "Seven", 8: "Eight", 9: "Nine",
};

function buildCSS(projects: GridItem[]): string {
  const bigNum = projects
    .map(p =>
      ".pgrid-list:has(.pgrid-row[data-row=\"" + p.num + "\"]:hover) " +
      ".pgrid-bignum[data-for=\"" + p.num + "\"] { opacity: 0.07; }"
    )
    .join("\n        ");

  const pane = projects
    .map(p =>
      ".pgrid-list:has(.pgrid-row[data-row=\"" + p.num + "\"]:hover) " +
      ".pgrid-pane[data-for=\"" + p.num + "\"] { clip-path: inset(0 0% 0 0); }"
    )
    .join("\n        ");

  return [
    ".pgrid-row { opacity: 0; }",
    ".pgrid-row:first-of-type { border-top: 1px solid #CFCDC9; }",

    ".pgrid-bignum {",
    "  position: absolute; left: -0.04em; bottom: 0;",
    "  font-family: var(--font-open-sauce-one, sans-serif);",
    "  font-weight: 300; font-size: clamp(140px, 20vw, 300px);",
    "  line-height: 0.82; letter-spacing: -0.04em;",
    "  color: #BC7856; opacity: 0; pointer-events: none; z-index: 0;",
    "  transition: opacity .55s ease; user-select: none;",
    "}",
    bigNum,

    ".pgrid-preview {",
    "  position: absolute; top: 1.5rem;",
    "  right: calc(clamp(1.25rem, 3.2vw, 2.5rem) * -1);",
    "  width: 55vw; max-width: 1100px; height: calc(100% - 3rem);",
    "  pointer-events: none; z-index: 1; overflow: hidden;",
    "}",

    ".pgrid-pane {",
    "  position: absolute; inset: 0;",
    "  display: flex; align-items: center; justify-content: flex-end;",
    "  padding-right: clamp(1.25rem, 3.2vw, 2.5rem);",
    "  clip-path: inset(0 100% 0 0);",
    "  transition: clip-path .85s cubic-bezier(.2,.8,.2,1);",
    "  will-change: clip-path;",
    "}",
    pane,

    ".pgrid-list:has(.pgrid-row:hover) .pgrid-row:not(:hover) {",
    "  opacity: 0.35 !important;",
    "  transition: opacity .55s cubic-bezier(.2,.8,.2,1);",
    "}",

    ".pgrid-row:hover .pgrid-diamond { color: #BC7856; }",
    ".pgrid-row:hover .pgrid-rule    { background: #BC7856 !important; }",
    ".pgrid-row:hover .pgrid-arrow   { width: 52px !important; transition: width .45s cubic-bezier(.2,.8,.2,1); }",
    ".pgrid-row:hover .pgrid-last {",
    "  font-family: var(--font-forum, serif);",
    "  font-style: italic; font-weight: 400;",
    "  color: #8B816E; letter-spacing: -0.005em;",
    "}",

    "@media (max-width: 700px) {",
    "  .pgrid-preview, .pgrid-bignum { display: none; }",
    "  .pgrid-head {",
    "    grid-template-columns: 1fr !important;",
    "    gap: 1.25rem !important;",
    "    align-items: start !important;",
    "  }",
    "  .pgrid-head h2 {",
    "    text-align: left !important;",
    "    white-space: normal !important;",
    "    font-size: clamp(34px, 10vw, 44px) !important;",
    "  }",
    "  .pgrid-head > div:last-child { text-align: left !important; }",
    "  .pgrid-row {",
    "    grid-template-columns: 1fr auto !important;",
    "    gap: .8rem 1rem !important;",
    "    padding: 1.65rem 0 !important;",
    "  }",
    "  .pgrid-row > span:nth-child(1),",
    "  .pgrid-row > span:nth-child(2),",
    "  .pgrid-row > span:nth-child(4) { grid-column: 1 / -1; }",
    "  .pgrid-row > span:nth-child(2) {",
    "    white-space: normal !important;",
    "    font-size: clamp(34px, 11vw, 48px) !important;",
    "  }",
    "  .pgrid-row > span:nth-child(3) { display: none !important; }",
    "  .pgrid-row > span:nth-child(4) {",
    "    text-align: left !important;",
    "    white-space: normal !important;",
    "    line-height: 1.6 !important;",
    "  }",
    "  .pgrid-row > span:nth-child(5) {",
    "    grid-column: 2;",
    "    grid-row: 2 / 4;",
    "    align-self: center !important;",
    "    justify-self: end !important;",
    "  }",
    "  .pgrid-footer {",
    "    align-items: flex-start !important;",
    "    flex-direction: column !important;",
    "    gap: 1.5rem !important;",
    "  }",
    "}",
  ].join("\n");
}

interface ProjectsGridProps {
  limit?: number;
}

export default function ProjectsGrid({ limit }: ProjectsGridProps = {}) {
  const PROJECTS = (limit ? ALL_PROJECTS.slice(0, limit) : ALL_PROJECTS).map(toGridItem);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const locale     = useLocale();

  const isLimited   = limit !== undefined && limit <= 9;
  const headerLeft  = isLimited ? (COUNT_WORD[limit as number] ?? String(limit)) + " spaces."   : "Selected work.";
  const headerRight = isLimited ? (COUNT_WORD[limit as number] ?? String(limit)) + " silences." : "The full archive.";

  const rightFirst = headerRight.split(" ")[0];
  const rightRest  = headerRight.split(" ").slice(1).join(" ");

  const cssString = buildCSS(PROJECTS);

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
        className="pgrid-head"
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
          <span style={{ color: "#BC7856" }}>◆</span>{" Index — Selected Work · MMXXIV — MMXXVI"}
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
          {headerLeft}<br />
          {rightFirst}{" "}
          <em style={{ fontFamily: "var(--font-forum, serif)", fontStyle: "italic", fontWeight: 400, color: "#8B816E" }}>
            {rightRest}
          </em>
        </h2>

        <div style={{
          textAlign: "right",
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
          color: "#A69885", lineHeight: 1.6,
        }}>
          <span style={{ color: "#4D5257", fontWeight: 400 }}>{String(PROJECTS.length).padStart(2, "0")}</span>
          {" Projects · Marbella"}
        </div>
      </div>

      {/* ── List ── */}
      <div ref={listRef} className="pgrid-list" style={{ position: "relative" }}>

        {/* Big decorative numbers */}
        {PROJECTS.map((p) => (
          <span
            key={"bignum-" + p.num}
            className="pgrid-bignum"
            data-for={p.num}
            aria-hidden="true"
          >
            {p.num}
          </span>
        ))}

        {/* Preview panes */}
        <div className="pgrid-preview" aria-hidden="true">
          {PROJECTS.map((p) => (
            <div key={p.num} className="pgrid-pane" data-for={p.num}>
              <div style={{
                width: "100%", aspectRatio: "16 / 9", maxHeight: "100%",
                background: "#2e2a26", overflow: "hidden", position: "relative",
              }}>
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt={p.first + " " + p.last}
                    fill
                    sizes="55vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
                <span style={{
                  position: "absolute", top: "1rem", left: "1rem",
                  fontFamily: "var(--font-ibm-plex-mono, monospace)",
                  fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
                  color: "#F7F6F4", background: "rgba(40,40,40,.55)",
                  backdropFilter: "blur(8px)", padding: "6px 10px",
                  borderRadius: 999, zIndex: 2,
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
            href={"/" + locale + "/projects/" + p.slug}
            className="pgrid-row"
            data-row={p.num}
            data-cursor-hover="Open"
            style={{
              position: "relative", zIndex: 2,
              display: "grid",
              gridTemplateColumns: "minmax(120px, auto) auto 1fr minmax(160px, auto) auto",
              alignItems: "baseline", gap: "1.5rem",
              padding: "2rem 0", borderBottom: "1px solid #CFCDC9",
              textDecoration: "none", color: "#4D5257",
            }}
          >
            <span style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
              color: "#4D5257", display: "inline-flex", alignItems: "center",
              gap: 10, whiteSpace: "nowrap",
            }}>
              <span className="pgrid-diamond" style={{ fontSize: 10, lineHeight: 1 }}>◆</span>
              <span className="pgrid-rule" style={{ display: "inline-block", width: 16, height: 1, background: "#CFCDC9" }} />
              {"N° " + p.num}
            </span>

            <span style={{
              fontFamily: "var(--font-open-sauce-one, sans-serif)", fontWeight: 200,
              fontSize: "clamp(34px, 4.4vw, 52px)", letterSpacing: "-0.02em",
              lineHeight: 1.0, color: "#4D5257", whiteSpace: "nowrap",
            }}>
              {p.first}{" "}
              <span className="pgrid-last">{p.last}</span>
            </span>

            <span
              aria-hidden="true"
              style={{
                height: "1em", alignSelf: "center",
                backgroundImage: "radial-gradient(circle, #CFCDC9 1.2px, transparent 1.5px)",
                backgroundSize: "9px 100%", backgroundRepeat: "repeat-x",
                backgroundPosition: "0 50%", minWidth: 80, display: "block",
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
              position: "relative", display: "inline-block",
              width: 28, height: 1, background: "#4D5257",
              alignSelf: "center", marginLeft: ".5rem",
            }}>
              <span style={{
                position: "absolute", right: 0, top: -4,
                width: 9, height: 9,
                borderTop: "1px solid #4D5257", borderRight: "1px solid #4D5257",
                transform: "rotate(45deg)", transformOrigin: "top right", display: "block",
              }} />
            </span>
          </Link>
        ))}
      </div>

      {/* ── Footer row ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: "2.5rem",
        fontFamily: "var(--font-ibm-plex-mono, monospace)",
        fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#A69885",
      }}
      className="pgrid-footer"
      >
        <span>{"Press "}<span style={{ color: "#4D5257" }}>P</span>{" to view the full archive"}</span>
        <Link
          href={"/" + locale + "/projects"}
          style={{
            color: "#4D5257", display: "inline-flex", alignItems: "center",
            gap: 12, borderBottom: "1px solid #4D5257", paddingBottom: 6,
          }}
          data-cursor-hover="All"
        >
          {"The Full Index"}
          <span style={{ position: "relative", display: "inline-block", width: 22, height: 1, background: "#4D5257" }}>
            <span style={{
              position: "absolute", right: 0, top: -3, width: 7, height: 7,
              borderTop: "1px solid #4D5257", borderRight: "1px solid #4D5257",
              transform: "rotate(45deg)", display: "block",
            }} />
          </span>
        </Link>
      </div>

      <style>{cssString}</style>
    </section>
  );
}
