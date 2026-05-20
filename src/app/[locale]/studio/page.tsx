"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StudioChapter from "@/components/home/StudioChapter";
import ServicesSection from "@/components/home/ServicesSection";
import BeginSection from "@/components/home/BeginSection";
import Footer from "@/components/ui/Footer";

gsap.registerPlugin(ScrollTrigger);

const BRAND_SLIDES = [
  "/studio/brand/brand-02.jpg",
  "/studio/brand/brand-03.jpg",
  "/studio/brand/brand-04.jpg",
  "/studio/brand/brand-05.jpg",
  "/studio/brand/brand-06.jpg",
  "/studio/brand/brand-07.jpg",
  "/studio/brand/brand-08.jpg",
  "/studio/brand/brand-09.jpg",
  "/studio/brand/brand-10.jpg",
  "/studio/brand/brand-11.jpg",
  "/studio/brand/brand-12.jpg",
  "/studio/brand/brand-13.jpg",
];

const TEAM = [
  {
    name:  "Giina Cumaudo",
    role:  "Founder & Creative Director",
    since: "Est. 2020",
  },
  {
    name:  "Studio",
    role:  "Design · Architecture · Supply",
    since: "Marbella · ES",
  },
];

const PROCESS_STEPS = [
  {
    num:   "01",
    title: "Discovery",
    body:  "We begin by listening — to the space, the light, and the life that will unfold inside.",
  },
  {
    num:   "02",
    title: "Concept",
    body:  "A visual language is built from references, materials, and the unique identity of each client.",
  },
  {
    num:   "03",
    title: "Development",
    body:  "Technical drawings, material specifications, and supplier coordination transform concept into reality.",
  },
  {
    num:   "04",
    title: "Delivery",
    body:  "We accompany every project through to completion — present, precise, and fully accountable.",
  },
];

export default function StudioPage() {
  return (
    <main>
      <StudioHero />
      <StudioChapter />
      <ServicesSection />
      <BrandSlidesStrip />
      <TeamGrid />
      <ProcessSection />
      <BeginSection />
      <Footer />
    </main>
  );
}

/* ─── Studio Hero ─────────────────────────────────────────────────────── */
function StudioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 28 },
      {
        opacity:  1,
        y:        0,
        duration: 1,
        ease:     "power3.out",
        stagger:  0.1,
        delay:    0.3,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        height:     "100vh",
        background: "#1a1714",
        overflow:   "hidden",
        display:    "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Brand page 1 — low opacity background */}
      <div style={{ position: "absolute", inset: "0", zIndex: 0 }}>
        <Image
          src="/studio/brand/brand-01.jpg"
          alt="Giina Design — brand"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.25 }}
          priority
        />
      </div>

      {/* Scanline texture */}
      <div style={{
        position:   "absolute",
        inset:      "0",
        zIndex:     1,
        background: "repeating-linear-gradient(180deg, rgba(0,0,0,.06) 0 2px, transparent 2px 7px)",
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }} />

      {/* Bottom gradient */}
      <div style={{
        position:   "absolute",
        inset:      "0",
        zIndex:     2,
        background: "linear-gradient(to top, #1a1714 30%, rgba(26,23,20,.5) 70%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Text */}
      <div
        ref={textRef}
        style={{
          position: "relative",
          zIndex:   3,
          padding:  "0 var(--col-edge, 5vw) clamp(4rem, 8vh, 8rem)",
          width:    "100%",
        }}
      >
        <span style={{
          display:       "block",
          fontFamily:    "var(--font-ibm-plex-mono, monospace)",
          fontSize:      10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color:         "var(--color-terracotta, #BC7856)",
          marginBottom:  "1.5rem",
        }}>
          ◆ Giina Design — Studio
        </span>

        <h1 style={{
          fontFamily:    "var(--font-open-sauce-one, sans-serif)",
          fontWeight:    200,
          fontSize:      "clamp(56px, 9vw, 140px)",
          lineHeight:    0.92,
          letterSpacing: "-0.03em",
          color:         "#F7F6F4",
          marginBottom:  "2rem",
        }}>
          Design that<br />
          <span style={{
            fontFamily: "var(--font-forum, serif)",
            fontStyle:  "italic",
            fontWeight: 400,
            color:      "rgba(247,246,244,.65)",
          }}>
            endures.
          </span>
        </h1>

        <p style={{
          fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
          fontWeight: 300,
          fontSize:   "clamp(14px, 1.2vw, 18px)",
          lineHeight: 1.7,
          color:      "rgba(166,152,133,0.9)",
          maxWidth:   "38ch",
        }}>
          A full-service interior design studio based in Marbella.
          Concept, architecture, and material curation — always in-house.
        </p>
      </div>
    </section>
  );
}

