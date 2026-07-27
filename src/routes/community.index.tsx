import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";

import { EIcon } from "@/components/EIcon";
export const Route = createFileRoute("/community/")({
  component: CommunityHome,
});

type Stat = {
  icon: import("react").ReactNode;
  iconBg: string;
  label: string;
  sub: string;
  value: number;
  unit: string;
  valueColor: string;
  to: "/community/patients" | "/community/edu" | "/community/consult";
};

const stats: Stat[] = [
  {
    icon: <EIcon e="📦" />,
    iconBg: "bg-warm/15 text-warm",
    label: "在管患者",
    sub: "商城购买 · 社区承接随访",
    value: 46,
    unit: "人在管",
    valueColor: "text-warm",
    to: "/community/patients",
  },
  {
    icon: <EIcon e="🔁" />,
    iconBg: "bg-teal/15 text-teal",
    label: "医院下传",
    sub: "医院转介 · 待建档随访",
    value: 12,
    unit: "人待接",
    valueColor: "text-teal",
    to: "/community/patients",
  },
  {
    icon: <EIcon e="📢" />,
    iconBg: "bg-rose/15 text-rose",
    label: "今日宣教",
    sub: "过敏体质家长精准推送",
    value: 3,
    unit: "条待推",
    valueColor: "text-rose",
    to: "/community/edu",
  },
  {
    icon: <EIcon e="💬" />,
    iconBg: "bg-deep/15 text-deep",
    label: "待回复咨询",
    sub: "承诺 24h 内回复",
    value: 5,
    unit: "条未读",
    valueColor: "text-deep",
    to: "/community/consult",
  },
];

type Todo = {
  id: string;
  name: string;
  tags: { text: string; cls: string }[];
  desc: string;
  to: "/community/patients" | "/community/edu" | "/community/consult";
};

const todos: Todo[] = [
  {
    id: "S01",
    name: "刘小强 · 体重管理季度包",
    tags: [{ text: "服务包", cls: "bg-warm/15 text-warm" }],
    desc: "第 3 周随访 · 上传体重曲线 + 饮食反馈 · 今日 17:00 前",
    to: "/community/patients",
  },
  {
    id: "R01",
    name: "陈小美 · 哮喘复诊后转社区",
    tags: [{ text: "转社区", cls: "bg-teal/15 text-teal" }],
    desc: "医院方案：吸入激素维持 · 48h 内建立家庭档案并安排 2 周随访",
    to: "/community/patients",
  },
  {
    id: "S02",
    name: "王小美 · 近视防控半年包",
    tags: [{ text: "服务包", cls: "bg-warm/15 text-warm" }],
    desc: "本月屈光复查提醒 · 预约社区视力筛查台 · 本周内",
    to: "/community/patients",
  },
  {
    id: "R02",
    name: "张小乐 · 过敏性鼻炎季节维持",
    tags: [{ text: "转社区", cls: "bg-teal/15 text-teal" }],
    desc: "用药依从率仅 48% · 需家长强化沟通 · 04-20 电话随访",
    to: "/community/patients",
  },
  {
    id: "E01",
    name: "春季过敏原防护",
    tags: [{ text: "宣教", cls: "bg-rose/15 text-rose" }],
    desc: "面向已建档过敏体质儿童家长（38 户）· 今日 18:00 推送",
    to: "/community/edu",
  },
  {
    id: "E02",
    name: "近视防控 · 20-20-20 用眼法",
    tags: [{ text: "宣教", cls: "bg-rose/15 text-rose" }],
    desc: "近视防控包家长（14 户）· 草稿待审 · 本周五推送",
    to: "/community/edu",
  },
  {
    id: "C01",
    name: "刘小强家长 · 咨询回复",
    tags: [{ text: "咨询", cls: "bg-deep/15 text-deep" }],
    desc: "孩子跳绳后膝盖酸，是否运动量太大？已等 12 分钟",
    to: "/community/consult",
  },
  {
    id: "C02",
    name: "陈小美家长 · 咨询回复",
    tags: [{ text: "咨询", cls: "bg-deep/15 text-deep" }],
    desc: "夜间咳嗽 2 次，是否临时加用支气管扩张剂？已等 1h",
    to: "/community/consult",
  },
];

function CommunityHome() {
  const totalTodo = stats.reduce((s, x) => s + x.value, 0);

  const filters: { key: string; label: string; match: (t: Todo) => boolean }[] = [
    { key: "all", label: "全部", match: () => true },
    { key: "svc", label: "服务包", match: (t) => t.tags.some((x) => x.text === "服务包") },
    { key: "ref", label: "转社区", match: (t) => t.tags.some((x) => x.text === "转社区") },
    { key: "edu", label: "宣教", match: (t) => t.tags.some((x) => x.text === "宣教") },
    { key: "consult", label: "咨询", match: (t) => t.tags.some((x) => x.text === "咨询") },
  ];
  const [active, setActive] = useState<string>("all");
  const filtered = todos.filter(filters.find((f) => f.key === active)!.match);

  return (
    <div className="pb-4">
      <StatusBar title="童护佳 · 社区端" />

      {/* Top bar */}
      <div className="flex items-center justify-between bg-surface px-5 py-3">
        <span className="text-xl text-muted-foreground">‹</span>
        <h1 className="text-base font-bold">工作台</h1>
        <div className="flex items-center gap-3">
          <Link to="/community/consult" className="relative text-lg">
            {<EIcon e="🔔" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </Link>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-warm text-sm font-bold text-warm-foreground">
            张
          </span>
        </div>
      </div>

      {/* Greeting card */}
      <div className="px-5 pt-3">
        <div className="rounded-2xl bg-gradient-to-r from-warm to-warm/80 p-5 text-warm-foreground shadow-lg shadow-warm/25">
          <p className="text-lg font-bold">张医生，早上好 {<EIcon e="👋" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}</p>
          <p className="mt-1 text-[13px] text-white/85">
            阳光社区卫生服务中心 · 儿童健康管理站 · 今日 {totalTodo} 项待处理
          </p>
        </div>
      </div>

      {/* stats */}
      <section className="px-5 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-warm">〰</span> 今日待办
          </h3>
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-[11px] text-warm">
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
                <p className={`text-2xl font-bold leading-none ${s.valueColor}`}>{s.value}</p>
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


      {/* 待办清单 */}
      <section className="px-5 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-warm">{<EIcon e="📋" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}</span> 今日待办清单
          </h3>
          <span className="text-[11px] text-muted-foreground">
            共 {filtered.length}/{todos.length} 项
          </span>
        </div>
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
                    ? "bg-warm text-warm-foreground ring-warm"
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
                    <span
                      key={tag.text}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${tag.cls}`}
                    >
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
