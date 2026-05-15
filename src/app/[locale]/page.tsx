"use client";

import { useTranslations } from "next-intl";
import HeroVideo from "@/components/home/HeroVideo";
import StudioChapter from "@/components/home/StudioChapter";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import ServicesSection from "@/components/home/ServicesSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main>
      <HeroVideo />
      <StudioChapter />
      <ProjectsGrid />
      <ServicesSection />
      <ContactCTA />
    </main>
  );
}
