"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    num:   "01",
    label: "Referencia",
    items: [
      { src: "/projects/epure/p02.jpg",              alt: "Épure — moodboard",             height: "60vh" },
      { src: "/projects/villa-omoi/p02.jpg",          alt: "Villa Omoi — referencias",      height: "42vh" },
    ],
  },
  {
    num:   "02",
    label: "Concepto",
    items: [
      { src: "/projects/jardines-de-andalucia/p02.jpg", alt: "Jardines — concepto",        height: "45vh" },
      { src: "/projects/tortugas-811/p02.jpg",          alt: "Tortugas — concepto",         height: "55vh" },
    ],
  },
  {
    num:   "03",
    label: "Desarrollo",
    items: [
      { src: "/projects/villa-boris/p03.jpg",         alt: "Villa Boris — desarrollo",      height: "50vh" },
      { src: "/projects/villa-omoi/p13.jpg",          alt: "Villa Omoi — plano",            height: "48vh" },
    ],
  },
  {
    num:   "04",
    label: "Entrega",
    items: [
      { src: "/projects/epure/p11.jpg",              alt: "Épure — resultado final",        height: "58vh" },
      { src: "/projects/villa-boris/p09.jpg",         alt: "Villa Boris — resultado",       height: "40vh" },
    ],
  },
];

export default function ProcessStrip() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !stripRef.current) return;

    const totalWidth = stripRef.current.scrollWidth;
    const viewWidth  = wrapperRef.current.offsetWidth;
    const travel     = totalWidth - viewWidth;

    if (travel <= 0) return;

    gsap.to(stripRef.current, {
      x: -travel,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start:   "top top",
        end:     `+=${travel}`,
        pin:     true,
        scrub:   1,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <section
      ref={wrapperRef}
      style={{
        background: "#2b2926",
        overflow:   "hidden",
        position:   "relative",
      }}
    >
      <div
        ref={stripRef}
        style={{
          display:    "flex",
          alignItems: "flex-end",
          gap:        "4px",
          padding:    "8vh var(--col-edge, 5vw)",
          willChange: "transform",
        }}
      >
        {STAGES.map((stage) => (
          <StageBlock key={stage.num} stage={stage} />
        ))}
        {/* End spacer */}
        <div style={{ flexShrink: 0, width: "var(--col-edge, 5vw)" }} />
      </div>
    </section>
  );
}

function StageBlock({ stage }: { stage: (typeof STAGES)[0] }) {
  return (
    <div
      style={{
        display:    "flex",
        alignItems: "flex-end",
        gap:        "4px",
        flexShrink: 0,
      }}
    >
      {/* Stage label */}
      <div
        style={{
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "flex-end",
          paddingRight:    "24px",
          paddingBottom:   "8px",
          flexShrink:      0,
        }}
      >
        <span
          style={{
            display:       "block",
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "var(--color-terracotta, #BC7856)",
            marginBottom:  "6px",
          }}
        >
          {stage.num}
        </span>
        <span
          style={{
            display:       "block",
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "rgba(166,152,133,0.7)",
            writingMode:   "vertical-rl",
            transform:     "rotate(180deg)",
          }}
        >
          {stage.label}
        </span>
      </div>

      {/* Images */}
      {stage.items.map((item) => (
        <div
          key={item.src}
          style={{
            position:   "relative",
            width:       "28vw",
            height:      item.height,
            flexShrink:  0,
            overflow:    "hidden",
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="28vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      {/* Vertical divider */}
      <div
        style={{
          width:       "1px",
          height:      "40vh",
          background:  "rgba(166,152,133,0.15)",
          flexShrink:  0,
          margin:      "0 32px",
          alignSelf:   "center",
        }}
      />
    </div>
  );
}
