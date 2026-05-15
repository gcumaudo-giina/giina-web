"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  const switchTo = (next: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-3 font-body text-xs text-technical-grey">
      {["en", "es"].map((lang) => (
        <button
          key={lang}
          onClick={() => switchTo(lang)}
          className={`uppercase tracking-widest transition-opacity ${
            locale === lang ? "opacity-100" : "opacity-40 hover:opacity-70"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}