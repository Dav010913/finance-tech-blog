# Project Summary: Minimalist Financial Research Blog

## 1. Project Overview
A high-performance, minimalist blog built with **Next.js 15 (App Router)** and **Tailwind CSS v4**.
- **Mode**: Static Export (`output: export`).
- **Target**: Financial/Tech research articles.
- **Languages**: Bilingual (Chinese & English).

## 2. Bilingual Architecture
The project uses a split-folder strategy for content management.

### File Structure
- `posts/zh/*.md`: Chinese markdown articles.
- `posts/en/*.md`: English markdown articles.
- `lib/posts.ts`: Scanning logic that reads both directories and adds a `lang` field (`zh` or `en`) to each post object.

### Routing & Filtering
To support static export while allowing dynamic filtering:
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

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Note**: Ensure the environment uses Node 18+ (Next.js 15 requirement).

## 5. Maintenance Guide
- **Adding Content**: Add `.md` files to the appropriate language folder in `posts/`. Ensure frontmatter includes `title`, `date`, and `tags`.
- **Modifying styles**: Edit `app/globals.css` for theme variables or use Tailwind utility classes directly in components.
