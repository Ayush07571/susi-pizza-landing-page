'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import LiquidImage from '@/components/canvas/LiquidImage';
import Image from 'next/image';

const CATEGORIES = ['Pizzas', 'Burgers', 'Pasta', 'Desserts'];

const MENU_DATA = {
  'Pizzas': [
    { id: 'paneer-tikka', name: 'Paneer Tikka Pizza', desc: 'A well baked pizza filled with paneer tikka and topped with eons of cheese.', price: '₹229', img: '/images/topping-paneer.png' },
    { id: 'veg-mix-deluxe', name: 'Veg Mix Deluxe', desc: 'A mouth-watering medley of various veggies atop a perfect crust.', price: '₹249', img: '/images/topping-tomato.png' },
    { id: 'tandoori-paneer-10', name: 'Tandoori Paneer (10")', desc: 'Deliciously marinated paneer topped on a medium-size crust, infused with traditional tandoori flavors.', price: '₹399', img: '/images/pizza-hero.png' },
    { id: 'double-cheese-10', name: 'Double Cheese (10")', desc: 'Indulge in a mouthwatering 10" medium pizza generously topped with double layers of cheesy perfection.', price: '₹349', img: '/images/pizza-hero.png' },
    { id: 'mix-mushroom-paneer', name: 'Mix Mushroom Paneer', desc: 'Delectable fusion of earthy mushrooms and creamy paneer on a 10" medium pizza.', price: '₹429', img: '/images/topping-mushroom.png' },
    { id: 'baby-corn-7', name: '7" Baby Corn Pizza', desc: 'Enjoy the delightful flavors of our 7" baby corn pizza, perfect for a quick snack.', price: '₹149', img: '/images/topping-babycorn.png' },
    { id: 'spiced-paneer', name: 'Spiced Paneer Pizza', desc: 'Spiced coated paneer, capsicum, onion, tomato, and spicy red paprika.', price: '₹219', img: '/images/topping-paneer.png' },
  ],
  'Burgers': [
    { id: 'pizza-burger', name: 'The Pizza Burger', desc: 'A king size burger with mozzarella cheese and lots of paneer, onion, capsicum.', price: '₹149', img: '/images/menu-burger.jpg' },
    { id: 'aloo-tikki', name: 'Aloo Tikki Burger', desc: 'Indian style potato patties served with a tangy house sauce and fresh greens.', price: '₹89', img: '/images/menu-burger.jpg' },
  ],
  'Pasta': [
    { id: 'white-sauce', name: 'White Sauce Pasta', desc: 'Creamy, rich white sauce tossed with penne and a hint of garlic and herbs.', price: '₹199', img: '/images/menu-burger.jpg' /* REPLACE */ },
  ],
  'Desserts': [
    { id: 'choco-truffle-1lb', name: 'Choco Truffle (1lb)', desc: 'Indulge in the lusciousness of our Choco Truffle, a velvety chocolate treat.', price: '₹599', img: '/images/menu-cake.jpg' },
    { id: 'red-velvet-pastry', name: 'Red Velvet Pastry', desc: 'An exotic cake layered with cheese cream between special red velvet sponge.', price: '₹150', img: '/images/menu-pastry.jpg' },
    { id: 'choco-lava', name: 'Choco Lava', desc: 'The ultimate treat to melt-in-your-mouth-perfection with a rich chocoblast.', price: '₹99', img: '/images/menu-cake.jpg' },
    { id: 'blueberry-cake', name: 'Blueberry Cake', desc: 'Moist and delicious dessert featuring the sweet and tart flavors of blueberries.', price: '₹549', img: '/images/menu-cake.jpg' },
    { id: 'chocolate-pastry', name: 'Chocolate Pastry', desc: 'Dark chocolate sponge layered and finished in pure 54% cocoa ganache.', price: '₹130', img: '/images/menu-pastry.jpg' },
  ]
};

