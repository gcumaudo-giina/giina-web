"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function StudioChapter() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const t           = useTranslations("studio_chapter");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-20 py-32 max-w-4xl"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <span
        ref={labelRef}
        className="font-body text-xs tracking-[0.3em] text-sand-beige uppercase mb-6 block opacity-0"
      >
        {t("label")}
      </span>

      <h2
        ref={headlineRef}
        className="font-display font-light text-4xl md:text-6xl text-technical-grey leading-tight mb-8 opacity-0"
        style={{ fontFamily: "var(--font-open-sauce-one, serif)" }}
      >
        {t("headline")}
      </h2>

      <p
        ref={bodyRef}
        className="font-editorial text-xl md:text-2xl text-taupe-earth leading-relaxed max-w-xl opacity-0"
        style={{ fontFamily: "var(--font-forum, serif)" }}
      >
        {t("body")}
      </p>
    </section>
  );
}