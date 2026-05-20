"use client";

import { useEffect, useRef } from "react";

export default function CursorCustom() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch-only devices: hide cursor
    if (matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse position (dot follows instantly)
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    // Ring position (lerped in RAF)
    let rx = mx;
    let ry = my;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    // RAF loop — ring lerps toward mouse
    let rafId: number;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove);

    // Hover state — expand ring, show label, hide dot
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute("data-cursor-hover") ?? "";
      ring.style.width = "92px";
      ring.style.height = "92px";
      ring.style.marginTop = "-46px";
      ring.style.marginLeft = "-46px";
      ring.style.background = "#4D5257";
      ring.style.borderColor = "#4D5257";
      const label = ring.querySelector<HTMLSpanElement>("[data-cursor-label]");
      if (label) {
        label.textContent = text;
        label.style.opacity = text ? "1" : "0";
      }
      dot.style.opacity = "0";
    };
    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.marginTop = "-18px";
      ring.style.marginLeft = "-18px";
      ring.style.background = "transparent";
      ring.style.borderColor = "rgba(77,82,87,0.6)";
      const label = ring.querySelector<HTMLSpanElement>("[data-cursor-label]");
      if (label) {
        label.textContent = "";
        label.style.opacity = "0";
      }
      dot.style.opacity = "1";
    };

    const attach = () => {
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor-hover]").forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — terracotta, follows instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginTop: -3,
          marginLeft: -3,
          borderRadius: "50%",
          background: "#BC7856",
          zIndex: 10000,
          pointerEvents: "none",
          willChange: "transform",
          transition: "opacity 0.15s ease",
        }}
      />

      {/* Ring — lerped, expands on hover */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          marginTop: -18,
          marginLeft: -18,
          borderRadius: "50%",
          border: "1px solid rgba(77,82,87,0.6)",
          background: "transparent",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          display: "grid",
          placeItems: "center",
          transition:
            "width 0.3s cubic-bezier(0.2,0.8,0.2,1), height 0.3s cubic-bezier(0.2,0.8,0.2,1), margin 0.3s cubic-bezier(0.2,0.8,0.2,1), background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <span
          data-cursor-label
          style={{
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: 9,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#F7F6F4",
            opacity: 0,
            whiteSpace: "nowrap",
            userSelect: "none",
            transition: "opacity 0.2s ease",
          }}
        />
      </div>
    </>
  );
}
