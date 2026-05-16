'use client';

import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import Image from 'next/image';

const stations = [
  { id: 'dough', title: 'The Dough', img: '/images/station-dough.png' },
  { id: 'sauce', title: 'The Sauce', img: '/images/station-sauce.png' },
  { id: 'oven', title: 'The Oven', img: '/images/station-oven.png' },
];

export default function KitchenWalk() {
  const { isMobile } = useDeviceDetect();
  const progress = useScrollProgress();
  const [activeStation, setActiveStation] = useState(0);

  useEffect(() => {
    if (progress > 0.45 && progress < 0.65) {
      const localProgress = (progress - 0.45) / 0.2;
      if (localProgress < 0.33) setActiveStation(0);
      else if (localProgress < 0.66) setActiveStation(1);
      else setActiveStation(2);
    }
  }, [progress]);

  if (isMobile) {
    return (
      <section className="w-full flex flex-col gap-8 py-20 bg-[#0a0a0a] px-4">
        {stations.map((s) => (
          <div key={s.id} className="relative w-full h-[40vh] rounded-xl overflow-hidden shadow-2xl">
            <Image src={s.img} alt={s.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-3xl text-[#F5F0E8] font-serif">{s.title}</h3>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="relative w-full h-[200vh] pointer-events-none">
      <div className="sticky top-0 w-full h-screen flex items-center justify-end pr-[10%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStation}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-[400px] h-[500px] bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#D85A30]/30 shadow-2xl pointer-events-auto"
          >
            <div className="relative w-full h-2/3">
              <Image src={stations[activeStation].img} alt={stations[activeStation].title} fill className="object-cover" unoptimized />
            </div>
            <div className="p-8 flex flex-col justify-center h-1/3">
              <h3 className="text-3xl text-[#F5F0E8] font-serif">{stations[activeStation].title}</h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
