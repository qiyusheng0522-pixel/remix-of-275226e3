import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";

import { EIcon } from "@/components/EIcon";
export const Route = createFileRoute("/doctor/")({
  component: DoctorHome,
});

type Stat = {
  icon: import("react").ReactNode;
  iconBg: string;
  label: string;
  sub: string;
  value: number;
  unit: string;
  valueColor: string;
  to: "/doctor/referral" | "/doctor/qc" | "/doctor/messages" | "/doctor/plan" | "/doctor/exam" | "/doctor/comm";
};

const stats: Stat[] = [
  {
    icon: <EIcon e="👶" />,
    iconBg: "bg-teal/15 text-teal",
    label: "待检学生",
    sub: "阳光小学 · 三年级 3 班",
    value: 4,
    unit: "人待检",
    valueColor: "text-teal",
    to: "/doctor/exam",
  },
  {
    icon: <EIcon e="🔍" />,
    iconBg: "bg-warm/15 text-warm",
    label: "报告审核",
    sub: "高危 3 条 · 需人工二审",
    value: 12,
    unit: "条待审",
    valueColor: "text-warm",
    to: "/doctor/qc",
  },
  {
    icon: <EIcon e="📋" />,
    iconBg: "bg-success/15 text-success",
    label: "方案确认",
    sub: "健管师已同步",
    value: 4,
    unit: "份待确认",
    valueColor: "text-success",
    to: "/doctor/plan",
  },
  {
    icon: <EIcon e="💬" />,
    iconBg: "bg-deep/15 text-deep",
    label: "待回复",
    sub: "家长 / 健管师消息",
    value: 5,
    unit: "条未读",
    valueColor: "text-deep",
    to: "/doctor/comm",
  },
];

type Todo = {
  id: string;
  name: string;
  tags: { text: string; cls: string }[];
  desc: string;
  to: "/doctor/qc" | "/doctor/plan" | "/doctor/messages" | "/doctor/comm" | "/doctor/prep" | "/doctor/exam";
};

const todos: Todo[] = [
  {
    id: "E0",
    name: "待检学生",
    tags: [{ text: "待检学生", cls: "bg-teal/15 text-teal" }],
    desc: "阳光小学 · 三年级 3 班 · 4 人待检 · 点击进入待检清单",
    to: "/doctor/exam",
  },
  {
    id: "0423",
    name: "阳光小学",
    tags: [{ text: "报告审核", cls: "bg-warm/15 text-warm" }],
    desc: "校内录检 12 条数据 · 高危 3 条需医生二次审核",
    to: "/doctor/qc",
  },
  {
    id: "0315",
    name: "李小雨",
    tags: [{ text: "方案确认", cls: "bg-success/15 text-success" }],
    desc: "健康方案 v0.3 待确认 · 健管师已同步",
    to: "/doctor/plan",
  },
  {
    id: "0402",
    name: "陈敏 家长",
    tags: [{ text: "待回复", cls: "bg-deep/15 text-deep" }],
    desc: "咨询：孩子夜间咳嗽是否需要复诊 · 已等 2h",
    to: "/doctor/comm",
  },
  {
    id: "P1",
    name: "出诊前物资自查",
    tags: [{ text: "入校准备", cls: "bg-warm/15 text-warm" }],
    desc: "阳光小学 · 明日 08:30 · 证件 / 设备 / 耗材 / 数据工具",
    to: "/doctor/prep",
  },
  {
    id: "P2",
    name: "入校场地对接核对",
    tags: [{ text: "入校准备", cls: "bg-teal/15 text-teal" }],
    desc: "分区 / 隐私 / 供电 / 动线 / 排程 6 项现场核对",
    to: "/doctor/prep",
  },
  {
    id: "P3",
    name: "现场体检质控核对",
    tags: [{ text: "入校准备", cls: "bg-deep/15 text-deep" }],
    desc: "扫码核验 / 异常复测 / 数据同步 每批次循环自查",
    to: "/doctor/prep",
  },
  {
    id: "P4",
    name: "当日收尾 & 数据安全",
    tags: [{ text: "入校准备", cls: "bg-success/15 text-success" }],
    desc: "抽查 / 授权同步 / 加密上传 / 归档 6 项离场前必查",
    to: "/doctor/prep",
  },
];

