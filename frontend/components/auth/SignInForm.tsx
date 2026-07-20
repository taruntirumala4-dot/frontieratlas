"use client";

import AuthInput from "./AuthInput";
import SocialButtons from "./SocialButton";

export default function SignInForm() {
  return (
    <form className="space-y-3">
      <AuthInput
        label="Email"
        type="email"
        placeholder="you@university.edu"
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <div className="flex items-center justify-between text-[14px]">
        <label className="flex items-center gap-2 text-[#555555]">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-[#CFC8BC]"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-[#F55036] hover:underline font-medium"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-xl bg-[#F55036] hover:bg-[#E0462D] text-white font-semibold transition-colors"
      >
        Sign in
      </button>

      {/* Divider */}

      <div className="flex items-center gap-4 pt-1">
        <div className="flex-1 h-px bg-[#E5E5E0]" />

        <span className="text-[14px] text-[#666666] whitespace-nowrap">
          or continue with
        </span>

        <div className="flex-1 h-px bg-[#E5E5E0]" />
      </div>

      {/* Social Login */}

      <SocialButtons />

      {/* Footer */}

      <p className="text-center text-[14px] text-[#555555]">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-[#F55036] font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}