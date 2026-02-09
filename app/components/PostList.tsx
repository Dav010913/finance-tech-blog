"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PostListItem } from "@/lib/posts";
import { Suspense } from "react";

function PostListContent({ posts }: { posts: PostListItem[] }) {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";

    const filteredPosts = posts.filter((post) => post.lang === lang);

    if (filteredPosts.length === 0) {
        return (
            <p className="text-slate-400 font-mono text-sm mt-12">
                No posts available in this language.
            </p>
        );
    }

    return (
        <div className="space-y-0 relative border-t border-slate-100">
            {filteredPosts.map((post) => (
                <article
                    key={post.slug}
                    className="group py-5 border-b border-slate-100 flex items-baseline gap-8 transition-colors duration-300"
                >
                    {/* Left: Date */}
                    <time
                        dateTime={post.date}
                        className="shrink-0 w-32 text-sm text-slate-400 font-mono tracking-wide tabular-nums"
                    >
                        {post.date}
                    </time>

                    {/* Right: Title */}
                    <Link href={`/posts/${post.slug}`} className="block grow">
                        <h2 className="text-lg font-serif text-slate-900 leading-snug group-hover:underline decoration-slate-300 underline-offset-4 decoration-1 transition-all">
                            {post.title}
                        </h2>
                    </Link>
                </article>
            ))}
        </div>
    );
}

export default function PostList({ posts }: { posts: PostListItem[] }) {
    return (
        <Suspense fallback={null}>
            <PostListContent posts={posts} />
        </Suspense>
    );
}
