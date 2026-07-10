export type BusinessInput = {
  description: string;
  industry: string;
  tone: string;
  primaryGoal: string;
};

export type SiteContent = {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCtaLabel: string;
  features: {
    title: string;
    description: string;
  }[];
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButtonLabel: string;
  footerText: string;
  accentColor: string;
};
