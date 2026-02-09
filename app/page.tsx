import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      <div className="max-w-[65ch] mx-auto px-6 py-24">
        {/* 页面标题 */}
        <header className="mb-20">
          <h1 className="text-4xl font-serif font-medium text-slate-900 mb-4 tracking-tight">
            Research & Insights
          </h1>
          <p className="text-slate-500 font-sans text-sm">
             Finance, Technology & Macro 
          </p>
        </header>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="space-y-0 relative border-t border-slate-100">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group py-5 border-b border-slate-100 flex items-baseline gap-8 transition-colors duration-300"
              >
                {/* 左侧：日期 - 保持固定宽度，使用等宽字体 */}
                <time
                  dateTime={post.date}
                  className="shrink-0 w-32 text-sm text-slate-400 font-mono tracking-wide tabular-nums"
                >
                  {post.date}
                </time>

                {/* 右侧：标题 */}
                <Link href={`/posts/${post.slug}`} className="block grow">
                  <h2 className="text-lg font-serif text-slate-900 leading-snug group-hover:underline decoration-slate-300 underline-offset-4 decoration-1 transition-all">
                    {post.title}
                  </h2>
                  {/* 可选：如果需要在列表显示摘要，可以在这里添加，但根据"极简"要求，通常只保留标题 */}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 font-mono text-sm mt-12">No posts available.</p>
        )}
      </div>
    </div>
  );
}
