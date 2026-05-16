'use client';

import { motion } from 'framer-motion';
import { LOCATIONS } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Footer() {
  return (
    <footer id="locations" className="w-full bg-[#050505] pt-32 pb-8 px-4 border-t border-[#1a1a1a] relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        
        {/* Brand Side */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-start justify-between">
          <div>
            {/* Using mix-blend-screen to remove white background from the logo */}
            <div className="bg-black inline-block mix-blend-screen mb-8">
              <Image 
                src="/images/logo-light.png" 
                alt="Susi Pizza" 
                width={120} 
                height={120} 
                className="opacity-90" 
                unoptimized 
              />
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-[#F5F0E8] mb-6 tracking-tight leading-tight">
              Crafted in Ranchi.<br/>
              <span className="italic font-light opacity-80">Loved by all.</span>
            </h3>
            <p className="text-[#888780] max-w-md mb-12 text-lg font-light leading-relaxed">
              We bring the heat, you bring the appetite. Join us at one of our locations for a cosmic slice of heaven.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <MagneticButton>
              <a href="https://zomato.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-[#cb202d] text-white hover:shadow-[0_0_20px_rgba(203,32,45,0.4)] transition-all font-mono text-xs tracking-widest uppercase border border-[#cb202d]">
                Zomato
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://swiggy.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-[#fc8019] text-white hover:shadow-[0_0_20px_rgba(252,128,25,0.4)] transition-all font-mono text-xs tracking-widest uppercase border border-[#fc8019]">
                Swiggy
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-[#25D366] text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all font-mono text-xs tracking-widest uppercase border border-[#25D366]">
                WhatsApp
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="tel:+919876543210" className="px-6 py-3 rounded-full bg-transparent text-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-black transition-all font-mono text-xs tracking-widest uppercase border border-[#F5F0E8]/30">
                Call Us
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Locations Side - Typographic Approach */}
        <div className="col-span-1 md:col-span-5 md:col-start-8 flex flex-col justify-start">
          <h4 className="text-[#D85A30] font-mono tracking-[0.3em] uppercase text-sm mb-12">
            Our Locations
          </h4>
          
          <div className="flex flex-col gap-12">
            {LOCATIONS.map((loc, i) => (
              <motion.div 
                key={loc.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group border-b border-[#1a1a1a] pb-8 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#D85A30] animate-pulse" />
                    <span className="text-xs font-mono tracking-widest text-[#F5F0E8]/60 uppercase">Open Now</span>
                  </div>
                  
                  {/* Google Maps Directions Button */}
                  <a 
                    href={loc.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-mono tracking-widest text-[#D85A30] uppercase hover:text-[#F5F0E8] transition-colors flex items-center gap-2 border border-[#D85A30]/30 px-4 py-2 rounded-full hover:bg-[#D85A30]/10"
                  >
                    Get Directions ↗
                  </a>
                </div>
                
                {/* Google Search Link for the Outlet */}
                <a href={loc.searchUrl} target="_blank" rel="noreferrer" className="block cursor-pointer">
                  <h4 className="text-3xl text-[#F5F0E8] font-serif mb-2 group-hover:text-[#D85A30] transition-colors">
                    {loc.name} Outlet
                  </h4>
                  <p className="text-[#888780] font-light max-w-sm group-hover:text-[#aaa] transition-colors">
                    {loc.address}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Footer Typography */}
      <div className="w-full mt-32 relative flex items-center justify-center overflow-hidden">
        <h1 className="text-[18vw] font-serif text-[#111] leading-none tracking-tighter whitespace-nowrap select-none">
          SUSI PIZZA
        </h1>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none" />
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between text-[#444] text-xs font-mono tracking-widest uppercase">
        <p>© {new Date().getFullYear()} Susi Pizza. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F5F0E8] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
