import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/school/students")({
  component: StudentsPage,
});

type Row = {
  name: string;
  class: string;
  bind: boolean;
  auth: "已授权" | "未授权" | "已放弃";
  quest: boolean;
  exam: "已完成" | "待检" | "缺检" | "-";
  report: "已读" | "未读" | "-";
};

const rows: Row[] = [
  { name: "王小明", class: "2年2班", bind: true, auth: "已授权", quest: true, exam: "已完成", report: "未读" },
  { name: "李小雨", class: "3年3班", bind: true, auth: "已授权", quest: true, exam: "已完成", report: "已读" },
  { name: "张小乐", class: "1年1班", bind: true, auth: "已授权", quest: false, exam: "待检", report: "-" },
  { name: "陈小美", class: "4年2班", bind: true, auth: "未授权", quest: false, exam: "待检", report: "-" },
  { name: "刘小强", class: "5年1班", bind: true, auth: "已授权", quest: true, exam: "缺检", report: "-" },
  { name: "赵小欣", class: "2年1班", bind: false, auth: "未授权", quest: false, exam: "待检", report: "-" },
  { name: "钱小可", class: "6年2班", bind: true, auth: "已放弃", quest: false, exam: "-", report: "-" },
];

const filters = ["全部", "未授权", "未问卷", "缺检", "报告未读"];

function StudentsPage() {
  const [f, setF] = useState("全部");
  const [q, setQ] = useState("");

  const filtered = rows.filter((r) => {
    if (q && !r.name.includes(q) && !r.class.includes(q)) return false;
    if (f === "未授权") return r.auth === "未授权";
    if (f === "未问卷") return !r.quest;
    if (f === "缺检") return r.exam === "缺检";
    if (f === "报告未读") return r.report === "未读";
    return true;
  });

  return (
    <div>
      <StatusBar title="学生名单" />
      <div className="px-5 pt-2">
        <h1 className="text-xl font-bold">学生名单</h1>
        <p className="mb-3 text-xs text-muted-foreground">共 486 名 · 按状态筛选</p>

        <div className="mb-3 flex items-center gap-2 rounded-full bg-surface px-4 py-2 shadow-sm ring-1 ring-border/60">
          <span className="text-muted-foreground">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索姓名 / 班级"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {filters.map((k) => (
            <button
              key={k}
              onClick={() => setF(k)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${
                f === k
                  ? "bg-teal text-teal-foreground"
                  : "bg-surface text-muted-foreground ring-1 ring-border/60"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-2 px-5 pb-8">
        {filtered.map((r) => (
          <li
            key={r.name}
            className="rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/15 text-lg">
                🧒
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <span className="text-[10px] text-muted-foreground">{r.class}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Chip ok={r.bind} okText="已绑定" noText="未绑定" />
                  <Chip
                    ok={r.auth === "已授权"}
                    okText="已授权"
                    noText={r.auth}
                    variant={r.auth === "已放弃" ? "muted" : "warn"}
                  />
                  <Chip ok={r.quest} okText="问卷" noText="待问卷" />
                  <Chip
                    ok={r.exam === "已完成"}
                    okText="已检"
                    noText={r.exam === "缺检" ? "缺检" : r.exam === "-" ? "无" : "待检"}
                    variant={r.exam === "缺检" ? "danger" : "warn"}
                  />
                </div>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-2xl bg-surface p-8 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-border/60">
            没有匹配的学生
          </li>
        )}
      </ul>
    </div>
  );
}

function Chip({
  ok,
  okText,
  noText,
  variant = "warn",
}: {
  ok: boolean;
  okText: string;
  noText: string;
  variant?: "warn" | "danger" | "muted";
}) {
  if (ok) {
    return <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success">✓ {okText}</span>;
  }
  const cls =
    variant === "danger"
      ? "bg-danger/15 text-danger"
      : variant === "muted"
      ? "bg-muted text-muted-foreground"
      : "bg-warning/25 text-warning-foreground";
  return <span className={`rounded-full px-2 py-0.5 text-[10px] ${cls}`}>{noText}</span>;
}
