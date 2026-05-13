export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">
        👋 关于我
      </h1>

      <div className="prose-custom">
        <div className="flex items-center gap-4 mb-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
            M
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white !my-0">学习笔记作者</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 !my-1">终身学习者 · 开发者</p>
          </div>
        </div>

        <h2>关于本站</h2>
        <p>
          欢迎来到「学习笔记」—— 一个记录学习历程、分享技术心得的个人博客。
          在这里，我会记录自己在编程、技术以及其他领域的所学所思。
        </p>
        <p>
          创建这个博客的初衷很简单：最好的学习方式就是输出。通过把学到的知识
          整理成文章，不仅能加深自己的理解，也希望能帮助到其他正在学习的同学。
        </p>

        <h2>技术栈</h2>
        <p>本站使用以下技术构建：</p>
        <ul>
          <li><strong>Next.js 14</strong> — React 全栈框架，支持 SSR 与静态生成</li>
          <li><strong>TypeScript</strong> — 类型安全，减少运行时错误</li>
          <li><strong>Tailwind CSS</strong> — 实用优先的 CSS 框架，快速构建美观 UI</li>
          <li><strong>Markdown</strong> — 轻量标记语言，专注写作内容</li>
          <li><strong>gray-matter</strong> — 解析 Markdown 前置元数据</li>
          <li><strong>remark</strong> — 将 Markdown 渲染为 HTML</li>
        </ul>

        <h2>联系我</h2>
        <p>
          如果你有任何问题、建议，或者只是想聊聊天，欢迎通过以下方式联系我：
        </p>
        <ul>
          <li>📧 Email: hello@example.com</li>
          <li>💻 GitHub: github.com/yourname</li>
        </ul>

        <h2>博客栏目</h2>
        <p>这里主要涵盖以下内容：</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
          {[
            { icon: "🎨", title: "前端开发", desc: "React, Vue, CSS 等前端技术" },
            { icon: "⚙️", title: "后端架构", desc: "Node.js, 数据库, API 设计" },
            { icon: "📱", title: "移动开发", desc: "Flutter, React Native" },
            { icon: "🛠️", title: "工具与效率", desc: "VS Code, Git, DevOps" },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
