"use client";

import Link from "next/link";
import { useState } from "react";

/** 素材列表 */
const MEDIA_SOURCES = [
  { id: "a", name: "视频 A", src: "/videos/a.mp4" },
  { id: "b", name: "视频 B", src: "/videos/b.mp4" },
];

/** 时间线片段类型 */
export interface TimelineClip {
  /** 唯一标识（用于 key 和排序） */
  id: string;
  /** 素材名称 */
  name: string;
  /** 视频文件路径 */
  src: string;
  /** 截取起始时间（秒） */
  startTime: number;
  /** 截取结束时间（秒） */
  endTime: number;
}

export default function VideoMontagePage() {
  // TODO: 管理时间线片段列表
  const [clips, setClips] = useState<TimelineClip[]>([]);

  // TODO: 管理播放状态（是否正在播放、当前播放到第几个片段、当前进度等）

  const handleAddToTimeline = (source: (typeof MEDIA_SOURCES)[number]) => {
    // TODO: 将素材添加到时间线，生成唯一 id，设置默认截取区间
  };

  const handleUpdateClip = (clipId: string, field: "startTime" | "endTime", value: number) => {
    // TODO: 更新指定片段的截取区间
  };

  const handleRemoveClip = (clipId: string) => {
    // TODO: 从时间线中移除指定片段（加分项）
  };

  const handlePlay = () => {
    // TODO: 按时间线顺序拼接播放
    // 核心逻辑：遍历 clips，依次设置 <video> 的 src / currentTime，
    // 通过 onTimeUpdate 监听是否到达 endTime，到达后切换到下一个片段
  };

  // TODO: 计算总拼接时长（所有片段 endTime - startTime 之和）
  const totalDuration = 0;

  // TODO: 当前播放进度（0 ~ totalDuration）
  const currentProgress = 0;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      {/* 顶部导航 */}
      <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← 返回首页
          </Link>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            题目二：视频剪辑台
          </h1>
          <span className="w-16" aria-hidden />
        </div>
      </header>

      {/* 主体区域：左侧素材面板 + 右侧预览 */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 p-4">
        {/* ===== 左侧素材面板 ===== */}
        <aside className="w-60 shrink-0 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            素材库
          </h2>
          <ul className="space-y-3">
            {MEDIA_SOURCES.map((source) => (
              <li
                key={source.id}
                className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                {/* 视频缩略图 */}
                <video
                  src={source.src}
                  muted
                  preload="metadata"
                  className="aspect-video w-full bg-black object-cover"
                />
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {source.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToTimeline(source)}
                    className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                  >
                    添加
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== 右侧预览区 ===== */}
        <section className="flex flex-1 flex-col items-center justify-center rounded-lg border border-zinc-200 bg-black dark:border-zinc-800">
          {/* TODO: 绑定 ref，用于播放控制 */}
          <video
            className="aspect-video w-full max-w-2xl"
            controls={false}
            playsInline
          />
          <p className="mt-4 text-sm text-zinc-500">
            {clips.length === 0
              ? "请从左侧素材库添加片段到时间线"
              : "点击下方播放按钮开始预览"}
          </p>
        </section>
      </div>

      {/* ===== 底部时间线 ===== */}
      <footer className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          {/* 控制栏 */}
          <div className="mb-3 flex items-center gap-4">
            <button
              type="button"
              onClick={handlePlay}
              disabled={clips.length === 0}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ▶ 播放
            </button>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              总时长：{totalDuration.toFixed(1)}s
            </span>
          </div>

          {/* 进度条 */}
          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            {/* TODO: 根据 currentProgress / totalDuration 计算宽度 */}
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: totalDuration > 0 ? `${(currentProgress / totalDuration) * 100}%` : "0%",
              }}
            />
          </div>

          {/* 时间线轨道 */}
          <div className="flex min-h-[64px] items-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 p-3 dark:border-zinc-600">
            {clips.length === 0 ? (
              <p className="w-full text-center text-sm text-zinc-400">
                时间线为空 — 从左侧添加素材片段
              </p>
            ) : (
              clips.map((clip) => (
                <div
                  key={clip.id}
                  className="flex items-center gap-2 rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
                >
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {clip.name}
                  </span>
                  {/* TODO: 截取区间输入 —— 面试者在此添加 startTime / endTime 的输入控件 */}
                  <span className="text-xs text-zinc-500">
                    {clip.startTime.toFixed(1)}s – {clip.endTime.toFixed(1)}s
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveClip(clip.id)}
                    className="ml-1 text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
