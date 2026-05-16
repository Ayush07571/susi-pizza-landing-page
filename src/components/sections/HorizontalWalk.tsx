'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import LiquidImage from '@/components/canvas/LiquidImage';

const stations = [
  { id: 'dough', title: '01. The Dough', desc: 'Slow-fermented for 48 hours to achieve the perfect airy, crisp crust.', img: '/images/station-dough.png' },
  { id: 'sauce', title: '02. The Sauce', desc: 'San Marzano tomatoes, fresh basil, and a pinch of salt. Pure Italian tradition.', img: '/images/station-sauce.png' },
  { id: 'oven', title: '03. The Oven', desc: 'Blistered and baked at 450°C in our custom stone oven. A smoky kiss of fire.', img: '/images/station-oven.png' },
];

export default function HorizontalWalk() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !scrollWrapperRef.current) return;

    const sections = gsap.utils.toArray(scrollWrapperRef.current.children);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + scrollWrapperRef.current!.offsetWidth
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full md:h-screen bg-black overflow-hidden border-t border-[#1a1a1a]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#D85A30]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <h2 className="text-2xl md:text-5xl font-serif text-[#F5F0E8] opacity-20 uppercase tracking-widest">The Artisan Walk</h2>
      </div>

      <div ref={scrollWrapperRef} className="flex flex-col md:flex-row h-full w-full md:w-[300vw] py-20 md:py-0">
        {stations.map((station) => (
          <div key={station.id} className="w-full md:w-[100vw] h-full flex items-center justify-center p-6 md:p-20 relative mb-20 md:mb-0">
            
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10">
              
              <div className="w-full md:w-1/2 aspect-square md:h-[70vh] relative rounded-3xl overflow-hidden shadow-2xl border border-[#222]">
                <LiquidImage 
                  src={station.img} 
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-5xl md:text-8xl font-serif text-[#F5F0E8] mb-6 whitespace-nowrap">{station.title}</h3>
                <p className="text-lg md:text-2xl text-[#888780] max-w-lg font-light leading-relaxed">{station.desc}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
