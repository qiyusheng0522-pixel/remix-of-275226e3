import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";
import { useState } from "react";

export const Route = createFileRoute("/doctor/plan")({
  component: PlanPage,
});

type Status = "待生成" | "待确认" | "已发布";
type Case = {
  id: string;
  name: string;
  grade: string;
  age: number;
  gender: "男" | "女";
  status: Status;
  version: string;
  updated: string;
  // 基础信息
  allergy: string;
  family: string;
  history: string;
  // 本次体检关键数据
  exam: { label: string; value: string; flag?: "normal" | "warn" | "danger" }[];
  // AI 摘要
  summary: string;
  // 方案模块
  sections: {
    title: string;
    color: "warm" | "teal" | "deep";
    basis: string;
    items: string[];
    extra: string[];
  }[];
};

const cases: Case[] = [
  {
    id: "0315",
    name: "李小雨",
    grade: "三年级 3 班",
    age: 9,
    gender: "女",
    status: "待确认",
    version: "v0.3",
    updated: "健管师 10:12 更新",
    allergy: "尘螨 · 花粉",
    family: "母亲过敏性鼻炎",
    history: "布地奈德鼻喷 · 每日 1 次",
    exam: [
      { label: "身高", value: "132 cm", flag: "normal" },
      { label: "体重", value: "29.3 kg", flag: "warn" },
      { label: "BMI", value: "16.8 偏轻", flag: "warn" },
      { label: "视力", value: "4.9 / 4.9", flag: "normal" },
      { label: "夜间咳嗽", value: "近 2 周 3 次", flag: "warn" },
      { label: "血压", value: "98/62", flag: "normal" },
    ],
    summary:
      "基于本次体检 BMI 16.8 偏轻 + 夜间咳嗽 + 过敏史，建议以家庭呵护为主，1 个月复评，暂不转诊。",
    sections: [
      {
        title: "体重管理",
        color: "warm",
        basis: "依据：BMI 16.8 偏轻 · 早餐不规律记录",
        items: [
          "主食粗细搭配、蔬菜 ≥ 300g/日",
          "含糖饮料 ≤ 1 次/周",
          "每日早餐规律、避免夜宵",
          "中高强度运动 60 分钟/日",
          "睡眠 ≥ 9 小时，22:00 前上床",
          "每周记录体重，1 个月复评 BMI",
        ],
        extra: ["3 个月营养专科复评", "暂不建议代谢检查"],
      },
      {
        title: "呼吸 / 哮喘 / 过敏",
        color: "teal",
        basis: "依据：夜间咳嗽 3 次 + 尘螨/花粉过敏史",
        items: [
          "记录咳嗽、喘息、夜间症状",
          "记录诱因：尘螨 / 花粉 / 冷空气",
          "每周床品换洗、除螨",
          "运动前后观察呼吸与胸闷",
        ],
        extra: ["呼吸/过敏专科复核", "体育课注意强度调整", "校医现场观察 2 周"],
      },
      {
        title: "既往用药提醒",
        color: "deep",
        basis: "依据：家长已上传用药记录",
        items: [
          "布地奈德鼻喷 · 每日 1 次，遵医嘱使用",
          "不自动开药，症状加重及时就医",
        ],
        extra: ["用药提醒 · 已开启"],
      },
    ],
  },
  {
    id: "0617",
    name: "王小豆",
    grade: "四年级 2 班",
    age: 10,
    gender: "男",
    status: "待生成",
    version: "—",
    updated: "转诊复核后自动生成",
    allergy: "无",
    family: "父亲 2 型糖尿病",
    history: "无",
    exam: [
      { label: "BMI", value: "24.6 肥胖", flag: "danger" },
      { label: "腰围", value: "72 cm", flag: "danger" },
      { label: "空腹血糖", value: "6.3", flag: "warn" },
      { label: "血压", value: "118/74", flag: "warn" },
    ],
    summary: "内分泌科转诊复核通过后，将基于本次体检自动生成专属方案。",
    sections: [],
  },
  {
    id: "0508",
    name: "李娜",
    grade: "三年级 3 班",
    age: 9,
    gender: "女",
    status: "已发布",
    version: "v1.2",
    updated: "2 天前 · 家长已签收",
    allergy: "无",
    family: "无",
    history: "无",
    exam: [
      { label: "身高", value: "134 cm", flag: "normal" },
      { label: "BMI", value: "17.9 正常", flag: "normal" },
      { label: "视力", value: "4.6 / 4.7", flag: "warn" },
    ],
    summary: "整体健康，视力临界，重点视觉行为干预，3 个月复查。",
    sections: [],
  },
];

