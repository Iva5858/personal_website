## Isaac Vélez Aguirre – Personal Website & Portfolio

This is the source code for my personal website and portfolio, built with **Next.js (App Router)** and **TypeScript**.  
It showcases my background in **Data Science & Business Analytics**, my education and experience, and a curated set of projects in **machine learning**, **statistics**, and **LLMs**.

### Main Sections

- **Home (`/`)**: Hero section with quick access to projects and contact.
- **About (`/about`)**: Detailed bio, education, and professional experience.
- **Projects (`/projects`)**: Overview of featured work, with individual project pages:
  - Wordle optimizer using information theory and optimization.
  - Neural network from scratch for handwritten digit recognition (MNIST).
  - Statistical computing coursework (MCMC & flight data analysis).
  - Ongoing ML coursework on diabetes-related health outcomes.
  - Project NoCap – AI-powered fact-checking assistant for Instagram.
- **Contact (`/contact`)**: Contact form (backed by Web3Forms) plus email, location, and social links.

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom light/dark themed UI)
- **Images**: `next/image`
- **Forms**: Web3Forms API for contact form submissions

### Getting Started (Local Development)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   The contact form uses [Web3Forms](https://web3forms.com/) for submissions:

   - Visit `https://web3forms.com/` and create a free account.
   - Get your **access key**.
   - Create a `.env.local` file in the project root with:

     ```bash
     NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
     ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Then open `http://localhost:3000` in your browser.

### Project Structure (High Level)

- `app/page.tsx` – Home page (hero, about preview, featured projects).
- `app/about/page.tsx` – About page (bio, modules, education, experience).
- `app/projects/data.ts` – Project metadata used across the projects section.
- `app/projects/page.tsx` – Projects listing page.
- `app/projects/[id]/page.tsx` – Dynamic project detail pages.
- `app/contact/page.tsx` – Contact page and Web3Forms integration.
- `app/components/*` – Shared layout/navigation/footer components.

### Deployment

This app is optimized for deployment on **Vercel**:

- Build command: `npm run build`
- Output: Next.js app (App Router)

You can deploy by connecting this repository to Vercel and using the default Next.js settings.

### License

This repository uses a **dual licensing approach**:

- **Code/Template**: Licensed under the **MIT License** — you are free to use the codebase structure, components, and technical implementation as a template for your own portfolio website.

- **Personal Content**: All personal content (biography, project descriptions, images, contact information) is **copyrighted** and **protected**. You may NOT:
  - Use my personal information or project descriptions to impersonate me
  - Claim my projects or work as your own
  - Reproduce my biographical content or project descriptions without permission

**In short**: Feel free to use this as a template, but replace all personal content with your own original content. See `LICENSE` for full terms.


