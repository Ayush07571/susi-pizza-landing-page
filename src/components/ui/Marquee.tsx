'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Marquee({ text }: { text: string }) {
  const container = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let xPercent = 0;
    let direction = -1;
    let animationFrameId: number;

    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }
      
      if (text1.current && text2.current) {
        gsap.set(text1.current, { xPercent: xPercent });
        gsap.set(text2.current, { xPercent: xPercent });
      }
      
      xPercent += 0.05 * direction;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={container} className="relative w-full overflow-hidden flex whitespace-nowrap bg-[#D85A30] py-6 z-20 border-y border-[#F5F0E8]/10">
      <div ref={text1} className="relative flex whitespace-nowrap text-4xl md:text-5xl font-serif text-[#F5F0E8] uppercase tracking-widest px-8">
        {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp;
      </div>
      <div ref={text2} className="relative flex whitespace-nowrap text-4xl md:text-5xl font-serif text-[#F5F0E8] uppercase tracking-widest px-8 absolute left-[100%] top-0">
        {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp;
      </div>
    </div>
  );
}
