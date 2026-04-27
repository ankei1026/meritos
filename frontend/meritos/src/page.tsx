"use client";

import { useState } from "react";

export default function Home() {
  const [formEmail, setFormEmail] = useState("");
  const [formStartupStage, setFormStartupStage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log({ email: formEmail, startupStage: formStartupStage });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-violet-600">meri</span>
            <span className="text-green-600">tos</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-600 dark:text-gray-300">
            <a href="#how-it-works" className="hover:text-violet-600 transition">How it works</a>
            <a href="#success" className="hover:text-violet-600 transition">Success stories</a>
            <a href="#pricing" className="hover:text-violet-600 transition">Pricing</a>
          </div>
          <a
            href="#get-started"
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-md"
          >
            Post a challenge
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-violet-700 dark:text-violet-300 font-medium">
              Trusted by 200+ founders
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            Stop hiring generalists.
            <span className="text-gradient-violet-green block mt-2">
              Get project-ready researchers.
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Meritos connects startup founders with vetted researchers, students, and innovators who solve real problems—in 7 days or less.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <a
              href="#get-started"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              Post your first challenge free →
            </a>
            <a
              href="#how-it-works"
              className="border border-gray-300 dark:border-gray-700 hover:border-violet-500 px-8 py-3.5 rounded-xl text-lg font-medium transition"
            >
              Watch demo video
            </a>
          </div>
        </div>

        {/* Hero Image / Dashboard Mock */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-green-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="bg-gray-800 px-4 py-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-violet-400 text-sm mb-2">ACTIVE MATCHES</div>
                  <div className="text-3xl font-bold">12 researchers ready</div>
                  <p className="text-gray-400 text-sm mt-2">AI-matched to your challenge</p>
                </div>
                <div className="border-l border-gray-700 pl-6">
                  <div className="text-green-400 text-sm mb-2">AVG. TIME TO HIRE</div>
                  <div className="text-3xl font-bold">6.8 days</div>
                  <p className="text-gray-400 text-sm mt-2">vs 28 days on LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-6">TRUSTED BY INNOVATIVE STARTUPS</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
            {["Y Combinator", "Techstars", "Sequoia", "A16Z"].map((name) => (
              <span key={name} className="text-xl font-semibold text-gray-400">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How Meritos works for founders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Three simple steps from challenge to solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Post your challenge",
              desc: "Describe your research or innovation problem in 5 minutes. Set your budget and timeline.",
              icon: "📝",
              color: "violet",
            },
            {
              step: "02",
              title: "Get matched in 48h",
              desc: "Our AI matches you with vetted researchers and students from top universities.",
              icon: "⚡",
              color: "green",
            },
            {
              step: "03",
              title: "Interview & hire",
              desc: "Review proposals, interview top candidates, and start working within 7 days.",
              icon: "🚀",
              color: "violet",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 ${
                  item.color === "violet"
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                    : "bg-green-50 dark:bg-green-900/30 text-green-600"
                }`}
              >
                {item.icon}
              </div>
              <div className="text-sm text-gray-400 mb-2">{item.step}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-violet-50 dark:bg-violet-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Meritos vs. traditional hiring</h2>
            <p className="text-gray-600 dark:text-gray-300">Get researchers in days, not months</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-left text-violet-600">Meritos</th>
                  <th className="p-4 text-left text-gray-400">LinkedIn / Upwork</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ["Pre-vetted researchers", "✅", "❌"],
                  ["Avg. time to hire", "7 days", "28+ days"],
                  ["Student & academic talent", "✅", "❌"],
                  ["Success fee", "50% less", "15-20%"],
                  ["First challenge", "Free", "Paid"],
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 font-medium">{row[0]}</td>
                    <td className="p-4 text-green-600">{row[1]}</td>
                    <td className="p-4 text-gray-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section id="success" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Founders love Meritos</h2>
          <p className="text-gray-600 dark:text-gray-300">Real results from real startups</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-2xl p-8 border-l-4 border-violet-500">
            <div className="flex gap-1 mb-4">★★★★★</div>
            <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
              "We needed a researcher to validate our market hypothesis. Meritos matched us with a PhD candidate in 3 days. Hired her within a week."
            </p>
            <div className="font-semibold">— Sarah Chen, Founder @ OmniBio</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-2xl p-8 border-l-4 border-green-500">
            <div className="flex gap-1 mb-4">★★★★★</div>
            <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
              "Tried Upwork for 2 months. Got 5 applicants. Meritos gave me 12 vetted researchers in 48 hours. Game changer."
            </p>
            <div className="font-semibold">— Marcus Lee, CTO @ FinDash</div>
          </div>
        </div>
      </section>

      {/* Form Section - Lead Capture */}
      <section id="get-started" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50 to-green-50 dark:from-violet-950/20 dark:to-green-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-violet-900 dark:text-violet-200">
            Post your first challenge — free
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Join 200+ founders who found their researcher in under 7 days.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <select
                  required
                  value={formStartupStage}
                  onChange={(e) => setFormStartupStage(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Startup stage</option>
                  <option value="idea">Idea / Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="growth">Growth / Series A+</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Get started →"}
              </button>
              <p className="text-xs text-gray-500 mt-4">
                No credit card required. Free for your first challenge.
              </p>
            </form>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-green-600 text-4xl mb-3">✓</div>
              <h3 className="text-xl font-semibold mb-2">You're on the list!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We'll reach out within 24 hours to help you post your first challenge.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl font-bold mb-4">
            <span className="text-violet-600">meri</span>
            <span className="text-green-600">tos</span>
          </div>
          <p>© 2025 Meritos. Connecting founders to the future.</p>
        </div>
      </footer>
    </main>
  );
}