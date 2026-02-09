import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPost, getAllSlugs } from "@/lib/posts";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} | 研究文章博客`,
    description: post.content.slice(0, 160).replace(/\n/g, " ").trim(),
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-200">
      <article className="max-w-[65ch] mx-auto px-6 py-24">
        {/* 返回首页 - 极简 */}
        {/* 返回首页 - 极简 */}
        <Link
          href={`/?lang=${post.lang}`}
          className="inline-block text-xs font-mono text-slate-400 hover:text-slate-900 mb-12 hover:underline underline-offset-4 decoration-1 transition-colors"
        >
          {post.lang === 'zh' ? '← 返回首页' : '← Index'}
        </Link>

        {/* 文章头部 */}
        <header className="mb-12 border-b border-slate-100 pb-8">
          {/* 日期 & 标签 */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-6 uppercase tracking-wider">
            <time dateTime={post.date}>{post.date}</time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* 标题 - 使用衬线体 */}
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
        </header>

        {/* 正文内容 - 极致排版 */}
        <div
          className="prose prose-slate max-w-none
            
            /* Typography */
            prose-p:font-sans prose-p:text-base prose-p:leading-7 prose-p:text-slate-800 prose-p:mb-6
            prose-headings:font-serif prose-headings:font-medium prose-headings:text-slate-900 prose-headings:mt-10 prose-headings:mb-6
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            
            /* Links */
            prose-a:text-slate-900 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-slate-300 hover:prose-a:decoration-slate-900 prose-a:transition-all
            
            /* Strong/Em */
            prose-strong:font-semibold prose-strong:text-slate-900
            prose-em:text-slate-800 prose-em:italic
            
            /* Blockquotes - Custom Style */
            prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-slate-600 prose-blockquote:border-l-2 prose-blockquote:border-slate-900 prose-blockquote:pl-6 prose-blockquote:my-8 prose-blockquote:bg-transparent
            
            /* Code */
            prose-code:font-mono prose-code:text-sm prose-code:text-slate-700 prose-code:bg-slate-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-none prose-pre:p-6 prose-pre:my-8
            
            /* Tables - Full width, Minimalist */
            prose-table:w-full prose-table:my-10 prose-table:text-sm prose-table:border-collapse
            prose-thead:border-b prose-thead:border-slate-200 prose-thead:text-slate-500 prose-thead:uppercase prose-thead:font-mono prose-thead:text-xs prose-thead:tracking-wider
            prose-th:font-medium prose-th:py-3 prose-th:px-0 prose-th:text-left
            prose-td:py-3 prose-td:px-0 prose-td:border-b prose-td:border-slate-100 prose-td:text-slate-700
            prose-tr:border-b-0
            
            /* Images - Handled by custom component, but setting defaults just in case */
            prose-img:my-0 prose-img:p-0
            
            /* Lists */
            prose-ul:list-disc prose-ul:pl-4 prose-ul:my-6 prose-ul:marker:text-slate-300
            prose-ol:list-decimal prose-ol:pl-4 prose-ol:my-6 prose-ol:marker:text-slate-400
            prose-li:pl-2
          "
        >
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => {
                // Path Sanitization: Convert ../../public/ to /
                const src = (typeof props.src === 'string' && props.src.startsWith("../../public/"))
                  ? props.src.replace("../../public/", "/")
                  : (props.src as string | undefined);

                // UI Component
                return (
                  <figure className="my-10 flex flex-col items-center">
                    <img
                      {...props}
                      src={src}
                      className="mx-auto rounded-sm border border-slate-100 shadow-none block"
                      alt={props.alt || ""}
                    />
                    {props.alt && (
                      <figcaption className="mt-3 text-center text-xs text-slate-400 font-mono">
                        {props.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* 底部声明 */}
        <footer className="mt-20 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-mono text-center">
            End of Article
          </p>
        </footer>
      </article>
    </div>
  );
}
