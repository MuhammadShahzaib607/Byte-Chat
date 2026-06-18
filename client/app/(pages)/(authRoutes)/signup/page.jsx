"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import CustomAlert from "../../../components/CustomAlert";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const triggerAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Basic Fields Validation
    if (!formData.username || !formData.email || !formData.password) {
      triggerAlert("error", "Please fill in all the fields to create your account.");
      return;
    }

    // 2. Password Length Constraint
    if (formData.password.length < 8) {
      triggerAlert("error", "Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const envUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const cleanBaseUrl = envUrl.replace(/\/+$/, ""); 
      const finalApiUrl = `${cleanBaseUrl}/user/signup`;

      const res = await fetch(finalApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong during account creation.");
      }

      triggerAlert("success", "Account created successfully! Redirecting...");
        router.push("/login");

    } catch (error) {
      triggerAlert("error", error.message);
      console.error("Signup Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
      
      {/* Structured Minimal Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[400px] rounded-2xl border border-zinc-800/80 bg-[#0d0d11]/90 backdrop-blur-md p-8 shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Subtle Card Border Highlight */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Sign Up
          </h2>
          <p className="text-[13px] text-zinc-400 font-normal leading-relaxed">
            Create your account to build real-time AI chatbots.
          </p>
        </div>

        {/* Interactive Input Form */}
        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Username Input Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-zinc-400">
                Username
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full rounded-xl border border-zinc-800 bg-[#050507] py-2.5 pl-11 pr-4 text-[13.5px] text-zinc-200 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5"
                />
              </div>
            </div>

            {/* Email Input Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-zinc-400">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="shahzaib@bytechat.com"
                  className="w-full rounded-xl border border-zinc-800 bg-[#050507] py-2.5 pl-11 pr-4 text-[13.5px] text-zinc-200 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-zinc-400">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 h-4 w-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter you Password"
                  className="w-full rounded-xl border border-zinc-800 bg-[#050507] py-2.5 pl-11 pr-11 text-[13.5px] text-zinc-200 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="relative flex w-full items-center justify-center rounded-xl bg-zinc-100 py-2.5 text-[13.5px] font-medium text-zinc-950 outline-none transition-all duration-200 hover:bg-white active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 shadow-md shadow-black/10"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Footer Navigation Segment */}
        <div className="text-center mt-6 border-t border-zinc-800/50 pt-4">
          <p className="text-[12.5px] text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-400 transition-colors hover:text-purple-300 underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Dynamic Notifications System Overlay */}
      <AnimatePresence>
        {alert.show && (
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}