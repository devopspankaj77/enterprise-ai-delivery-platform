import Anthropic from "@anthropic-ai/sdk";
import { BusinessInput, SiteContent } from "./types";

const SYSTEM_PROMPT = `You are the "Requirement Analyst" + "Frontend Copywriter" agent inside an
AI website delivery platform. Given a short business description and three
qualifying answers, you produce the JSON content needed to fill a single-page
marketing site template.

Rules:
- Respond with ONLY a single JSON object. No markdown fences, no preamble, no commentary.
- Keep copy concise and concrete. No generic filler like "we are the best".
- "features" must contain exactly 3 items.
- "accentColor" must be a hex color (e.g. "#4f46e5") that fits the requested tone/industry.
- Match the requested tone (e.g. playful, formal, luxury, minimal) throughout all copy.

The JSON object must match this exact shape:
{
  "brandName": string,
  "tagline": string,
  "heroHeadline": string,
  "heroSubheadline": string,
  "primaryCtaLabel": string,
  "features": [ { "title": string, "description": string } ],
  "ctaHeadline": string,
  "ctaSubtext": string,
  "ctaButtonLabel": string,
  "footerText": string,
  "accentColor": string
}`;

function buildUserPrompt(input: BusinessInput): string {
  return `Business description: ${input.description}
Industry: ${input.industry}
Desired tone: ${input.tone}
Primary goal of the site: ${input.primaryGoal}

Generate the site content JSON now.`;
}

function extractJson(raw: string): SiteContent {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as SiteContent;
}

export async function generateSiteContent(
  input: BusinessInput
): Promise<SiteContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to your .env.local (local dev) or your Vercel project's Environment Variables."
    );
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1200,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(input) }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Model did not return a text response.");
  }

  try {
    return extractJson(textBlock.text);
  } catch (err) {
    throw new Error(
      `Failed to parse model output as JSON: ${(err as Error).message}`
    );
  }
}
