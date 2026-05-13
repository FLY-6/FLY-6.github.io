---
title: "Git 工作流最佳实践：从入门到团队协作"
date: "2026-05-01"
excerpt: "系统梳理 Git 的核心概念和常见的团队协作工作流，包括 Git Flow、GitHub Flow、Trunk-Based Development 等，帮你选择适合团队的协作方式。"
tags: ["Git", "DevOps", "工具", "团队协作"]
category: "工具与效率"
author: "学习笔记作者"
readingTime: 7
---

## Git 核心概念回顾

在深入工作流之前，先回顾几个关键概念：

### 工作区、暂存区、仓库

```bash
工作目录 (Working Directory)
    │  git add
    ▼
暂存区 (Staging Area / Index)
    │  git commit
    ▼
本地仓库 (Local Repository)
    │  git push
    ▼
远程仓库 (Remote Repository)
```

### 常用命令速查

| 命令 | 作用 |
|------|------|
| `git status` | 查看当前状态 |
| `git add .` | 暂存所有更改 |
| `git commit -m "msg"` | 提交更改 |
| `git push origin main` | 推送到远程 |
| `git pull` | 拉取远程更新 |
| `git branch` | 查看分支 |
| `git checkout -b feat/x` | 创建并切换分支 |

## 常见工作流

### 1. GitHub Flow（推荐给小型团队）

最简单的分支策略，适合持续部署的项目：

```
main ───●───●───●───●───● (始终可部署)
         ↘   ↗   ↘   ↗
feat/a ───●───     ●
                     
feat/b ───────●─────
```

**规则：**
1. `main` 分支始终可部署
2. 从 `main` 创建特性分支
3. 提交 Pull Request
4. 代码审查后合并
5. 合并后立即部署

### 2. Git Flow（适合有发布周期的项目）

```bash
main     ●───────────────●─────────● (生产版本)
          ↘             ↗         ↗
develop   ●──●──●──●──●──●──●──● (开发主线)
           ↘    ↗     ↗
feature/a  ●──●      │
                     │
feature/b  ●──●──────●
```

**分支类型：**
- `main` — 生产环境代码
- `develop` — 开发主线
- `feature/*` — 功能分支
- `release/*` — 发布准备
- `hotfix/*` — 紧急修复

### 3. Trunk-Based Development

直接在主干开发，使用特性标志（Feature Flags）控制未完成功能：

```bash
main ●──●──●──●──●──●──● (所有开发在主干)
```

## 最佳实践

### 1. Commit Message 规范

推荐使用 Conventional Commits：

```bash
feat: 添加用户登录功能
fix: 修复导航栏在移动端的显示问题
docs: 更新 API 文档
style: 格式化代码
refactor: 重构用户模块
test: 添加登录单元测试
chore: 更新依赖版本
```

格式：`<type>: <description>`

### 2. 分支命名规范

```bash
feat/user-authentication    # 新功能
fix/navbar-mobile-bug       # Bug 修复
docs/api-guide              # 文档
refactor/user-service       # 重构
```

### 3. PR 最佳实践

- **保持小而专注**：一个 PR 只做一件事
- **写清晰的描述**：说明做了什么、为什么这样做
- **关联 Issue**：在描述中使用 `Closes #123`
- **请求审查**：指定合适的 Reviewer

### 4. 避免常见错误

```bash
# ❌ 不要提交敏感信息
git add .env

# ✅ 使用 .gitignore
echo ".env" >> .gitignore

# ❌ 不要在 main 分支直接开发
git checkout main
git commit -m "fix something"

# ✅ 创建特性分支
git checkout -b fix/something
git commit -m "fix: something"
```

## 总结

选择哪种工作流取决于团队规模和项目特点：
- 小团队、持续部署 → **GitHub Flow**
- 有固定发布周期 → **Git Flow**
- 成熟的大团队 → **Trunk-Based Development**

> 💡 最重要的不是选择哪个工作流，而是团队统一规范并坚持执行。
