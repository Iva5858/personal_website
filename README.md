## Isaac Vélez Aguirre – Personal Website & Portfolio

Source code for my personal portfolio, built with **Next.js 16 (App Router)** and **TypeScript**.  
It showcases my background in **Data Science & Business Analytics**, my education and experience, and a curated set of projects in machine learning, statistical computing, quantitative finance, and LLMs.

---

### Main Sections

| Route | Description |
|---|---|
| `/` | Hero, about preview, featured projects |
| `/about` | Bio, education, modules, professional experience |
| `/projects` | Project grid with filter cards |
| `/projects/[id]` | Individual project detail pages |
| `/contact` | Contact form (Web3Forms) plus email and social links |
| `/llms.txt` | Machine-readable markdown index for AI/LLM crawlers |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Crawler rules |

---

### Projects

All project metadata lives in `app/projects/data.ts` and is the single source of truth for the grid, detail pages, and the `/llms.txt` document.

| # | Project | Category | Status |
|---|---------|----------|--------|
| 6 | Stock Market Prediction & Evaluation Framework | Machine Learning | Active |
| 5 | Project NoCap – AI Fact-Checking for Instagram | LLMs & Prompt Engineering | Ongoing |
| 4 | Diabetes ML Analysis – BRFSS (University of London) | Machine Learning | Completed |
| 1 | Information-Theoretic Wordle Solver | Algorithms & Optimization | Ongoing |
| 2 | Handwritten Digit Recognition from Scratch (MNIST) | Machine Learning | Completed |
| 3 | MCMC & Flight Data Analysis (University of London) | Statistical Computing | Completed |

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
├── about/
│   └── page.tsx                # About page
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
    ├── ScrambleText.tsx
    ├── SkillsSection.tsx
    └── TimelineSection.tsx
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

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

---

### Adding a Project

All project data is centralised in `app/projects/data.ts`. Add an entry to the `projects` array:

```ts
{
  id: 7,                             // unique, used for routing (/projects/7)
  title: 'My Project',
  description: 'Short description shown on the card.',
  technologies: ['Python', 'NumPy'],
  category: 'Machine Learning',
  image: '/images/projects/project7/cover.jpg',
  timeframe: 'January 2026 - Present',
  current: true,                     // optional — shows pulsing "Active" badge
  interactive: false,
  githubUrl: 'https://github.com/...',
  details: `Extended write-up shown on the detail page.`,
}
```

The entry is automatically picked up by the project grid, the detail page router, the sitemap, and `/llms.txt`.

---

### SEO & AI Crawler Support

- **`/sitemap.xml`** — generated from `sitemap.ts`, includes all static pages and every project detail page.
- **`/robots.txt`** — generated from `robots.ts`, allows all crawlers except `/api/`.
- **`/llms.txt`** — generated from `llms.txt/route.ts` using `projects/data.ts` as the source. Follows the [llms.txt convention](https://llmstxt.org/) for AI-readable site descriptions. Updated automatically whenever project data changes.

---

### Deployment

Deployed on **Vercel** (Next.js default settings).

- Build command: `npm run build`
- `lightningcss-linux-x64-gnu` is declared in `optionalDependencies` to ensure the correct native binary is installed on Vercel's Linux build machines (required by Tailwind CSS v4).

---

### License

**Dual licensing:**

- **Code / template** — MIT License. Free to use as a portfolio template.
- **Personal content** — All biographical text, project descriptions, and images are copyright Isaac Vélez Aguirre. Do not reproduce or repurpose personal content without permission.

In short: use the structure, replace the content.
