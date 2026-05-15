"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrubberProps {
  src: string;
  children?: React.ReactNode;
}

export default function VideoScrubber({ src, children }: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();

    /* Wait for metadata so duration is available */
    const setup = () => {
      const ctx = gsap.context(() => {
        /* Scrub video currentTime with scroll */
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = video.duration * self.progress;
            }
          },
        });

        /* Fade in text overlay */
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: container,
              start: "top+=20% top",
              end: "top+=40% top",
              scrub: true,
            },
          }
        );
      }, container);

      return () => ctx.revert();
    };

    if (video.readyState >= 1) {
      return setup();
    }
    video.addEventListener("loadedmetadata", setup, { once: true });
  }, [src]);

  return (
    <div
      ref={containerRef}
      /* Height controls scroll distance = more height = more scroll needed to advance frames */
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay text */}
        <div
          ref={textRef}
          className="absolute inset-0 flex items-end pb-16 px-8 md:px-20 opacity-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
}