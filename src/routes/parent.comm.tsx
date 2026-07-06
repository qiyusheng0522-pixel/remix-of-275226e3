import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/parent/comm")({
  component: CommPage,
});

type Msg = { from: "me" | "ai"; text: string; time: string };

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

function CommPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [seed, setSeed] = useState(0);

  const suggestions = useMemo(() => {
    const start = (seed * 4) % suggestPool.length;
    return Array.from({ length: 4 }, (_, i) => suggestPool[(start + i) % suggestPool.length]);
  }, [seed]);

  const ask = (q: string) => {
    setMsgs((m) => [
      ...m,
      { from: "me", text: q, time: "刚刚" },
      {
        from: "ai",
        text: "已收到你的问题，正在为你整理专属建议… 稍后健康小助手会给出结构化的解读与行动清单 🌱",
        time: "刚刚",
      },
    ]);
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
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === "me"
                      ? "bg-rose text-rose-foreground"
                      : "bg-white text-foreground shadow-sm ring-1 ring-border/60"
                  }`}
                >
                  {m.text}
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
