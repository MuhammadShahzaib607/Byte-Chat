"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="px-6 py-24 text-center sm:py-36 relative overflow-hidden">
      {/* Background Mesh Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[350px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-4xl relative z-10"
      >
        <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-400">
          The Next-Gen Agent Workspace
        </span>
        
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1]">
          Engineered for <br />
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Autonomous AI Chatbots.
          </span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-[14.5px] leading-relaxed text-zinc-500">
          Train custom model profiles, automate user interactions, and scale your digital engine seamlessly in real-time.
        </p>
        
        <div className="mt-10 flex items-center justify-center">
          <Link 
            href="/signup" 
            className="group relative flex items-center gap-2 rounded-xl bg-zinc-100 px-7 py-3.5 text-[13.5px] font-semibold text-zinc-950 transition-all hover:bg-white active:scale-[0.98] shadow-lg shadow-black/20"
          >
            Create Your Agent
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5 text-zinc-700" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}