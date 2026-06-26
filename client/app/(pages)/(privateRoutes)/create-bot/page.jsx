"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiBox, FiSmartphone, FiMessageSquare, FiChevronRight } from "react-icons/fi";
import CustomAlert from "../../../components/CustomAlert";
import { useRouter } from "next/navigation";

export default function CreateBot() {
    const router = useRouter()
    const [alert, setAlert] = useState({ show: false, message: "", type: "error" });
  const [botData, setBotData] = useState({ 
    businessName: "", 
    phoneNumber: "", 
    welcomeMessage: ""
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("botData");
    console.log(JSON.parse(savedData))
    if (savedData) {
      setBotData(JSON.parse(savedData));
    }
  }, []);

  const saveFormData = ()=> {
    const {businessName, phoneNumber, welcomeMessage} = botData
    if (!businessName || !phoneNumber || !welcomeMessage) {
      setAlert({ 
        show: true, 
        message: "Please fill in all fields to continue.", 
        type: "error" 
      });
      return;
    }
  sessionStorage.setItem("botData", JSON.stringify(botData))
router.push("/create-bot/next-step")
  }

  const handleChange = (e) => {
    setBotData({ ...botData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 overflow-hidden">
      
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[420px] rounded-3xl border border-zinc-800 bg-[#0d0d11]/80 backdrop-blur-xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">Deploy New Bot</h2>
          <p className="text-[12px] text-zinc-500 mt-1">Configure your AI assistant details to get started.</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Business Name</label>
            <div className="relative flex items-center">
              <FiBox className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              <input
                name="businessName"
                onChange={handleChange}
                value={botData?.businessName}
                autoComplete="off"
                placeholder="e.g. ByteChat Support"
                className="w-full rounded-xl border border-zinc-800 bg-[#050507] py-3 pl-11 pr-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Phone Number</label>
            <div className="relative flex items-center">
              <FiSmartphone className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              <input
                name="phoneNumber"
                onChange={handleChange}
                value={botData.phoneNumber}
                autoComplete="off"
                placeholder="+92 3XX XXXXXXX"
                className="w-full rounded-xl border border-zinc-800 bg-[#050507] py-3 pl-11 pr-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Welcome Message</label>
            <div className="relative flex items-start">
              <FiMessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
              <textarea
                name="welcomeMessage"
                onChange={handleChange}
                rows={3}
                value={botData.welcomeMessage}
                autoComplete="off"
                placeholder="Hello! How can I assist you today?"
                className="w-full rounded-xl border border-zinc-800 bg-[#050507] py-3 pl-11 pr-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-purple-500/50 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8">
          <button
          onClick={saveFormData}
          className="flex items-center justify-between w-full rounded-xl bg-white py-3.5 px-5 text-[13px] font-bold text-black hover:bg-zinc-200 transition-all active:scale-[0.98] cursor-pointer">
            <span>CONTINUE SETUP</span>
            <FiChevronRight size={18} />
          </button>
        </div>
      </motion.div>

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