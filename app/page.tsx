import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-8">研究文章博客</h1>
      {posts.length > 0 ? (
        <ul className="space-y-4 list-none p-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-medium">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:underline text-foreground"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time
                  dateTime={post.date}
                  className="text-sm text-gray-500 dark:text-gray-400 mt-1 block"
                >
                  {post.date}
                </time>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">暂无文章</p>
      )}
    </main>
  );
}
