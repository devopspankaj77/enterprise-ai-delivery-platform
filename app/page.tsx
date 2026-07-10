"use client";

import { useState } from "react";
import { SiteContent } from "@/lib/types";
import PreviewSite from "@/components/PreviewSite";

const INDUSTRIES = ["Restaurant", "SaaS / Software", "Salon & Spa", "Consulting", "Other"];
const TONES = ["Professional", "Playful", "Luxury", "Minimal"];
const GOALS = ["Get bookings/leads", "Sell a product", "Explain a service", "Build brand awareness"];

export default function Home() {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [primaryGoal, setPrimaryGoal] = useState(GOALS[0]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setContent(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, industry, tone, primaryGoal }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong generating the site.");
      }

      setContent(data.content as SiteContent);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Sprint 0 &middot; Proof of Concept
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Describe your business. Get a working site.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          This is the smallest end-to-end slice of the AI Delivery Platform: one agent,
          one component library, one page. Expand it from here.
        </p>
      </header>

      <section className="mx-auto mb-16 max-w-2xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Describe your business
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm focus:border-indigo-500 focus:outline-none"
            rows={3}
            placeholder="e.g. A boutique coffee roastery in Pune that also runs weekend brewing workshops."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Industry</label>
            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {INDUSTRIES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Tone</label>
            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {TONES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Primary goal</label>
            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
            >
              {GOALS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || description.trim().length === 0}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate site"}
        </button>

        {error && (
          <p className="rounded-lg bg-red-950/50 p-3 text-sm text-red-300">{error}</p>
        )}
      </section>

      {content && (
        <section>
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            Preview
          </h2>
          <PreviewSite content={content} />
        </section>
      )}
    </main>
  );
}
