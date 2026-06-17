"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

export default function CustomAlert({ message, type = "success", onClose }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 0, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 z-50 flex w-full max-w-md overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0d0d0e]/90 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:max-w-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />

      <div className="flex w-full items-start p-4 gap-3.5">
        <div className={`flex-shrink-0 rounded-lg p-2.5 bg-gradient-to-br ${
          isSuccess 
            ? "from-purple-600 to-indigo-600 shadow-[0_0_15px_rgba(147,51,234,0.3)]" 
            : "from-rose-600 to-amber-600 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
        }`}>
          {isSuccess ? (
            <FiCheckCircle className="h-5 w-5 text-white" />
          ) : (
            <FiAlertCircle className="h-5 w-5 text-white" />
          )}
        </div>

        <div className="flex-1 flex flex-col pt-0.5">
          <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r text-transparent bg-clip-text ${
            isSuccess ? "from-purple-400 to-indigo-300" : "from-rose-400 to-amber-300"
          }`}>
            {isSuccess ? "Success Action" : "System Error"}
          </span>
          <p className="mt-1 text-sm font-medium leading-relaxed text-zinc-200">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-800/40">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          className={`h-full bg-gradient-to-r ${
            isSuccess ? "from-purple-500 to-indigo-500" : "from-rose-500 to-amber-500"
          }`}
        />
      </div>
    </motion.div>
  );
}