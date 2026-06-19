"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
    const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#070709] border-t border-zinc-800 pt-20 pb-10 px-6 md:px-12">
      {/* Checkerboard Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Logo & Description */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-white font-bold text-lg">ByteChat</span>
          </Link>
          <p className="text-[12px] text-zinc-500 leading-relaxed max-w-[200px]">
            Building high-performance, scalable AI solutions for seamless user experiences.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-6">Explore</h4>
          <div className="space-y-4 text-[12px] text-zinc-400">
            {["Home", "About", "Contact", "My Bots", "Explore"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`} className="block hover:text-white transition text-[14px]">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-6">Legal</h4>
          <div className="space-y-4 text-[12px] text-zinc-400">
            {["Privacy Policy", "Cookie Policy", "Terms and Condition"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block hover:text-white transition text-[14px]">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-6">Contact</h4>
          <div className="space-y-4 text-[12px] text-zinc-400">
            <div className="flex items-center gap-3"><FiMail size={14} /> shahzaib@bytechat.com</div>
            <div className="flex items-center gap-3"><FiPhone size={14} /> 0340-3004439</div>
            <div className="flex items-center gap-3"><FiMapPin size={14} /> Karachi, Pakistan</div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-zinc-800 text-center">
        <p className="text-[11px] text-zinc-600 tracking-wider">
          COPYRIGHT © {year} BYTECHAT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}