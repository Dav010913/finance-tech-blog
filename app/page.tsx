import { getAllPosts } from "@/lib/posts";
import PostList from "./components/PostList";

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

        {/* 文章列表 - Client Component */}
        <PostList posts={posts} />
      </div>
    </div>
  );
}
