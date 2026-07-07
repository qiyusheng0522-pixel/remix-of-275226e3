import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/parent/comm")({
  component: CommPage,
});

type Msg = { from: "me" | "ai"; text: string; time: string; typing?: boolean };

const suggestPool = [
  "小阳 BMI 偏高，日常怎么调整？",
  "夜里咳嗽要不要去医院？",
  "视力 4.9 需要配镜吗？",
  "怎么安排一周的运动计划？",
  "孩子挑食不爱吃蔬菜怎么办？",
  "睡眠时间多少算达标？",
  "过敏性鼻炎家里要注意什么？",
  "身高偏矮，需要额外补钙吗？",
  "屏幕时间怎么控制才合理？",
  "换季感冒预防有什么建议？",
  "早餐怎么搭配更营养？",
  "运动后干咳需要就医吗？",
];

const quickChips = [
  { icon: "📋", label: "体检解读" },
  { icon: "🥗", label: "今日食谱" },
  { icon: "🏃", label: "运动打卡" },
  { icon: "📝", label: "复查计划" },
];

// 模拟 AI 答案库 —— 关键词命中后返回结构化建议
const answerBank: { keys: string[]; reply: string }[] = [
  {
    keys: ["BMI", "偏高", "肥胖", "体重"],
    reply:
      "**小阳 BMI 17.1（P85） · 属超重临界**\n\n🥗 **饮食**：晚餐主食减少 1/3，用杂粮替换白米；含糖饮料改为白水/无糖豆浆。\n🏃 **运动**：每天餐后快走 15 分钟 + 每周 3 次跳绳 20 分钟。\n📏 **监测**：每周日晨起空腹称重一次，目标 12 周内下降 1.5–2 kg。\n\n> 若 4 周内无改善，建议预约儿保科营养门诊。",
  },
  {
    keys: ["咳嗽", "夜里", "运动后"],
    reply:
      "根据本次体检结果（尘螨 IgE ++、肺功能正常）：\n\n🌙 **夜间偶发干咳**：多为过敏性气道高反应，可先观察 3–5 天。\n🏠 **家庭护理**：床品 60℃ 高温清洗、湿度 40–50%、卧室每周除螨 1 次。\n🚑 **需就诊**：若出现喘息、呼吸急促、发烧 > 38.5℃ 或影响睡眠，立即到呼吸科。",
  },
  {
    keys: ["视力", "配镜", "4.9", "近视"],
    reply:
      "视力 4.9 属**临界正常**，暂不需要配镜，但需干预用眼行为：\n\n👀 **20-20-20 法则**：近距离用眼 20 分钟，远眺 20 秒。\n☀️ **户外时间**：每日 ≥ 2 小时户外自然光。\n📅 **复查**：3 个月后复测；若下降到 4.8 建议医院散瞳验光。",
  },
  {
    keys: ["运动", "计划", "一周", "打卡"],
    reply:
      "**一周运动清单（通用方案 · 免费）**\n\n- 周一/三/五：跳绳 20 分钟（心率 130–150）\n- 周二/四：亲子快走 30 分钟（餐后 30 分钟内）\n- 周六：户外骑行或球类 45 分钟\n- 周日：休息 + 拉伸 10 分钟\n\n可到「健康方案 › 更多运动」加入 AI 推荐或参与周边家长发布的活动 🎉",
  },
  {
    keys: ["挑食", "蔬菜", "不爱吃"],
    reply:
      "🥕 **孩子挑食小妙招**：\n1. 一次只加 1 种新蔬菜，量从 1 勺开始；\n2. 与孩子喜欢的食物同盘出现（如番茄配意面）；\n3. 邀请孩子一起洗菜/摆盘，提升接受度；\n4. 家长以身作则同吃同赞；\n5. 至少尝试 8–15 次再判断是否接受。",
  },
  {
    keys: ["睡眠", "几点", "达标"],
    reply:
      "**学龄儿童（6–12 岁）睡眠推荐 9–12 小时**：\n\n🌙 建议 21:00 前入睡，早晨 6:30–7:00 起床。\n📵 睡前 1 小时不使用电子屏幕。\n☕ 下午 15:00 后避免含糖/含咖啡因饮料。",
  },
  {
    keys: ["过敏", "鼻炎", "尘螨"],
    reply:
      "🏠 **过敏性鼻炎家庭护理**：\n- 床品 ≥60℃ 高温清洗，每周 1 次\n- 使用防螨床罩，季度更换\n- 卧室湿度 40–50%，配备除湿/新风\n- 避免毛绒玩具堆积在床上\n- 症状持续 > 2 周或影响睡眠，建议耳鼻喉科就诊",
  },
];