export default function LuxuryMenu() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof MENU_DATA>('Pizzas');
  const [activeItem, setActiveItem] = useState<(typeof MENU_DATA)['Pizzas'][0] | null>(null);

  useEffect(() => {
    // Only set a default item on desktop once on mount
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setActiveItem(MENU_DATA['Pizzas'][0]);
    }
  }, []);

  const handleCategoryChange = (cat: keyof typeof MENU_DATA) => {
    setActiveCategory(cat);
    // Reset selection for mobile, but keep a default for desktop
    setActiveItem(window.innerWidth >= 768 ? MENU_DATA[cat][0] : null);
  };

  return (
    <section id="menu" className="relative w-full min-h-screen bg-[#050505] py-32 px-4 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-32">
        
        {/* Left Side: Text List */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 border-b border-[#1a1a1a] pb-6 gap-6">
            <h2 className="text-sm font-mono tracking-[0.3em] text-[#D85A30] uppercase">
              The Menu
            </h2>
            
            {/* Category Tabs */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat as keyof typeof MENU_DATA)}
                  className={`text-sm md:text-base font-serif whitespace-nowrap transition-colors duration-300 ${
                    activeCategory === cat ? 'text-[#F5F0E8] border-b border-[#D85A30] pb-1' : 'text-[#555] hover:text-[#888]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8"
              >
                {MENU_DATA[activeCategory].map((item) => (
                  <div 
                    key={item.id}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 768) setActiveItem(item);
                    }}
                    onClick={() => {
                      if (window.innerWidth < 768) setActiveItem(item);
                    }}
                    className="group cursor-pointer border-b border-[#111] pb-8 relative"
                    data-cursor="VIEW"
                  >
                    {/* Highlight Indicator */}
                    <motion.div 
                      className={`absolute left-[-20px] top-4 w-1 h-8 rounded-full bg-[#D85A30] transition-opacity duration-500 ${activeItem?.id === item.id ? 'opacity-100' : 'opacity-0'}`} 
                    />

                    <div className="flex justify-between items-baseline mb-2 transition-transform duration-500 group-hover:translate-x-4">
                      <h3 className={`text-3xl md:text-5xl font-serif transition-colors duration-500 ${activeItem?.id === item.id ? 'text-[#F5F0E8]' : 'text-[#444]'}`}>
                        {item.name}
                      </h3>
                      <span className="text-xl font-mono text-[#D85A30] ml-4">{item.price}</span>
                    </div>
                    <p className={`max-w-md transition-all duration-500 group-hover:translate-x-4 ${activeItem?.id === item.id ? 'text-[#888780]' : 'text-[#333]'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Image Display & Ordering (Desktop Only) */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center sticky top-32 h-[80vh]">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center w-full"
              >
                <div className="relative w-full aspect-square max-w-lg rounded-3xl overflow-hidden bg-black shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#1a1a1a] mb-12">
                  <LiquidImage src={activeItem.img} className="w-full h-full opacity-80" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
                    <div>
                      <p className="text-[#888780] font-mono text-sm uppercase tracking-widest mb-2">{activeCategory}</p>
                      <p className="text-2xl font-serif text-[#F5F0E8]">{activeItem.name}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-lg grid grid-cols-2 gap-4">
                  <a href="https://www.zomato.com" target="_blank" rel="noreferrer" className="w-full" data-cursor="ORDER">
                    <MagneticButton className="w-full">
                      <div className="w-full py-4 text-center bg-[#cb202d] text-white font-medium rounded-2xl transition-all hover:shadow-[0_10px_30px_rgba(203,32,45,0.3)] text-sm">Zomato</div>
                    </MagneticButton>
                  </a>
                  <a href="https://www.swiggy.com" target="_blank" rel="noreferrer" className="w-full" data-cursor="ORDER">
                    <MagneticButton className="w-full">
                      <div className="w-full py-4 text-center bg-[#fc8019] text-white font-medium rounded-2xl transition-all hover:shadow-[0_10px_30px_rgba(252,128,25,0.3)] text-sm">Swiggy</div>
                    </MagneticButton>
                  </a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-full" data-cursor="CHAT">
                    <MagneticButton className="w-full">
                      <div className="w-full py-4 text-center bg-[#25D366] text-white font-medium rounded-2xl transition-all hover:shadow-[0_10px_30px_rgba(37,211,102,0.3)] text-sm">WhatsApp</div>
                    </MagneticButton>
                  </a>
                  <a href="tel:+919876543210" className="w-full" data-cursor="CALL">
                    <MagneticButton className="w-full">
                      <div className="w-full py-4 text-center bg-[#222] text-[#F5F0E8] font-medium rounded-2xl transition-all hover:bg-[#333] border border-[#333] text-sm">Call Us</div>
                    </MagneticButton>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                className="text-2xl font-serif text-[#F5F0E8] italic"
              >
                Select an item to view details
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Selection Drawer */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-100 bg-[#0a0a0a] border-t border-[#D85A30]/30 rounded-t-[32px] p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] md:hidden"
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
            <div className="flex gap-6 items-center mb-8">
               <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <Image src={activeItem.img} alt={activeItem.name} fill className="object-cover" unoptimized />
               </div>
               <div>
                  <h4 className="text-lg font-serif text-[#F5F0E8]">{activeItem.name}</h4>
                  <p className="text-[#D85A30] font-mono">{activeItem.price}</p>
               </div>
               <button onClick={() => setActiveItem(null)} className="ml-auto text-[#888780] text-sm">CLOSE</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <a href="https://www.zomato.com" target="_blank" rel="noreferrer" className="py-4 text-center bg-[#cb202d] text-white font-medium rounded-xl text-xs">Zomato</a>
              <a href="https://www.swiggy.com" target="_blank" rel="noreferrer" className="py-4 text-center bg-[#fc8019] text-white font-medium rounded-xl text-xs">Swiggy</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="py-4 text-center bg-[#25D366] text-white font-medium rounded-xl text-xs">WhatsApp</a>
              <a href="tel:+919876543210" className="py-4 text-center bg-[#222] text-[#F5F0E8] font-medium rounded-xl border border-white/10 text-xs">Call Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
