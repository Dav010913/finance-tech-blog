# Project Summary: Minimalist Financial Research Blog

## 1. Project Overview
A high-performance, minimalist blog built with **Next.js 15 (App Router)** and **Tailwind CSS v4**.
- **Mode**: Hybrid (SSG + SSR). Optimized for Vercel.
- **Target**: Financial/Tech research articles.
- **Languages**: Bilingual (Chinese & English).

## 2. Bilingual Architecture
The project uses a split-folder strategy for content management.

### File Structure
- `posts/zh/*.md`: Chinese markdown articles.
- `posts/en/*.md`: English markdown articles.
- `lib/posts.ts`: Scanning logic that reads both directories and adds a `lang` field (`zh` or `en`) to each post object.

### Routing & Filtering
To ensure optimal performance on Vercel:
- **`app/page.tsx`**: A **Server Component** that fetches *all* posts build-time.
- **`app/components/PostList.tsx`**: A **Client Component** that receives all posts and filters them based on the browser's URL query parameter (`?lang=en` or default `zh`).
- **Suspense**: All Client Components using `useSearchParams` (`PostList`, `LanguageSwitch`) are wrapped in `<Suspense>` boundaries to ensure build optimization.

### UI Components
- **`app/components/LanguageSwitch.tsx`**: A minimalist toggle in the top-right corner.
- **Footer**: Located in `app/layout.tsx`, consistent across all pages.

## 3. Minimalist Design Rules
Strict aesthetic guidelines for a "Financial Research" look.

- **Typography**:
  - **Headings**: System Serif (`font-serif`, e.g., Georgia, Times).
  - **Body**: Geist Sans (`font-sans`) for maximum readability.
  - **Metadata**: Geist Mono (`font-mono`) for dates and tags.
- **Layout**:
  - **Max Width**: Strictly limited to `65ch` for optimal reading depth.
  - **Whitespace**: Generous padding (`py-24` on pages).
- **Colors**:
  - **Background**: Pure White (`#FFFFFF`).
  - **Text**: Slate-900 (`#0F172A`).
  - **Accents**: Slate-100 borders (`border-slate-100`), Slate-400 secondary text.
- **Article List**:
  - **Format**: "Date - Title".
  - **Interaction**: No background hover. Title underlines on hover.
- **Article Detail**:
  - **Images**: Wrapped in `<figure>` with `mx-auto`, `rounded-sm`, `border`, and `figcaption`. Paths sanitized to root relative.
  - **Tables**: Full width, horizontal dividers only.

## 4. Deployment Workflow
### Automated Script (`publish.bat`)
Located in the project root. Double-click to run:
1. `git add .`
2. `git commit -m "Site Update: <current date/time>"`
3. `git push`

### Vercel Configuration
- **Build Command**: `npm run build`
- **Output Directory**: Default (automatically managed by Vercel)
- **Domain**: [Pending Deployment]
- **Note**: Ensure the project is linked to the GitHub repository for automatic CD.

## 5. Maintenance Guide
- **Modifying styles**: Edit `app/globals.css` for theme variables or use Tailwind utility classes directly in components.

## 6. SEO Features
- **Dynamic Metadata**: Title, Description, and Canonical URLs are auto-generated from Markdown frontmatter.
- **Sitemap**: `sitemap.xml` is automatically generated in `out/` after build via `scripts/generate-sitemap.js`.
- **Structured Data**: JSON-LD (`NewsArticle`) is injected into every article page for better Google indexing.
- **Google Verification**: Placeholder added in `app/layout.tsx` metadata.

## 7. Technical Specifications (Final)
### UI / UX Standards
- **Global Style**: Strict Minimalist Financial.
  - **Language**: Bilingual (EN | ZH).
  - **Language Switcher**: Top-right corner, enlarged size with hover effect (`hover:text-slate-900`, `scale/font-weight` transition).
- **Footer Specifications**:
  - **Layout**: 3-Row Vertical, Left-Aligned.
    - **Row 1**: Disclaimer (Bilingual, `whitespace-nowrap`).
    - **Row 2**: Copyright + Social Links (Flex row, `space-x-8`).
    - **Row 3**: Contact Email (Pure text).
  - **Color**: `text-slate-500` for higher contrast on white.
  - **Typography**: `text-xs` (12px), `leading-relaxed`.

### Branding & Social
- **Twitter / X**: [@AlphaResLab](https://x.com/AlphaResLab)
- **LinkedIn**: [alpha-research-lab](https://www.linkedin.com/in/alpha-research-lab/)
- **Official Contact**: `alpha.research.lab.2026@gmail.com`

### DevOps & SEO
- **Deployment**: `publish.bat` handles one-click Git commit & push. Vercel auto-deploys from `main`.
- **SEO**:
  - Google Search Console verification configured.
  - `sitemap.xml` auto-generated post-build.
  - JSON-LD structured data for rich results.

## 8. Stable Release Status
> **Project Status**: COMPLETED
> **Release Date**: 2026-02-10
> **Version**: Stable Release (v1.0.0)

This project has completed the full technical loop including frontend development, content management logic, SEO optimization, and automated deployment workflow.

