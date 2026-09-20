import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Frontier Atlas - Discover AI Research",
  description: "Discover and track the latest breakthroughs in AI and machine learning research. Trending papers, SOTA benchmarks, GitHub stars, and more.",
  keywords: "AI research, machine learning, papers, SOTA, transformers, LLM, deep learning",
  openGraph: {
    title: "Frontier Atlas - Discover AI Research",
    description: "Discover and track the latest breakthroughs in AI and machine learning research.",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('fa-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark) || (stored === 'system' && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
