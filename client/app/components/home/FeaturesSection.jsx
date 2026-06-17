"use client";

import { FiCpu, FiShield, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FiCpu className="h-5 w-5 text-purple-400" />,
      title: "Context Awareness Engine",
      desc: "Processes multi-turn deep context injections with zero model drift or memory state loss."
    },
    {
      icon: <FiZap className="h-5 w-5 text-purple-400" />,
      title: "Ultra Low-Latency Sync",
      desc: "Edge-routed response streaming ensures token delivery happens under sub-100ms threshold."
    },
    {
      icon: <FiShield className="h-5 w-5 text-purple-400" />,
      title: "Cryptographic Node Guard",
      desc: "Complete enterprise identity isolation layer protecting custom weights and training logs."
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 relative">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#0c0c10] p-7 transition-all duration-300 hover:border-zinc-700 hover:bg-[#111116]"
          >
            {/* Subtle Gradient Glow inside the card */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/[0.02] rounded-full blur-xl pointer-events-none" />
            
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
              {item.icon}
            </div>
            
            <h3 className="mt-8 text-[15.5px] font-semibold tracking-tight text-zinc-100">
              {item.title}
            </h3>
            
            <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-500">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}