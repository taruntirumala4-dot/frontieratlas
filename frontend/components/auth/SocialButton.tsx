"use client";

import { Github } from "lucide-react";

export default function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <a
        href={process.env.NODE_ENV === "development" ? "http://localhost:8787/api/v1/auth/google" : "https://frontieratlas-backend.morningsignal-india.workers.dev/api/v1/auth/google"}
        className="h-11 rounded-xl border border-[#DDD8CE] bg-white hover:bg-[#FAFAFA] transition flex items-center justify-center gap-2 font-semibold text-[#111]"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        Google
      </a>

      <a
        href={process.env.NODE_ENV === "development" ? "http://localhost:8787/api/v1/auth/github" : "https://frontieratlas-backend.morningsignal-india.workers.dev/api/v1/auth/github"}
        className="h-11 rounded-xl border border-[#DDD8CE] bg-white hover:bg-[#FAFAFA] transition flex items-center justify-center gap-2 font-semibold text-[#111]"
      >
        <Github size={18} />

        GitHub
      </a>
    </div>
  );
}