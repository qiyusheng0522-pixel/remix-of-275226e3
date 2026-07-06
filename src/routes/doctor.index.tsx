import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";
import { doctorStats } from "@/lib/mock-data";

export const Route = createFileRoute("/doctor/")({
  component: DoctorHome,
});

type School = {
  id: string;
  short: string;
  name: string;
  grade: string;
  tag: string;
  tagColor: "deep" | "teal";
};

const schools: School[] = [
  { id: "sun", short: "阳", name: "阳光小学", grade: "三年级 · 214 人", tag: "今日进校", tagColor: "deep" },
  { id: "ming", short: "启", name: "启明中学", grade: "初一 · 272 人", tag: "明日 08:30", tagColor: "teal" },
];

const quickAsk = ["数据质控", "报告审核", "重点复核", "健管师协同"];

const todoList = [
  {
    level: "紧急",
    levelClass: "bg-danger text-danger-foreground",
    icon: "🔄",
    text: "王小豆 · 内分泌科转诊单待复核（健管师升级）",
    tag: "转诊",
    tagClass: "bg-danger/10 text-danger",
    hint: "SLA 剩余 2 小时 · 点此处理",
    to: "/doctor/referral",
  },
  {
    level: "高",
    levelClass: "bg-warm text-warm-foreground",
    icon: "📝",
    text: "三年级 3 班 47 份体检报告待审核",
    tag: "报告审核",
    tagClass: "bg-warm/15 text-warm",
    hint: "今日 17:00 前完成 · 点此处理",
    to: "/doctor/review",
  },
  {
    level: "高",
    levelClass: "bg-warm text-warm-foreground",
    icon: "🔍",
    text: "校内录检 12 条数据待质控（BMI 异常 3 条）",
    tag: "数据质控",
    tagClass: "bg-warning/15 text-warning-foreground",
    hint: "阳光小学 · 点此处理",
    to: "/doctor/qc",
  },
  {
    level: "常规",
    levelClass: "bg-muted text-muted-foreground",
    icon: "📋",
    text: "李小雨 健康方案 v0.3 待确认",
    tag: "方案",
    tagClass: "bg-deep/15 text-deep",
    hint: "健管师已同步 · 点此确认",
    to: "/doctor/plan",
  },
];

