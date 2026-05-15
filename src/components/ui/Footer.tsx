"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/giinadesign/" },
  { label: "Pinterest",  href: "https://www.pinterest.com/giinadesign/"  },
  { label: "LinkedIn",   href: "https://www.linkedin.com/company/giinadesign/" },
];

export default function Footer() {
  const locale = useLocale();
  const year   = new Date().getFullYear();

  return (
    <footer style={{ background: "#F7F6F4", borderTop: "1px solid #CFCDC9" }}>

      {/* Big GIINA wordmark row */}
      <div style={{
        padding: "clamp(3rem, 7vh, 5rem) clamp(1.25rem, 3.2vw, 2.5rem) 0",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "2rem",
      }}>
        <span style={{
          fontFamily: "var(--font-open-sauce-one, sans-serif)",
          fontWeight: 200,
          fontSize: "clamp(56px, 11vw, 160px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          color: "#4D5257",
          userSelect: "none",
        }}>
          GIINA
        </span>

        <div style={{
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#A69885",
          textAlign: "right",
          lineHeight: 1.7,
          paddingBottom: "0.4rem",
        }}>
          <span style={{ color: "#BC7856" }}>◆</span><br />
          Design Atelier<br />
          Marbella · ES
        </div>
      </div>

      {/* Terracotta divider */}
      <div style={{ height: 1, background: "#BC7856", opacity: 0.45, margin: "clamp(2rem, 4vh, 3rem) clamp(1.25rem, 3.2vw, 2.5rem) 0" }} />

      {/* 4-column info grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "clamp(2rem, 4vw, 3.5rem)",
        padding: "clamp(2rem, 4vh, 3rem) clamp(1.25rem, 3.2vw, 2.5rem)",
      }}>

        {/* Atelier */}
        <div>
          <p style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#BC7856", marginBottom: ".8rem" }}>
            Atelier
          </p>
          <p style={{ fontFamily: "var(--font-ibm-plex-sans, sans-serif)", fontWeight: 300, fontSize: 12, lineHeight: 1.8, color: "#8B816E" }}>
            Marbella · Málaga<br />
            España
          </p>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#BC7856", marginBottom: ".8rem" }}>
            Contact
          </p>
          <div style={{ fontFamily: "var(--font-ibm-plex-sans, sans-serif)", fontWeight: 300, fontSize: 12, lineHeight: 1.8, color: "#8B816E" }}>
            <a
              href="mailto:gcumaudo@giinadesign.com"
              style={{ color: "inherit", display: "block" }}
              className="footer-link"
            >
              gcumaudo@giinadesign.com
            </a>
            <Link
              href={`/${locale}/contact`}
              style={{ color: "inherit", display: "block" }}
              className="footer-link"
            >
              Send a message →
            </Link>
          </div>
        </div>

        {/* Follow */}
        <div>
          <p style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#BC7856", marginBottom: ".8rem" }}>
            Follow
          </p>
          <div style={{ fontFamily: "var(--font-ibm-plex-sans, sans-serif)", fontWeight: 300, fontSize: 12, lineHeight: 1.8, color: "#8B816E" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", display: "block" }}
                className="footer-link"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <p style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)", fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#BC7856", marginBottom: ".8rem" }}>
            Hours
          </p>
          <p style={{ fontFamily: "var(--font-ibm-plex-sans, sans-serif)", fontWeight: 300, fontSize: 12, lineHeight: 1.8, color: "#8B816E" }}>
            Mon – Fri · 9:00–18:00<br />
            Sat · By appointment
          </p>
        </div>

      </div>

      {/* Bottom legal bar */}
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
        <span>© {year} Giina Design SL · NIF B22612055</span>
        <span style={{ opacity: 0.6 }}>All rights reserved</span>
      </div>

      <style>{`
        .footer-link { transition: color 0.3s ease; }
        .footer-link:hover { color: #4D5257 !important; }
      `}</style>
    </footer>
  );
}