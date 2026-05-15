"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function ContactCTA() {
  const t      = useTranslations("contact");
  const locale = useLocale();

  return (
    <section className="px-8 md:px-20 py-32 flex flex-col md:flex-row items-end justify-between gap-8">
      <h2
        className="font-display font-light text-4xl md:text-6xl text-technical-grey leading-tight max-w-xl"
        style={{ fontFamily: "var(--font-open-sauce-one, serif)", whiteSpace: "pre-line" }}
      >
        {t("headline")}
      </h2>

      <Link
        href={`/${locale}/contact`}
        className="group flex items-center gap-4 text-technical-grey shrink-0"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase">
          {t("label")}
        </span>
        <span className="block w-12 h-px bg-technical-grey group-hover:w-20 transition-all duration-300" />
      </Link>
    </section>
  );
}