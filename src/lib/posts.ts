import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  category: string;
  author: string;
  readingTime: number;
}

export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
}

/** 获取所有文章的 slug */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/** 获取所有文章（按日期降序排列） */
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null);

  return posts.sort((a, b) => {
    return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
  });
}

/** 根据 slug 获取单篇文章 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontMatter: PostFrontMatter = {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      coverImage: data.coverImage,
      tags: data.tags || [],
      category: data.category || "未分类",
      author: data.author || "Anonymous",
      readingTime: data.readingTime || Math.ceil(content.length / 500),
    };

    return { slug, frontMatter, content };
  } catch {
    return null;
  }
}

/** 将 Markdown 转为 HTML */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

/** 按分类分组文章 */
export function getPostsByCategory(): Record<string, Post[]> {
  const posts = getAllPosts();
  const categories: Record<string, Post[]> = {};

  posts.forEach((post) => {
    const cat = post.frontMatter.category || "未分类";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(post);
  });

  return categories;
}

/** 获取所有标签及文章数 */
export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontMatter.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/** 搜索文章 */
export function searchPosts(query: string): Post[] {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter((post) => {
    return (
      post.frontMatter.title.toLowerCase().includes(lowerQuery) ||
      post.frontMatter.excerpt.toLowerCase().includes(lowerQuery) ||
      post.frontMatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.frontMatter.category.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );
  });
}

/** 获取最近 N 篇文章 */
export function getRecentPosts(n: number = 5): Post[] {
  return getAllPosts().slice(0, n);
}
