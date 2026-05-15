"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* Placeholder type — will be replaced with Sanity type once data flows */
interface ProjectPreview {
  slug: string;
  title: string;
  location: string;
  year: number;
  coverImage: string;
  videoAmbient?: string;
}

interface ProjectsGridProps {
  projects?: ProjectPreview[];
}

export default function ProjectsGrid({ projects = [] }: ProjectsGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t          = useTranslations("projects");
  const locale     = useLocale();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} className="px-8 md:px-20 py-24">
      <span className="font-body text-xs tracking-[0.3em] text-sand-beige uppercase mb-12 block">
        {t("label")}
      </span>

      {projects.length === 0 ? (
        /* Placeholder shown before content is loaded in Sanity */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`bg-warm-grey aspect-[4/3] ${i === 1 ? "md:col-span-2 aspect-[16/7]" : ""}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              large={i === 0}
              viewLabel={t("view")}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({
  project,
  locale,
  large,
  viewLabel,
}: {
  project: ProjectPreview;
  locale: string;
  large: boolean;
  viewLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className={`project-card group relative overflow-hidden opacity-0 ${
        large ? "md:col-span-2 aspect-[16/7]" : "aspect-[4/3]"
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Cover image */}
      {project.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Ambient video on hover */}
      {project.videoAmbient && (
        <video
          ref={videoRef}
          src={project.videoAmbient}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-technical-grey/20 group-hover:bg-technical-grey/10 transition-colors duration-500" />

      {/* Info */}
      <div className="absolute bottom-6 left-6 right-6 text-off-white">
        <p className="font-body text-xs tracking-widest uppercase text-off-white/60 mb-1">
          {project.location} · {project.year}
        </p>
        <h3 className="font-display font-light text-2xl md:text-3xl">
          {project.title}
        </h3>
      </div>

      {/* View label */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-body text-xs tracking-widest uppercase text-off-white border border-off-white/40 px-3 py-1">
          {viewLabel}
        </span>
      </div>
    </Link>
  );
}