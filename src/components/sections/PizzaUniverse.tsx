'use client';

import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import Image from 'next/image';

export default function PizzaUniverse() {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="relative w-full h-[150vh] bg-transparent pointer-events-none">
      {isMobile && (
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
          <Image 
            src="/images/space-bg.png" 
            alt="Space" 
            fill 
            className="object-cover opacity-50 z-0" 
            unoptimized 
          />
          <div className="relative z-10 animate-pulse">
            <Image 
              src="/images/pizza-hero.png" 
              alt="Floating Pizza" 
              width={300} 
              height={300} 
              unoptimized 
            />
          </div>
          <p className="relative z-10 text-xl text-[#F5F0E8] mt-8 text-center px-4 font-serif">
            A universe of flavor awaits.
          </p>
        </div>
      )}
      {!isMobile && (
        <div className="sticky top-0 w-full h-screen flex items-end justify-center pb-24">
          <p className="text-3xl text-[#F5F0E8] font-serif tracking-widest drop-shadow-lg">
            ORBITING PERFECTION
          </p>
        </div>
      )}
    </section>
  );
}