function DoctorHome() {
  const [activeSchool, setActiveSchool] = useState(schools[0].id);
  const school = schools.find((s) => s.id === activeSchool) ?? schools[0];
  const totalTodo = 6 + doctorStats.pendingReview + doctorStats.pendingQC + 8;

  return (
    <div className="pb-4">
      <StatusBar title="童护佳 · 医生端" />

      {/* Brand row */}
      <div className="flex items-center justify-between px-5 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-deep/15 text-deep">🩺</span>
          <span className="text-sm font-bold">陈医生 · 儿童保健科</span>
        </div>
        <Link
          to="/doctor/messages"
          className="relative grid h-8 w-8 place-items-center rounded-full bg-surface shadow-sm ring-1 ring-border"
        >
          🔔
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-danger" />
        </Link>
      </div>

      {/* School switcher */}
      <div className="grid grid-cols-2 gap-3 px-5">
        {schools.map((s) => {
          const active = s.id === activeSchool;
          const activeStyle =
            s.tagColor === "deep"
              ? "bg-gradient-to-r from-deep to-teal text-deep-foreground shadow-lg shadow-deep/30"
              : "bg-gradient-to-r from-teal to-teal/70 text-teal-foreground shadow-lg shadow-teal/30";
          return (
            <button
              key={s.id}
              onClick={() => setActiveSchool(s.id)}
              className={`flex items-center gap-3 rounded-2xl p-2.5 text-left ring-1 transition ${
                active ? `${activeStyle} ring-transparent` : "bg-surface text-foreground ring-border"
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                  active
                    ? "bg-white/25 text-white backdrop-blur"
                    : s.tagColor === "deep"
                    ? "bg-deep/15 text-deep"
                    : "bg-teal/15 text-teal"
                }`}
              >
                {s.short}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{s.name}</p>
                <p className={`truncate text-[11px] ${active ? "text-white/85" : "text-muted-foreground"}`}>
                  {s.tag} · {s.grade}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Today briefing card */}
      <div className="mt-3 px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep via-deep/95 to-teal p-4 text-white shadow-xl shadow-deep/30">
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/25 text-3xl backdrop-blur">
              🩺
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-white/80">✨ 今日工作简报</p>
              <p className="mt-0.5 text-base font-bold leading-tight">
                陈医生，{school.name}还有 <span className="underline decoration-white/60">{totalTodo}</span> 件事要您处理 🩺
              </p>
            </div>
          </div>

          <Link
            to="/doctor/focus"
            className="relative mt-3 flex items-center justify-between rounded-2xl bg-white/95 px-3 py-2.5 text-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-danger">高风险 3 名待复核</span>
              <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] text-danger">肥胖代谢 2</span>
              <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] text-danger">过敏 1</span>
            </div>
            <span className="text-muted-foreground">›</span>
          </Link>

          <Link
            to="/doctor/exam"
            className="relative mt-2.5 flex items-center gap-2 rounded-full bg-white pl-3 pr-1 py-1"
          >
            <span className="text-deep">▶</span>
            <span className="flex-1 truncate text-[13px] text-muted-foreground">
              进入现场录检 · {doctorStats.todayCount} 人 / 已录 168
            </span>
            <span className="rounded-full bg-deep px-3 py-1 text-[11px] font-medium text-deep-foreground">开始</span>
          </Link>

          <div className="relative mt-2 flex flex-wrap gap-1.5">
            {quickAsk.map((q, i) => (
              <Link
                key={q}
                to={
                  ["/doctor/qc", "/doctor/review", "/doctor/focus", "/doctor/coord"][i] as
                    | "/doctor/qc"
                    | "/doctor/review"
                    | "/doctor/focus"
                    | "/doctor/coord"
                }
                className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] text-foreground"
              >
                {q}
              </Link>
            ))}
          </div>

          <div className="relative mt-2.5 grid grid-cols-2 gap-2">
            <Link
              to="/doctor/referral"
              className="flex items-center justify-between rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-medium text-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                转诊处理 · 6
              </span>
              <span className="text-muted-foreground">›</span>
            </Link>
            <Link
              to="/doctor/plan"
              className="flex items-center justify-between rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-medium text-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deep" />
                方案确认 · 8
              </span>
              <span className="text-muted-foreground">›</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SLA banner */}
      <Link
        to="/doctor/referral"
        className="mx-5 mt-3 flex items-center gap-3 rounded-2xl bg-danger/10 px-3 py-3 ring-1 ring-danger/25"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-tight text-danger-foreground">
          限时<br />处理
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">健管师升级 · 王小豆 转诊单待复核</p>
        </div>
        <span className="rounded-full bg-danger/15 px-2 py-1 text-[11px] text-danger">
          SLA · <b>2 小时</b>
        </span>
        <span className="text-muted-foreground">›</span>
      </Link>

      {/* Today do 2 things */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold">今天先做这 2 件事</h3>
          <span className="text-[11px] text-muted-foreground">0/2</span>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 rounded-2xl bg-danger/10 p-3 ring-1 ring-danger/25">
            <span className="text-xl">🚨</span>
            <p className="min-w-0 flex-1 text-sm">复核王小豆转诊单（内分泌科）</p>
            <Link
              to="/doctor/referral"
              className="rounded-full border border-danger bg-white px-3 py-1 text-[11px] font-medium text-danger"
            >
              去处理
            </Link>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-warm/10 p-3 ring-1 ring-warm/25">
            <span className="text-xl">📝</span>
            <p className="min-w-0 flex-1 text-sm">审核 三年级 3 班 47 份体检报告</p>
            <Link
              to="/doctor/review"
              className="rounded-full border border-warm bg-white px-3 py-1 text-[11px] font-medium text-warm"
            >
              去审核
            </Link>
          </li>
        </ul>
      </section>

      {/* Full todo list */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold">今日待办清单</h3>
          <Link to="/doctor/messages" className="shrink-0 text-[11px] text-muted-foreground">
            全部消息 ›
          </Link>
        </div>
        <p className="mb-3 text-[11px] leading-relaxed text-deep">
          ✨ 按 SLA · 风险等级 · 家长响应 排序（转诊、审核为每日必做）
        </p>
        <ul className="space-y-2">
          {todoList.map((c) => (
            <Link
              key={c.text}
              to={c.to as "/doctor/referral" | "/doctor/review" | "/doctor/qc" | "/doctor/plan"}
              className="block rounded-2xl bg-surface-2 p-3"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ${c.levelClass}`}
                >
                  {c.level}
                </span>
                <span className="text-lg">{c.icon}</span>
                <p className="min-w-0 flex-1 text-[13px] leading-snug">{c.text}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${c.tagClass}`}>
                  {c.tag}
                </span>
              </div>
              <div className="mt-2 ml-[46px] inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] text-muted-foreground ring-1 ring-border">
                ⏱ {c.hint}
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* 进校任务安排 */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <h3 className="mb-3 text-sm font-bold">进校任务安排</h3>
        <ul className="space-y-2">
          {[
            { school: "阳光小学", date: "今日 08:30", status: "进行中", count: 214 },
            { school: "阳光小学", date: "明日 08:30", status: "计划中", count: 272 },
            { school: "启明中学", date: "04-08", status: "待确认", count: 380 },
          ].map((s, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-deep/15 text-lg">
                🏫
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{s.school}</p>
                <p className="text-[11px] text-muted-foreground">
                  {s.date} · {s.count} 人
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] ${
                  s.status === "进行中" ? "bg-warm/15 text-warm" : "bg-muted text-muted-foreground"
                }`}
              >
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
