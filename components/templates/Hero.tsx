import { SiteContent } from "@/lib/types";

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="px-6 py-24 text-center">
      <p
        className="mb-4 text-sm font-semibold uppercase tracking-widest"
        style={{ color: content.accentColor }}
      >
        {content.brandName}
      </p>
      <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
        {content.heroHeadline}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
        {content.heroSubheadline}
      </p>
      <button
        className="mt-10 rounded-full px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
        style={{ backgroundColor: content.accentColor }}
      >
        {content.primaryCtaLabel}
      </button>
    </section>
  );
}
