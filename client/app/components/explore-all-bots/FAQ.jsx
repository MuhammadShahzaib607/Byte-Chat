"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  { q: "How do I deploy my first bot?", a: "Simply navigate to the dashboard, click 'New Bot', and follow the step-by-step setup guide to get your AI live in minutes." },
  { q: "Can I customize the system prompt?", a: "Absolutely. You have full control over the AI's persona, tone, and behavior via our advanced prompt engineering interface." },
  { q: "Is there a limit on conversations?", a: "Our plans are designed to scale with you. You can monitor your usage stats directly from your personal dashboard." },
  { q: "How secure is my data?", a: "We prioritize privacy with end-to-end encryption. Your business data never leaves our secure, isolated environments." }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative py-24 px-6 md:px-12 border-t border-zinc-800 bg-[#070709]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="max-w-3xl mx-auto relative">
        <h3 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-zinc-800 bg-[#0d0d11]/50 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
              >
                <span className="text-[14px] font-bold text-zinc-300">{faq.q}</span>
                <span className="text-purple-500">
                  {activeIndex === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    {/* Separation Line Added Here */}
                    <div className="w-full h-[1px] bg-zinc-800 mb-5" />
                    
                    <p className="text-[13px] text-zinc-500 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}