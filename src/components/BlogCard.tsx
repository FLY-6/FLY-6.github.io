import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/posts";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontMatter } = post;

  return (
    <article className="card-hover group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <Link href={`/blog/${slug}`} className="block p-6">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
            {frontMatter.category}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {formatDate(frontMatter.date)}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            · {frontMatter.readingTime} 分钟阅读
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {frontMatter.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {frontMatter.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {frontMatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
