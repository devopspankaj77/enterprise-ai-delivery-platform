import { SiteContent } from "@/lib/types";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
      {content.footerText}
    </footer>
  );
}
