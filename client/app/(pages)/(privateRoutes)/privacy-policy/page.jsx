"use client";

import { FiLock, FiEye, FiServer, FiShield } from "react-icons/fi";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <FiEye className="text-purple-400 h-5 w-5" />,
      title: "1. Information We Collect",
      text: "We only collect information that is absolutely necessary to run your AI chatbots. This includes your email address when you sign up, your chatbot configuration settings, and any business text files or data you explicitly upload to train your chatbot."
    },
    {
      icon: <FiServer className="text-purple-400 h-5 w-5" />,
      title: "2. How We Use Your Data",
      text: "Your uploaded data is strictly used to train your custom chatbot node and provide accurate answers to your visitors. We never sell, share, or rent your data, business documents, or user chat histories to any third-party advertising companies."
    },
    {
      icon: <FiLock className="text-purple-400 h-5 w-5" />,
      title: "3. Data Safety & Storage",
      text: "Security is our primary focus. All chat histories and business files are encrypted and stored in isolated database segments. Your raw API keys are hashed and hidden securely behind cloud guardrails to ensure zero unauthorized exposure."
    },
    {
      icon: <FiShield className="text-purple-400 h-5 w-5" />,
      title: "4. Your Control Rights",
      text: "You own 100% of your data. You can completely delete your uploaded files, wipe chat data logs, or permanently close your workspace account at any point directly from your system dashboard."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#070709] font-sans selection:bg-purple-500/40 selection:text-white overflow-x-hidden">
      
      {/* Verified Fixed Checkerboard Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Upper Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[300px] bg-purple-950/10 rounded-full blur-[130px] pointer-events-none" />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-28 sm:py-36 space-y-20">
        
        {/* Main Spacious Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-purple-400">
            Legal Protocol
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-[13.5px] text-zinc-500 leading-relaxed">
            Last updated: June 2026. Review how we secure, process, and respect your workspace integrity.
          </p>
        </div>

        {/* Separated Breathing Cards */}
        <div className="space-y-6 mt-10">
          {sections.map((sec, idx) => (
            <div 
              key={idx}
              className="p-8 sm:p-10 rounded-2xl border border-zinc-900 bg-[#09090c]/60 shadow-xl space-y-5 transition-colors hover:border-zinc-800/80"
            >
              <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
                <div className="h-9 w-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  {sec.icon}
                </div>
                <h2 className="text-[16px] font-bold text-zinc-100 tracking-tight">
                  {sec.title}
                </h2>
              </div>
              <p className="text-[13.5px] leading-relaxed text-zinc-400 font-normal pt-1">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}