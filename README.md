# Enterprise AI Delivery Platform — Sprint 0 POC

This is the smallest working slice of the larger platform idea:

> User describes a business → answers 3 quick questions → an AI agent generates
> the copy for a single-page site → that copy is rendered through one reusable
> component library (Hero, Features, CTA, Footer) → previewed in the browser.

Nothing here is fake or mocked — the `/api/generate` route makes a real call
to the Claude API and the preview renders whatever comes back.

**What this POC intentionally does *not* do yet** (by design — these are
future sprints, not missing features):
- No deployment automation (you deploy the *generator*, not the generated site)
- No database, auth, or saved projects — everything lives in browser state
- Only one component/theme library ("modern SaaS") and one page section set
- No multi-agent pipeline — one prompt does requirements + copywriting

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- `@anthropic-ai/sdk` calling the Claude API server-side (your key never
  reaches the browser)

## 1. Run it locally

```bash
git clone https://github.com/devopspankaj77/enterprise-ai-delivery-platform.git
cd enterprise-ai-delivery-platform
npm install
cp .env.example .env.local
# edit .env.local and paste your key from https://console.anthropic.com/
npm run dev
```

Open http://localhost:3000, describe a business, pick the three dropdowns,
and click **Generate site**.

## 2. Push this code to your GitHub repo

If you received this project as a folder/zip rather than already inside your
cloned repo, push it like this:

```bash
cd enterprise-ai-delivery-platform
git init            # only if this folder isn't already a git repo
git remote add origin https://github.com/devopspankaj77/enterprise-ai-delivery-platform.git
git add .
git commit -m "Sprint 0: end-to-end POC (describe business -> generated single-page site)"
git branch -M main
git push -u origin main
```

If the repo already has commits (e.g. a README from GitHub's UI), use
`git pull origin main --allow-unrelated-histories` before pushing.

## 3. Deploy to Vercel

1. Go to https://vercel.com/new and import
   `devopspankaj77/enterprise-ai-delivery-platform`.
2. Framework preset: Next.js (auto-detected).
3. Add an environment variable: `ANTHROPIC_API_KEY` = your key.
4. Deploy. Every future `git push` to `main` will redeploy automatically.

## Project structure

```
app/
  page.tsx              -- the intake form + preview UI
  api/generate/route.ts -- server route that calls Claude and returns JSON content
  layout.tsx, globals.css
components/
  PreviewSite.tsx        -- composes the template components into a page
  templates/
    Hero.tsx
    Features.tsx
    CallToAction.tsx
    Footer.tsx
lib/
  anthropic.ts            -- prompt + Claude API call + JSON parsing
  types.ts                 -- BusinessInput / SiteContent shared types
```

## Testing it incrementally

This structure is meant to be grown one sprint at a time rather than
replaced. Some natural next steps, roughly in order of effort:

1. **Second template style** — add `components/templates/luxury/*` and a
   `theme` field to `SiteContent` so the agent can pick a visual style, not
   just an accent color.
2. **Multi-step questions** — replace the 3 fixed dropdowns with a short
   back-and-forth (agent asks a follow-up based on the description).
3. **Export the generated site** — add a button that writes the rendered
   HTML/React to a downloadable zip, so the "product" isn't just a preview.
4. **Second agent** — split the single prompt into a Requirements Analyst
   agent (extracts structured facts) that hands off to a Copywriter agent.
5. **Persistence** — add a database (e.g. Postgres via Vercel Postgres or
   Supabase) so generated sites survive a refresh and can be listed/edited.
6. **Second deploy target** — add a route that pushes the generated site to
   its own Vercel project via the Vercel API, so users get a live URL for
   *their* business, not just yours.

Each of those maps to one "volume" from the original roadmap — the point of
this POC is to prove the core loop works before investing in the rest.

## Troubleshooting

- **"ANTHROPIC_API_KEY is not set"** — you're missing `.env.local` (dev) or
  the Vercel project environment variable (production).
- **Model output fails to parse as JSON** — this can happen occasionally with
  any LLM; the route surfaces the raw error message. Retrying usually works.
  A future sprint can add retry-with-repair logic (Volume 5: AI System, Retry
  Logic).
