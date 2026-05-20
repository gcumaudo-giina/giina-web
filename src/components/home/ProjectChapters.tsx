"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  slug:           string;
  num:            string;
  title:          string;
  location:       string;
  year:           string;
  bgImage:        string;
  overlayOpacity: number;
}

const CHAPTERS: Chapter[] = [
  {
    slug:           "epure",
    num:            "04",
    title:          "Épure",
    location:       "Paris · FR",
    year:           "2024",
    bgImage:        "/projects/epure/p01.jpg",
    overlayOpacity: 0.45,
  },
  {
    slug:           "tortugas-811",
    num:            "05",
    title:          "Tortugas 811",
    location:       "Marbella · ES",
    year:           "2024",
    bgImage:        "/projects/tortugas-811/p01.jpg",
    overlayOpacity: 0.38,
  },
  {
    slug:           "villa-omoi",
    num:            "06",
    title:          "Villa Omoi",
    location:       "Marbella · ES",
    year:           "2023",
    bgImage:        "/projects/villa-omoi/p01.jpg",
    overlayOpacity: 0.42,
  },
  {
    slug:           "villa-boris",
    num:            "07",
    title:          "Villa Boris",
    location:       "Marbella · ES",
    year:           "2023",
    bgImage:        "/projects/villa-boris/p01.jpg",
    overlayOpacity: 0.40,
  },
  {
    slug:           "jardines-de-andalucia",
    num:            "03",
    title:          "Jardines de Andalucía",
    location:       "Marbella · ES",
    year:           "2024",
    bgImage:        "/projects/jardines-de-andalucia/p01.jpg",
    overlayOpacity: 0.35,
  },
  {
    slug:           "villa-chiara",
    num:            "02",
    title:          "Villa Chiara",
    location:       "Marbella · ES",
    year:           "2025",
    bgImage:        "/projects/villa-chiara/md/A7V06008.webp",
    overlayOpacity: 0.40,
  },
];

export default function ProjectChapters() {
  const locale = useLocale();

  return (
    <div>
      {CHAPTERS.map((chapter) => (
        <ChapterSection key={chapter.slug} chapter={chapter} locale={locale} />
      ))}
    </div>
  );
}

function ChapterSection({
  chapter,
  locale,
}: {
  chapter: Chapter;
  locale: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !textRef.current) return;

    // Parallax on the background image
    gsap.fromTo(
      bgRef.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Text entrance
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        height:     "100vh",
        overflow:   "hidden",
      }}
    >
      {/* Background image with parallax wrapper */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset:    "-15% 0",
          zIndex:   0,
        }}
      >
        <Image
          src={chapter.bgImage}
          alt={chapter.title}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority={chapter.num === "04"}
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position:   "absolute",
          inset:      "0",
          background: `linear-gradient(to top, rgba(26,23,20,${chapter.overlayOpacity + 0.4}) 0%, rgba(26,23,20,${chapter.overlayOpacity}) 50%, transparent 100%)`,
          zIndex:     1,
        }}
      />

      {/* Content — anchored to bottom */}
      <div
        ref={textRef}
        style={{
          position:   "absolute",
          bottom:     "0",
          left:       "0",
          right:      "0",
          padding:    "0 var(--col-edge, 5vw) calc(var(--spacing-section, 6rem) * 0.6)",
          zIndex:     2,
        }}
      >
        {/* Num label */}
        <span
          style={{
            display:       "block",
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "var(--color-terracotta, #BC7856)",
            marginBottom:  "12px",
          }}
        >
          ◆ {chapter.num} — Giina Design
        </span>

        {/* Project title */}
        <h2
          style={{
            fontFamily:  "var(--font-display, sans-serif)",
            fontWeight:  200,
            fontSize:    "clamp(64px, 10vw, 160px)",
            lineHeight:  "0.9",
            color:       "#F7F6F4",
            margin:      "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          {chapter.title}
        </h2>

        {/* Location + year */}
        <p
          style={{
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "rgba(166,152,133,0.9)",
            margin:        "0 0 28px",
          }}
        >
          {chapter.location} · {chapter.year}
        </p>

        {/* CTA */}
        <Link
          href={`/${locale}/projects/${chapter.slug}`}
          data-cursor-hover="view"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "8px",
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "var(--color-terracotta, #BC7856)",
            textDecoration: "none",
          }}
        >
          Explorar proyecto
          <span style={{ fontSize: "14px" }}>→</span>
        </Link>
      </div>
    </section>
  );
}
