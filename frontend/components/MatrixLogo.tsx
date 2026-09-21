"use client";

export default function MatrixLogo() {
  return (
    <section
      aria-label="FrontierAtlas logo banner"
      className="w-full bg-[#F5F0E8] border-b border-[#E5E5E0] overflow-hidden flex items-center justify-center"
      style={{ minHeight: "64px", maxHeight: "80px", height: "72px" }}
    >
      <div className="flex items-center gap-3 select-none">
        {/* Fern / leaf SVG icon */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Main stem */}
          <path
            d="M32 58 C32 58 32 20 32 6"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Left fronds */}
          <path
            d="M32 46 C20 42 12 32 14 20 C19 27 26 37 32 40"
            fill="#111111"
          />
          <path
            d="M32 33 C18 27 10 15 14 4 C19 13 26 25 32 29"
            fill="#111111"
          />
          {/* Right fronds */}
          <path
            d="M32 46 C44 42 52 32 50 20 C45 27 38 37 32 40"
            fill="#111111"
          />
          <path
            d="M32 33 C46 27 54 15 50 4 C45 13 38 25 32 29"
            fill="#111111"
          />
        </svg>

        {/* Wordmark */}
        <span
          className="font-sans font-bold tracking-tight text-[#111111]"
          style={{ fontSize: "clamp(20px, 3vw, 28px)", lineHeight: 1 }}
        >
          FrontierAtlas
        </span>
      </div>
    </section>
  );
}
