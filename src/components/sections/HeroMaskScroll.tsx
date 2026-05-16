'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroMaskScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // The classic Awwwards "Zoom through text" mask effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 viewport heights
          scrub: 1,
          pin: true,
        }
      });

      tl.to(textRef.current, {
        scale: 100, // Zoom the text infinitely
        opacity: 0,
        ease: "power2.inOut"
      }, 0)
      .to(imageRef.current, {
        scale: 1, // Image starts slightly scaled up and resolves to 1
        filter: "blur(0px) brightness(1)",
        ease: "power2.inOut"
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Image that will resolve */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-0 scale-[1.2] blur-[10px] brightness-50"
      >
        <Image 
          src="/images/kitchen-bg.png" 
          alt="Kitchen" 
          fill 
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* The massive masking text */}
      <h1 
        ref={textRef} 
        className="relative z-10 text-[15vw] font-serif text-[#F5F0E8] leading-none tracking-tighter whitespace-nowrap mix-blend-overlay font-bold origin-center"
      >
        SUSI
      </h1>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F5F0E8] flex flex-col items-center gap-2 z-20">
        <span className="text-[10px] tracking-[0.3em] uppercase">Enter the Universe</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  );
}
