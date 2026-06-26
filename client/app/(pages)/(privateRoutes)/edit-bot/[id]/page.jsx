"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowLeft, LuCpu, LuSmartphone, LuMessageSquare, LuSave, LuSparkles, LuCheck, LuRotateCw } from "react-icons/lu";
import axios from "axios";
import HeroSectionSkeleton from "../../../../components/skeletons/HeroSectionSkeleton";

export default function EditBot() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [formLoading, setFormLoading] = useState(false)
  const [botData, setBotData] = useState({
    businessName: "",
    phoneNumber: "",
    welcomeMessage: "",
    systemPrompt: ""
  });

  // 1. Data Fetch
  useEffect(() => {
    const fetchBot = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/${id}`, {
          headers: { Authorization: token }
        });
        setBotData(res.data.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchBot();
  }, [id]);

  // 2. Generate Prompt Logic
  const handleGenerate = async () => {
    setGenLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/generate-prompt`, 
        { rawPrompt: botData.systemPrompt }, 
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setGeneratedPrompt(res.data.data.systemPrompt);
    } catch (e) { alert(e.message); }
    finally { setGenLoading(false); }
  };

  // 3. Edit Action
  const handleUpdate = async () => {
    setFormLoading(true)
    setSubmitting(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/${id}`, 
        { 
          phoneNumber: botData.phoneNumber,
          systemPrompt: botData.systemPrompt,
          welcomeMessage: botData.welcomeMessage
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      router.push("/my-bots");
    } catch (e) { alert("Update failed"); setFormLoading(false) }
    finally { setSubmitting(false); }
  };

  if (formLoading) return  <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
      
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
  
  <HeroSectionSkeleton />
  
        </div>

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
      <div className="min-h-screen bg-[#070709] p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <button onClick={() => router.back()} className="text-zinc-500 flex items-center gap-2 text-sm hover:text-white mb-8 transition-all">
          <LuArrowLeft /> Back
        </button>

        <h1 className="text-2xl font-bold text-white mb-8">Edit: {botData.businessName}</h1>

        <div className="space-y-6">
          {/* Business Name (Read Only) */}
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Business Name</label>
            <input disabled value={botData.businessName} className="w-full bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 text-zinc-500 text-sm mt-1 cursor-not-allowed" />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Phone</label>
                <input onChange={(e) => setBotData({...botData, phoneNumber: e.target.value})} value={botData.phoneNumber} className="w-full bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 text-white text-sm mt-1 outline-none focus:border-purple-500" />
             </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Welcome Message</label>
            <textarea onChange={(e) => setBotData({...botData, welcomeMessage: e.target.value})} value={botData.welcomeMessage} className="w-full bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 text-white text-sm mt-1 outline-none focus:border-purple-500 h-24" />
          </div>

          {/* System Prompt Section */}
          <div className="pt-4 border-t border-zinc-800">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Prompt</label>
            <textarea onChange={(e) => setBotData({...botData, systemPrompt: e.target.value})} value={botData.systemPrompt} className="w-full bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 text-white text-sm mt-1 outline-none focus:border-purple-500 h-32" />
            <button onClick={handleGenerate} className="mt-3 text-[11px] flex items-center gap-2 text-purple-400 hover:text-white font-bold transition-all cursor-pointer">
              <LuSparkles /> {genLoading ? "Optimizing..." : "Generate Prompt"}
            </button>
          </div>

          {/* AI Suggestions */}
          {
            !genLoading ?
<AnimatePresence>
            {generatedPrompt && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-purple-900/10 border border-purple-500/20 rounded-2xl">
                <p className="text-purple-200 text-sm leading-relaxed mb-4">{generatedPrompt}</p>
                <div className="flex gap-3">
                  <button onClick={handleGenerate} className="text-[10px] bg-zinc-900 px-4 py-2 rounded-lg text-white font-bold cursor-pointer"><LuRotateCw className="inline mr-1" /> REGENERATE</button>
                  <button onClick={() => { setBotData({...botData, systemPrompt: generatedPrompt}); setGeneratedPrompt(""); }} className="text-[10px] bg-purple-600 px-4 py-2 rounded-lg text-white font-bold cursor-pointer"><LuCheck className="inline mr-1" /> SELECT</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence> :
          null
          }

          <button onClick={handleUpdate} className="w-full py-4 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <LuSave /> {submitting ? "SAVING..." : "UPDATE BOT"}
          </button>
        </div>
      </div>
    </div>
  );
}