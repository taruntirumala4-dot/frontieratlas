"use client";

import AuthInput from "./AuthInput";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SignUpForm() {
  return (
    <form className="space-y-1">
      <AuthInput
        label="Full name"
        type="text"
        placeholder="Ada Lovelace"
      />

      <AuthInput
        label="Email"
        type="email"
        placeholder="you@university.edu"
      />

      {/* Github + Linkedin */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-[13px] font-semibold">
            GitHub
          </label>

          <div className="flex h-9 items-center gap-2 rounded-xl border border-[#DDD4C5] bg-[#F8F5ED] px-3">
            <FaGithub className="text-[15px] text-[#555]" />

            <input
              placeholder="username"
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-[#A79C8A]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[13px] font-semibold">
            LinkedIn
          </label>

          <div className="flex h-9 items-center gap-2 rounded-xl border border-[#DDD4C5] bg-[#F8F5ED] px-3">
            <FaLinkedin className="text-[15px] text-[#0A66C2]" />

            <input
              placeholder="profile-name"
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-[#A79C8A]"
            />
          </div>
        </div>
      </div>

      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <AuthInput
        label="Verify password"
        type="password"
        placeholder="Re-enter your password"
      />

      <button
        className="mt-1 h-10 w-full rounded-xl bg-[#F05A28] font-semibold text-white transition hover:bg-[#E65220]"
      >
        Create account
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 pt-1">
        <div className="h-px flex-1 bg-[#E5E5E5]" />
        <span className="text-[13px] text-[#666]">
          or continue with
        </span>
        <div className="h-px flex-1 bg-[#E5E5E5]" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-9 items-center justify-center gap-2 rounded-xl border border-[#DDD4C5] font-semibold"
        >
          <FcGoogle size={18} />
          Google
        </button>

        <button
          type="button"
          className="flex h-9 items-center justify-center gap-2 rounded-xl border border-[#DDD4C5] font-semibold"
        >
          <FaGithub size={17} />
          GitHub
        </button>
      </div>

      <p className="pt-1 text-center text-[13px] text-[#555]">
        Already have an account?{" "}
        <button
          type="button"
          className="font-semibold text-[#F05A28] hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}