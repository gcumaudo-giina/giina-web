"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CELLS = [
  { src: "/projects/epure/p07.jpg",                    alt: "Épure — salon gris",               w: "35%",  aspect: "4/3"  },
  { src: "/projects/villa-omoi/p06.jpg",               alt: "Villa Omoi — doble altura",         w: "45%",  aspect: "4/3"  },
  { src: "/projects/tortugas-811/p05.jpg",             alt: "Tortugas 811 — terraza",            w: "20%",  aspect: "4/3"  },
  { src: "/projects/villa-boris/p06.jpg",              alt: "Villa Boris — sala doble volumen",  w: "50%",  aspect: "3/4", caption: "Villa Boris · 2023" },
  { src: "/projects/jardines-de-andalucia/p08.jpg",    alt: "Jardines — comedor artesanal",      w: "50%",  aspect: "3/4"  },
  { src: "/projects/jardines-de-andalucia/p05.jpg",    alt: "Jardines — patio sur",              w: "25%",  aspect: "1/1"  },
  { src: "/projects/epure/p09.jpg",                    alt: "Épure — suite máster",              w: "40%",  aspect: "1/1", caption: "Épure · Paris · 2024" },
  { src: "/projects/villa-omoi/p09.jpg",               alt: "Villa Omoi — paneles washi",        w: "35%",  aspect: "1/1"  },
  { src: "/projects/tortugas-811/p08.jpg",             alt: "Tortugas 811 — yeso tierra",        w: "30%",  aspect: "4/3"  },
  { src: "/projects/villa-boris/p09.jpg",              alt: "Villa Boris — piscina nocturna",    w: "35%",  aspect: "4/3"  },
  { src: "/projects/villa-omoi/p07.jpg",               alt: "Villa Omoi — jardín",               w: "35%",  aspect: "4/3"  },
];

export default function VisualWorld() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cells = containerRef.current?.querySelectorAll<HTMLElement>(".vw-cell");
    if (!cells) return;

    gsap.fromTo(
      cells,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ background: "var(--color-off-white, #F7F6F4)", padding: "0" }}
    >
      {/* Row 1 */}
      <div style={{ display: "flex", width: "100%" }}>
        {CELLS.slice(0, 3).map((cell) => (
          <Cell key={cell.src} cell={cell} />
        ))}
      </div>
      {/* Row 2 */}
      <div style={{ display: "flex", width: "100%" }}>
        {CELLS.slice(3, 5).map((cell) => (
          <Cell key={cell.src} cell={cell} />
        ))}
      </div>
      {/* Row 3 */}
      <div style={{ display: "flex", width: "100%" }}>
        {CELLS.slice(5, 8).map((cell) => (
          <Cell key={cell.src} cell={cell} />
        ))}
      </div>
      {/* Row 4 */}
      <div style={{ display: "flex", width: "100%" }}>
        {CELLS.slice(8, 11).map((cell) => (
          <Cell key={cell.src} cell={cell} />
        ))}
      </div>
    </section>
  );
}

function Cell({ cell }: { cell: (typeof CELLS)[0] }) {
  const cellRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const large = parseInt(cell.w) >= 35;
    if (!large) return;
    gsap.to(cellRef.current?.querySelector("img") ?? null, {
      scale: 1.02,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cellRef.current?.querySelector("img") ?? null, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cellRef}
      className="vw-cell"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        width: cell.w,
        aspectRatio: cell.aspect,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Image
        src={cell.src}
        alt={cell.alt}
        fill
        sizes={`${cell.w} of viewport`}
        style={{ objectFit: "cover", display: "block" }}
      />
      {cell.caption && (
        <figcaption
          style={{
            position: "absolute",
            bottom: "12px",
            left: "16px",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(247,246,244,0.85)",
            pointerEvents: "none",
          }}
        >
          {cell.caption}
        </figcaption>
      )}
    </div>
  );
}
