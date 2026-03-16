import Link from "next/link";

export default function PromptOptimizerPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← 返回首页
          </Link>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            题目一：AI 提示词优化器
          </h1>
          <span className="w-16" aria-hidden />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-zinc-500 dark:text-zinc-400">
          此页为题目一作答区，请在此实现 AI 提示词优化器（Streaming Text）。
        </p>
      </main>
    </div>
  );
}
