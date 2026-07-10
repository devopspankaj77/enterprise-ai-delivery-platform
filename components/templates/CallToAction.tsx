import { SiteContent } from "@/lib/types";

export default function CallToAction({ content }: { content: SiteContent }) {
  return (
    <section
      className="mx-6 mb-16 rounded-3xl px-8 py-16 text-center sm:mx-auto sm:max-w-4xl"
      style={{
        background: `linear-gradient(135deg, ${content.accentColor}22, ${content.accentColor}55)`,
      }}
    >
      <h2 className="text-2xl font-bold sm:text-3xl">{content.ctaHeadline}</h2>
      <p className="mx-auto mt-4 max-w-lg text-slate-300">{content.ctaSubtext}</p>
      <button
        className="mt-8 rounded-full px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
        style={{ backgroundColor: content.accentColor }}
      >
        {content.ctaButtonLabel}
      </button>
    </section>
  );
}
