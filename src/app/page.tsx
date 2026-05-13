import Link from "next/link";
import { getRecentPosts, getAllTags, getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export default function HomePage() {
  const recentPosts = getRecentPosts(6);
  const tags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              探索知识，
              <br />
              <span className="gradient-text">记录成长</span>
            </h1>
            <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              一个开发者的学习笔记与博客。涵盖前端开发、后端架构、编程语言
              以及各种有趣的技术探索。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                浏览全部文章
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{allPosts.length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">篇文章</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{tags.length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">个标签</div>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-20 w-60 h-60 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </section>

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">📰 最新文章</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            查看全部 →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-slate-500 dark:text-slate-400">还没有文章，快去写第一篇吧！</p>
            <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
              在 content/blog 目录下创建 .md 文件即可
            </p>
          </div>
        )}
      </section>

      {/* Tags Cloud */}
      {tags.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🏷️ 标签云</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className="inline-block px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
              >
                {tag.name}
                <span className="ml-1 text-xs text-slate-400">({tag.count})</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
