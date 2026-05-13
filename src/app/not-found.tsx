import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-4">🔭</div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
        404 - 页面未找到
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        你来到了一片知识的荒原... 这个页面好像不存在。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
