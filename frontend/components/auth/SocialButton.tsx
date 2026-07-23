"use client";

import { Github } from "lucide-react";

export default function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="h-11 rounded-xl border border-[#DDD8CE] bg-white hover:bg-[#FAFAFA] transition flex items-center justify-center gap-2 font-semibold text-[#111]"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        Google
      </button>

      <button
        type="button"
        className="h-11 rounded-xl border border-[#DDD8CE] bg-white hover:bg-[#FAFAFA] transition flex items-center justify-center gap-2 font-semibold text-[#111]"
      >
        <Github size={18} />

        GitHub
      </button>
    </div>
  );
}