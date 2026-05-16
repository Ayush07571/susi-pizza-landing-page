'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8] selection:bg-[#D85A30] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/kitchen-bg.png" 
            alt="The Kitchen" 
            fill 
            className="object-cover opacity-40 md:grayscale" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-serif mb-8 tracking-tighter"
          >
            Our Story.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-light text-[#888780] max-w-2xl mx-auto leading-relaxed"
          >
            Born in the heart of Ranchi, Susi Pizza was founded on a simple belief: that every craving—whether for a wood-fired slice, a gourmet burger, or a bespoke cake—deserves the same artisanal respect.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <h2 className="text-3xl font-serif italic text-[#D85A30]">The Beginning</h2>
            <div className="text-lg text-[#888780] font-light leading-relaxed space-y-6">
              <p>
                What started as a small passion project in a local Ranchi kitchen has grown into a destination for flavor lovers across the city. We noticed that while there were many places to eat, very few prioritized the purity of the process across their entire menu.
              </p>
              <p>
                We decided to change that. Whether it is our 24-hour slow-fermented pizza dough, our signature smashed lamb patties, or our Belgian chocolate truffle cakes, we follow the same rule: No shortcuts. No artificial preservatives. Just honest food.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <h2 className="text-3xl font-serif italic text-[#D85A30]">The Craft</h2>
            <div className="text-lg text-[#888780] font-light leading-relaxed space-y-12">
              <div className="space-y-4">
                 <h4 className="text-[#F5F0E8] font-serif text-xl">Bespoke Cakes</h4>
                 <p>Every cake is a custom creation. From our 1lb Blueberry delights to the rich Belgian Choco Truffle, we use 54% dark chocolate ganache and moist sponges baked fresh for every order.</p>
                 <div className="relative aspect-video w-full rounded-xl overflow-hidden md:grayscale md:hover:grayscale-0 transition-all duration-700 border border-[#222]">
                   <Image src="/images/menu-cake.jpg" alt="Susi Cakes" fill className="object-cover" unoptimized />
                 </div>
              </div>
              
              <div className="space-y-4">
                 <h4 className="text-[#F5F0E8] font-serif text-xl">Gourmet Burgers</h4>
                 <p>Our Pizza Burger isn't just a snack—it's a signature fusion. We combine the soul of our pizza toppings with the heart of a smashed patty to create Ranchi's most unique burger experience.</p>
                 <div className="relative aspect-video w-full rounded-xl overflow-hidden md:grayscale md:hover:grayscale-0 transition-all duration-700 border border-[#222]">
                   <Image src="/images/menu-burger.jpg" alt="Susi Burgers" fill className="object-cover" unoptimized />
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <h2 className="text-3xl font-serif italic text-[#D85A30]">The Name</h2>
            <div className="text-lg text-[#888780] font-light leading-relaxed space-y-6">
              <p>
                "Susi" represents our dedication to hospitality. In a world of fast food, we wanted to build something that felt personal. When you eat with us, you're not just a customer—you're part of the Ranchi pizza community.
              </p>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden md:grayscale md:hover:grayscale-0 transition-all duration-1000 border border-[#222]">
            <Image 
              src="/images/pizza-hero.png" 
              alt="Artisanal Pizza" 
              fill 
              className="object-cover" 
              unoptimized 
            />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
