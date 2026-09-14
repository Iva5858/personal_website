## Isaac Velez – Personal Website & Portfolio

Source code for my personal portfolio, built with **Next.js 16 (App Router)** and **TypeScript**.  
It showcases my background as an MS in AI (Robotics & Perception) student at Columbia University, and a curated set of projects in machine learning, robotics, statistical computing, quantitative finance, and LLMs.

---

### Main Sections

| Route | Description |
|---|---|
| `/` | Hero, about preview, featured projects |
| `/projects` | Project grid with filter cards |
| `/projects/[id]` | Individual project detail pages |
| `/resume` | Inline PDF résumé viewer, download link, "last updated" date |
| `/contact` | Contact form (Web3Forms) plus email and social links |
| `/llms.txt` | Machine-readable markdown index for AI/LLM crawlers |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Crawler rules |

---

### Projects

All project metadata lives in `app/projects/data.ts` and is the single source of truth for the grid, detail pages, and the `/llms.txt` document.

| # | Project | Category | Status |
|---|---------|----------|--------|
| 8 | Vera | AI / LLM Applications | Active |
| 7 | LLM-Assisted Creative Curation (research) | Research | Active |
| 6 | Stock Market Prediction & Evaluation Framework | Machine Learning | Completed |
| 5 | Project NoCap – AI Fact-Checking for Instagram | LLMs & Prompt Engineering | Ongoing |
| 4 | Diabetes ML Analysis – BRFSS (University of London) | Machine Learning | Completed |
| 1 | Information-Theoretic Wordle Solver | Algorithms & Optimization | Ongoing |
| 2 | Handwritten Digit Recognition from Scratch (MNIST) | Machine Learning | Completed |
| 3 | MCMC & Flight Data Analysis (University of London) | Statistical Computing | Completed |

Each project's cover image lives in `public/images/projects/project<id>/` — the folder number is kept in sync with the project's `id`.

---

### Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Images**: `next/image`
- **Forms**: Web3Forms API
- **Analytics**: Vercel Analytics + Speed Insights

---

### Project Structure

```
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout (metadata, fonts, analytics)
├── globals.css                 # Global styles (Tailwind v4)
├── robots.ts                   # Crawler rules
├── sitemap.ts                  # Auto-generated sitemap from projects/data.ts
├── llms.txt/
│   └── route.ts                # /llms.txt — markdown index for AI/LLM crawlers
├── resume/
│   └── page.tsx                # Résumé viewer (PDF embed + download + last-updated date)
├── contact/
│   ├── layout.tsx
│   └── page.tsx                # Contact form (Web3Forms)
├── projects/
│   ├── data.ts                 # All project metadata (single source of truth)
│   ├── page.tsx                # Projects listing page
│   ├── [id]/
│   │   ├── page.tsx            # Dynamic project detail page
│   │   └── not-found.tsx
│   ├── 1/demo/page.tsx         # Wordle solver demo
│   └── 2/demo/page.tsx         # MNIST demo
├── api/
│   └── wordle/route.ts         # Wordle solver API
└── components/
    ├── AnimateIn.tsx
    ├── ConditionalLayout.tsx
    ├── CursorGlow.tsx
    ├── Footer.tsx
    ├── Navigation.tsx
    ├── ParticleField.tsx
    ├── ProjectsGrid.tsx         # Project cards with 3D tilt effect
    └── ScrambleText.tsx

scripts/
└── set-build-date.mjs          # Writes NEXT_PUBLIC_BUILD_DATE into .env.local (see below)
```

---

### Getting Started (Local Development)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   The contact form uses [Web3Forms](https://web3forms.com/). Create a `.env.local` file:

   ```bash
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com   # used in sitemap/llms.txt
   ```

   `NEXT_PUBLIC_BUILD_DATE` doesn't need to be set manually — `scripts/set-build-date.mjs` writes it into `.env.local` automatically before every `dev` and `build` run (via the `predev`/`prebuild` npm hooks), merging with whatever else is already in that file. It powers the "last updated" text in the footer, hero, and résumé page, so it stays current on every deploy without manual edits.

3. **Add your résumé**

   Drop your PDF at `public/Velez_Isaac_Resume_Website.pdf` — the `/resume` page and its download link both reference that exact path.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

---

### Adding a Project

All project data is centralised in `app/projects/data.ts`. Add an entry to the `projects` array:

```ts
{
  id: 9,                             // unique, used for routing (/projects/9)
  title: 'My Project',
  description: 'Short description shown on the card.',
  technologies: ['Python', 'NumPy'],
  category: 'Machine Learning',
  image: '/images/projects/project9/cover.jpg',  // keep the folder number in sync with id
  timeframe: 'January 2027 - Present',
  current: true,                     // optional — shows pulsing "Active" badge
  interactive: false,
  githubUrl: 'https://github.com/...',
  details: `Extended write-up shown on the detail page.`,
}
```

`image` is optional — omit it and the card falls back to a gradient placeholder with the project's initial. If the image is a logo rather than a photo, add the project's `id` to the `object-contain` check in `ProjectsGrid.tsx` so it isn't cropped.

The entry is automatically picked up by the project grid, the detail page router, the sitemap, and `/llms.txt`.

---

### SEO & AI Crawler Support

- **`/sitemap.xml`** — generated from `sitemap.ts`, includes all static pages and every project detail page.
- **`/robots.txt`** — generated from `robots.ts`, allows all crawlers except `/api/`.
- **`/llms.txt`** — generated from `llms.txt/route.ts` using `projects/data.ts` as the source. Follows the [llms.txt convention](https://llmstxt.org/) for AI-readable site descriptions. Updated automatically whenever project data changes.

---

### Deployment

Deployed on **Vercel** (Next.js default settings).

- Build command: `npm run build` — the `prebuild` hook regenerates `NEXT_PUBLIC_BUILD_DATE` on every deploy, so the site's "last updated" mentions always reflect the actual deploy date.
- `lightningcss-linux-x64-gnu` is declared in `optionalDependencies` to ensure the correct native binary is installed on Vercel's Linux build machines (required by Tailwind CSS v4).

---

### License

**Dual licensing:**

- **Code / template** — MIT License. Free to use as a portfolio template.
- **Personal content** — All biographical text, project descriptions, and images are copyright Isaac Velez. Do not reproduce or repurpose personal content without permission.

In short: use the structure, replace the content.
