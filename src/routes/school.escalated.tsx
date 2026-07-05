import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";
import { useState } from "react";

export const Route = createFileRoute("/school/escalated")({
  component: EscalatedPage,
});

type Item = {
  id: string;
  title: string;
  who: string;
  from: string;
  escalatedAt: string;
  manager: string;
  phase: "已受理" | "沟通家长" | "外部转诊" | "已闭环";
  latest: string;
  eta: string;
};

const items: Item[] = [
  {
    id: "e1",
    title: "现场疑似过敏反应处置",
    who: "1年1班 · 李同学",
    from: "校医 · 04-02 10:12 升级",
    escalatedAt: "2小时前",
    manager: "王健管师",
    phase: "沟通家长",
    latest: "已联系家长，安排今日下午到院复查",
    eta: "今日 18:00 前反馈",
  },
  {
    id: "e2",
    title: "重大异常升级流转",
    who: "5年1班 · 陈同学 等 2 人",
    from: "校管理者 · 04-02 09:30 升级",
    escalatedAt: "3小时前",
    manager: "刘健管师",
    phase: "外部转诊",
    latest: "已开具绿色通道转诊单，家长确认中",
    eta: "明日 12:00 前反馈",
  },
  {
    id: "e3",
    title: "复检未到场跟进",
    who: "3年3班 · 张同学",
    from: "体检负责老师 · 04-01 升级",
    escalatedAt: "昨日",
    manager: "王健管师",
    phase: "已闭环",
    latest: "家长已完成补检预约，报告将同步至学校",
    eta: "已完成",
  },
];

const phaseStyle: Record<Item["phase"], string> = {
  已受理: "bg-teal/15 text-teal",
  沟通家长: "bg-warm/15 text-warm",
  外部转诊: "bg-deep/15 text-deep",
  已闭环: "bg-success/15 text-success",
};

const tabs = ["进行中", "已闭环", "全部"] as const;

function EscalatedPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("进行中");
  const list = items.filter((i) => {
    if (tab === "进行中") return i.phase !== "已闭环";
    if (tab === "已闭环") return i.phase === "已闭环";
    return true;
  });

  return (
    <div>
      <StatusBar title="健管师接管" />
      <div className="px-5 pt-2">
        <div className="mb-1 flex items-center gap-2">
          <Link to="/school/intasks" className="text-lg text-muted-foreground">‹</Link>
          <h1 className="text-xl font-bold">健管师接管</h1>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          升级后的任务由校外健管师处理 · 学校端仅可查看进展，不再直接操作
        </p>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { k: "进行中", v: items.filter((i) => i.phase !== "已闭环").length, c: "warm" },
            { k: "已闭环", v: items.filter((i) => i.phase === "已闭环").length, c: "success" },
            { k: "本周升级", v: items.length, c: "teal" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-surface p-3 text-center shadow-sm ring-1 ring-border/60">
              <p className={`text-lg font-extrabold text-${s.c}`}>{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>

        <div className="mb-3 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1 text-[11px] ${
                tab === t ? "bg-deep text-deep-foreground" : "bg-surface-2 text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-2 px-5 pb-8">
        {list.map((i) => (
          <li key={i.id} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{i.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{i.who}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${phaseStyle[i.phase]}`}>{i.phase}</span>
            </div>

            <div className="mt-3 space-y-1 rounded-xl bg-surface-2 p-3 text-[11px]">
              <p className="text-muted-foreground">来源：{i.from}</p>
              <p className="text-muted-foreground">接管：{i.manager} · {i.escalatedAt}</p>
              <p className="text-muted-foreground">下次反馈：{i.eta}</p>
            </div>

            <div className="mt-3 border-l-2 border-teal/40 pl-3 text-xs">
              <p className="text-muted-foreground">最新进展</p>
              <p className="mt-0.5">{i.latest}</p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>学校端为只读视图</span>
              <button className="rounded-full bg-surface-2 px-3 py-1">查看完整时间线 →</button>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="rounded-2xl bg-surface p-8 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-border/60">
            暂无接管任务
          </li>
        )}
      </ul>
    </div>
  );
}
