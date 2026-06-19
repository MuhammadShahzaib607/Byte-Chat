"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiCpu, FiClock, FiSmartphone, FiChevronRight } from "react-icons/fi";

export default function BotExplorer() {
  const [data, setData] = useState({ activeBots: [], totalBots: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/all`, {
          headers: { Authorization: token }
        });
        setData(res.data.data);
      } catch (e) { console.error("Error fetching bots"); }
      finally { setLoading(false); }
    };
    fetchBots();
  }, []);

  if (loading) return <div className="text-zinc-500 text-center py-20">Syncing with AI ecosystem...</div>;

  return (
    <section className="relative py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER & FLOATING STATS */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white">Public Marketplace</h2>
            <p className="text-zinc-500 text-sm">Discover and interact with expert AI assistants.</p>
          </div>
          <div className="px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">{data.totalBots} Active Bots Online</span>
          </div>
        </div>

        {/* BOTS LIST */}
        <div className="space-y-3">
          {data.activeBots.map((bot, i) => (
            <motion.div 
              key={bot._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative flex items-center justify-between p-6 rounded-2xl border border-zinc-800 bg-[#0d0d11]/50 hover:bg-zinc-900/30 hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-zinc-900 rounded-2xl text-purple-500">
                  <FiCpu size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{bot.businessName}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-zinc-500 text-[11px] flex items-center gap-1.5 font-medium uppercase tracking-wider">
                      <FiSmartphone size={12} /> {bot.phoneNumber}
                    </span>
                    <span className="text-zinc-600 text-[11px] flex items-center gap-1.5 font-medium uppercase tracking-wider">
                      <FiClock size={12} /> {new Date(bot.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-[12px] hover:bg-zinc-200 transition-all cursor-pointer">
                CHAT NOW <FiChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}