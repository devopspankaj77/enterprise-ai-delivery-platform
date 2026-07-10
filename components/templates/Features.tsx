import { SiteContent } from "@/lib/types";

export default function Features({ content }: { content: SiteContent }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {content.features.map((feature, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <div
              className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: content.accentColor }}
            >
              {i + 1}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