function pickAnswer(q: string) {
  const hit = answerBank.find((a) => a.keys.some((k) => q.includes(k)));
  return (
    hit?.reply ??
    "已收到你的问题 ✅\n\n结合小阳最近的体检报告与日常打卡数据，我整理了 3 条建议：\n1. 保持每日 60 分钟中等强度运动；\n2. 每周家庭健康打卡 ≥ 4 次；\n3. 若持续 1 周不改善，建议咨询在线健管师。\n\n可继续追问更具体的问题～"
  );
}

function CommPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [seed, setSeed] = useState(0);

  const suggestions = useMemo(() => {
    const start = (seed * 4) % suggestPool.length;
    return Array.from({ length: 4 }, (_, i) => suggestPool[(start + i) % suggestPool.length]);
  }, [seed]);

  const ask = (q: string) => {
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMsgs((m) => [
      ...m,
      { from: "me", text: q, time: t },
      { from: "ai", text: "健康小助手正在思考…", time: t, typing: true },
    ]);
    // 模拟流式回答
    setTimeout(() => {
      setMsgs((m) => {
        const copy = [...m];
        const idx = copy.map((x) => x.typing).lastIndexOf(true);
        if (idx >= 0) copy[idx] = { from: "ai", text: pickAnswer(q), time: t };
        return copy;
      });
    }, 900);
  };

  const send = () => {
    if (!text.trim()) return;
    ask(text.trim());
    setText("");
  };

  const empty = msgs.length === 0;

  return (
    <div className="relative flex h-full flex-1 flex-col bg-gradient-to-b from-rose/25 via-rose/10 to-rose/5">
      <StatusBar title="健康咨询" />

      {/* Header */}
      <div className="relative px-5 pt-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-serif text-3xl font-bold italic text-rose">Hello~</p>
            <p className="mt-1 text-lg font-bold text-foreground">我是你的健康小助手</p>
            <p className="mt-1 text-[12px] text-rose/90">
              体检解读 · 居家护理 · 复查提醒
            </p>
          </div>
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose to-rose/70 text-4xl shadow-lg shadow-rose/30">
            🐥
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-4">
        {empty ? (
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-white/60">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">你可能想问</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                  PICKS FOR YOU
                </p>
              </div>
              <button
                onClick={() => setSeed((s) => s + 1)}
                className="flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-[11px] text-muted-foreground"
              >
                <span>⟳</span> 换一批
              </button>
            </div>
            <ul className="space-y-2">
              {suggestions.map((q) => (
                <li key={q}>
                  <button
                    onClick={() => ask(q)}
                    className="flex w-full items-center gap-2.5 rounded-full bg-surface-2 px-3 py-2.5 text-left"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-[11px] text-background">
                      #
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">
                      {q}
                    </span>
                    <span className="text-muted-foreground">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-3 pb-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.from === "me"
                      ? "bg-rose text-rose-foreground"
                      : "bg-white text-foreground shadow-sm ring-1 ring-border/60"
                  }`}
                >
                  {m.typing ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" style={{ animationDelay: "120ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" style={{ animationDelay: "240ms" }} />
                      <span className="ml-1 text-[12px]">健康小助手正在思考…</span>
                    </span>
                  ) : (
                    m.text.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
                      seg.startsWith("**") && seg.endsWith("**") ? (
                        <b key={j}>{seg.slice(2, -2)}</b>
                      ) : (
                        <span key={j}>{seg}</span>
                      ),
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-2 pt-2">
        {quickChips.map((c) => (
          <button
            key={c.label}
            onClick={() => ask(c.label)}
            className="flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] text-foreground shadow-sm ring-1 ring-border/50"
          >
            <span>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 shadow-sm ring-1 ring-border/50">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="健康答疑，问问小助手"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={send}
            className="grid h-9 w-9 place-items-center rounded-full bg-rose text-rose-foreground"
            aria-label="发送"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
