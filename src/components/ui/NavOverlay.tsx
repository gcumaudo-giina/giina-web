"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "projects", href: "/projects" },
  { key: "studio",   href: "/studio" },
  { key: "contact",  href: "/contact" },
];

export default function NavOverlay() {
  const [open, setOpen] = useState(false);
  const t      = useTranslations("nav");
  const locale = useLocale();

  return (
    <>
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-multiply">
        <Logo variant="dark" />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex flex-col gap-1.5 group"
        >
          <span className="block w-6 h-px bg-technical-grey transition-all group-hover:w-8" />
          <span className="block w-4 h-px bg-technical-grey transition-all group-hover:w-8" />
        </button>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-off-white flex flex-col px-8 py-6"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <Logo variant="dark" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-technical-grey">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-light text-technical-grey hover:text-sand-beige transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <span className="font-body text-xs text-sand-beige">Marbella, Spain</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}