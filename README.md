# Emi Kobayashi – Personal Portfolio & Resume Site

A modern, minimal, consulting-grade personal brand website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: header, footer, metadata
│   ├── page.tsx            # Home page (hero, featured projects, skills, CTA)
│   ├── globals.css         # Global styles + theme variables
│   ├── projects/
│   │   └── page.tsx        # All projects with tag filters
│   ├── about/
│   │   └── page.tsx        # Resume page (summary, experience, education, etc.)
│   └── contact/
│       └── page.tsx        # Contact form + social links
├── components/
│   ├── Header.tsx          # Sticky nav with dark mode toggle + mobile menu
│   ├── Footer.tsx          # Copyright + social links
│   ├── ThemeProvider.tsx   # Dark/light mode context
│   ├── ThemeToggle.tsx     # Theme switch button
│   ├── LanguageProvider.tsx
│   ├── LanguageSelect.tsx
│   ├── SideNav.tsx
│   ├── ProjectCard.tsx     # Reusable project card
│   ├── Skills.tsx          # Skills grid section
│   ├── ContactForm.tsx     # Client-side contact form
│   ├── pages/              # Page-level content components
│   └── shared/             # Shared card components (Experience, Education, etc.)
├── data/
│   └── profile.ts          # ★ ALL CONTENT LIVES HERE ★
└── lib/
    ├── basePath.ts
    ├── translations.ts     # EN / JA / ZH translations
    └── useReveal.ts
```

## Where the Content Lives

**All site content is driven by a single file:**

```
src/data/profile.ts
```

This file exports a fully typed `Profile` object containing:

| Field | Description |
|---|---|
| `name`, `headline`, `summary` | Personal branding |
| `location` | Displayed in hero + footer |
| `specialties` | Pills shown on the home hero |
| `socialLinks` | Links for footer + contact page |
| `contactEmail` | Email (leave empty as placeholder) |
| `resumeUrl` | URL for "Download Resume" button |
| `skills` | Grouped skill categories |
| `projects` | Array of project objects |
| `experience` | Work experience entries |
| `education` | Education entries |
| `certifications` | Certification entries |
| `languages` | Spoken languages |

**No hardcoded text exists in components.** Edit `profile.ts` and the entire site updates.

## How to Add a New Project

1. Open `src/data/profile.ts`.
2. Add a new object to the `projects` array:

```typescript
{
  id: "my-new-project",           // URL-safe slug
  title: "My New Project Title",
  org: "Organization Name",       // optional
  dates: "Jan 2026 – Mar 2026",
  summary: "One-paragraph summary of the project.",
  bullets: [
    "Key deliverable or accomplishment #1.",
    "Key deliverable or accomplishment #2.",
  ],
  skills: ["Skill A", "Skill B"],
  tags: ["Tag1", "Tag2"],         // used for filter buttons on /projects
  artifacts: [
    { label: "Report", url: "https://example.com/report.pdf" },
  ],
  highlights: ["Award-winning"],  // optional badges
  featured: true,                 // show on homepage?
}
```

3. Save the file. The dev server hot-reloads automatically.

## How to Update Skills

In `profile.ts`, edit the `skills` array. Each entry has a `category` (string) and `items` (string array).

## Download Resume as PDF

The "Download Resume" button links to a static PDF in `public/`. The active PDF is selected per language via `resumeUrl` in `profile.ts` (English) and `translations.ts` (Japanese / Chinese).

To regenerate the JA / ZH PDFs from the translation data, run:

```bash
npm run generate-pdfs
```

## Dark Mode

The site includes a dark mode toggle in the header. It:
- Defaults to the user's system preference
- Persists the choice in localStorage
- Uses CSS custom properties for theming

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Vercel auto-detects Next.js — no config needed.
5. Click **Deploy**.

Your site will be live at `https://your-project.vercel.app`.

### Custom Domain

In the Vercel dashboard → Settings → Domains → add your domain and follow DNS instructions.

## Optional: Migrate to MDX

If you later want to write project descriptions in Markdown:

1. Install `@next/mdx`:
   ```bash
   npm install @next/mdx @mdx-js/loader @mdx-js/react
   ```
2. Create `src/content/projects/` with `.mdx` files.
3. Use frontmatter for metadata (title, dates, tags, etc.) and the body for rich descriptions.
4. Update components to read from MDX files instead of `profile.ts`.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- No database required

## License

Personal project. All rights reserved.