function DoctorHome() {
  const totalTodo = stats.reduce((s, x) => s + x.value, 0);

  const filters: { key: string; label: string; match: (t: Todo) => boolean }[] = [
    { key: "all", label: "全部", match: () => true },
    { key: "exam", label: "待检学生", match: (t) => t.tags.some((x) => x.text === "待检学生") },
    { key: "qc", label: "报告审核", match: (t) => t.tags.some((x) => x.text === "报告审核") },
    { key: "plan", label: "方案确认", match: (t) => t.tags.some((x) => x.text === "方案确认") },
    { key: "reply", label: "待回复", match: (t) => t.tags.some((x) => x.text === "待回复") },
    { key: "prep", label: "入校准备", match: (t) => t.tags.some((x) => x.text === "入校准备") },
  ];
  const [active, setActive] = useState<string>("all");
  const filtered = todos.filter(filters.find((f) => f.key === active)!.match);


  return (
    <div className="pb-4">
      <StatusBar title="童护佳 · 医生端" />

      {/* Top bar: 工作台 */}
      <div className="flex items-center justify-between bg-surface px-5 py-3">
        <span className="text-xl text-muted-foreground">‹</span>
        <h1 className="text-base font-bold">工作台</h1>
        <div className="flex items-center gap-3">
          <Link to="/doctor/messages" className="relative text-lg">
            {<EIcon e="🔔" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </Link>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-teal text-sm font-bold text-teal-foreground">
            陈
          </span>
        </div>
      </div>

      {/* Greeting card */}
      <div className="px-5 pt-3">
        <div className="rounded-2xl bg-gradient-to-r from-teal to-teal/80 p-5 text-teal-foreground shadow-lg shadow-teal/25">
          <p className="text-lg font-bold">陈医生，早上好 {<EIcon e="👋" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}</p>
          <p className="mt-1 text-[13px] text-white/85">
            儿童保健科 · 今日 {totalTodo} 项待处理
          </p>
        </div>
      </div>

      {/* 今日待办 stats */}
      <section className="px-5 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-teal">〰</span> 今日待办
          </h3>
          <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] text-teal">
            共 {totalTodo} 项
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60"
            >
              <div className="flex items-start justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${s.iconBg}`}>
                  {s.icon}
                </span>
                <div className="text-right">
                  <p className={`text-2xl font-bold leading-none ${s.valueColor}`}>{s.value}</p>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold">{s.label}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{s.sub}</p>
                </div>
                <p className="shrink-0 text-[11px] text-muted-foreground">{s.unit}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>





      {/* 今日待办清单 */}
      <section className="px-5 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-teal">{<EIcon e="📋" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}</span> 今日待办清单
          </h3>
          <span className="text-[11px] text-muted-foreground">共 {filtered.length}/{todos.length} 项</span>
        </div>
        {/* 快捷筛选 */}
        <div className="mb-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {filters.map((f) => {
            const count = f.key === "all" ? todos.length : todos.filter(f.match).length;
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ring-1 transition ${
                  on
                    ? "bg-teal text-teal-foreground ring-teal"
                    : "bg-surface text-muted-foreground ring-border/60"
                }`}
              >
                {f.label} <span className={on ? "opacity-80" : "opacity-60"}>{count}</span>
              </button>
            );
          })}
        </div>
        <ul className="space-y-2.5">
          {filtered.map((t, i) => (

            <Link
              key={t.id}
              to={t.to}
              className="flex items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-[13px] font-bold text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {t.tags.map((tag) => (
                    <span key={tag.text} className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${tag.cls}`}>
                      {tag.text}
                    </span>
                  ))}
                  <span className="truncate text-[14px] font-semibold">
                    {t.id} {t.name}
                  </span>
                </div>
                <p className="mt-1 truncate text-[12px] text-muted-foreground">{t.desc}</p>
              </div>
              <span className="text-muted-foreground">›</span>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
