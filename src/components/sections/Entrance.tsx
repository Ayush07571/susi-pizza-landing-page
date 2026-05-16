'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Entrance() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current && sectionRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent pointer-events-none">
      <div className="absolute inset-0 z-0 bg-black/50">
        {/* REPLACE: owner to swap with real photo */}
        <Image 
          src="/images/entrance-hero-bg.png" 
          alt="Entrance Background" 
          fill 
          className="object-cover opacity-30" 
          priority 
          unoptimized 
        />
      </div>
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center">
        {/* REPLACE: owner to swap with real photo */}
        <Image 
          src="/images/logo-dark.png" 
          alt="Susi Pizza Logo" 
          width={200} 
          height={200} 
          className="mb-8"
          priority
          unoptimized
        />
        <h1 className="text-4xl md:text-6xl font-serif text-[#F5F0E8] mb-4 tracking-wider">SUSI PIZZA</h1>
        <p className="text-xl md:text-2xl text-[#D85A30] font-light">Crafted in Ranchi. Loved by all.</p>
      </div>
    </section>
  );
}
