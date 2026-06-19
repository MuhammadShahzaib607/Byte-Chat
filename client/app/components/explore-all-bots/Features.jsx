import React from 'react'
import { motion } from "framer-motion";
import { FiGlobe, FiShield, FiZap, FiCpu } from "react-icons/fi";

const Features = () => {

    const features = [
  { icon: FiGlobe, title: "Global Reach", desc: "Connect with bots deployed across various industries worldwide." },
  { icon: FiShield, title: "Secure Data", desc: "Enterprise-grade encryption for all your conversations." },
  { icon: FiZap, title: "Low Latency", desc: "Lightning fast response times for seamless interaction." },
  { icon: FiCpu, title: "AI-Powered", desc: "Advanced LLMs tailored for specific business needs." }
];

  return (
    <>
    <section className="relative py-24 px-6 md:px-12 border-t border-zinc-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-purple-500 mb-2">Why Choose Us</h2>
            <h3 className="text-3xl font-bold text-white">Engineered for Performance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl border border-zinc-800 bg-[#0d0d11]/80 hover:border-zinc-700 transition-all backdrop-blur-md"
              >
                <div className="p-3 bg-zinc-900 rounded-xl text-purple-500 inline-block mb-6 shadow-inner">
                  <feat.icon size={24} />
                </div>
                <h4 className="text-[15px] font-bold text-white mb-2">{feat.title}</h4>
                <p className="text-[13px] text-zinc-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Features