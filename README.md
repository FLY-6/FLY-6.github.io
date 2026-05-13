# 📝 学习笔记 — 个人博客学习网站

一个使用 **Next.js 14 + TypeScript + Tailwind CSS** 构建的现代化个人博客。

## ✨ 特性

- 🎨 现代化 UI，支持亮色/暗黑模式
- 📱 完全响应式设计，适配手机/平板/桌面
- 🔍 文章搜索与分类筛选
- 📝 Markdown 写作，前置元数据支持
- 🏷️ 标签云与分类系统
- ⚡ 静态生成 (SSG)，加载极快
- 🎯 SEO 友好，动态生成元数据

## 🚀 快速开始

### 前置要求

- **Node.js** 18.17 或更高版本 → [下载 Node.js](https://nodejs.org/)

### 安装与运行

```bash
# 1. 进入项目目录
cd blog

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm  
```

浏览器访问 **http://localhost:3000** 即可看到博客。

### 构建生产版本

```bash
npm run build
npm start
```

### 部署到 GitHub Pages

如果你想把网站发布到 GitHub Pages：

1. 将仓库 push 到 GitHub 的 `main` 分支。
2. GitHub Actions 会自动构建并部署到 Pages。
3. 确保仓库 `Settings > Pages` 的来源配置为 `GitHub Actions`，而不是 `main` 分支或 `docs/` 目录。

> 对于项目页面（例如 `https://username.github.io/repo`），工作流现在会自动为你设置 `basePath`，无需手动添加 secret。

```bash
npm run build
```

构建完成后，静态文件会输出到 `out/` 目录，可以直接部署到 GitHub Pages。

## 📁 项目结构

```
blog/
├── content/blog/          # 📝 Markdown 文章存放处
│   ├── nextjs-14-guide.md
│   ├── tailwind-css-tips.md
│   └── ...
├── src/
│   ├── app/               # 📄 页面路由 (App Router)
│   │   ├── layout.tsx     # 根布局
│   │   ├── page.tsx       # 首页
│   │   ├── blog/
│   │   │   ├── page.tsx   # 博客列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx # 文章详情
│   │   ├── about/
│   │   │   └── page.tsx   # 关于页
│   │   └── globals.css    # 全局样式
│   ├── components/        # 🧩 公共组件
│   │   ├── Header.tsx     # 导航栏
│   │   ├── Footer.tsx     # 页脚
│   │   ├── BlogCard.tsx   # 文章卡片
│   │   └── SearchBar.tsx  # 搜索栏
│   └── lib/               # 🔧 工具函数
│       ├── posts.ts       # 文章数据处理
│       └── utils.ts       # 通用工具函数
├── tailwind.config.ts     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── package.json
```

## ✍️ 如何写文章

在 `content/blog/` 目录下创建 `.md` 文件：

```markdown
---

---

## 正文开始

这里写 Markdown 内容...
```

保存后刷新页面即可看到新文章，无需重启服务器。

## 🎯 页面说明

| 路由 | 说明 |
|------|------|
| `/` | 首页 — 展示最新文章、标签云 |
| `/blog` | 博客列表 — 搜索、分类筛选 |
| `/blog/[slug]` | 文章详情 — 渲染 Markdown 内容 |
| `/about` | 关于页面 |

## 📄 License

MIT
