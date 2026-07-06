import { createFileRoute, Link } from "@tanstack/react-router";
import { todayTasks } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/parent/care")({
  component: CarePage,
});

const modules = [
  { icon: "⚖️", key: "体重", tips: "每周记 1 次体重", tint: "from-warm to-warm/60", to: "/parent/record" },
  { icon: "🫁", key: "呼吸", tips: "记录咳嗽与诱因", tint: "from-teal to-teal/60", to: "/parent/record" },
  { icon: "😴", key: "睡眠", tips: "22:00 前上床", tint: "from-deep to-deep/60", to: "/parent/record" },
  { icon: "🏃", key: "运动", tips: "户外 60 分钟/日", tint: "from-warning to-warm/60", to: "/parent/record" },
  { icon: "🍎", key: "饮食", tips: "减少含糖饮料", tint: "from-success to-teal/60", to: "/parent/record" },
  { icon: "🛏️", key: "除螨", tips: "每周除螨、通风", tint: "from-teal to-warm/60", to: "/parent/dustmite" },
];

const defaultReminders = [
  { id: "bed", icon: "🛏️", title: "床品除螨清洗提醒", cycle: "每 2 周 · 下次 04-12", tag: "过敏防护" },
  { id: "weight", icon: "⚖️", title: "晨起体重记录", cycle: "每周 1 次 · 下次 周日", tag: "体重管理" },
  { id: "vent", icon: "🪟", title: "开窗通风换气", cycle: "每日 15 分钟", tag: "通风湿度" },
  { id: "humid", icon: "💧", title: "空气加湿器换水", cycle: "每 3 天 · 下次 04-08", tag: "呼吸道" },
  { id: "brush", icon: "🦷", title: "儿童牙刷更换", cycle: "每 3 个月 · 下次 05-20", tag: "口腔" },
  { id: "vitd", icon: "☀️", title: "维生素 D 补充", cycle: "每日 1 次", tag: "营养" },
];

function CarePage() {
  const [tab, setTab] = useState<"今日" | "本周">("今日");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(defaultReminders.map((r) => [r.id, true])),
  );
  const [manage, setManage] = useState(false);
  const activeCount = Object.values(enabled).filter(Boolean).length;
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

        {/* 居家健康提醒管理 */}
        <div className="mb-5 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold">居家健康提醒</h2>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                AI 依据{"{"}儿童{"}"}健康标签生成 · 已开启 {activeCount}/{defaultReminders.length} 项
              </p>
            </div>
            <button
              onClick={() => setManage((v) => !v)}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] ring-1 ${
                manage ? "bg-warm/15 text-warm ring-warm/30" : "bg-surface text-muted-foreground ring-border"
              }`}
            >
              {manage ? "完成" : "管理"}
            </button>
          </div>
          <ul className="space-y-2">
            {defaultReminders.map((r) => {
              const on = enabled[r.id];
              return (
                <li
                  key={r.id}
                  className={`flex items-center gap-3 rounded-xl p-2.5 ring-1 ${
                    on ? "bg-surface-2 ring-border/60" : "bg-muted/40 ring-border/40 opacity-60"
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-lg ring-1 ring-border">
                    {r.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[13px] font-semibold">{r.title}</p>
                      <span className="shrink-0 rounded-full bg-warm/10 px-1.5 py-0.5 text-[10px] text-warm">
                        {r.tag}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{r.cycle}</p>
                  </div>
                  {manage ? (
                    <button
                      onClick={() => setEnabled((s) => ({ ...s, [r.id]: !on }))}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        on ? "bg-warm" : "bg-muted"
                      }`}
                      aria-label={on ? "关闭提醒" : "开启提醒"}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                          on ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  ) : (
                    <span
                      className={`shrink-0 text-[11px] ${
                        on ? "text-teal" : "text-muted-foreground"
                      }`}
                    >
                      {on ? "已开启" : "已关闭"}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {manage && (
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              关闭后首页不再展示该项提醒 · 可随时重新开启
            </p>
          )}
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
