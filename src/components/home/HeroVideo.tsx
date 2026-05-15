"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const t            = useTranslations("hero");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.6, delay: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-technical-grey flex items-center justify-center"
    >
      {/* Video background — replace src with Cloudinary URL once available */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src=""
        aria-hidden="true"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-technical-grey/30 via-transparent to-technical-grey/50" />

      {/* GIINA wordmark */}
      <div ref={logoRef} className="relative z-10 text-center opacity-0">
        <h1
          className="font-display font-light text-off-white tracking-[0.3em] text-6xl md:text-8xl"
          style={{ fontFamily: "var(--font-open-sauce-one, serif)" }}
        >
          GIINA
        </h1>
        <div className="mt-3 h-px w-12 mx-auto" style={{ background: "#BC7856" }} />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-off-white/60 uppercase">
          {t("scroll")}
        </span>
        <div className="w-px h-8 bg-off-white/40 animate-pulse" />
      </div>
    </section>
  );
}