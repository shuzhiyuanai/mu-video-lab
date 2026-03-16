# 前端面试题

本项目包含两道前端面试题，分别考察 **流式文本与竞态处理** 和 **视频播放与进度控制**。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)，在首页点击对应按钮即可进入各题页面。

---

## 题目一：AI 提示词优化器 (Streaming Text)

**场景**：用户输入简单描述，前端调用 Mock 接口显示 AI 优化后的 Prompt。

### 核心要求

1. **打字机效果**：点击提交后，必须实现打字机效果（逐字显示内容）。
2. **竞态处理**：如果用户在第一个回复没打完时又点了「生成」，代码是否会崩溃或出现文字重叠？需正确处理竞态。
3. **状态管理**：区分「正在思考」和「正在输出」两种 UI 状态。

### 实现入口

- 页面路由：`/prompt-optimizer`
- 页面文件：`app/prompt-optimizer/page.tsx`

### Mock 接口

- **POST** `/api/optimize-prompt`
- **请求体**：`{ "prompt": "用户输入的描述" }`（API 不做实际处理，但接口保持完整，便于面试者对接）
- **响应**：`text/plain` 流式返回，逐字推送
- **行为**：
  1. 先等待约 1.5 秒模拟「思考」阶段（此时无数据推送）
  2. 再逐字推送文案，每字间隔约 80ms
- **返回内容**：一段约 300 字的小故事（含换行分段）

> **提示**：前端使用 `fetch` + `response.body.getReader()` 消费流即可。
> 思考阶段的 1.5s 内不会收到任何 chunk，面试者需要据此区分两种 UI 状态。

---

## 题目二：双源视频剪辑拼接器 (Video Montage)

**场景**：页面提供两个视频片段，用户可以选择每个视频的截取时长（比如 A 视频 2–5 秒，B 视频 1–3 秒），然后前端将它们顺序「拼接」播放。

### 核心要求

1. **纯前端逻辑模拟**：不要求真的在后端合并视频文件，考察前端如何通过 `<video>` 的 `onTimeUpdate` 或 `onEnded` 实现无缝、无黑屏切换。
2. **进度控制**：下方有一个简单的进度条，能显示当前播放到「总时长」的哪个位置。
3. **进阶（加分项）**：
   - 是否使用 HTML5 Canvas 做转场渲染；
   - 是否考虑视频预加载策略。

### 实现入口

- 页面路由：`/video-montage`
- 页面文件：`app/video-montage/page.tsx`

### 视频资源

项目已在 `public/videos/` 目录下提供两个视频文件：

| 文件 | 访问路径 | 说明 |
|------|---------|------|
| `a.mp4` | `/videos/a.mp4` | 视频片段 A |
| `b.mp4` | `/videos/b.mp4` | 视频片段 B |

> 前端直接通过 `/videos/a.mp4`、`/videos/b.mp4` 即可引用。

---

## 项目结构

```
app/
  page.tsx                        # 首页，两道题的入口
  api/
    optimize-prompt/
      route.ts                    # Mock API：chunk stream 返回优化文案（题目一）
  prompt-optimizer/
    page.tsx                      # 题目一：AI 提示词优化器
  video-montage/
    page.tsx                      # 题目二：双源视频剪辑拼接器
public/
  videos/
    a.mp4                         # 视频片段 A（题目二）
    b.mp4                         # 视频片段 B（题目二）
```

## 技术栈

- **框架**：Next.js 16 (App Router)
- **样式**：Tailwind CSS 4
- **语言**：TypeScript
- **运行时**：Node.js
