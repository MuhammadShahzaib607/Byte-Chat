"use client";

import { FiActivity, FiSettings, FiSliders, FiCheckSquare } from "react-icons/fi";

export default function CookiePolicy() {
  const sections = [
    {
      icon: <FiCheckSquare className="text-purple-400 h-5 w-5" />,
      title: "1. What Are Cookies?",
      text: "Cookies are small temporary text files downloaded onto your computer browser when you browse a website. They help us remember your unique session login state so you don't have to retype your password on every single dashboard page refresh."
    },
    {
      icon: <FiSettings className="text-purple-400 h-5 w-5" />,
      title: "2. Essential Platform Cookies",
      text: "These cookies are strictly required for authentication. They keep your active workspace open, protect system security parameters, and make sure our backend servers route your chatbot requests to the correct active terminal node."
    },
    {
      icon: <FiActivity className="text-purple-400 h-5 w-5" />,
      title: "3. Performance & Theme Settings",
      text: "We use lightweight functional cookies to save your user interface preferences—like keeping your UI locked in dark mode or saving your collapsed sidebar preferences so the dashboard acts exactly how you like it."
    },
    {
      icon: <FiSliders className="text-purple-400 h-5 w-5" />,
      title: "4. How to Manage Cookies",
      text: "You can choose to completely disable or delete cookies directly inside your web browser's privacy configurations. However, please note that turning off essential cookies will log you out and stop the dashboard workflow from loading correctly."
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
            Cookie Schema
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="text-[13.5px] text-zinc-500 leading-relaxed">
            Last updated: June 2026. Understand how we use lightweight localized storage tokens to optimize your system experience.
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