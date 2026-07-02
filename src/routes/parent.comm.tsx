import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/parent/comm")({
  component: CommPage,
});

type Msg = { from: "me" | "hm"; text: string; time: string; tag?: string };

const initial: Msg[] = [
  { from: "hm", text: "李妈妈您好，我是小雨的健康管理师王老师 👋", time: "09:12" },
  { from: "hm", text: "看到小雨这次体检 BMI 偏轻，我们一起制定了 1 个月的饮食呵护计划，需要您配合每周记录体重。", time: "09:12" },
  { from: "me", text: "好的老师！最近她运动后总是干咳，需要担心吗？", time: "09:20", tag: "呼吸咨询" },
  { from: "hm", text: "已记录。建议先观察 3 天，避免冷空气刺激，若持续或伴喘息我会升级给医生复核。", time: "09:24" },
  { from: "hm", text: "另外，本周床品换洗任务尚未完成，尘螨是过敏诱因之一 🛏️", time: "09:25" },
];

const quicks = ["报告看不懂", "任务执行咨询", "是否需要就医", "异常情况反馈"];

function CommPage() {
  const [msgs, setMsgs] = useState(initial);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { from: "me", text, time: "刚刚" }]);
    setText("");
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <StatusBar title="健康管理师" />

      {/* HM header */}
      <div className="mx-5 mt-2 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal/20 to-warm/10 p-3 ring-1 ring-teal/20">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-xl text-teal-foreground">
          👩‍⚕️
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">王健管师 · 儿童健康</p>
          <p className="text-[11px] text-muted-foreground">阳光社区卫生服务中心 · 在线</p>
        </div>
        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] text-success">● 在线</span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] ${m.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              {m.tag && (
                <span className="rounded-full bg-warm/15 px-2 py-0.5 text-[10px] text-warm">
                  # {m.tag}
                </span>
              )}
              <div
                className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.from === "me"
                    ? "bg-warm text-warm-foreground"
                    : "bg-surface text-foreground shadow-sm ring-1 ring-border/60"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-muted-foreground">{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick topics */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-2">
        {quicks.map((q) => (
          <button
            key={q}
            onClick={() => setText(q + "：")}
            className="shrink-0 rounded-full bg-surface px-3 py-1.5 text-[11px] text-muted-foreground shadow-sm ring-1 ring-border/60"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-border bg-surface/80 px-3 py-2 backdrop-blur">
        <button className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-lg">
          📎
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="向健康管理师提问…"
          className="flex-1 rounded-full bg-surface-2 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={send}
          className="rounded-full bg-warm px-4 py-2 text-sm font-medium text-warm-foreground"
        >
          发送
        </button>
      </div>
    </div>
  );
}
