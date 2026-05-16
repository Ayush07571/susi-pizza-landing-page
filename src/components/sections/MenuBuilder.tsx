'use client';

import { usePizzaStore } from '@/hooks/usePizzaStore';
import { TOPPINGS } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

export default function MenuBuilder() {
  const { selectedToppings, toggleTopping, totalPrice } = usePizzaStore();
  const { isMobile } = useDeviceDetect();

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center py-20 px-4 z-20 pointer-events-none">
      <div className="absolute inset-0 z-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center pointer-events-none">
        
        {/* Visual Pizza Builder - Only visible on Mobile since Desktop uses the 3D Canvas */}
        <div className={`relative w-full md:w-1/2 aspect-square max-w-[500px] ${isMobile ? 'block' : 'opacity-0'}`}>
          <Image src="/images/menu-pizza-base.png" alt="Base" fill className="object-contain" unoptimized />
          {TOPPINGS.map((topping) => (
            <motion.div
              key={topping.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: selectedToppings.includes(topping.id) ? 1 : 0, scale: selectedToppings.includes(topping.id) ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image src={topping.image} alt={topping.name} fill className="object-contain" unoptimized />
            </motion.div>
          ))}
        </div>

        {/* Menu Controls */}
        <div className="w-full md:w-1/2 flex flex-col items-start bg-[#111]/90 backdrop-blur-md p-8 rounded-2xl border border-[#D85A30]/20 pointer-events-auto shadow-2xl">
          <h2 className="text-4xl text-[#F5F0E8] font-serif mb-8">Build Your Universe</h2>
          <p className="text-[#888780] mb-8">Tap the floating toppings to add or remove them from your pizza.</p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            {TOPPINGS.map((topping) => {
              const isSelected = selectedToppings.includes(topping.id);
              return (
                <button
                  key={topping.id}
                  onClick={() => toggleTopping(topping.id, topping.price)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    isSelected 
                      ? 'bg-[#D85A30] border-[#D85A30] text-white' 
                      : 'bg-transparent border-[#888780] text-[#888780] hover:border-[#D85A30] hover:text-[#D85A30]'
                  }`}
                >
                  {topping.name} <span className="text-sm opacity-80">+₹{topping.price}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-auto">
            <div className="relative w-[100px] h-[60px]">
              <Image src="/images/price-tag.svg" alt="Price Tag" fill className="object-contain" unoptimized />
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                ₹{totalPrice}
              </div>
            </div>
            <p className="text-[#888780] text-sm">Base price ₹149 included</p>
          </div>
        </div>
      </div>
    </section>
  );
}
