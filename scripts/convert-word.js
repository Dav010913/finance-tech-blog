const fs = require("fs");
const path = require("path");
const readline = require("readline");
const mammoth = require("mammoth");
const TurndownService = require("turndown");
const matter = require("gray-matter");

const DRAFTS_DIR = path.join(process.cwd(), "drafts");
const POSTS_DIR = path.join(process.cwd(), "posts");

function slugFromFilename(filename) {
  return path.basename(filename, ".docx");
}

/** 从 Markdown 正文中取第一行作为标题，并返回去掉该行后的正文 */
function extractTitleFromFirstLine(markdown) {
  const lines = markdown.trim().split(/\r?\n/);
  const first = lines.find((line) => line.trim().length > 0);
  if (!first) return { title: "", body: markdown };
  const title = first.replace(/^#+\s*/, "").trim();
  const rest = lines.slice(lines.indexOf(first) + 1).join("\n").trim();
  return { title: title || "", body: rest };
}

function escapeYamlString(s) {
  if (s.includes(":") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
  }
  return s;
}

function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildFrontMatter(slug, title, date, tags = []) {
  const tagsBlock =
    tags.length > 0 ? `tags:\n${tags.map((t) => `  - ${t}`).join("\n")}` : "tags: []";
  const titleValue = title ? escapeYamlString(title) : slug;
  return `---
title: ${titleValue}
date: ${date}
${tagsBlock}
---

`;
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function convertDocxToMarkdown(docxPath) {
  const buffer = fs.readFileSync(docxPath);
  const result = await mammoth.convertToHtml({ buffer });
  const turndown = new TurndownService();
  return turndown.turndown(result.value);
}

async function main() {
  if (!fs.existsSync(DRAFTS_DIR)) {
    console.log("drafts/ 文件夹不存在，已创建。请放入 .docx 文件后重新运行。");
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
    return;
  }

  const files = fs.readdirSync(DRAFTS_DIR).filter((f) => f.toLowerCase().endsWith(".docx"));
  if (files.length === 0) {
    console.log("drafts/ 中未找到 .docx 文件。");
    return;
  }

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const convertedPaths = [];

  for (const file of files) {
    const slug = slugFromFilename(file);
    const docxPath = path.join(DRAFTS_DIR, file);
    const outPath = path.join(POSTS_DIR, `${slug}.md`);
    const date = todayYYYYMMDD();

    try {
      const fullMarkdown = await convertDocxToMarkdown(docxPath);
      const { title, body } = extractTitleFromFirstLine(fullMarkdown);
      const frontMatter = buildFrontMatter(slug, title, date, []);
      const content = frontMatter + (body ? body + "\n" : "");
      fs.writeFileSync(outPath, content, "utf-8");
      convertedPaths.push(outPath);
      console.log(`已转换: ${file} -> posts/${slug}.md (标题: ${title || slug})`);
    } catch (err) {
      console.error(`转换失败 ${file}:`, err.message);
    }
  }

  if (convertedPaths.length > 0) {
    const tagInput = await prompt("请输入标签（用逗号分隔，直接回车跳过）：");
    const tags = tagInput
      ? tagInput.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    if (tags.length > 0) {
      for (const outPath of convertedPaths) {
        const raw = fs.readFileSync(outPath, "utf-8");
        const parsed = matter(raw);
        parsed.data.tags = tags;
        fs.writeFileSync(outPath, matter.stringify(parsed.content, parsed.data), "utf-8");
      }
      console.log(`已为 ${convertedPaths.length} 篇文章添加标签：${tags.join(", ")}`);
    }
  }
}

main();