/* ─── Brand Slides Strip — marquee ───────────────────────────────────── */
function BrandSlidesStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const clone = track.cloneNode(true) as HTMLDivElement;
    track.parentElement?.appendChild(clone);

    gsap.to([track, clone], {
      xPercent: -100,
      repeat:   -1,
      ease:     "none",
      duration: 40,
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });
  }, []);

  return (
    <section style={{
      background:  "#0f0e0c",
      overflow:    "hidden",
      padding:     "clamp(4rem, 8vh, 8rem) 0",
    }}>
      <div style={{
        fontFamily:    "var(--font-ibm-plex-mono, monospace)",
        fontSize:      10,
        letterSpacing: ".22em",
        textTransform: "uppercase",
        color:         "#A69885",
        padding:       "0 var(--col-edge, 5vw)",
        marginBottom:  "2rem",
      }}>
        ◆ Brand Identity
      </div>

      <div style={{
        position: "relative",
        display:  "flex",
        overflow: "hidden",
      }}>
        <div
          ref={trackRef}
          style={{
            display:    "flex",
            gap:        "4px",
            flexShrink: 0,
            willChange: "transform",
          }}
        >
          {BRAND_SLIDES.map((src) => (
            <div
              key={src}
              style={{
                position:   "relative",
                width:      "min(420px, 40vw)",
                aspectRatio: "16/9",
                flexShrink: 0,
                overflow:   "hidden",
              }}
            >
              <Image
                src={src}
                alt="Giina Design brand"
                fill
                sizes="420px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team Grid ───────────────────────────────────────────────────────── */
function TeamGrid() {
  return (
    <section style={{
      background: "#F7F6F4",
      padding:    "clamp(5rem, 10vh, 10rem) var(--col-edge, 5vw)",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>

        <div style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "16px",
          marginBottom:  "clamp(3rem, 6vh, 6rem)",
        }}>
          <span style={{ width: 28, height: 1, background: "#BC7856", display: "block" }} />
          <span style={{
            fontFamily:    "var(--font-ibm-plex-mono, monospace)",
            fontSize:      10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color:         "#A69885",
          }}>
            The Studio
          </span>
        </div>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap:                 "2px",
        }}>
          {TEAM.map((member) => (
            <div
              key={member.name}
              style={{
                background: "#EAE8E4",
                padding:    "clamp(2rem, 4vw, 4rem)",
              }}
            >
              <p style={{
                fontFamily:    "var(--font-open-sauce-one, sans-serif)",
                fontWeight:    200,
                fontSize:      "clamp(28px, 3vw, 40px)",
                letterSpacing: "-0.02em",
                lineHeight:    1.1,
                color:         "#2b2926",
                marginBottom:  "1.2rem",
              }}>
                {member.name}
              </p>
              <p style={{
                fontFamily:    "var(--font-ibm-plex-mono, monospace)",
                fontSize:      11,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color:         "#A69885",
                marginBottom:  "0.5rem",
              }}>
                {member.role}
              </p>
              <p style={{
                fontFamily:    "var(--font-ibm-plex-mono, monospace)",
                fontSize:      10,
                letterSpacing: ".14em",
                color:         "#8B816E",
              }}>
                {member.since}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process Section ─────────────────────────────────────────────────── */
function ProcessSection() {
  return (
    <section style={{
      background: "#2b2926",
      padding:    "clamp(5rem, 10vh, 10rem) var(--col-edge, 5vw)",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>

        <div style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "16px",
          marginBottom:  "clamp(3rem, 6vh, 6rem)",
        }}>
          <span style={{ width: 28, height: 1, background: "#BC7856", display: "block" }} />
          <span style={{
            fontFamily:    "var(--font-ibm-plex-mono, monospace)",
            fontSize:      10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color:         "#A69885",
          }}>
            Our Process
          </span>
        </div>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap:                 "clamp(2rem, 4vw, 4rem)",
        }}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.num}>
              <span style={{
                display:       "block",
                fontFamily:    "var(--font-ibm-plex-mono, monospace)",
                fontSize:      10,
                letterSpacing: ".22em",
                color:         "var(--color-terracotta, #BC7856)",
                marginBottom:  "1rem",
              }}>
                {step.num}
              </span>
              <h3 style={{
                fontFamily:    "var(--font-open-sauce-one, sans-serif)",
                fontWeight:    200,
                fontSize:      "clamp(24px, 2.5vw, 36px)",
                letterSpacing: "-0.02em",
                color:         "#F7F6F4",
                marginBottom:  "1rem",
              }}>
                {step.title}
              </h3>
              <div style={{
                width:      28,
                height:     1,
                background: "rgba(188,120,86,.5)",
                margin:     "0 0 1rem",
              }} />
              <p style={{
                fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
                fontWeight: 300,
                fontSize:   14,
                lineHeight: 1.75,
                color:      "rgba(166,152,133,0.85)",
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
