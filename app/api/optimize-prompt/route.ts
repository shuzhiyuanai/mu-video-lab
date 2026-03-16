/**
 * Mock API：以 chunk stream 方式返回优化后的文案
 * 用于题目一 AI 提示词优化器的流式展示
 *
 * 流程：先等待 THINK_DELAY_MS 模拟"思考"，再逐字推送文本。
 * 面试者需要在前端区分这两个阶段的 UI 状态。
 */

const MOCK_STREAM_TEXT =
  "从前有一个叫小码的程序员，他住在一座由代码砌成的城市里。" +
  "城市的每条街道都是一行行整齐的逻辑，红绿灯用 if-else 控制，" +
  "地铁用递归驱动，咖啡店的点单系统跑在一个永不停歇的事件循环上。\n\n" +
  "有一天，小码接到了一个神秘的需求：「请把月光装进一个 Promise 里。」" +
  "他挠了挠头，打开编辑器，写下了第一行代码。奇妙的事情发生了——" +
  "屏幕开始发出柔和的银色光芒，光标变成了一弯新月，每敲一个字符，" +
  "窗外的月亮就亮一分。\n\n" +
  "他花了整整一个通宵，终于在天亮前 resolve 了那个 Promise。" +
  "当他按下回车的那一刻，整座城市的路灯同时熄灭，" +
  "因为月光已经足够明亮，照亮了每一条用代码铺就的街道。\n\n" +
  "后来人们问他：「你是怎么做到的？」\n" +
  "小码笑了笑说：「其实很简单，我只是把 await 写对了位置。」";

const CHUNK_SIZE = 1;
const CHUNK_DELAY_MS = 80;
/** 模拟 AI 思考延迟（毫秒） */
const THINK_DELAY_MS = 1500;

export async function POST(request: Request) {
  // 读取请求体（不做实际处理，仅为接口完整性）
  await request.text().catch(() => "");

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // 阶段一：模拟思考（前端此时应显示"正在思考"状态）
      await new Promise((r) => setTimeout(r, THINK_DELAY_MS));

      // 阶段二：逐字推送（前端此时应切换到"正在输出"状态）
      for (let i = 0; i < MOCK_STREAM_TEXT.length; i += CHUNK_SIZE) {
        const chunk = MOCK_STREAM_TEXT.slice(i, i + CHUNK_SIZE);
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, CHUNK_DELAY_MS));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
