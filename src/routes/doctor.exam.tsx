import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/doctor/exam")({
  component: UsersPage,
});

type Status = "待检" | "进行中" | "已检-正常" | "已检-异常" | "需复核" | "方案确认";

type User = {
  id: string;
  name: string;
  gender: "男" | "女";
  age: number;
  grade: string;
  status: Status;
  note?: string;
  tags?: string[];
  to?: "/doctor/review" | "/doctor/qc" | "/doctor/plan" | "/doctor/riskreview";
  progress?: { done: number; total: number; current?: string }; // 进行中进度
  eta?: string; // 待检预计到场
};

const users: User[] = [
  { id: "20230617", name: "王小豆", gender: "男", age: 10, grade: "四年级 2 班", status: "需复核", note: "BMI 24.6 · 空腹血糖 6.3", tags: ["肥胖", "血糖偏高"], to: "/doctor/riskreview" },
  { id: "20230318", name: "李小雨", gender: "女", age: 9, grade: "三年级 3 班", status: "方案确认", note: "AI 方案 v0.3 · 健管师已同步", tags: ["BMI 偏轻", "夜间咳嗽"], to: "/doctor/plan" },
  { id: "20230412", name: "陈静雅", gender: "女", age: 9, grade: "三年级 3 班", status: "已检-异常", note: "视力 4.6 / 4.7 · 临界", tags: ["视力"], to: "/doctor/review" },
  { id: "20230508", name: "李娜", gender: "女", age: 9, grade: "三年级 3 班", status: "已检-正常", note: "各项指标正常 · 3 个月复查" },
  { id: "20230521", name: "王晨曦", gender: "男", age: 9, grade: "三年级 3 班", status: "已检-正常", note: "各项指标正常" },
  { id: "20230604", name: "刘思远", gender: "男", age: 9, grade: "三年级 3 班", status: "已检-异常", note: "龋齿 2 颗 · 建议就诊", tags: ["口腔"], to: "/doctor/review" },
  { id: "20230711", name: "赵一鸣", gender: "男", age: 9, grade: "三年级 3 班", status: "进行中", note: "已完成 身高体重 / 视力", progress: { done: 2, total: 6, current: "血压 / 心率" } },
  { id: "20230802", name: "孙欣然", gender: "女", age: 9, grade: "三年级 3 班", status: "进行中", note: "已完成 身高体重", progress: { done: 1, total: 6, current: "视力" } },
  { id: "20230725", name: "钱佳琪", gender: "女", age: 9, grade: "三年级 3 班", status: "待检", eta: "预计 09:20 到场 · 排队 1 号" },
  { id: "20230819", name: "周乐言", gender: "男", age: 9, grade: "三年级 3 班", status: "待检", eta: "预计 09:25 到场 · 排队 2 号" },
];

const statusStyle: Record<Status, string> = {
  待检: "bg-muted text-muted-foreground",
  进行中: "bg-teal/15 text-teal",
  "已检-正常": "bg-success/15 text-success",
  "已检-异常": "bg-warm/15 text-warm",
  需复核: "bg-danger/10 text-danger",
  方案确认: "bg-deep/10 text-deep",
};

const filters: (Status | "全部")[] = ["全部", "待检", "进行中", "已检-正常", "已检-异常", "需复核", "方案确认"];

function UsersPage() {
  const [filter, setFilter] = useState<Status | "全部">("全部");
  const [q, setQ] = useState("");

  const counts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.status] = (acc[u.status] ?? 0) + 1;
    return acc;
  }, {});

  const list = users.filter((u) => {
    if (filter !== "全部" && u.status !== filter) return false;
    if (q && !(`${u.id}${u.name}`.includes(q))) return false;
    return true;
  });

  const stats = [
    { label: "待检", value: counts["待检"] ?? 0, cls: "text-muted-foreground" },
    { label: "已检-正常", value: counts["已检-正常"] ?? 0, cls: "text-success" },
    { label: "已检-异常", value: counts["已检-异常"] ?? 0, cls: "text-warm" },
    { label: "需复核", value: counts["需复核"] ?? 0, cls: "text-danger" },
    { label: "方案确认", value: counts["方案确认"] ?? 0, cls: "text-deep" },
  ];

  return (
    <div>
      <StatusBar title="用户" />
      <div className="px-5 pb-8 pt-2">
        <div className="mb-3">
          <h1 className="text-xl font-bold">用户</h1>
          <p className="text-xs text-muted-foreground">
            阳光小学 · 三年级 3 班 · 共 {users.length} 人
          </p>
        </div>

        {/* 状态概览 */}
        <div className="mb-3 grid grid-cols-5 gap-2 rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60">
          {stats.map((s) => (
            <button
              key={s.label}
              onClick={() => setFilter(s.label as Status)}
              className="text-center"
            >
              <p className={`text-lg font-bold ${s.cls}`}>{s.value}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{s.label}</p>
            </button>
          ))}
        </div>

        {/* 搜索 */}
        <div className="mb-3 flex items-center gap-2 rounded-full bg-surface px-4 py-2 shadow-sm ring-1 ring-border/60">
          <span className="text-muted-foreground">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索姓名 / 学号"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* 筛选 tab */}
        <div className="mb-3 -mx-1 flex gap-1.5 overflow-x-auto px-1">
          {filters.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] ${
                  on
                    ? "bg-deep text-deep-foreground"
                    : "bg-surface text-muted-foreground ring-1 ring-border/60"
                }`}
              >
                {f}
                {f !== "全部" && (
                  <span className="ml-1 opacity-70">{counts[f] ?? 0}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 用户列表 */}
        <ul className="space-y-2">
          {list.length === 0 && (
            <li className="rounded-xl bg-surface-2 p-6 text-center text-xs text-muted-foreground">
              暂无用户
            </li>
          )}
          {list.map((u) => {
            const content = (
              <div className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-deep/10 text-sm font-bold text-deep">
                  {u.name.slice(-1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {u.name}
                    <span className="ml-2 text-[11px] font-normal text-muted-foreground">
                      {u.grade} · {u.age}岁{u.gender}
                    </span>
                  </p>
                  {u.tags && u.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {u.tags.map((t) => (
                        <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    {u.note || `学号 ${u.id}`}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusStyle[u.status]}`}>
                    {u.status}
                  </span>
                  {u.to && <span className="text-xs text-muted-foreground">›</span>}
                </div>
              </div>
            );
            return (
              <li key={u.id}>
                {u.to ? (
                  <Link to={u.to} className="block">
                    {content}
                  </Link>
                ) : (
                  <Link
                    to="/doctor/entry/$id"
                    params={{ id: u.id }}
                    className="block"
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
