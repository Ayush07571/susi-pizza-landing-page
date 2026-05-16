'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Helper to determine link path
  const getPath = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <div className="relative">
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || isOpen ? 'bg-[#0a0a0a]/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative h-8 w-32 cursor-pointer z-[101]">
            <Image 
              src="/images/logo-light.png" 
              alt="Susi Pizza" 
              fill 
              className="object-contain object-left mix-blend-screen" 
              unoptimized
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-[#F5F0E8] text-sm font-medium tracking-wider">
            <Link href="/" className="hover:text-[#D85A30] transition-colors">HOME</Link>
            <Link href="/about" className="hover:text-[#D85A30] transition-colors">OUR STORY</Link>
            <a href={getPath('#menu')} className="hover:text-[#D85A30] transition-colors">MENU</a>
            <a href={getPath('#locations')} className="hover:text-[#D85A30] transition-colors">LOCATIONS</a>
          </div>

          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-[101]"
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-[#F5F0E8]" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-[#F5F0E8]" />
            <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-[#F5F0E8]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-[#0a0a0a] flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-8 text-center">
              <Link href="/" className="text-4xl font-serif hover:text-[#D85A30]">HOME</Link>
              <Link href="/about" className="text-4xl font-serif hover:text-[#D85A30]">OUR STORY</Link>
              <a href={getPath('#menu')} onClick={() => setIsOpen(false)} className="text-4xl font-serif hover:text-[#D85A30]">MENU</a>
              <a href={getPath('#locations')} onClick={() => setIsOpen(false)} className="text-4xl font-serif hover:text-[#D85A30]">LOCATIONS</a>
            </div>
            
            <div className="mt-20 flex gap-10">
               <a href="tel:+919876543210" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D85A30] hover:border-[#D85A30] transition-all group">
                 <Phone className="w-6 h-6 text-[#F5F0E8] group-hover:scale-110 transition-transform" />
               </a>
               <a href="wa.me/919876543210" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all group">
                 <MessageCircle className="w-6 h-6 text-[#F5F0E8] group-hover:scale-110 transition-transform" />
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
