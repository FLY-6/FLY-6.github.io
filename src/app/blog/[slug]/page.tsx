import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, markdownToHtml, getRecentPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import BlogCard from "@/components/BlogCard";

interface Props {
  params: { slug: string };
}

/** 生成静态路径 */
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/** 动态生成 SEO 元数据 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "文章未找到" };

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.excerpt,
    keywords: post.frontMatter.tags,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);
  const relatedPosts = getRecentPosts(3).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回文章列表
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
            {post.frontMatter.category}
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-500">
            {formatDate(post.frontMatter.date)}
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-500">
            · {post.frontMatter.readingTime} 分钟阅读
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
          {post.frontMatter.title}
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          {post.frontMatter.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
              {post.frontMatter.author[0]}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {post.frontMatter.author}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.frontMatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Divider */}
      <div className="my-12 border-t border-slate-200 dark:border-slate-700" />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">相关文章</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
