'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import LiquidImage from '@/components/canvas/LiquidImage';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const susiTextRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !maskLayerRef.current || !susiTextRef.current || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 viewport heights to allow the zoom
          scrub: 1,
          pin: true,
        }
      });

      // 1. Scale the SUSI text up massively
      tl.to(susiTextRef.current, {
        scale: 60, 
        ease: "power3.in",
        duration: 0.8
      }, 0);

      // 2. Fade out the black mask entirely BEFORE the black gaps cover the screen
      tl.to(maskLayerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0.4);

      // 3. Fade in the "Wood-Fired Perfection" hero content
      tl.fromTo(heroContentRef.current, 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 1. Base Layer: The Liquid Kitchen Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidImage 
          src="/images/kitchen-bg.png" 
          className="w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
      </div>

      {/* 2. The Hero Content (Revealed after zoom) */}
      <div 
        ref={heroContentRef} 
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full max-w-5xl mx-auto opacity-0"
      >
        <p className="text-sm md:text-base text-[#D85A30] font-mono tracking-[0.4em] uppercase mb-8 drop-shadow-md">
          The Susi Experience
        </p>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#F5F0E8] leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
          Fire-Kissed.<br/>
          <span className="italic font-light opacity-90">Beyond Pizza.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#888780] max-w-xl mb-12 font-light drop-shadow-md">
          From Ranchi&apos;s most iconic wood-fired pizzas to gourmet smashed burgers and bespoke artisanal cakes. We don&apos;t just cook; we craft.
        </p>

        <MagneticButton>
          <a 
            href="#menu" 
            data-cursor="ORDER"
            className="px-12 py-5 bg-transparent text-[#F5F0E8] rounded-full font-mono tracking-widest text-sm uppercase border border-[#F5F0E8]/30 hover:bg-[#F5F0E8] hover:text-black transition-colors duration-500 backdrop-blur-md inline-block"
          >
            Order Now
          </a>
        </MagneticButton>
      </div>

      {/* 3. The Masking Layer (Starts on top, scales up) */}
      <div 
        ref={maskLayerRef} 
        className="absolute inset-0 z-50 flex items-center justify-center bg-black mix-blend-multiply pointer-events-none"
      >
        <h1 
          ref={susiTextRef} 
          className="text-[25vw] md:text-[20vw] font-serif text-white leading-none tracking-tighter origin-center"
        >
          SUSI
        </h1>
      </div>

    </section>
  );
}
