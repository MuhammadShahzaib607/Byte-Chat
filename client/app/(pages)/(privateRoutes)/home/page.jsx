"use client";

import { useEffect } from "react";
import FeaturesSection from "../../../components/home/FeaturesSection";
import HeroSection from "../../../components/home/HeroSection";
import WorkflowSection from "../../../components/home/WorkflowSection";
import axios from "axios"

export default function Home() {

  const validateToken = async ()=> {
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await axios.get(`${base_url}/user/validate-token`)
      console.log(res)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(()=> {
validateToken()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#070709] font-sans selection:bg-purple-500/40 selection:text-white overflow-x-hidden">
      
      {/* Absolute Pixel Perfect Grid Overlay Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Structured Clean Sections */}
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
      </main>
      
    </div>
  );
}