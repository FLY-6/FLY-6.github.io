"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";

interface BlogListClientProps {
  allPosts: Post[];
  categories: Record<string, Post[]>;
}

export default function BlogListClient({ allPosts, categories }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("全部");

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      posts = posts.filter((post) => {
        return (
          post.frontMatter.title.toLowerCase().includes(lowerQuery) ||
          post.frontMatter.excerpt.toLowerCase().includes(lowerQuery) ||
          post.frontMatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          post.frontMatter.category.toLowerCase().includes(lowerQuery) ||
          post.content.toLowerCase().includes(lowerQuery)
        );
      });
    }

    if (activeCategory !== "全部") {
      posts = posts.filter((p) => p.frontMatter.category === activeCategory);
    }

    return posts;
  }, [searchQuery, activeCategory, allPosts]);

  const allCategories = ["全部", ...Object.keys(categories)];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          📚 全部文章
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          共 {allPosts.length} 篇文章，持续更新中...
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SearchBar onSearch={setSearchQuery} />

        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat
                  ? "bg-primary-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
              {cat !== "全部" && (
                <span className="ml-1 opacity-70">({categories[cat].length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
            没有找到相关文章
          </h3>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            试试其他关键词或分类
          </p>
        </div>
      )}
    </div>
  );
}
