"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorCustom() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const move = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const expand = () => gsap.to(ring, { scale: 2.5, duration: 0.3 });
    const shrink = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);
    document
      .querySelectorAll("a, button, [data-cursor]")
      .forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-technical-grey" />
      </div>
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-8 h-8 rounded-full border border-technical-grey opacity-50" />
      </div>
    </>
  );
}