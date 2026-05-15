"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: "1.5rem" }}>
          <span style={{
            fontFamily: "var(--font-open-sauce-one, sans-serif)",
            fontWeight: 200,
            fontSize: "clamp(60px, 14vw, 220px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "#4D5257",
          }}>
            GIINA
          </span>
          <div style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#A69885",
            textAlign: "right",
            lineHeight: 1.8,
          }}>
            <div>The Design Atelier</div>
            <div style={{ color: "#BC7856" }}>◆ Marbella · ES</div>
          </div>
        </div>

        {/* Progress bar — pure CSS animation */}
        <div style={{ height: 1, background: "#CFCDC9", position: "relative" }}>
          <span style={{
            position: "absolute",
            inset: 0,
            background: "#4D5257",
            transformOrigin: "left center",
            display: "block",
            animation: "loader-fill 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }} />
        </div>

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
          <span style={{ color: "#4D5257" }}>◆</span>
        </div>
      </div>
      <div />
    </div>
  );
}