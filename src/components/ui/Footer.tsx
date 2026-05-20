"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const socials = [
  { label: "@giinadesign ↗", href: "https://www.instagram.com/giinadesign/" },
  { label: "Pinterest ↗",    href: "https://www.pinterest.com/giinadesign/"  },
  { label: "Journal ↗",      href: "#"                                        },
];

function LiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Madrid",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

export default function Footer() {
  const locale = useLocale();

  return (
    <footer style={{ background: "#F7F6F4", borderTop: "1px solid #CFCDC9" }}>

      {/* ── 4-column info grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "clamp(2rem, 4vw, 3.5rem)",
        padding: "clamp(2rem, 4vh, 3rem) clamp(1.25rem, 3.2vw, 2.5rem)",
      }}>

        {/* Atelier */}
        <div>
          <p style={labelStyle}>Atelier</p>
          <p style={textStyle}>
            Calle Camino del Cielo 7<br />
            29602 Marbella · Málaga<br />
            España
          </p>
          <p style={{ ...textStyle, marginTop: "1rem" }}>By appointment only.</p>
        </div>

        {/* Contact */}
        <div>
          <p style={labelStyle}>Contact</p>
          <div style={textStyle}>
            <a href="mailto:studio@giinadesign.com" style={linkStyle} className="foot-link">
              studio@giinadesign.com
            </a>
            <Link href={`/${locale}/contact`} style={linkStyle} className="foot-link">
              Send a message →
            </Link>
          </div>
        </div>

        {/* Follow */}
        <div>
          <p style={labelStyle}>Follow</p>
          <div style={textStyle}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                className="foot-link"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Atelier Hours */}
        <div>
          <p style={labelStyle}>Atelier Hours</p>
          <p style={textStyle}>
            Mon — Fri<br />
            10:00 — 18:30 CET<br />
            <span style={{ color: "#BC7856" }}>●</span>{" "}
            <span style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 11, letterSpacing: ".1em" }}>
              <LiveTime />
            </span>
          </p>
        </div>
      </div>

      {/* ── Bottom legal bar ── */}
      <div style={{
        borderTop: "1px solid #CFCDC9",
        padding: "1.2rem clamp(1.25rem, 3.2vw, 2.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        fontFamily: "var(--font-ibm-plex-mono, monospace)",
        fontSize: 10,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        color: "#A69885",
      }}>
        <span>© MMXXVI · Giina Design — All Rights Reserved</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Imprint", "Cookies"].map((l) => (
            <Link key={l} href="#" style={{ color: "inherit" }} className="foot-link">{l}</Link>
          ))}
          <span>Build · 2026.05</span>
        </div>
      </div>

      <style>{`
        .foot-link { transition: color 0.3s ease; }
        .foot-link:hover { color: #BC7856 !important; }
        @media (max-width: 880px) {
          footer > div:nth-child(4) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer > div:nth-child(4) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono, monospace)",
  fontSize: 10,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "#BC7856",
  marginBottom: ".9rem",
  paddingTop: ".5rem",
  borderTop: "1px solid transparent",
  position: "relative",
};

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
  fontWeight: 300,
  fontSize: 14,
  lineHeight: 1.7,
  color: "#4D5257",
};

const linkStyle: React.CSSProperties = {
  color: "inherit",
  display: "block",
  textDecoration: "none",
};
