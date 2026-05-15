"use client";

import { useEffect, useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getProject, getNextProject } from "@/lib/projects";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale   = useLocale();
  const project  = getProject(slug);
  const next     = getNextProject(slug);

  if (!project) return notFound();

  return (
    <main>
      <S1Hero project={project} />
      <S2Specs project={project} />
      <S3Gallery project={project} />
      {next && <S4NextProject next={next} locale={locale} />}
    </main>
  );
}

/* ─── S1 — Pinned scroll hero ─────────────────────────────────────────── */
function S1Hero({ project }: { project: ReturnType<typeof getProject> & {} }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const barRef      = useRef<HTMLSpanElement>(null);
  const numRef      = useRef<HTMLSpanElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const bar     = barRef.current;
    const num     = numRef.current;
    if (!section) return;

    const update = () => {
      const r = section.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (num) num.textContent = String(Math.round(p * 100)).padStart(2, "0") + " %";
      setRevealed(p >= 0.28);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", height: "300vh" }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: "#2b2926",
      }}>
        {/* Gradient placeholder (replaced by real image/video later) */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: project.gradient,
          filter: "saturate(.95) contrast(1.02)",
        }} />
        {/* Scanlines overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "repeating-linear-gradient(180deg, rgba(0,0,0,.05) 0 2px, transparent 2px 7px)",
          mixBlendMode: "multiply",
        }} />
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,.55) 100%)",
        }} />

        {/* Corner metadata */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          padding: "7rem clamp(1.25rem, 3.2vw, 2.5rem) 2rem",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          color: "rgba(247,246,244,.7)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "start",
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
          }}>
            <span>Project · {project.year} / 0{project.num}</span>
            <span><span style={{ color: "#BC7856" }}>◆</span> {project.location}</span>
          </div>
        </div>

        {/* Hero text — reveals at 28% scroll */}
        <div style={{
          position: "relative", zIndex: 4,
          height: "100%",
          display: "grid",
          gridTemplateRows: "1fr auto 1fr",
          padding: "7rem clamp(1.25rem, 3.2vw, 2.5rem) 4rem",
        }}>
          <div />
          <div
            ref={textRef}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.5rem", maxWidth: 900 }}
          >
            <span style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
              color: "#A69885",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(20px)",
              transition: "opacity 1.1s cubic-bezier(.2,.8,.2,1), transform 1.1s cubic-bezier(.2,.8,.2,1)",
              transitionDelay: "0s",
            }}>
              0{project.num} / Residential · {project.location} · {project.year}
            </span>

            <span style={{
              display: "block",
              width: 28, height: 1,
              background: "#BC7856",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(20px)",
              transition: "opacity 1.1s cubic-bezier(.2,.8,.2,1), transform 1.1s cubic-bezier(.2,.8,.2,1)",
              transitionDelay: ".05s",
            }} />

            <h1 style={{
              fontFamily: "var(--font-open-sauce-one, sans-serif)",
              fontWeight: 200,
              fontSize: "clamp(56px, 8.5vw, 120px)",
              letterSpacing: "-0.03em",
              lineHeight: .96,
              color: "#F7F6F4",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(28px)",
              transition: "opacity 1.1s cubic-bezier(.2,.8,.2,1), transform 1.1s cubic-bezier(.2,.8,.2,1)",
              transitionDelay: ".15s",
            }}>
              {project.titleFirst} {project.titleLast}
            </h1>

            <p style={{
              fontFamily: "var(--font-forum, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(20px, 2vw, 28px)",
              lineHeight: 1.35,
              color: "rgba(247,246,244,.65)",
              maxWidth: "26ch",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(28px)",
              transition: "opacity 1.1s cubic-bezier(.2,.8,.2,1), transform 1.1s cubic-bezier(.2,.8,.2,1)",
              transitionDelay: ".30s",
            }}>
              {project.subtitle}
            </p>
          </div>
          <div />
        </div>

        {/* Progress bar */}
        <span style={{
          position: "absolute",
          left: "clamp(1.25rem, 3.2vw, 2.5rem)",
          bottom: "2.8rem",
          zIndex: 5,
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
          color: "rgba(247,246,244,.5)",
        }}>
          Section · 01 / 04
        </span>
        <span
          ref={numRef}
          style={{
            position: "absolute",
            right: "clamp(1.25rem, 3.2vw, 2.5rem)",
            bottom: "2.8rem",
            zIndex: 5,
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
            color: "rgba(247,246,244,.85)",
          }}
        >
          00 %
        </span>
        <div style={{
          position: "absolute",
          left: "clamp(1.25rem, 3.2vw, 2.5rem)",
          right: "clamp(1.25rem, 3.2vw, 2.5rem)",
          bottom: "2.2rem",
          zIndex: 5,
          height: 1,
          background: "rgba(247,246,244,.18)",
        }}>
          <span
            ref={barRef}
            style={{
              display: "block",
              position: "absolute", inset: 0,
              background: "#BC7856",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── S2 — Specs · Quote · Materials ─────────────────────────────────── */
function S2Specs({ project }: { project: ReturnType<typeof getProject> & {} }) {
  return (
    <section style={{
      background: "#F7F6F4",
      padding: "clamp(5rem, 10vh, 9rem) clamp(1.25rem, 3.2vw, 2.5rem)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr 1fr",
        gap: "clamp(2.5rem, 6vw, 6rem)",
        alignItems: "start",
        maxWidth: 1320,
        margin: "0 auto",
      }}>

        {/* Specs */}
        <div style={{ position: "relative", paddingTop: "1.2rem" }}>
          <span style={{
            position: "absolute", top: 0, left: 0,
            width: 28, height: 1, background: "#BC7856", display: "block",
          }} />
          <dl style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            columnGap: "2rem",
            rowGap: "1.4rem",
          }}>
            {[
              { t: "Year",    v: project.year,    em: false },
              { t: "Surface", v: project.surface, em: false },
              { t: "Scope",   v: project.scope,   em: false },
              { t: "Status",  v: project.status,  em: project.status === "In Works" },
            ].map(({ t, v, em }) => (
              <>
                <dt key={`dt-${t}`} style={{
                  fontFamily: "var(--font-ibm-plex-mono, monospace)",
                  fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
                  color: "#A69885", alignSelf: "center",
                }}>
                  {t}
                </dt>
                <dd key={`dd-${t}`} style={{
                  fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
                  fontWeight: 400,
                  fontSize: 14, letterSpacing: ".01em",
                  color: em ? "#BC7856" : "#4D5257",
                }}>
                  {v}
                </dd>
              </>
            ))}
          </dl>
        </div>

        {/* Editorial quote */}
        <p style={{
          fontFamily: "var(--font-forum, serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(20px, 1.8vw, 22px)",
          lineHeight: 1.55,
          color: "#8B816E",
          maxWidth: "18ch",
        }}>
          {project.quote}
        </p>

        {/* Materials */}
        <div>
          <span style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
            color: "#A69885", marginBottom: "1rem", display: "block",
          }}>
            Materials
          </span>
          <ul style={{ listStyle: "none" }}>
            {project.materials.map((mat, i) => (
              <li key={mat} style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontWeight: 300,
                fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase",
                color: "#4D5257",
                padding: ".9rem 0",
                borderTop: "1px solid #CFCDC9",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: i === project.materials.length - 1 ? "1px solid #CFCDC9" : undefined,
              }}>
                <span>{mat}</span>
                <span style={{ color: "#A69885", fontSize: 10 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

/* ─── S3 — Gallery ────────────────────────────────────────────────────── */
function S3Gallery({ project }: { project: ReturnType<typeof getProject> & {} }) {
  return (
    <section style={{
      background: "#F7F6F4",
      padding: "clamp(3rem, 6vh, 6rem) clamp(1.25rem, 3.2vw, 2.5rem) clamp(5rem, 10vh, 9rem)",
    }}>
      <div style={{
        display: "flex", flexDirection: "column",
        gap: "clamp(2rem, 5vh, 4rem)",
        maxWidth: 1440, margin: "0 auto",
      }}>
        {project.gallery.map((frame, i) => (
          <figure key={i}>
            {/* Frame with warm gradient placeholder */}
            <div style={{
              position: "relative",
              aspectRatio: "16 / 9",
              width: "100%",
              background: `
                radial-gradient(50% 60% at 70% 30%, rgba(232,196,148,.50) 0%, transparent 70%),
                radial-gradient(60% 70% at 25% 75%, rgba(120,82,55,.45)   0%, transparent 65%),
                linear-gradient(160deg, #d4c4ad 0%, #b89478 60%, #8a6c4e 100%)
              `,
              overflow: "hidden",
            }}>
              {/* Tag */}
              <span style={{
                position: "absolute", top: "1rem", left: "1rem",
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
                color: "#F7F6F4",
                background: "rgba(40,40,40,.55)",
                backdropFilter: "blur(8px)",
                padding: "6px 10px",
                borderRadius: 999,
                zIndex: 2,
              }}>
                {frame.label.split(" / ")[0]}
              </span>
            </div>

            <figcaption style={{
              marginTop: "1rem",
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
              color: "#A69885",
            }}>
              <span>{frame.label}</span>
              <span style={{ color: "#8B816E" }}>{frame.sub}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ─── S4 — Next project CTA ───────────────────────────────────────────── */
function S4NextProject({ next, locale }: { next: ReturnType<typeof getProject> & {}; locale: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{
      background: "#4D5257",
      color: "#F7F6F4",
      borderTop: "1px solid #BC7856",
    }}>
      <Link
        href={`/${locale}/projects/${next.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "clamp(2rem, 6vw, 6rem)",
          padding: "clamp(4rem, 10vh, 8rem) clamp(1.25rem, 3.2vw, 2.5rem)",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
        }}
        data-cursor-label="Open"
      >
        {/* Left label */}
        <span style={{
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
          color: "rgba(247,246,244,.55)",
          display: "inline-flex", alignItems: "center", gap: 12,
        }}>
          <span style={{
            display: "inline-block", width: 8, height: 8,
            background: "#BC7856", transform: "rotate(45deg)",
          }} />
          Next Project
        </span>

        {/* Center title */}
        <span style={{
          fontFamily: "var(--font-open-sauce-one, sans-serif)",
          fontWeight: 200,
          fontSize: "clamp(44px, 7vw, 88px)",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          color: "#F7F6F4",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          {next.titleFirst}{" "}
          <span style={{
            fontFamily: hovered ? "var(--font-forum, serif)" : "var(--font-open-sauce-one, sans-serif)",
            fontStyle: hovered ? "italic" : "normal",
            fontWeight: hovered ? 400 : 200,
            color: hovered ? "rgba(247,246,244,.7)" : "#F7F6F4",
            transition: "color .35s ease",
          }}>
            {next.titleLast}
          </span>
        </span>

        {/* Right arrow */}
        <span style={{
          justifySelf: "end",
          display: "inline-flex", alignItems: "center", gap: 14,
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
          color: "rgba(247,246,244,.85)",
        }}>
          <span>N° {next.num} — {next.year}</span>
          <span style={{
            position: "relative",
            display: "inline-block",
            width: hovered ? 84 : 36,
            height: 1,
            background: "#F7F6F4",
            transition: "width .55s cubic-bezier(.2,.8,.2,1)",
          }}>
            <span style={{
              position: "absolute", right: 0, top: -4,
              width: 9, height: 9,
              borderTop: "1px solid #F7F6F4",
              borderRight: "1px solid #F7F6F4",
              transform: "rotate(45deg)",
              display: "block",
            }} />
          </span>
        </span>
      </Link>
    </section>
  );
}
