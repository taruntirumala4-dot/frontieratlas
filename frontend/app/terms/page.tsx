import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Terms of Service | FrontierAtlas",
  description: "FrontierAtlas Terms of Service and acceptable use conditions.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111111]">
      <Navbar />
      <main className="max-w-[900px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-[13px] text-[#888888] font-mono mb-8">Effective Date: September 2026</p>

        <div className="bg-white rounded-2xl border border-[#E5E5E0] p-8 md:p-12 space-y-8 text-[15px] leading-relaxed text-[#444444] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or utilizing FrontierAtlas, you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">2. Research Metadata & Open Access</h2>
            <p>
              Paper abstracts, titles, and author attributions are derived from open scientific repositories under their respective Open Access and Creative Commons terms. Original authors and respective institutions retain all copyright and intellectual property rights in their underlying scientific works.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">3. Acceptable Use</h2>
            <p>
              Users agree not to disrupt the platform infrastructure, perform denial-of-service attempts, scrape with malicious intent, or publish defamatory, abusive, or infringing material within community discussions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">4. Disclaimers</h2>
            <p>
              FrontierAtlas provides all benchmark scores and research links &quot;as is&quot; without warranty of any kind. We make reasonable efforts to verify benchmark claims but do not independently guarantee model performance replication.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