const statusStyle: Record<Status, string> = {
  待生成: "bg-muted text-muted-foreground",
  待确认: "bg-warm/15 text-warm",
  已发布: "bg-success/15 text-success",
};

const flagStyle = {
  normal: "text-foreground",
  warn: "text-warm",
  danger: "text-danger",
} as const;

function PlanPage() {
  const [activeId, setActiveId] = useState(cases[0].id);
  const active = cases.find((c) => c.id === activeId) ?? cases[0];

  return (
    <div>
      <StatusBar title="健康方案" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">儿童健康方案 · 专案</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          每位儿童一个专案，基于体检数据 + 基础信息生成
        </p>

        {/* Case list */}
        <div className="mb-4 space-y-2">
          {cases.map((c) => {
            const on = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 transition ${
                  on ? "bg-deep/5 ring-deep/40" : "bg-surface ring-border/60"
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-deep/10 text-sm font-bold text-deep">
                  {c.name.slice(-1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {c.id} {c.name}
                    <span className="ml-2 text-[11px] font-normal text-muted-foreground">
                      {c.grade} · {c.age}岁{c.gender}
                    </span>
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {c.version} · {c.updated}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${statusStyle[c.status]}`}>
                  {c.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active case header */}
        <div className="mb-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">
              {active.name} · 专案 {active.version}
            </p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusStyle[active.status]}`}>
              {active.status}
            </span>
          </div>

          {/* 基础信息 */}
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-surface-2 p-2.5 text-[11px]">
            <div>
              <p className="text-muted-foreground">过敏史</p>
              <p className="mt-0.5 font-medium">{active.allergy}</p>
            </div>
            <div>
              <p className="text-muted-foreground">家族史</p>
              <p className="mt-0.5 font-medium">{active.family}</p>
            </div>
            <div>
              <p className="text-muted-foreground">用药</p>
              <p className="mt-0.5 font-medium">{active.history}</p>
            </div>
          </div>

          {/* 体检数据 */}
          <p className="mt-3 mb-1.5 text-[11px] text-muted-foreground">本次体检关键数据</p>
          <div className="grid grid-cols-3 gap-2">
            {active.exam.map((e) => (
              <div key={e.label} className="rounded-xl bg-surface-2 p-2">
                <p className="text-[10px] text-muted-foreground">{e.label}</p>
                <p className={`mt-0.5 text-[13px] font-semibold ${flagStyle[e.flag ?? "normal"]}`}>
                  {e.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI 摘要 */}
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-deep/10 to-teal/10 p-4 ring-1 ring-deep/20">
          <p className="text-[11px] text-muted-foreground">🤖 AI 草案 · 健管师整理</p>
          <p className="mt-1 text-sm leading-relaxed">{active.summary}</p>
        </div>

        {active.status === "待生成" ? (
          <button className="w-full rounded-xl bg-deep py-3 text-sm font-medium text-deep-foreground">
            基于体检数据生成 v0.1 草案
          </button>
        ) : (
          <>
            <div className="space-y-3">
              {active.sections.map((s) => (
                <details
                  key={s.title}
                  open
                  className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60"
                >
                  <summary className="flex cursor-pointer items-center justify-between">
                    <span className="text-sm font-semibold">{s.title}</span>
                    <span className={`rounded-full bg-${s.color}/15 px-2 py-0.5 text-[10px] text-${s.color}`}>
                      已勾选 {s.items.length}
                    </span>
                  </summary>
                  <p className="mt-2 text-[11px] text-deep">{s.basis}</p>
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs">
                        <input type="checkbox" defaultChecked className="mt-0.5 accent-deep" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 border-t border-border/60 pt-2">
                    <p className="mb-1 text-[11px] text-muted-foreground">附加建议</p>
                    {s.extra.map((e) => (
                      <label key={e} className="flex items-start gap-2 py-1 text-xs">
                        <input type="checkbox" className="mt-0.5 accent-deep" />
                        <span>{e}</span>
                      </label>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            {active.status !== "已发布" && (
              <>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button className="rounded-xl bg-surface-2 py-3 text-xs">保存草稿</button>
                  <button className="rounded-xl bg-warm/15 py-3 text-xs text-warm">同步学校</button>
                  <ActionSheet
                    trigger={
                      <button className="rounded-xl bg-deep py-3 text-xs font-medium text-deep-foreground">
                        发布给家长
                      </button>
                    }
                    title="确认发布方案给家长？"
                    description="发布后家长将收到该儿童专属方案，健管师同步跟进；历史版本进入方案版本管理。"
                    confirmText={`确认发布 ${active.version}`}
                    toastMessage="方案已发布给家长"
                    toastDescription={`${active.name} · ${active.version} · 健管师已同步`}
                  />
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  一儿一案 · 发布后进入版本管理，可失效或更新
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
