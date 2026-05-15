"use client";

import { useTranslations } from "next-intl";
import Logo from "./Logo";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/giinadesign/" },
];

export default function Footer() {
  const t    = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-technical-grey text-off-white px-8 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {/* Logo + tagline */}
        <div>
          <Logo variant="white" className="mb-3" />
          <p className="font-body text-xs text-warm-grey mt-2">{t("tagline")}</p>
        </div>

        {/* Contact info */}
        <div className="font-body text-xs text-warm-grey space-y-1">
          <p>{t("location")}</p>
          <p>
            <a href="mailto:info@giinadesign.com" className="hover:text-off-white transition-colors">
              info@giinadesign.com
            </a>
          </p>
        </div>

        {/* Social + legal */}
        <div className="font-body text-xs text-warm-grey space-y-1 md:text-right">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-off-white transition-colors"
            >
              {s.label}
            </a>
          ))}
          <p className="mt-4 opacity-50">
            © {year} Giina Design SL — {t("rights")}
          </p>
        </div>
      </div>

      {/* Terracotta accent line */}
      <div className="mt-8 h-px w-full" style={{ background: "#BC7856", opacity: 0.6 }} />
    </footer>
  );
}