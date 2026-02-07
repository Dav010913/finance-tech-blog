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
