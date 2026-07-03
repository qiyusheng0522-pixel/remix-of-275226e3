import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { focusStudents, riskColorMap } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/school/focus")({
  component: FocusPage,
});

const types = ["全部", "体重管理", "呼吸/运动", "睡眠作息", "过敏风险"];

const anomalies = [
  { time: "10:24", who: "刘小强 · 5年1班", type: "运动后胸闷", by: "体育老师" },
  { time: "09:12", who: "张小乐 · 1年1班", type: "疑似过敏反应", by: "班主任" },
];

function FocusPage() {
  const [t, setT] = useState("全部");
  const list = t === "全部" ? focusStudents : focusStudents.filter((s) => s.type.includes(t.slice(0, 2)));

  return (
    <div>
      <StatusBar title="需关注学生" />
      <div className="px-5 pt-2">
        <h1 className="text-xl font-bold">需关注学生</h1>
        <p className="mb-4 text-xs text-muted-foreground">
          共 {focusStudents.length} 人 · 学校侧配合任务
        </p>

        {/* Anomaly upload */}
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-warm/20 to-danger/10 p-4 ring-1 ring-warm/30">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚨</span>
              <span className="text-sm font-semibold">现场异常上报</span>
            </div>
            <button className="rounded-full bg-warm px-3 py-1 text-[11px] font-medium text-warm-foreground">
              一键上报
            </button>
          </div>
          <ul className="space-y-1.5 text-xs">
            {anomalies.map((a) => (
              <li key={a.time} className="flex items-center justify-between rounded-lg bg-surface/70 px-3 py-2 backdrop-blur">
                <div>
                  <p className="font-medium">{a.who}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {a.type} · 上报人 {a.by}
                  </p>
                </div>
                <span className="text-[11px] text-warm">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Type filter */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {types.map((k) => (
            <button
              key={k}
              onClick={() => setT(k)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${
                t === k ? "bg-teal text-teal-foreground" : "bg-surface ring-1 ring-border/60 text-muted-foreground"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-2 px-5 pb-8">
        {list.map((s) => (
          <li key={s.name} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-2 text-lg">
                🧒
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{s.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${riskColorMap[s.risk]}`}>
                    {s.risk}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{s.class}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {s.type} · {s.note}
                </p>
                <div className="mt-2 flex gap-2">
                  <button className="rounded-full bg-teal/15 px-3 py-1 text-[11px] text-teal">
                    查看配合事项
                  </button>
                  <button className="rounded-full bg-surface-2 px-3 py-1 text-[11px] text-muted-foreground">
                    升级健管师
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
