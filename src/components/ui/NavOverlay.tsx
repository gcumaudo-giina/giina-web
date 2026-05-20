"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

function LiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

const navLinks = [
  { key: "projects",   href: "/projects"   },
  { key: "studio",     href: "/studio"     },
  { key: "contact",    href: "/contact"    },
];

export default function NavOverlay() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t      = useTranslations("nav");
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Fixed header ─────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: scrolled
            ? "0.8rem clamp(1.25rem, 3.2vw, 2.5rem)"
            : "1.1rem clamp(1.25rem, 3.2vw, 2.5rem)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "2rem",
          color: "#F7F6F4",
          mixBlendMode: "difference",
          transition: "padding 0.4s ease",
        }}
      >
        {/* Left links — hidden on mobile */}
        <nav
          style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}
          className="nav-left-links"
        >
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              data-cursor-hover={t(link.key)}
              style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "inherit",
                position: "relative",
                padding: "4px 0",
              }}
              className="nav-underline-link"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Center — GIINA logo mark */}
        <div style={{ textAlign: "center", lineHeight: 0 }}>
          <Link href={`/${locale}`} aria-label="GIINA — Home" data-cursor-hover="Home">
            <Image
              src="/brand/giina-mark-white.png"
              alt="GIINA"
              width={52}
              height={24}
              style={{ width: 52, height: "auto", display: "inline-block" }}
              priority
            />
          </Link>
        </div>

        {/* Right — contact + lang + hamburger */}
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center", justifyContent: "flex-end" }}>
          <Link
            href={`/${locale}/contact`}
            style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "inherit",
            }}
            className="nav-underline-link nav-hide-mobile"
          >
            {t("contact")}
          </Link>

          <span
            className="nav-hide-mobile"
            style={{
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: 10,
              letterSpacing: ".18em",
              color: "inherit",
              opacity: 0.5,
            }}
          >
            <LiveTime />
          </span>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ display: "flex", flexDirection: "column", gap: 7, background: "none", border: 0, padding: 4, cursor: "none" }}
          >
            <span style={{ display: "block", width: 28, height: 1.5, background: "currentColor", transition: "width .3s ease" }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: "currentColor", transition: "width .3s ease" }} />
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "#4D5257",
              display: "flex",
              flexDirection: "column",
              padding: "clamp(1.25rem, 3.2vw, 2.5rem)",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Image
                src="/brand/giina-mark-white.png"
                alt="GIINA"
                width={52}
                height={24}
                style={{ width: 52, height: "auto", display: "inline-block" }}
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ color: "#F7F6F4", background: "none", border: 0, cursor: "none", padding: 4 }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M7 7l14 14M21 7L7 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links — stagger in */}
            <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.08 + i * 0.09, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "var(--font-open-sauce-one, sans-serif)",
                      fontWeight: 200,
                      fontSize: "clamp(52px, 9vw, 96px)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.05,
                      color: "#F7F6F4",
                      display: "block",
                      transition: "color 0.3s ease",
                    }}
                    className="overlay-nav-link"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}
            >
              <LanguageSwitcher />
              <div style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: 10,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#A69885",
                textAlign: "right",
                lineHeight: 1.7,
              }}>
                <div style={{ color: "#BC7856" }}>◆</div>
                <div>Marbella · ES</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 700px) {
          .nav-left-links { display: none !important; }
          .nav-hide-mobile { display: none !important; }
        }
        .overlay-nav-link:hover { color: #A69885 !important; }
        .nav-underline-link { position: relative; }
        .nav-underline-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1);
        }
        .nav-underline-link:hover::after {
          transform: scaleX(1);
          transform-origin: left center;
        }
      `}</style>
    </>
  );
}