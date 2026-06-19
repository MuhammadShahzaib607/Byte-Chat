"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle } from "react-icons/fi";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#070709] px-6 py-24 md:px-12 selection:bg-purple-500/40 selection:text-white overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-zinc-500 max-w-lg mx-auto text-[15px] leading-relaxed">
            Have questions or want to collaborate? Reach out to us directly through our official channels. We are here to help.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 1: Primary Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-3xl border border-zinc-800 bg-[#0d0d11]/80 backdrop-blur-md"
          >
            <div className="p-4 bg-zinc-900 rounded-2xl w-fit text-purple-500 mb-8">
              <FiMessageCircle size={28} />
            </div>
            <h3 className="text-white font-bold text-xl mb-6">Contacts</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FiPhone className="text-zinc-600" />
                <span className="text-zinc-300 font-medium tracking-wide">0340-3004439</span>
              </div>
              <div className="flex items-center gap-4">
                <FiMail className="text-zinc-600" />
                <span className="text-zinc-300 font-medium tracking-wide">shahzaib@bytechat.com</span>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Availability */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-3xl border border-zinc-800 bg-[#0d0d11]/80 backdrop-blur-md"
          >
            <div className="p-4 bg-zinc-900 rounded-2xl w-fit text-purple-500 mb-8">
              <FiClock size={28} />
            </div>
            <h3 className="text-white font-bold text-xl mb-6">Availability</h3>
            
            <div className="space-y-4">
              <p className="text-zinc-500 text-[14px] leading-relaxed">
                Our team is available 24/7 for technical support and inquiries.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <FiMapPin className="text-zinc-600" />
                <span className="text-zinc-400 text-[14px]">Karachi, Pakistan</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}