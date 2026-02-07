import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPost, getAllSlugs } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 text-black bg-white dark:text-white dark:bg-black">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline mb-6 inline-block"
        >
          ← 返回首页
        </Link>
        <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
        <time
          dateTime={post.date}
          className="text-sm text-gray-500 dark:text-gray-400 block mb-4"
        >
          {post.date}
        </time>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-6 list-none p-0">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-2 py-0.5"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <article className="[&_h2]:text-xl [&_h2]:font-medium [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-0.5 [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:rounded [&_strong]:font-semibold">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
