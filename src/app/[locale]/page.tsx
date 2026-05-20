"use client";

import HeroVideo       from "@/components/home/HeroVideo";
import AtelierFragment from "@/components/home/AtelierFragment";
import Marquee         from "@/components/ui/Marquee";
import StudioChapter   from "@/components/home/StudioChapter";
import MaterialEcho    from "@/components/home/MaterialEcho";
import ServicesSection from "@/components/home/ServicesSection";
import BeginSection    from "@/components/home/BeginSection";
import Footer          from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <main>
      <HeroVideo />
      <AtelierFragment />
      <Marquee />
      <StudioChapter />
      <MaterialEcho />
      <ServicesSection />
      <BeginSection />
      <Footer />
    </main>
  );
}
