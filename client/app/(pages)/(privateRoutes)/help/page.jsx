"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiKey, FiShield, FiCode, FiChevronDown, FiHelpCircle, FiTerminal } from "react-icons/fi";

export default function HelpPage() {
  // State for interactive FAQs
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { icon: <FiKey className="text-purple-400 h-4 w-4" />, title: "API Keys & Login", desc: "Manage your account API keys, setup secure chat links, and handle login settings." },
    { icon: <FiCode className="text-purple-400 h-4 w-4" />, title: "Chatbot Instructions", desc: "Learn how to give your chatbot clear rules, instructions, and define its personality." },
    { icon: <FiShield className="text-purple-400 h-4 w-4" />, title: "Safety & Security", desc: "Keep your chatbot safe from tricks, unwanted topics, and wrong answers." },
    { icon: <FiBookOpen className="text-purple-400 h-4 w-4" />, title: "Uploading Business Files", desc: "How to upload your business data and text documents so your chatbot knows your info." }
  ];

  const faqs = [
    {
      q: "What happens if a user asks a question my chatbot doesn't know?",
      a: "If a user asks for details you haven't uploaded (like hidden prices or custom timelines), your chatbot will not make up random answers or lie. Instead, it will politely tell the user that it doesn't have that information or ask them to contact you directly."
    },
    {
      q: "Where can I find my chatbot's API key?",
      a: "Go to your main Dashboard, click on your active chatbot, and open the 'API Keys' section. If you ever create a new key, the old one will stop working immediately to keep your account completely safe."
    },
    {
      q: "Why am I getting an error when saving my chatbot instructions?",
      a: "This usually happens if your text instructions contain strange code symbols or special brackets (like { or }) that confuse our system. Try using simple, plain English text for your rules."
    },
    {
      q: "Can users trick or bypass my chatbot's rules?",
      a: "No. Every message sent by a user goes through a built-in safety filter first. If a user tries to trick your chatbot into ignoring your business rules, the system automatically blocks the trick and keeps your chatbot safe."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-400 font-sans selection:bg-purple-500/40 selection:text-white overflow-x-hidden">
      
      {/* Symmetrical Checkerboard Grid Overlay (Matches the entire platform layout) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Upper Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32 space-y-24">
        
        {/* SECTION 1: Minimalist Help Header */}
        <section className="text-center space-y-4">
          <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-purple-400">
            ByteChat Support Center
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            How can we help <br />
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              your workspace today?
            </span>
          </h1>
          <p className="mx-auto max-w-lg text-[13.5px] text-zinc-500 leading-relaxed pt-1">
            Find quick answers to your questions, easy guides, and help with setting up your custom AI chatbots below.
          </p>
        </section>

        {/* SECTION 2: Functional Knowledge Categories Grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="group p-5 rounded-xl border border-zinc-900 bg-[#09090c]/80 transition-all duration-200 hover:border-zinc-800 hover:bg-[#0c0c10]"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-[14px] font-semibold text-zinc-200">{cat.title}</h3>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-zinc-500">{cat.desc}</p>
            </div>
          ))}
        </section>

        {/* SECTION 3: Premium Interactive FAQs Accordion */}
        <section className="space-y-6">
          <div className="border-b border-zinc-900 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FiHelpCircle className="text-purple-500 h-4 w-4" /> Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-zinc-900/60 bg-[#08080a]/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-[13.5px] text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown className={`h-4 w-4 text-zinc-600 transition-transform duration-200 ${isOpen ? "rotate-180 text-purple-400" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="p-4 pt-0 text-[13px] leading-relaxed text-zinc-500 border-t border-zinc-900/40 bg-zinc-950/[0.15]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Developer Escalation Node */}
        <section className="rounded-xl border border-dashed border-zinc-800 bg-[#09090c]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-9 w-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
              <FiTerminal className="text-purple-400 h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-zinc-200">Still need help with your chatbot?</h4>
              <p className="text-[12.5px] text-zinc-500 leading-relaxed max-w-md">
                Send us a quick message or share a description of your problem, and our technical support team will help you fix it right away.
              </p>
            </div>
          </div>
          <button className="whitespace-nowrap rounded-lg bg-zinc-100 px-4 py-2 text-[12.5px] font-semibold text-zinc-950 hover:bg-white transition-all shadow-md active:scale-[0.97]">
            Contact Support
          </button>
        </section>

      </main>
    </div>
  );
}