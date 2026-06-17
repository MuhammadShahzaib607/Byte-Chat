"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCpu, FiCheckCircle, FiRefreshCw, FiXCircle, 
  FiMessageSquare, FiUser, FiPhone, FiTerminal, 
  FiZap, FiActivity, FiSliders 
} from "react-icons/fi";

export default function CreateBotPage() {
  // Core Form Parameters
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [rawPrompt, setRawPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  // Process Automation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponsePrompt, setAiResponsePrompt] = useState(""); 
  const [showAiApprovalWindow, setShowAiApprovalWindow] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

  // Rapid Preset Action Matrices
  const promptTemplates = [
    {
      title: "E-Commerce Exec",
      desc: "Polite tone, tracks orders, lists product pricing.",
      text: "Act as an expert e-commerce assistant. Keep answers short, crisp, and fully focused on handling pricing inquiries, product availability, and order status loops gracefully."
    },
    {
      title: "Lead Capture Bot",
      desc: "Gathers contact info cleanly without being pushy.",
      text: "Act as an automated conversational lead qualifier. Methodically capture the user's name, primary business challenge, and timeline constraints without overwhelming them."
    }
  ];

  const handleGeneratePrompt = async (e) => {
    e.preventDefault();
    if (!rawPrompt.trim()) return;

    setIsGenerating(true);
    setShowAiApprovalWindow(false);

    try {
      const response = await fetch(`${BASE_URL}/bot/generate-prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawPrompt }),
      });
      
      const data = await response.json();
      
      if (data.success && data.data?.systemPrompt) {
        setAiResponsePrompt(data.data.systemPrompt);
        setShowAiApprovalWindow(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateBot = async () => {
    if (!businessName || !phoneNumber || !systemPrompt || !welcomeMessage) {
      alert("Please fill in all details and confirm your assistant settings.");
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch(`${BASE_URL}/bot/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          phoneNumber,
          systemPrompt,
          welcomeMessage
        }),
      });

      if (response.ok) {
        alert("Assistant created successfully!");
      } else {
        alert("Failed to create assistant. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] font-sans text-zinc-400 selection:bg-purple-500/40 selection:text-white overflow-x-hidden antialiased">
      
      {/* High-Fidelity Checkerbox Background Engine */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[350px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 py-20 lg:py-28 space-y-12">
        
        {/* Dynamic Agency Headings */}
        <div className="space-y-3 block w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-3.5 py-1 text-[11px] uppercase tracking-widest text-purple-400 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            Control Deck
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Create Your <span className="bg-gradient-to-r from-white via-zinc-300 to-purple-400 bg-clip-text text-transparent">Smart Assistant</span>
          </h1>
          <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Configure core system rules, pipeline communication payloads, and activate your custom neural node infrastructure instantly.
          </p>
        </div>

        {/* Master Expanded Grid Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
          
          {/* Left Column: Form Blocks Array */}
          <div className="lg:col-span-7 space-y-8 block w-full">
            
            {/* Block 1: Identity & Parameters */}
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-[#09090c]/90 space-y-6 shadow-2xl backdrop-blur-md">
              <h2 className="text-[14px] font-bold text-zinc-100 uppercase tracking-wider font-mono flex items-center gap-2.5 border-b border-zinc-900 pb-4">
                <FiUser className="text-purple-400 text-base shrink-0" /> 1. Operational Context
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="space-y-2 block w-full">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Business Registry Name</label>
                  <input 
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Pixel Craft Studio"
                    className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:border-purple-500/50 focus:bg-zinc-950 focus:outline-none transition-all shadow-inner block"
                  />
                </div>

                <div className="space-y-2 block w-full">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Target Channel Identifier (WhatsApp)</label>
                  <input 
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., +923001234567"
                    className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:border-purple-500/50 focus:bg-zinc-950 focus:outline-none transition-all shadow-inner block"
                  />
                </div>
              </div>

              <div className="space-y-2 block w-full">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Inbound Session Greeting Payload</label>
                <textarea 
                  rows={3}
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  placeholder="Greetings! Welcome to our high-frequency fulfillment matrix. State your operational request."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3.5 text-sm text-zinc-200 placeholder-zinc-700 focus:border-purple-500/50 focus:bg-zinc-950 focus:outline-none transition-all shadow-inner resize-none leading-relaxed block"
                />
              </div>
            </div>

            {/* Block 2: Logic Control Grid */}
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-[#09090c]/90 space-y-6 shadow-2xl backdrop-blur-md">
              <h2 className="text-[14px] font-bold text-zinc-100 uppercase tracking-wider font-mono flex items-center gap-2.5 border-b border-zinc-900 pb-4">
                <FiCpu className="text-purple-400 text-base shrink-0" /> 2. Intelligence Matrix
              </h2>

              {/* Action Macro Shortcut Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {promptTemplates.map((preset, index) => (
                  <div 
                    key={index}
                    onClick={() => setRawPrompt(preset.text)}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-purple-500/30 hover:bg-purple-950/10 cursor-pointer transition-all space-y-1.5 group block w-full"
                  >
                    <h4 className="text-[13px] font-bold text-zinc-300 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                      <FiZap className="text-xs text-purple-500" /> {preset.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 leading-normal line-clamp-2">{preset.desc}</p>
                  </div>
                ))}
              </div>

              {/* Live Generator Panel Container */}
              <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/90 relative overflow-hidden block w-full min-h-[160px]">
                {isGenerating && (
                  <div className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center space-y-3 z-20">
                    <FiRefreshCw className="h-6 w-6 text-purple-500 animate-spin" />
                    <span className="text-[11px] font-mono text-zinc-400 tracking-widest">REFINING MATRIX PROMPT VIA NEURAL ENGINE...</span>
                  </div>
                )}

                <div className="space-y-4 block w-full">
                  <div className="space-y-1.5 block w-full">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Raw Directive Input Vector</label>
                    <textarea 
                      rows={4}
                      value={rawPrompt}
                      onChange={(e) => setRawPrompt(e.target.value)}
                      placeholder="Explain how the bot should behave in simple terms, or inject a template preset macro above..."
                      className="w-full bg-transparent border-0 p-0 text-sm text-zinc-200 placeholder-zinc-700 focus:ring-0 focus:outline-none resize-none leading-relaxed block"
                    />
                  </div>
                  <div className="flex justify-end border-t border-zinc-900 pt-3">
                    <button
                      type="button"
                      onClick={handleGeneratePrompt}
                      disabled={!rawPrompt.trim() || isGenerating}
                      className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition-all disabled:opacity-20 shadow-lg shadow-purple-600/10 active:scale-[0.98]"
                    >
                      Optimize via AI Engine
                    </button>
                  </div>
                </div>
              </div>

              {/* Master System Prompt Output */}
              <div className="space-y-2 block w-full">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Active System Prompt Payload</label>
                <textarea 
                  rows={5}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="The production-grade structured rules compiling the custom node engine configuration parameters will display here automatically..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3.5 text-xs text-zinc-300 placeholder-zinc-700 focus:border-purple-500/50 focus:outline-none transition-all resize-none leading-relaxed font-mono block"
                />
              </div>
            </div>

            {/* Action Deployment Infrastructure */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleCreateBot}
                disabled={isCreating || !businessName || !phoneNumber || !systemPrompt || !welcomeMessage}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-purple-500 transition-all disabled:opacity-20 shadow-xl shadow-purple-600/15 active:scale-[0.99]"
              >
                {isCreating ? (
                  <>
                    <FiRefreshCw className="h-4 w-4 animate-spin" /> Deploying System Module...
                  </>
                ) : (
                  "Instantiate Assistant Node"
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Console Terminal Intercept Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 block w-full">
            
            {/* Action Monitor Window Matrix */}
            <AnimatePresence mode="wait">
              {showAiApprovalWindow && (
                <motion.div
                  key="approval-deck"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10 space-y-5 backdrop-blur-md shadow-2xl block w-full"
                >
                  <div className="space-y-2 block w-full">
                    <span className="text-[11px] uppercase tracking-wider text-purple-400 font-black block">
                      AI Content Optimization Intercepted
                    </span>
                    <div className="rounded-xl bg-zinc-950/90 border border-zinc-900 p-4 text-xs text-zinc-300 font-mono leading-relaxed max-h-[180px] overflow-y-auto custom-scrollbar">
                      {aiResponsePrompt}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 text-xs">
                    <button
                      onClick={() => setShowAiApprovalWindow(false)}
                      className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 font-bold text-zinc-400 hover:text-zinc-200 transition-all"
                    >
                      <FiXCircle /> Discard
                    </button>
                    <button
                      onClick={() => {
                        setSystemPrompt(aiResponsePrompt);
                        setShowAiApprovalWindow(false);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 font-extrabold text-zinc-950 hover:bg-zinc-100 transition-all shadow-lg"
                    >
                      <FiCheckCircle /> Accept & Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* State Diagnostics Box */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-[#09090c]/50 space-y-5 backdrop-blur-md block w-full">
              <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-3.5">
                <FiTerminal className="text-purple-400 text-base shrink-0" />
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Real-time Node Diagnostics</h3>
              </div>

              <div className="space-y-4 text-xs font-mono block w-full">
                <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 space-y-3 block w-full">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-zinc-600 text-[11px]">IDENTIFIER:</span> 
                    <span className={businessName ? "text-purple-400 font-bold truncate max-w-[180px]" : "text-zinc-800 font-bold"}>
                      {businessName || "AWAITING_DATA"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-zinc-600 text-[11px]">COMMS SUITE:</span> 
                    <span className={phoneNumber ? "text-zinc-200 truncate max-w-[180px]" : "text-zinc-800 font-bold"}>
                      {phoneNumber || "DISCONNECTED"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-zinc-600 text-[11px]">LOGIC VECTOR:</span> 
                    <span className={systemPrompt ? "text-emerald-400 font-bold" : "text-amber-500/70 font-bold animate-pulse"}>
                      {systemPrompt ? "ONLINE" : "MUTED_STATE"}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 leading-relaxed bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-xl flex items-start gap-2.5 block w-full">
                  <FiActivity className="text-purple-500 shrink-0 mt-0.5 animate-pulse text-sm" />
                  <span>Configure all mandatory vector configurations on the master control deck to open full deployment validation streams.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}