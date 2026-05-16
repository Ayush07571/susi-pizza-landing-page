'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';

export default function PrivacyPage() {
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
            <h1 className="text-6xl md:text-8xl font-serif text-[#F5F0E8] mb-12">Privacy Policy</h1>
            <p className="text-[#888780] font-mono text-sm uppercase tracking-widest mb-20">Last Updated: May 2024</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="prose prose-invert max-w-none space-y-12 text-[#aaa] font-light leading-relaxed text-lg"
          >
            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">Introduction</h2>
              <p>Welcome to Susi Pizza. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Identity Data (Name, username)</li>
                <li>Contact Data (Email address, telephone numbers)</li>
                <li>Usage Data (Information about how you use our website)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide our services to you, to manage our relationship with you, and to improve our website and services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">Aggregator Platforms</h2>
              <p>Our website provides links to third-party platforms like Zomato and Swiggy for ordering. Please note that when you click on these links, you are leaving our website. These platforms have their own privacy policies, which we encourage you to read.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at info@susipizza.com or visit us at our Ranchi outlets.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
