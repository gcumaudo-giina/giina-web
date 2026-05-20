"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [pct, setPct]   = useState(0);
  const barRef          = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      p += Math.random() * 14 + 4;
      if (p > 100) p = 100;
      setPct(Math.floor(p));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p / 100})`;
      if (p < 100) {
        setTimeout(tick, 90 + Math.random() * 120);
      } else {
        setTimeout(() => setDone(true), 380);
      }
    };
    setTimeout(tick, 200);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#F7F6F4",
        zIndex: 9999,
        display: "grid",
        gridTemplateRows: "1fr auto 1fr",
        alignItems: "end",
        padding: "clamp(1.25rem, 3.2vw, 2.5rem)",
        transition: "opacity 0.8s ease 0.15s, visibility 0s linear 1s",
        opacity: done ? 0 : 1,
        visibility: done ? "hidden" : "visible",
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div />

      <div>
        {/* Mark + meta row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: "1.5rem",
        }}>
          <Image
            src="/brand/giina-mark-black.png"
            alt="GIINA"
            width={680}
            height={680}
            priority
            style={{
              width: "clamp(44px, 5.5vw, 72px)",
              height: "auto",
              display: "block",
              opacity: 0.85,
            }}
          />
          <div style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#A69885",
            textAlign: "right",
            lineHeight: 1.85,
          }}>
            <div style={{ color: "#4D5257" }}>The Design Atelier</div>
            <div style={{ color: "#BC7856" }}>◆ Marbella · ES</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 1, background: "#CFCDC9", position: "relative" }}>
          <span
            ref={barRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "#4D5257",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              display: "block",
              transition: "transform 0.2s linear",
            }}
          />
        </div>

        {/* Label + counter */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: ".9rem",
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#A69885",
        }}>
          <span>Loading the atelier</span>
          <span>
            <span style={{ color: "#4D5257" }}>{String(pct).padStart(3, "0")}</span>
            {" / 100"}
          </span>
        </div>
      </div>

      <div />
    </div>
  );
}
