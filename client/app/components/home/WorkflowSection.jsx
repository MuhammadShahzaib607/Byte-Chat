"use client";

import { motion } from "framer-motion";

export default function WorkflowSection() {
  const pipelineSteps = [
    { code: "ENV_INIT", label: "01 / Initialization", title: "Configure Prompt Matrix", text: "Map out the primary system instruction logic and identity bounds." },
    { code: "CTX_LOAD", label: "02 / Data Injection", title: "Embed Knowledge Base", text: "Upload structural raw files to form neural vector retrieval access." },
    { code: "API_LIVE", label: "03 / Final Sync", title: "Instantiate Workspace", text: "Generate direct edge endpoint link to talk to your agent live." }
  ];

  return (
    <section className="border-t border-zinc-900/60 bg-[#08080b]/30 py-24 px-6 relative">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            System Architecture
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Streamlined deployment pipeline.
          </h2>
        </div>

        {/* Dynamic Connected Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 relative">
          {pipelineSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col justify-between p-6 rounded-2xl border border-zinc-900 bg-[#09090c]/40 relative"
            >
              {/* Connection Indicator Lines for Desktop */}
              {idx < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gradient-to-r from-zinc-800 to-transparent z-20" />
              )}
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider text-zinc-600">{step.label}</span>
                  <span className="text-[9px] font-mono bg-zinc-900 text-purple-400 border border-zinc-800/80 px-2 py-0.5 rounded">
                    {step.code}
                  </span>
                </div>
                
                <h4 className="mt-8 text-[14.5px] font-semibold text-zinc-200">
                  {step.title}
                </h4>
                <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}