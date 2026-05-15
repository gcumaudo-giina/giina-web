"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CursorCustom() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    const xDot  = gsap.quickTo(dot,  "x", { duration: 0.08, ease: "none" });
    const yDot  = gsap.quickTo(dot,  "y", { duration: 0.08, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3" });

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const expand = (e: MouseEvent) => {
      const target  = (e.target as HTMLElement).closest("[data-cursor-label]");
      const curLabel = target?.getAttribute("data-cursor-label") ?? "";
      if (label) {
        label.textContent = curLabel;
        gsap.to(label, { opacity: curLabel ? 1 : 0, duration: 0.2 });
      }
      gsap.to(ring, { width: 72, height: 72, borderColor: "#BC7856", duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 0, duration: 0.2 });
    };

    const shrink = () => {
      if (label) gsap.to(label, { opacity: 0, duration: 0.15 });
      gsap.to(ring, { width: 36, height: 36, borderColor: "rgba(77,82,87,0.5)", duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 1, duration: 0.25 });
    };

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", expand as EventListener);
        el.addEventListener("mouseleave", shrink);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Dot — terracotta */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 5, height: 5,
          borderRadius: "50%",
          background: "#BC7856",
          zIndex: 10000,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(77,82,87,0.5)",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 8,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#4D5257",
            opacity: 0,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        />
      </div>
    </>
  );
}