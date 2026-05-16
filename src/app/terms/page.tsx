'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';

export default function TermsPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-[#F5F0E8] mb-12">Terms of Service</h1>
            <p className="text-[#888780] font-mono text-sm uppercase tracking-widest mb-20">Last Updated: May 2024</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="prose prose-invert max-w-none space-y-12 text-[#aaa] font-light leading-relaxed text-lg"
          >
            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the Susi Pizza website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">2. Use of the Website</h2>
              <p>This website is provided for your personal, non-commercial use. You may not use this website for any purpose that is unlawful or prohibited by these terms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">3. Intellectual Property</h2>
              <p>The content, organization, graphics, design, compilation, and other matters related to the website are protected under applicable copyrights, trademarks, and other proprietary rights.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">4. Third-Party Links</h2>
              <p>Our service may contain links to third-party web sites or services (like Zomato, Swiggy, WhatsApp) that are not owned or controlled by Susi Pizza. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">5. Disclaimer</h2>
              <p>The information on this website is provided on an &quot;as is&quot; basis. Susi Pizza makes no representations or warranties of any kind, express or implied, as to the operation of the website or the information, content, materials, or products included on this website.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">6. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the website after any changes indicates your acceptance of the new Terms.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
