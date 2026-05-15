"use client";

import { useTranslations } from "next-intl";
import HeroVideo from "@/components/home/HeroVideo";
import Marquee from "@/components/ui/Marquee";
import StudioChapter from "@/components/home/StudioChapter";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import ServicesSection from "@/components/home/ServicesSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main>
      <HeroVideo />
      <Marquee />
      <StudioChapter />
      <ProjectsGrid />
      <ServicesSection />
      <ContactCTA />
    </main>
  );
}
