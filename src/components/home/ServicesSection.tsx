"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = ["concept", "technical", "selection", "coordination"] as const;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("services");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-20 py-24 bg-warm-grey"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <span className="font-body text-xs tracking-[0.3em] text-sand-beige uppercase mb-12 block">
        {t("label")}
      </span>

      <div className="divide-y divide-soft-stone">
        {SERVICE_KEYS.map((key, i) => (
          <div
            key={key}
            className="service-item opacity-0 flex flex-col md:flex-row md:items-start gap-4 py-8"
          >
            <span className="font-body text-xs text-sand-beige w-8 shrink-0 pt-1">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display font-light text-2xl text-technical-grey mb-2"
                style={{ fontFamily: "var(--font-open-sauce-one, serif)" }}>
                {t(`items.${key}.title`)}
              </h3>
              <p className="font-body text-sm text-taupe-earth leading-relaxed max-w-md">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}