---
title: "Next.js 14 入门指南：构建现代化 Web 应用"
date: "2026-05-10"
excerpt: "深入了解 Next.js 14 的核心特性，包括 App Router、Server Components、Server Actions 等，帮助你快速上手现代化的 React 全栈开发。"
tags: ["Next.js", "React", "前端开发", "全栈"]
category: "前端开发"
author: "学习笔记作者"
readingTime: 8
---

## 为什么选择 Next.js？

Next.js 是目前最流行的 React 全栈框架，它提供了开箱即用的服务端渲染（SSR）、静态站点生成（SSG）、文件路由等强大功能。

### 核心优势

- **服务端渲染 (SSR)**：首屏加载快，SEO 友好
- **静态生成 (SSG)**：构建时预渲染，适合博客等内容型站点
- **App Router**：全新的路由系统，支持布局嵌套、加载状态等
- **Server Components**：默认服务端组件，减少客户端 JS 体积

## 快速开始

```bash
# 创建新项目
npx create-next-app@latest my-blog --typescript --tailwind --eslint

# 启动开发服务器
cd my-blog
npm run dev
```

## App Router 路由系统

Next.js 14 的 App Router 使用文件系统来定义路由：

```
src/app/
├── layout.tsx      # 根布局
├── page.tsx        # 首页 /
├── blog/
│   ├── layout.tsx  # 博客布局
│   ├── page.tsx    # /blog
│   └── [slug]/
│       └── page.tsx # /blog/hello-world
└── about/
    └── page.tsx    # /about
```

## Server Components 与 Client Components

### Server Component（默认）

```tsx
// 可以直接使用 async/await
export default async function BlogList() {
  const posts = await fetchPosts(); // 直接请求数据
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Client Component

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </button>
  );
}
```

## 数据获取模式

Next.js 14 推荐在 Server Component 中直接获取数据：

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/posts');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{/* 渲染数据 */}</div>;
}
```

## 总结

Next.js 14 通过 App Router、Server Components 等新特性，极大地提升了 React 应用的开发体验和性能。对于个人博客、企业官网、甚至复杂的 SaaS 应用，Next.js 都是一个非常优秀的选择。

> 💡 提示：如果你是 React 初学者，建议先熟悉 React 基础，再来学习 Next.js，这样会事半功倍。
