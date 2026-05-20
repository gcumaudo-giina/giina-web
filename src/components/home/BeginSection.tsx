"use client";

import { useTranslations } from "next-intl";

function SpinCircle() {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 18,
      flexShrink: 0,
    }}>
      <svg
        viewBox="0 0 20 20"
        width="18"
        height="18"
        style={{ animation: "spin-slow 9s linear infinite" }}
        aria-hidden="true"
      >
        <circle
          cx="10" cy="10" r="8"
          fill="none"
          stroke="#BC7856"
          strokeWidth="0.75"
          strokeDasharray="4 5"
        />
      </svg>
    </span>
  );
}

export default function BeginSection() {
  const t = useTranslations("begin");

  return (
    <section style={{
      background: "#F7F6F4",
      borderTop: "1px solid #CFCDC9",
      padding: "clamp(6rem, 14vh, 10rem) clamp(1.25rem, 3.2vw, 2.5rem)",
    }}>

      {/* ── Top row: label + location ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "clamp(3.5rem, 10vh, 7rem)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <SpinCircle />
          <span style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#BC7856",
          }}>
            {t("label")}
          </span>
        </div>

        <div style={{
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#A69885",
          textAlign: "right",
          lineHeight: 1.85,
        }}>
          <div>{t("appointment")}</div>
          <div>{t("location")}</div>
        </div>
      </div>

      {/* ── Headline ── */}
      <h2 style={{
        fontFamily: "var(--font-open-sauce-one, sans-serif)",
        fontWeight: 300,
        fontSize: "clamp(44px, 7.5vw, 112px)",
        letterSpacing: "-0.03em",
        lineHeight: 0.95,
        color: "#4D5257",
        marginBottom: "clamp(4rem, 10vh, 7rem)",
      }}>
        {t("headline_1")}{" "}
        <em style={{
          fontFamily: "var(--font-forum, serif)",
          fontStyle: "italic",
          fontWeight: 400,
          color: "#8B816E",
        }}>
          {t("headline_em")}
        </em>{" "}
        {t("headline_2")}
      </h2>

      {/* ── Email CTA ── */}
      <div style={{ borderTop: "1px solid #CFCDC9", paddingTop: "2rem" }}>
        <a
          href={`mailto:${t("email")}`}
          data-cursor-hover="Write"
          className="begin-email"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1.25rem",
            fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.6vw, 20px)",
            color: "#4D5257",
            textDecoration: "none",
            borderBottom: "1px solid #CFCDC9",
            paddingBottom: "0.5rem",
            transition: "color .35s ease, border-color .35s ease",
          }}
        >
          {t("email")}
          <span style={{
            display: "inline-block",
            position: "relative",
            width: 28,
            height: 1,
            background: "currentColor",
            flexShrink: 0,
            transition: "width .4s cubic-bezier(0.2,0.8,0.2,1)",
          }}
            className="begin-arrow"
          >
            <span style={{
              position: "absolute",
              right: 0,
              top: -3.5,
              width: 8,
              height: 8,
              borderTop: "1px solid currentColor",
              borderRight: "1px solid currentColor",
              transform: "rotate(45deg)",
              display: "block",
            }} />
          </span>
        </a>
      </div>

      <style>{`
        .begin-email:hover { color: #BC7856 !important; border-color: #BC7856 !important; }
        .begin-email:hover .begin-arrow { width: 52px !important; }
      `}</style>
    </section>
  );
}
