"use client";

// Adapted from cult-ui canvas-fractal-grid — motion/react → framer-motion
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface GradientStop  { color: string; position: number }
interface GradientType  { stops: GradientStop[]; centerX: number; centerY: number }

interface Props {
  dotSize?:                 number;
  dotSpacing?:              number;
  dotOpacity?:              number;
  gradientAnimationDuration?: number;
  waveIntensity?:           number;
  waveRadius?:              number;
  gradients?:               GradientType[];
  dotColor?:                string;
  glowColor?:               string;
  enableNoise?:             boolean;
  noiseOpacity?:            number;
  enableMouseGlow?:         boolean;
  enableGradient?:          boolean;
  className?:               string;
}

// ── Static noise overlay
const NoiseOverlay = ({ opacity }: { opacity: number }) => (
  <div className="absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="cfgn">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#cfgn)" />
    </svg>
  </div>
);

// ── Animated gradient background
const GradientLayer = React.memo(({ gradients, duration }: { gradients: GradientType[]; duration: number }) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      background: gradients.map(
        (g) => `radial-gradient(circle at ${g.centerX}% ${g.centerY}%, ${g.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
      ),
      transition: { duration, repeat: Infinity, repeatType: "reverse", ease: "linear" },
    });
  }, [controls, gradients, duration]);
  return <motion.div className="absolute inset-0 h-full w-full" animate={controls} />;
});
GradientLayer.displayName = "GradientLayer";

// ── Canvas dot grid
const DotCanvas = React.memo(({
  dotSize, dotSpacing, dotOpacity, waveIntensity, waveRadius,
  dotColor, glowColor, mousePos,
}: {
  dotSize: number; dotSpacing: number; dotOpacity: number;
  waveIntensity: number; waveRadius: number;
  dotColor: string; glowColor: string;
  mousePos: { x: number; y: number };
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    const cols    = Math.ceil(width  / dotSpacing);
    const rows    = Math.ceil(height / dotSpacing);
    const centerX = mousePos.x * width;
    const centerY = mousePos.y * height;

    for (let i = 0; i < cols; i += 2) {
      for (let j = 0; j < rows; j += 2) {
        const x = i * dotSpacing;
        const y = j * dotSpacing;
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let dotX = x, dotY = y;

        if (dist < waveRadius) {
          const str = Math.pow(1 - dist / waveRadius, 2);
          const ang = Math.atan2(dy, dx);
          const off = Math.sin(dist * 0.05 - time * 0.005) * waveIntensity * str;
          dotX += Math.cos(ang) * off;
          dotY += Math.sin(ang) * off;
          const gr = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, dotSize * (1 + str));
          gr.addColorStop(0, glowColor.replace("1)", `${dotOpacity * (1 + str)})`));
          gr.addColorStop(1, glowColor.replace("1)", "0)"));
          ctx.fillStyle = gr;
        } else {
          ctx.fillStyle = dotColor.replace("1)", `${dotOpacity})`);
        }
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [dotSize, dotSpacing, dotOpacity, waveIntensity, waveRadius, dotColor, glowColor, mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let startTime: number | null = null;
    const loop = (time: number) => {
      if (!startTime) startTime = time;
      draw(ctx, time - startTime);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 1 }}
    />
  );
});
DotCanvas.displayName = "DotCanvas";

// ── Giina brand defaults
const GIINA_GRADIENTS: GradientType[] = [
  { stops: [{ color: "rgba(188,120,86,0.35)", position: 0 }, { color: "rgba(188,120,86,0)", position: 60 }], centerX: 20, centerY: 30 },
  { stops: [{ color: "rgba(77,82,87,0.4)",   position: 0 }, { color: "rgba(77,82,87,0)",   position: 70 }], centerX: 80, centerY: 70 },
  { stops: [{ color: "rgba(166,152,133,0.2)", position: 0 }, { color: "rgba(166,152,133,0)", position: 50 }], centerX: 50, centerY: 50 },
];

export default function CanvasFractalGrid({
  dotSize                  = 1.5,
  dotSpacing               = 28,
  dotOpacity               = 0.18,
  gradientAnimationDuration = 8,
  waveIntensity            = 6,
  waveRadius               = 180,
  gradients                = GIINA_GRADIENTS,
  dotColor                 = "rgba(77,82,87,1)",
  glowColor                = "rgba(188,120,86,1)",
  enableNoise              = true,
  noiseOpacity             = 0.04,
  enableMouseGlow          = true,
  enableGradient           = true,
  className                = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!enableMouseGlow) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [enableMouseGlow]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {enableGradient && <GradientLayer gradients={gradients} duration={gradientAnimationDuration} />}
      <DotCanvas
        dotSize={dotSize} dotSpacing={dotSpacing} dotOpacity={dotOpacity}
        waveIntensity={waveIntensity} waveRadius={waveRadius}
        dotColor={dotColor} glowColor={glowColor} mousePos={mousePos}
      />
      {enableNoise && <NoiseOverlay opacity={noiseOpacity} />}
    </div>
  );
}
