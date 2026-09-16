"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, FileText } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "Research Submission", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111111]">
      <Navbar />
      <main className="max-w-[1100px] mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Get in touch with <span className="text-[#F55036]">FrontierAtlas</span>
          </h1>
          <p className="text-base sm:text-lg text-[#666666]">
            Have research to feature, benchmark results to submit, or questions about our platform? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-2">Message Sent!</h3>
                <p className="text-[#666666] max-w-sm mb-6 text-[14px]">
                  Thank you for reaching out. A member of the FrontierAtlas editorial team will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "Research Submission", message: "" }); }}
                  className="px-6 py-2.5 rounded-full bg-[#F55036] text-white font-semibold text-[13px] hover:bg-[#E0462D] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-semibold text-[#111111] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E5E0] bg-[#F8F7F2] text-[#111111] placeholder:text-[#999] text-[14px] focus:outline-none focus:border-[#F55036] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold text-[#111111] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@research.org"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E5E0] bg-[#F8F7F2] text-[#111111] placeholder:text-[#999] text-[14px] focus:outline-none focus:border-[#F55036] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[13px] font-semibold text-[#111111] mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E5E0] bg-[#F8F7F2] text-[#111111] text-[14px] focus:outline-none focus:border-[#F55036] focus:bg-white transition-colors"
                  >
                    <option value="Research Submission">Submit Research / Paper</option>
                    <option value="Benchmark Ingestion">Benchmark Score Update</option>
                    <option value="Press & Media">Press & Media Inquiry</option>
                    <option value="Partnership">Ecosystem Partnership</option>
                    <option value="General Feedback">Feedback or Bug Report</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-semibold text-[#111111] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Include relevant arXiv IDs, links to model repositories, or details about your request..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E5E0] bg-[#F8F7F2] text-[#111111] placeholder:text-[#999] text-[14px] focus:outline-none focus:border-[#F55036] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F55036] text-white font-semibold text-[14px] hover:bg-[#E0462D] transition-colors shadow-sm cursor-pointer"
                >
                  <Send size={16} />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5E5E0] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-lg bg-[#FFF0EB] text-[#F55036] flex items-center justify-center mb-3">
                <FileText size={20} />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-1.5">Submit Research Directly</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed mb-3">
                Papers with open-source code and reproducible checkpoints receive priority indexing across our taxonomy.
              </p>
              <span className="text-[13px] font-semibold text-[#F55036]">
                research@frontieratlas.co
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E5E0] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-lg bg-[#FFF0EB] text-[#F55036] flex items-center justify-center mb-3">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-1.5">Join the Community</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed mb-3">
                Engage in discussions with researchers, model authors, and machine learning practitioners worldwide.
              </p>
              <a
                href="/discussions"
                className="text-[13px] font-semibold text-[#F55036] hover:underline"
              >
                Go to Discussions →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
