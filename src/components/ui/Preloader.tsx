'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll during preload
    document.body.style.overflow = 'hidden';

    let current = 0;
    const updateProgress = () => {
      current += Math.random() * 15;
      if (current > 100) current = 100;
      setProgress(Math.floor(current));

      if (current < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Animation sequence when 100% is reached
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = 'auto';
            if (loaderRef.current) loaderRef.current.style.display = 'none';
          }
        });

        tl.to(textRef.current, { y: -50, opacity: 0, duration: 0.5, ease: 'power3.in' })
          .to(percentRef.current, { y: -50, opacity: 0, duration: 0.5, ease: 'power3.in' }, "-=0.4")
          .to(loaderRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: 'expo.inOut'
          }, "+=0.2");
      }
    };

    setTimeout(() => {
      requestAnimationFrame(updateProgress);
    }, 500);

  }, []);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center text-[#F5F0E8] overflow-hidden"
    >
      <div className="relative overflow-hidden mb-4">
        <div ref={textRef} className="text-4xl md:text-6xl font-serif tracking-widest text-[#D85A30]">
          SUSI PIZZA
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div ref={percentRef} className="text-xl font-mono tracking-widest opacity-80">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
