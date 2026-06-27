"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const links = [
    {
        name: "Home",
        link: "/home"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Explore",
        link: "/explore"
    },
    {
        name: "MyBots",
        link: "/my-bots"
    },
    {
        name: "BuildBot",
        link: "/create-bot"
    },
    {
        name: "Contact",
        link: "/contact"
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (  
    <nav className="w-full pt-8 px-4 z-50">
<div className="flex w-full max-w-5xl mx-auto items-center justify-between rounded-full border border-zinc-800 bg-black px-8 py-4 backdrop-blur-md shadow-2xl">
        
        {/* SECTION 1: Logo */}
        <Link href="/home" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={38} height={38} className="object-contain" />
        </Link>

        {/* SECTION 2: Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link key={link.name} href={link.link} className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* SECTION 3: Logout & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors text-sm font-medium cursor-pointer"
          >
            <FiLogOut size={16} /> Logout
          </button>
          
          <button className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mt-4 rounded-3xl border border-zinc-800 bg-[#070709]/95 p-8 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-6 items-center">
            {links.map((link) => (
              <Link 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 text-lg font-medium hover:text-purple-400 transition-colors"
              >
                {link}
              </Link>
            ))}
            <button onClick={handleLogout} className="cursor-pointer text-red-500 font-medium flex items-center gap-2">
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}