import { SiteContent } from "@/lib/types";
import Hero from "./templates/Hero";
import Features from "./templates/Features";
import CallToAction from "./templates/CallToAction";
import Footer from "./templates/Footer";

export default function PreviewSite({ content }: { content: SiteContent }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <Hero content={content} />
      <Features content={content} />
      <CallToAction content={content} />
      <Footer content={content} />
    </div>
  );
}
