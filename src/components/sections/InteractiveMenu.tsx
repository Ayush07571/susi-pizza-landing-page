'use client';

import { usePizzaStore } from '@/hooks/usePizzaStore';
import { TOPPINGS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import PizzaGame from '@/components/ui/PizzaGame';

export default function InteractiveMenu() {
  const { selectedToppings, toggleTopping, totalPrice } = usePizzaStore();

  return (
    <section className="w-full bg-[#0a0a0a] py-32 px-4 relative z-10 border-t border-[#222]/30 overflow-hidden">
      {/* Background glow behind the menu */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#D85A30]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-[#F5F0E8] mb-6"
          >
            Craft Your Cosmic Slice
          </motion.h2>
          <p className="text-[#888780] text-lg max-w-2xl mx-auto">Select your ingredients below to visualize your custom order.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-center">
          
          {/* Pizza Visualizer Stack wrapped in a 3D Tilt Card */}
          <div className="w-full max-w-[600px] lg:w-1/2 flex items-center justify-center">
            <TiltCard className="w-full aspect-square relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 bg-[#D85A30]/10 rounded-full blur-[80px] scale-90 -z-10" />
                
                {/* The Base Pizza */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Image 
                    src="/images/pizza-hero.png" 
                    alt="Base Pizza" 
                    fill 
                    className="object-contain mix-blend-screen" 
                    unoptimized 
                    priority
                  />
                </div>

                {/* Topping Layers */}
                <AnimatePresence>
                  {TOPPINGS.map((topping) => {
                    if (!selectedToppings.includes(topping.id)) return null;
                    
                    // Fixed scatter positions for a realistic look
                    const positions = [
                      { top: '25%', left: '40%', rotate: 12 },
                      { top: '50%', left: '25%', rotate: -45 },
                      { top: '65%', left: '60%', rotate: 80 },
                      { top: '35%', left: '65%', rotate: -15 },
                    ];

                    return positions.map((pos, i) => (
                      <motion.div
                        key={`${topping.id}-${i}`}
                        initial={{ opacity: 0, scale: 2, y: -100, rotate: pos.rotate - 45 }}
                        animate={{ opacity: 1, scale: 0.3, y: 0, rotate: pos.rotate }}
                        exit={{ opacity: 0, scale: 0.5, y: 50, rotate: pos.rotate + 45 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20,
                          delay: i * 0.1 
                        }}
                        className="absolute w-full h-full z-20 pointer-events-none mix-blend-screen drop-shadow-2xl"
                        style={{ top: pos.top, left: pos.left, transformOrigin: 'top left' }}
                      >
                        <Image 
                          src={topping.image} 
                          alt={topping.name} 
                          fill 
                          className="object-contain mix-blend-screen drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]" 
                          unoptimized 
                        />
                      </motion.div>
                    ));
                  })}
                </AnimatePresence>
              </motion.div>
            </TiltCard>
          </div>

          {/* Builder Controls */}
          <div className="w-full lg:w-1/2 flex flex-col items-start bg-[#111]/80 backdrop-blur-3xl p-10 rounded-[2rem] border border-[#222]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
            <h3 className="text-3xl text-[#F5F0E8] font-serif mb-8">Ingredients</h3>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {TOPPINGS.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <MagneticButton key={topping.id}>
                    <div
                      onClick={() => toggleTopping(topping.id, topping.price)}
                      className={`px-6 py-3 rounded-2xl border transition-all duration-300 font-medium ${
                        isSelected 
                          ? 'bg-[#D85A30] border-[#D85A30] text-white shadow-[0_8px_20px_rgba(216,90,48,0.3)]' 
                          : 'bg-[#1a1a1a] border-[#333] text-[#888780] hover:border-[#D85A30]/50 hover:text-[#F5F0E8]'
                      }`}
                    >
                      {topping.name} <span className="text-sm opacity-60 ml-2">+₹{topping.price}</span>
                    </div>
                  </MagneticButton>
                );
              })}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#333] via-[#333] to-transparent mb-8" />

            {/* Game & Ordering Section */}
            <div className="w-full flex flex-col gap-6 mt-auto">
              <PizzaGame />
              
              <div className="flex gap-4 w-full">
                <a href="https://www.zomato.com" target="_blank" rel="noreferrer" className="flex-1 py-4 text-center bg-[#cb202d] hover:bg-[#a81621] text-white font-semibold rounded-xl transition-colors shadow-lg">
                  Order on Zomato
                </a>
                <a href="https://www.swiggy.com" target="_blank" rel="noreferrer" className="flex-1 py-4 text-center bg-[#fc8019] hover:bg-[#d9670b] text-white font-semibold rounded-xl transition-colors shadow-lg">
                  Order on Swiggy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
