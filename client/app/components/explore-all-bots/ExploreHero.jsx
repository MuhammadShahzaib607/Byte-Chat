"use client";

import { motion } from "framer-motion";
import { FiSearch, FiGlobe, FiCommand } from "react-icons/fi";

export default function ExploreHero() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 overflow-hidden bg-[#070709]">
      {/* Background Checkerboard */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px]" />
      
      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Live AI Ecosystem</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          Explore Intelligent <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-zinc-500">Chatbot Solutions</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-zinc-500 text-lg font-medium leading-relaxed"
        >
          Connect with specialized bots designed to streamline your business, 
          automate workflows, and enhance customer interactions.
        </motion.p>

        {/* Floating Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-md mx-auto group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-2xl blur-xl transition-all group-hover:blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}