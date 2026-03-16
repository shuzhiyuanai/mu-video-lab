import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-2xl space-y-12 text-center">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            前端面试题
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            选择题目进入对应页面作答
          </p>
        </header>

        <nav className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/prompt-optimizer"
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <span className="text-2xl" aria-hidden>
              ✍️
            </span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              题目一：AI 提示词优化器
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Streaming Text · 打字机效果与竞态
            </span>
          </Link>

          <Link
            href="/video-montage"
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <span className="text-2xl" aria-hidden>
              🎬
            </span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              题目二：双源视频剪辑拼接器
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Video Montage · 无缝切换与进度条
            </span>
          </Link>
        </nav>

        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          题目详情见项目根目录 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">README.md</code>
        </p>
      </main>
    </div>
  );
}
