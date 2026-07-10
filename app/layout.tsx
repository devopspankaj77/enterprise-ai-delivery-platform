import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Delivery Platform — Sprint 0 POC",
  description: "Describe a business, answer 3 questions, get a generated single-page site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
