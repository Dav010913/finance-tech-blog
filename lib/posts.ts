import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  lang: "zh" | "en";
}

export interface PostListItem {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  lang: "zh" | "en";
}

function formatDateToYYYYMMDD(date: unknown): string {
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  if (typeof date === "string") {
    // If date is already in YYYY-MM-DD or similar string format, return as is or normalize
    // For now, assuming standard ISO or YYYY-MM-DD strings in frontmatter
    return date;
  }
  return "";
}

// Get slugs across all languages. Slugs must be unique, or handled with precedence.
// For simplicity, we return all slugs. If a slug exists in both, both are returned (but file system prevents duplicate basenames in same folder, cross-folder duplicates need logic).
// Current logic: Flatten all.
export async function getAllSlugs(): Promise<string[]> {
  const postsDir = path.join(process.cwd(), "posts");
  // Check zh and en dirs
  const zhDir = path.join(postsDir, "zh");
  const enDir = path.join(postsDir, "en");

  let zhFiles: string[] = [];
  try {
    zhFiles = (await readdir(zhDir)).filter((f) => f.endsWith(".md"));
  } catch {
    // dir might not exist or be empty
  }

  let enFiles: string[] = [];
  try {
    enFiles = (await readdir(enDir)).filter((f) => f.endsWith(".md"));
  } catch {
    // dir might not exist
  }

  const slugs = new Set<string>();
  zhFiles.forEach((f) => slugs.add(f.replace(/\.md$/, "")));
  enFiles.forEach((f) => slugs.add(f.replace(/\.md$/, "")));

  return Array.from(slugs);
}

// Get all posts, sorted by date.
export async function getAllPosts(): Promise<PostListItem[]> {
  const postsDir = path.join(process.cwd(), "posts");
  const zhDir = path.join(postsDir, "zh");
  const enDir = path.join(postsDir, "en");

  const results: PostListItem[] = [];

  // Helper to collect posts from a dir
  const collectPosts = async (dir: string, lang: "zh" | "en") => {
    try {
      const files = await readdir(dir);
      for (const file of files) {
        if (!file.endsWith(".md")) continue;
        const slug = file.replace(/\.md$/, "");
        const post = await getPost(slug, lang); // Optimization: pass lang if known
        if (post) {
          results.push({
            title: post.title,
            date: post.date,
            slug: post.slug,
            tags: post.tags,
            lang: post.lang,
          });
        }
      }
    } catch {
      // ignore
    }
  };

  await collectPosts(zhDir, "zh");
  await collectPosts(enDir, "en");

  // Sort by date descending
  results.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  return results;
}

// Retrieve a single post by slug.
// If lang is provided, check that specific lang. Otherwise check both, prioritizing ZH (default).
export async function getPost(slug: string, lang?: "zh" | "en"): Promise<Post | null> {
  const postsDir = path.join(process.cwd(), "posts");

  // Define search order
  const langsToCheck: ("zh" | "en")[] = lang ? [lang] : ["zh", "en"];

  for (const l of langsToCheck) {
    try {
      const filePath = path.join(postsDir, l, `${slug}.md`);
      const raw = await readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "",
        date: formatDateToYYYYMMDD(data.date),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: content.trim(),
        lang: l,
      };
    } catch {
      // Continue to next lang
    }
  }

  return null;
}
