'use client';

import { LOCATIONS, WHATSAPP_NUMBER, ZOMATO_URL_HARMU, ZOMATO_URL_LALPUR } from '@/lib/constants';
import Image from 'next/image';

export default function FindUs() {
  return (
    <section className="relative w-full py-24 bg-transparent z-20 pointer-events-none">
      <div className="absolute inset-0 z-0 bg-black/60">
        <Image src="/images/ranchi-map-stylised.svg" alt="Ranchi Map" fill className="object-cover opacity-30" unoptimized />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pointer-events-auto">
        <h2 className="text-5xl text-[#F5F0E8] font-serif text-center mb-16">Find Our Universe</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {LOCATIONS.map((loc, i) => (
            <div key={loc.name} className="flex flex-col bg-[#111] rounded-2xl overflow-hidden border border-white/5">
              <div className="relative w-full h-64">
                <Image src={loc.image} alt={loc.name} fill className="object-cover" unoptimized />
              </div>
              <div className="p-8">
                <h3 className="text-2xl text-[#D85A30] font-bold mb-2">{loc.name}</h3>
                <p className="text-[#888780] mb-8 h-12">{loc.address}</p>
                <div className="flex gap-4">
                  <a
                    href={i === 0 ? ZOMATO_URL_HARMU : ZOMATO_URL_LALPUR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded bg-[#E23744] text-white font-medium hover:bg-red-700 transition-colors"
                  >
                    Order Zomato
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded bg-[#25D366] text-white font-medium hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
