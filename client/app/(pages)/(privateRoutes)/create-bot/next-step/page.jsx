"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowLeft, LuCpu, LuSparkles, LuCheck, LuRotateCw } from "react-icons/lu";
import axios from "axios";
import CustomAlert from "../../../../components/CustomAlert";
import HeroSectionSkeleton from "../../../../components/skeletons/HeroSectionSkeleton";

export default function CreateBotNextStep() {
  const router = useRouter();
  const [botData, setBotData] = useState(null);
  const [rawPrompt, setRawPrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: "", type: "error" });

useEffect(()=> {
  const sessionData = JSON.parse(sessionStorage.getItem("botData"))
setRawPrompt(sessionData.systemPrompt)
}, [])

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("botData"));
    if (!data) router.push("/create-bot");
    setBotData(data);
  }, [router]);

  const handleGenerate = async () => {
    if (alert.show) return;
    if (!rawPrompt) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/generate-prompt`, 
        { rawPrompt }, { headers: { Authorization: token } }
      );
      setGeneratedPrompt(res.data.data.systemPrompt);
    } catch (e) { setAlert({ 
        show: true, 
        message: "Failed to generate Prompt Please Try Again.", 
        type: "error" 
      });
      return; }
    finally { setLoading(false); }
  };

  const createBotHandler = async ()=> {
    try {
      setPageLoading(true)
      if (!rawPrompt) {
        setAlert({ 
          show: true, 
          message: "System Prompt is required", 
          type: "error" 
        });
        return;
      }
      const token = localStorage.getItem("token")
      const finalData = JSON.parse(sessionStorage.getItem("botData"))
      const {businessName, phoneNumber, welcomeMessage} = finalData
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/create`, 
        { businessName, phoneNumber, welcomeMessage, systemPrompt: rawPrompt }, { headers: { Authorization: token } }
      );
      sessionStorage.removeItem("botData")
      router.push("/my-bots")
    } catch (error) {
      setPageLoading(false)
      setAlert({ 
        show: true, 
        message: error.response.data.message, 
        type: "error" 
      });
    }
  }

  if (!botData) return null;

  return (
    <div className="min-h-screen bg-[#070709] p-6 md:p-12 selection:bg-purple-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {
        pageLoading ?
        <HeroSectionSkeleton /> :
        <div className="max-w-3xl mx-auto relative z-10">
        <button onClick={() => {
          const sessionData = JSON.parse(sessionStorage.getItem("botData"))
          sessionData.systemPrompt = rawPrompt;
          sessionStorage.setItem("botData", JSON.stringify(sessionData))
    router.back()
        }} className="text-zinc-500 flex items-center gap-2 text-sm hover:text-white mb-8 transition-all cursor-pointer">
          <LuArrowLeft /> Back to details
        </button>

        {/* Read-Only Info */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Business", val: botData.businessName },
            { label: "Phone", val: botData.phoneNumber },
            { label: "Welcome", val: botData.welcomeMessage.substring(0, 15) + "..." }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/30">
              <p className="text-[10px] uppercase text-zinc-500 font-bold">{item.label}</p>
              <p className="text-white text-sm mt-1">{item.val}</p>
            </div>
          ))}
        </div>

        {/* Prompt Area */}
        <div className="space-y-4">
          <textarea 
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            className="w-full bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 text-zinc-300 text-sm focus:border-purple-500 outline-none h-62"
            placeholder="Describe how you want your AI bot to behave..."
          />
          
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Generating Intelligence..." : <><LuSparkles /> GENERATE PROFESSIONAL PROMPT</>}
          </button>
        </div>

        {/* AI Result Section */}
        <AnimatePresence>
          {generatedPrompt && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
              <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-2xl">
                <p className="text-purple-200 text-sm leading-relaxed">{generatedPrompt}</p>
              </div>
              
              <div className="flex gap-4">
                <button onClick={handleGenerate} className="flex-1 py-3 border border-zinc-800 rounded-xl text-zinc-400 text-xs font-bold hover:bg-zinc-900 transition-all">
                  <LuRotateCw className="inline mr-2" /> REGENERATE
                </button>
                <button 
                  onClick={() => { setRawPrompt(generatedPrompt); setGeneratedPrompt(""); }} 
                  className="flex-1 py-3 bg-purple-600 rounded-xl text-white text-xs font-bold hover:bg-purple-700 transition-all"
                >
                  <LuCheck className="inline mr-2" /> SELECT PROMPT
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Create Button (Always Visible if ready) */}
        {rawPrompt && (
            <button className="mt-8 w-full py-4 bg-zinc-800 text-white font-bold text-xs rounded-xl hover:bg-zinc-700 transition-all cursor-pointer"
            onClick={createBotHandler}
            >
                FINALIZE AND CREATE BOT
            </button>
        )}
      </div>
      }

      <AnimatePresence>
        {alert.show && (
          <CustomAlert
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert({ ...alert, show: false })} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}