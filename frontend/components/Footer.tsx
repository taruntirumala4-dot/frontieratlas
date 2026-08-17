"use client";

import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F7F2] mt-auto shrink-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-8">
          
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="relative block w-[200px] h-10 -ml-1">
              <Image src="/logo.png" alt="Frontier Atlas" fill className="object-contain object-left" sizes="200px" />
            </Link>
            <p className="text-[15px] text-[#555555] leading-relaxed max-w-[280px]">
              Explore the research shaping modern AI. Discover papers, methods, models, tasks and benchmarks in one place.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full border border-[#D1D1D1] flex items-center justify-center text-[#555] hover:text-[#F55036] hover:border-[#F55036] hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-transparent">
                <FaXTwitter size={18} />
              </a>
              <a href="https://github.com/AtlasFrontierOrg/FrontierAtlas" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full border border-[#D1D1D1] flex items-center justify-center text-[#555] hover:text-[#F55036] hover:border-[#F55036] hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-transparent">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/company/frontieratlashq/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-[#D1D1D1] flex items-center justify-center text-[#555] hover:text-[#F55036] hover:border-[#F55036] hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-transparent">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Research Column */}
          <div className="col-span-6 lg:col-span-2">
            <h4 className="font-bold text-[#111111] text-[14px] uppercase tracking-wide">Research</h4>
            <div className="w-8 h-[2px] bg-[#F55036] mt-3 mb-6"></div>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Papers</Link>
              </li>
              <li>
                <Link href="/models" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Models</Link>
              </li>
              <li>
                <Link href="/tasks" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Tasks</Link>
              </li>
              <li>
                <Link href="/methods" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Methods</Link>
              </li>
              <li>
                <Link href="/benchmarks" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Benchmarks</Link>
              </li>
              <li>
                <Link href="/organizations" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Organizations</Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-6 lg:col-span-2">
            <h4 className="font-bold text-[#111111] text-[14px] uppercase tracking-wide">Company</h4>
            <div className="w-8 h-[2px] bg-[#F55036] mt-3 mb-6"></div>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/about" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Contact</Link>
              </li>
              <li>
                <Link href="/terms" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Terms of Use</Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-block text-[15px] text-[#444] hover:text-[#F55036] hover:translate-x-1 transition-all duration-300 font-medium">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Stay Updated CTA Column */}
          <div className="col-span-12 lg:col-span-4">
            <h4 className="font-bold text-[#111111] text-[14px] uppercase tracking-wide">Stay Updated</h4>
            <div className="w-8 h-[2px] bg-[#F55036] mt-3 mb-6"></div>
            <p className="text-[14px] text-[#555555] leading-relaxed mb-4 max-w-[280px]">
              Get the latest AI research papers and trends delivered to your inbox weekly.
            </p>
            <form className="flex flex-col gap-3 max-w-[320px]" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={16} />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white border border-[#E5E5E0] rounded-lg py-2.5 pl-10 pr-4 text-[14px] outline-none focus:border-[#F55036] focus:ring-1 focus:ring-[#F55036] transition-all placeholder:text-[#A0A0A0]"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#F55036] hover:bg-[#E0462D] text-white rounded-lg py-2.5 font-semibold text-[14px] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px bg-[#E5E5E0] my-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] text-[#555]">
          <p>© {new Date().getFullYear()} FrontierAtlas. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#111] transition-colors">Privacy Policy</Link>
            <span className="text-[#C4C4C4]">|</span>
            <Link href="/terms" className="hover:text-[#111] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
