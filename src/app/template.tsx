'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Cinematic Transition Overlay */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden pointer-events-none"
        >
          <div className="relative w-full h-full opacity-20">
             <Image 
                src="/images/kitchen-bg.png" 
                alt="Transition" 
                fill 
                className="object-cover blur-sm"
                unoptimized
             />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <h2 className="absolute text-3xl font-serif text-[#F5F0E8] tracking-[0.2em] uppercase italic">
             Loading Universe...
          </h2>
        </motion.div>

        {children}

        {/* Exit Overlay (Slide Up) */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "100%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] pointer-events-none"
        />
      </motion.div>
    </AnimatePresence>
  );
}
