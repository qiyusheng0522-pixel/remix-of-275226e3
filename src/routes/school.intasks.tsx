import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/school/intasks")({
  component: InTasksPage,
});

type Task = {
  id: string;
  role: "班主任" | "校医" | "体育老师" | "食堂";
  title: string;
  who: string;
  due: string;
  status: "待处理" | "处理中" | "已完成" | "已超期" | "需升级";
};

const tasks: Task[] = [
  { id: "t1", role: "班主任", title: "催办 12 位家长完成体检授权", who: "2年2班", due: "今日", status: "待处理" },
  { id: "t2", role: "班主任", title: "提醒未读报告家长查看", who: "3年3班", due: "今日", status: "处理中" },
  { id: "t3", role: "校医", title: "观察运动后胸闷学生 王小明", who: "2年2班", due: "本周", status: "处理中" },
  { id: "t4", role: "校医", title: "疑似过敏反应现场记录", who: "1年1班", due: "已超期", status: "已超期" },
  { id: "t5", role: "校医", title: "调整体育活动强度：呼吸关注学生", who: "5年1班", due: "本周", status: "待处理" },
  { id: "t6", role: "体育老师", title: "记录运动后不适反馈", who: "4年2班", due: "本周", status: "已完成" },
  { id: "t7", role: "食堂", title: "过敏原提示（P1）", who: "全校", due: "计划中", status: "待处理" },
];

const roles = ["全部", "班主任", "校医", "体育老师", "食堂"] as const;
const filters = ["全部", "今日到期", "超期", "需升级"] as const;

const statusStyle: Record<Task["status"], string> = {
  待处理: "bg-warm/15 text-warm",
  处理中: "bg-teal/15 text-teal",
  已完成: "bg-success/15 text-success",
  已超期: "bg-danger/15 text-danger",
  需升级: "bg-warning/25 text-warning-foreground",
};

function InTasksPage() {
  const [role, setRole] = useState<(typeof roles)[number]>("全部");
  const [f, setF] = useState<(typeof filters)[number]>("全部");

  const list = tasks.filter((t) => {
    if (role !== "全部" && t.role !== role) return false;
    if (f === "今日到期") return t.due === "今日";
    if (f === "超期") return t.status === "已超期";
    if (f === "需升级") return t.status === "需升级";
    return true;
  });

  return (
    <div>
      <StatusBar title="校内任务" />
      <div className="px-5 pt-2">
        <h1 className="text-xl font-bold">校内任务</h1>
        <p className="mb-4 text-xs text-muted-foreground">按角色分派 · 完成后可一键升级健管师</p>

        {/* Role tabs */}
        <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${
                role === r ? "bg-teal text-teal-foreground" : "bg-surface ring-1 ring-border/60 text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {filters.map((k) => (
            <button
              key={k}
              onClick={() => setF(k)}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] ${
                f === k ? "bg-deep text-deep-foreground" : "bg-surface-2 text-muted-foreground"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* 汇总 */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { k: "今日到期", v: tasks.filter((t) => t.due === "今日").length, c: "warm" },
            { k: "超期", v: tasks.filter((t) => t.status === "已超期").length, c: "danger" },
            { k: "已完成", v: tasks.filter((t) => t.status === "已完成").length, c: "success" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-surface p-3 text-center shadow-sm ring-1 ring-border/60">
              <p className={`text-lg font-extrabold text-${s.c}`}>{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>
      </div>

      <ul className="space-y-2 px-5 pb-8">
        {list.map((t) => (
          <li key={t.id} className="rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/15 text-lg">
                {t.role === "班主任" ? "👨‍🏫" : t.role === "校医" ? "🏥" : t.role === "体育老师" ? "⚽" : "🍱"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{t.title}</p>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {t.role} · {t.who} · 期限 {t.due}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusStyle[t.status]}`}>{t.status}</span>
                  <button className="ml-auto rounded-full bg-success/15 px-3 py-1 text-[11px] text-success">完成</button>
                  <button className="rounded-full bg-warning/20 px-3 py-1 text-[11px] text-warning-foreground">升级</button>
                </div>
              </div>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="rounded-2xl bg-surface p-8 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-border/60">
            暂无任务
          </li>
        )}
      </ul>
    </div>
  );
}
