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
}

export interface PostListItem {
  title: string;
  date: string;
  slug: string;
}

function formatDateToYYYYMMDD(date: unknown): string {
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  if (typeof date === "string") {
    return date;
  }
  return "";
}

export async function getAllSlugs(): Promise<string[]> {
  const postsDir = path.join(process.cwd(), "posts");
  const files = await readdir(postsDir);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllPosts(): Promise<PostListItem[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPost(slug);
      if (!post) return null;
      return { title: post.title, date: post.date, slug: post.slug };
    })
  );
  const valid = posts.filter((p): p is PostListItem => p !== null);
  valid.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  return valid;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
    const raw = await readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? "",
      date: formatDateToYYYYMMDD(data.date),
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: content.trim(),
    };
  } catch {
    return null;
  }
}
