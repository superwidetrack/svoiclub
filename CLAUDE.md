# Свои Club — Premium Dating Service for Russian-Speaking Emigrants

## What is this?

A premium matchmaking service and closed community for Russian-speaking emigrants (25-45) living abroad. Not a swipe app — quality over quantity. Features psychological screening, personal interviews, and value-based matching.

**Live site:** https://superwidetrack.github.io/svoiclub

## Tech Stack

- **Framework:** Next.js 15 (static export)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Markdown:** react-markdown + remark-gfm
- **Hosting:** GitHub Pages (auto-deploy via GitHub Actions)
- **Fonts:** Playfair Display (serif headlines), Inter (body)

## How to Run Locally

```bash
npm install
npm run dev        # starts on http://localhost:3000
```

## How to Deploy

Just push to `main`:

```bash
git push origin main
```

GitHub Actions will build and deploy to GitHub Pages automatically.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout (fonts, metadata)
│   ├── globals.css                 # Global styles, theme variables
│   └── research/
│       ├── page.tsx                # Research dashboard
│       ├── competitors/page.tsx    # Competitor analysis
│       ├── audience/page.tsx       # Target audience
│       ├── marketing/page.tsx      # Marketing strategy
│       ├── product/page.tsx        # Product design
│       ├── growth/page.tsx         # Growth playbook
│       └── geo-strategy/page.tsx   # Geographic strategy
├── components/
│   ├── Header.tsx, Hero.tsx, etc.  # Landing page sections
│   └── research/
│       ├── ResearchLayout.tsx      # Shared research page layout + nav
│       ├── ChartCard.tsx           # Chart wrapper component
│       ├── StatCard.tsx            # Stat display card
│       └── MarkdownRenderer.tsx    # Styled markdown renderer
├── lib/
│   └── docs.ts                    # Doc file URL helpers
docs/                              # Research markdown files (source)
public/docs/                       # Research markdown files (served statically)
```

## Key Design Decisions

- **Static export** (`output: "export"`) — no server needed, hosted on GitHub Pages
- **basePath: "/svoiclub"** — required for GitHub Pages project site
- **Dark theme** with gold accents (#c9a96e) — premium feel
- **Site content in Russian**, code/comments in English
- Research pages fetch markdown from `public/docs/` at runtime and render with styled components
- All charts use Recharts with consistent dark theme tooltips

## Content

- Landing: Hero, How It Works (4 steps), Target Audience, Testimonials, Waitlist Form, FAQ
- Research: 6 sections with charts, tables, and rendered markdown from docs/
