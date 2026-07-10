import { NextRequest, NextResponse } from "next/server";
import { generateSiteContent } from "@/lib/anthropic";
import { BusinessInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BusinessInput>;

    if (!body.description || !body.industry || !body.tone || !body.primaryGoal) {
      return NextResponse.json(
        { error: "Missing one or more required fields: description, industry, tone, primaryGoal." },
        { status: 400 }
      );
    }

    const content = await generateSiteContent(body as BusinessInput);
    return NextResponse.json({ content });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message || "Unknown error generating site content." },
      { status: 500 }
    );
  }
}
