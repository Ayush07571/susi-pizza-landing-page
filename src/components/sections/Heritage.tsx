'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Heritage() {
  return (
    <section className="relative w-full py-32 bg-[#050505] text-[#F5F0E8] overflow-hidden border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Narrative: The Pizza Foundation */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
          <div className="w-full md:w-1/2 relative aspect-[4/5] overflow-hidden rounded-2xl group" data-cursor="PROCESS">
            <Image 
              src="/images/kitchen-bg.png" 
              alt="The Oven" 
              fill 
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
              unoptimized 
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-sm font-mono tracking-[0.3em] text-[#D85A30] uppercase mb-8">The Foundation</h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-tight mb-8">Honest Fire.<br /><span className="italic font-light opacity-80">Honest Ingredients.</span></h3>
            <div className="flex flex-col gap-6 text-[#888780] font-light text-lg leading-relaxed">
              <p>We don't rely on ancient secrets. We believe that a truly great pizza comes down to fresh dough rolled daily and the blistering heat of our wood-fired oven.</p>
            </div>
          </div>
        </div>

        {/* Bottom Narrative: The Sweet & Savory Side */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="w-full md:w-1/2 relative aspect-[4/5] overflow-hidden rounded-2xl group" data-cursor="SWEET">
            <Image 
              src="/images/menu-cake.jpg" 
              alt="Bespoke Cakes" 
              fill 
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
              unoptimized 
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-sm font-mono tracking-[0.3em] text-[#D85A30] uppercase mb-8">Beyond Pizza</h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-tight mb-8">Bespoke Cakes.<br /><span className="italic font-light opacity-80">Gourmet Burgers.</span></h3>
            <div className="flex flex-col gap-6 text-[#888780] font-light text-lg leading-relaxed">
              <p>Our passion for craft doesn't stop at the oven door. From multi-layered artisanal chocolate truffle cakes to gourmet smashed burgers, we apply the same "made-from-scratch" philosophy to everything we serve.</p>
              <p>Susi Pizza is Ranchi's destination for every craving, crafted with the same love and precision.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
