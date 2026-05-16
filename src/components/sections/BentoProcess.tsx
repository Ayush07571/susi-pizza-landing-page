'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TiltCard from '@/components/ui/TiltCard';

const ProcessCard = ({ 
  title, 
  desc, 
  img, 
  colSpan = 1, 
  delay = 0 
}: { 
  title: string; 
  desc: string; 
  img: string; 
  colSpan?: number;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`${colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}`}
  >
    <TiltCard className="w-full h-full">
      <div className="group relative w-full h-full rounded-[2rem] overflow-hidden bg-[#111] border border-[#222]/50 shadow-2xl aspect-square md:aspect-auto min-h-[400px]">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="w-12 h-[2px] bg-[#D85A30] mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <h3 className="text-3xl font-serif text-[#F5F0E8] mb-3">{title}</h3>
          <p className="text-[#888780] max-w-sm">{desc}</p>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

export default function BentoProcess() {
  return (
    <section className="w-full bg-[#0a0a0a] py-32 px-4 relative z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D85A30]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-[#F5F0E8] mb-6"
          >
            The Artisan Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#888780] text-lg max-w-2xl"
          >
            Every pizza is a masterpiece born from patience, passion, and fire. Step into our kitchen and see how magic happens.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProcessCard 
            title="The Dough" 
            desc="Slow-fermented for 48 hours to achieve the perfect airy, crisp, and chewy crust. Hand-tossed to perfection."
            img="/images/station-dough.png"
            delay={0.1}
          />
          <ProcessCard 
            title="The Sauce" 
            desc="San Marzano tomatoes, fresh basil, and a pinch of salt. Nothing more, nothing less. Pure Italian tradition."
            img="/images/station-sauce.png"
            delay={0.2}
          />
          <ProcessCard 
            title="The Wood-Fired Oven" 
            desc="Blistered and baked at 450°C in our custom stone oven. A smoky kiss of fire in 90 seconds."
            img="/images/station-oven.png"
            colSpan={2}
            delay={0.3}
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#D85A30] rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden min-h-[400px] shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
            
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 relative z-10 leading-tight">Quality without compromise.</h3>
            <p className="text-white/80 relative z-10 text-lg">We source our ingredients locally in Ranchi when possible, and import the finest cheeses to guarantee a world-class taste.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
