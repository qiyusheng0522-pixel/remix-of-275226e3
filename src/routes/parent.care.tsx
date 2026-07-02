import { createFileRoute } from "@tanstack/react-router";
import { todayTasks } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/parent/care")({
  component: CarePage,
});

const modules = [
  { icon: "⚖️", key: "体重", tips: "本周记录 1 次，饮食均衡", tint: "from-warm to-warm/60" },
  { icon: "🫁", key: "呼吸", tips: "记录夜间咳嗽与诱因", tint: "from-teal to-teal/60" },
  { icon: "😴", key: "睡眠", tips: "22:00 前上床，屏幕远离", tint: "from-deep to-deep/60" },
  { icon: "🏃", key: "运动", tips: "户外 60 分钟/日", tint: "from-warning to-warm/60" },
  { icon: "🍎", key: "饮食", tips: "减少含糖饮料", tint: "from-success to-teal/60" },
  { icon: "🛏️", key: "环境", tips: "每周除螨、通风", tint: "from-teal to-warm/60" },
];

function CarePage() {
  const [tab, setTab] = useState<"今日" | "本周">("今日");
  const done = todayTasks.filter((t) => t.done).length;
  return (
    <div>
      <StatusBar title="儿童呵护" />
      <div className="px-5 pb-8 pt-2">
        <header className="mb-4 flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold">呵护中心</h1>
            <p className="text-xs text-muted-foreground">
              连续执行 12 天 · 本周完成率 78%
            </p>
          </div>
          <span className="text-3xl">💗</span>
        </header>

        {/* Tabs */}
        <div className="mb-4 inline-flex rounded-full bg-muted p-1 text-xs">
          {(["今日", "本周"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 transition ${
                tab === t ? "bg-surface font-semibold text-warm shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}呵护
            </button>
          ))}
        </div>

        {/* Progress card */}
        <div className="mb-5 rounded-3xl bg-gradient-to-br from-warm to-teal p-5 text-white shadow-lg shadow-warm/20">
          <p className="text-xs opacity-90">{tab}任务完成</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold">{done}</span>
            <span className="text-sm opacity-80">/ {todayTasks.length} 项</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${(done / todayTasks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Modules */}
        <h2 className="mb-2 text-sm font-semibold">呵护模块</h2>
        <div className="mb-5 grid grid-cols-3 gap-3">
          {modules.map((m) => (
            <button
              key={m.key}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${m.tint} p-3 text-left text-white shadow-sm`}
            >
              <div className="text-2xl">{m.icon}</div>
              <div className="mt-2 text-sm font-bold">{m.key}</div>
              <div className="mt-0.5 text-[10px] leading-tight opacity-90">{m.tips}</div>
            </button>
          ))}
        </div>

        {/* Task list */}
        <h2 className="mb-2 text-sm font-semibold">任务打卡</h2>
        <ul className="space-y-2">
          {todayTasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-xl">
                {t.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${t.done ? "text-muted-foreground line-through" : ""}`}>
                  {t.title}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {t.tag} · {t.time}
                </p>
              </div>
              {t.done ? (
                <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] text-success">✓ 已完成</span>
              ) : (
                <div className="flex gap-1">
                  <button className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    稍后
                  </button>
                  <button className="rounded-full bg-warm px-3 py-1 text-[11px] font-medium text-warm-foreground">
                    打卡
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
