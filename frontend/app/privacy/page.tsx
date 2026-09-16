import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Privacy Policy | Frontier Atlas",
  description: "Frontier Atlas Privacy Policy and information practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111111]">
      <Navbar />
      <main className="max-w-[900px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-[13px] text-[#888888] font-mono mb-8">Effective Date: September 2026</p>

        <div className="bg-white rounded-2xl border border-[#E5E5E0] p-8 md:p-12 space-y-8 text-[15px] leading-relaxed text-[#444444] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">1. Information We Collect</h2>
            <p>
              Frontier Atlas indexes publicly accessible scientific literature, code repositories (e.g., GitHub), and public model registries (e.g., Hugging Face). For registered users, we collect account identifiers (such as email) strictly to maintain personal libraries, saved papers, and discussion comments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">2. How We Use Information</h2>
            <p>
              We use collected information solely to provide, personalize, and improve our indexing service, deliver your saved research collections, and facilitate research community interactions. We do not sell or monetize personal user data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">3. Cookies and Local Storage</h2>
            <p>
              We employ HTTP-only authentication cookies to maintain authenticated sessions and browser local storage to cache non-sensitive feed preferences and fast-loading paper caches.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#111111] mb-2">4. Contact Us</h2>
            <p>
              If you have any questions or requests concerning your data or removal of public research metadata, please contact us at <a href="mailto:privacy@frontieratlas.co" className="text-[#F55036] underline">privacy@frontieratlas.co</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
