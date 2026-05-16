import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ReactLenis } from 'lenis/react';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Susi Pizza | Crafted in Ranchi. Loved by all.',
  description: 'A cinematic, scroll-driven Next.js website for Susi Pizza, a real local pizza brand in Ranchi, Jharkhand, India.',
  openGraph: {
    images: [{ url: '/images/og-image.svg' }], // REPLACE: use .jpg or .png for actual production
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Susi Pizza",
    "image": "https://susipizza.com/images/pizza-hero.png",
    "description": "A cinematic culinary journey nestled in the heart of Ranchi. Artisanal dough, slow-fermented, and kissed by fire.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Anandhpuri, Harmu Bazar Main Road",
      "addressLocality": "Ranchi",
      "addressRegion": "Jharkhand",
      "addressCountry": "IN"
    },
    "servesCuisine": ["Pizza", "Burger", "Dessert"],
    "priceRange": "₹₹"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
        <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#0a0a0a] text-[#F5F0E8]`} suppressHydrationWarning>
          <Preloader />
          <CustomCursor />
          <ReactLenis root>
            {children}
          </ReactLenis>
        </body>
    </html>
  );
}
