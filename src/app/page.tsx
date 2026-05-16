'use client';

import { useEffect } from 'react';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import Navbar from '@/components/ui/Navbar';
import Marquee from '@/components/ui/Marquee';
import HeroMaskScroll from '@/components/sections/HeroMaskScroll';
import HeroSection from '@/components/sections/HeroSection';
import Heritage from '@/components/sections/Heritage';
import HorizontalWalk from '@/components/sections/HorizontalWalk';
import LuxuryMenu from '@/components/sections/LuxuryMenu';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay to allow the page transition overlay to clear
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
    }
  }, []);

  return (
    <main className="w-full bg-[#0a0a0a] min-h-screen text-[#F5F0E8] overflow-x-hidden">
      <Navbar />
      {/* 1. Zoom mask integrated with Luxury Hero */}
      <HeroSection />
      {/* 3. Infinite scrolling marquee */}
      <Marquee text="HAND ROLLED DAILY • WOOD FIRED • GOURMET BURGERS • ARTISANAL CAKES • RANCHI • FRESH INGREDIENTS •" />
      <Heritage />
      {/* 4. GSAP horizontal pinning gallery */}
      <HorizontalWalk />
      {/* 5. Luxury hover menu */}
      <LuxuryMenu />
      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
