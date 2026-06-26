"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiEdit2, FiPower, FiPlus, FiCpu, FiSmartphone, 
  FiMessageCircle, FiActivity, FiShield, FiZap, FiBox, FiCheckCircle 
} from "react-icons/fi";
import CustomAlert from "../../../components/customAlert";
import Link from "next/link";

export default function MyBots() {
  const [bots, setBots] = useState([]);
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const metaCards = [
    { 
      label: "Total Bots", 
      value: meta.totalBots || 0, 
      icon: FiBox, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10" 
    },
    { 
      label: "Active Bots", 
      value: meta.activeBots || 0, 
      icon: FiCheckCircle, 
      color: "text-green-500", 
      bg: "bg-green-500/10" 
    },
    { 
      label: "Inactive Bots", 
      value: meta.inActiveBots || 0, 
      icon: FiPower, 
      color: "text-zinc-500", 
      bg: "bg-zinc-800/50" 
    }
  ]

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).replace(/ /g, "-");
};

  useEffect(() => { setIsMounted(true); }, []);

  const fetchBots = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/user-bots`, {
        headers: { Authorization: token }
      });
      // console.log(res.data.data.bots)
      setMeta(res.data.data.meta)
      setBots(res.data.data.bots || []);
    } catch (e) {
      setAlert({ message: "Failed to load bots", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/status/${id}`, 
        { isActive: !currentStatus },
        { headers: { Authorization: token } }
      );
      fetchBots();
    } catch (e) {
      setAlert({ message: "Update failed", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => { if (isMounted) fetchBots(); }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen bg-[#070709] px-6 py-12 md:px-12 selection:bg-purple-500/30">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-6xl space-y-12">
        
        {/* SECTION 1: HEADER & ACTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Workspace</h1>
            <p className="text-zinc-500 text-sm">Deploy and manage your custom AI chatbots with ease.</p>
          </div>
          <button 
            onClick={() => router.push("/create-bot")} 
            className="group relative flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-bold text-black transition-all hover:bg-zinc-200 cursor-pointer"
          >
            <FiPlus className="transition-transform group-hover:rotate-90" /> New Chatbot
          </button>
        </header>

        {/* SECTION 2: BOT GRID */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  {metaCards.map((stat, idx) => (
    <motion.div 
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d11]/80 p-6 backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
          <stat.icon size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{stat.label}</span>
      </div>
      <div className="mt-6">
        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
        <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-tight">System Status</p>
      </div>
      {/* Decorative line at bottom */}
      <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${stat.color.replace('text', 'via').replace('500', '500/50')} to-transparent`} />
    </motion.div>
  ))}
</div>
          {loading ? (
            <div className="text-zinc-500 italic">Loading your bots...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bots.map((bot) => (
           <motion.div 
  key={bot._id}
  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
  className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d11]/80 p-6 backdrop-blur-md transition-all hover:border-zinc-700 hover:shadow-2xl hover:shadow-purple-500/5"
>
  {updatingId === bot._id && (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
    </div>
  )}

  <div className="flex justify-between items-start mb-6">
    <div className="p-3 bg-zinc-900 rounded-xl text-purple-500 shadow-inner">
      <FiCpu size={22} />
    </div>
    {/* STATUS BADGE */}
    <div className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
      bot.isActive ? "border-green-500/20 bg-green-500/10 text-green-500" : "border-zinc-700 bg-zinc-800 text-zinc-500"
    }`}>
      {bot.isActive ? "Active" : "Disabled"}
    </div>
  </div>

  <h3 className="text-[16px] font-bold text-white mb-0.5">{bot.businessName}</h3>
  <p className="text-[12px] text-zinc-500 mb-6 flex items-center gap-1.5">
    <FiSmartphone size={12} /> {bot.phoneNumber}
  </p>

  {/* DATES SECTION */}
  <div className="grid grid-cols-2 gap-4 mb-6 border-t border-zinc-800/50 pt-4">
    <div>
      <p className="text-[9px] uppercase text-zinc-600 font-bold mb-0.5">Created</p>
      <p className="text-[11px] text-zinc-300 font-medium">{formatDate(bot.createdAt)}</p>
    </div>
    <div>
      <p className="text-[9px] uppercase text-zinc-600 font-bold mb-0.5">Updated</p>
      <p className="text-[11px] text-zinc-300 font-medium">{formatDate(bot.updatedAt)}</p>
    </div>
  </div>

  <div className="flex gap-2">
    <button onClick={() => toggleStatus(bot._id, bot.isActive)} className={`flex-1 py-2.5 cursor-pointer rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 transition-all ${!bot.isActive ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>
      <FiPower size={14} /> {bot.isActive ? "INACTIVE" : "ACTIVE"}
    </button>
    <button onClick={() => router.push(`/edit-bot/${bot._id}`)} className="px-3 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer">
      <FiEdit2 size={14} />
    </button>
  </div>
  
  <Link 
  href={`/bot/${bot.slug}`}
  className="w-full mt-2 py-2.5 bg-white text-black rounded-xl text-[11px] font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
  >
    <FiMessageCircle size={14} /> CHAT NOW
  </Link>
</motion.div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 3: STATIC INFO / GUIDES */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11]/50 p-8">
            <FiShield className="text-purple-500 mb-4" size={24} />
            <h4 className="text-white font-bold mb-2">Enterprise Security</h4>
            <p className="text-[13px] text-zinc-400 leading-relaxed">Your data is encrypted end-to-end. We ensure that your customer interactions remain private and compliant with industry standards.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11]/50 p-8">
            <FiZap className="text-purple-500 mb-4" size={24} />
            <h4 className="text-white font-bold mb-2">Instant Scaling</h4>
            <p className="text-[13px] text-zinc-400 leading-relaxed">Our infrastructure automatically scales based on demand, ensuring your chatbot never drops a message during high traffic hours.</p>
          </div>
        </section>
      </div>

      {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}
    </div>
  );
}