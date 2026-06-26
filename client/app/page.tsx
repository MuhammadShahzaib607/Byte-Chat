"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginPageSkeleton from "./components/skeletons/LoginPageSkeleton"
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(()=> {
router.push("/login");
  }, [router])

  return (
     <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
    
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

<LoginPageSkeleton />

      </div>
  );
}
