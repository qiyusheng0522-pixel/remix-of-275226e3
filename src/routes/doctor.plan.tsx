import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";
import { useState } from "react";

export const Route = createFileRoute("/doctor/plan")({
  component: PlanPage,
});

type Status = "待生成" | "待确认" | "已发布";
type Category = "饮食" | "运动" | "睡眠" | "心理" | "环境" | "用药" | "复诊";
type Case = {
  id: string;
  name: string;
  grade: string;
  age: number;
  gender: "男" | "女";
  status: Status;
  version: string;
  updated: string;
  // 列表展示用
  dept: string;
  evalTime: string;
  disease: string;
  evaluation: string;
  reviewState: "审核中" | "待审核" | "已通过";
  needVisit?: boolean;
  // 健康风险标签（只有有健康问题的儿童才建方案）
  risks: { text: string; level: "warn" | "danger" }[];
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
    category: Category;
    title: string;
    basis: string;
    items: string[];
    extra: string[];
  }[];
};

const categoryStyle: Record<Category, { icon: string; cls: string }> = {
  饮食: { icon: "🍚", cls: "bg-warm/15 text-warm" },
  运动: { icon: "🏃", cls: "bg-teal/15 text-teal" },
  睡眠: { icon: "🌙", cls: "bg-deep/15 text-deep" },
  心理: { icon: "🧠", cls: "bg-success/15 text-success" },
  环境: { icon: "🌿", cls: "bg-teal/15 text-teal" },
  用药: { icon: "💊", cls: "bg-danger/10 text-danger" },
  复诊: { icon: "📅", cls: "bg-muted text-muted-foreground" },
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
    dept: "呼吸/过敏科",
    evalTime: "2026-04-02 18:44:18",
    disease: "过敏性哮喘 · BMI 偏轻",
    evaluation:
      "根据本次体检，患儿 BMI 16.8 偏轻，近两周夜间咳嗽 3 次，伴尘螨与花粉阳性反应，母亲有过敏性鼻炎史。建议以家庭呵护为主，1 个月复评...",
    reviewState: "审核中",
    needVisit: true,
    risks: [
      { text: "BMI 偏轻", level: "warn" },
      { text: "夜间咳嗽", level: "warn" },
      { text: "过敏体质", level: "warn" },
    ],
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
        category: "饮食",
        title: "饮食营养",
        basis: "依据：BMI 16.8 偏轻 · 早餐不规律记录",
        items: [
          "三餐规律，早餐必吃，蛋白质 ≥ 1 份",
          "主食粗细搭配、蔬菜 ≥ 300g/日",
          "含糖饮料 ≤ 1 次/周，避免夜宵",
          "每周记录体重，1 个月复评 BMI",
        ],
        extra: ["3 个月营养专科复评", "暂不建议代谢检查"],
      },
      {
        category: "运动",
        title: "运动方案",
        basis: "依据：BMI 偏轻 + 过敏，需增肌但避免过敏诱发",
        items: [
          "中等强度运动 60 分钟/日（跳绳、球类）",
          "每周 2 次力量训练（自重深蹲、俯卧撑）",
          "运动前后观察呼吸与胸闷，随身备药",
          "花粉高峰期改为室内运动",
        ],
        extra: ["体育课强度分级：中等", "校医现场观察 2 周"],
      },
      {
        category: "睡眠",
        title: "睡眠作息",
        basis: "依据：夜间咳嗽影响睡眠质量",
        items: [
          "22:00 前上床，睡眠 ≥ 9 小时",
          "卧室湿度 40-60%，每周除螨",
          "睡前 1 小时不用电子屏幕",
        ],
        extra: ["家长记录夜间症状 2 周"],
      },
      {
        category: "环境",
        title: "环境与过敏管理",
        basis: "依据：尘螨/花粉过敏史",
        items: [
          "每周床品换洗 60℃ 热水",
          "记录诱因：尘螨 / 花粉 / 冷空气",
          "外出佩戴口罩，回家更衣洗手",
        ],
        extra: ["呼吸/过敏专科复核"],
      },
      {
        category: "用药",
        title: "既往用药",
        basis: "依据：家长已上传用药记录",
        items: [
          "布地奈德鼻喷 · 每日 1 次，遵医嘱使用",
          "症状加重及时就医，不自行加药",
        ],
        extra: ["用药提醒 · 已开启"],
      },
      {
        category: "复诊",
        title: "复诊随访",
        basis: "依据：短期观察 + 中期复评",
        items: [
          "2 周后校医现场复核症状",
          "1 个月家长上传体重 + 症状记录",
          "3 个月营养专科复评 BMI",
        ],
        extra: [],
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
    risks: [
      { text: "肥胖", level: "danger" },
      { text: "血糖偏高", level: "danger" },
      { text: "糖尿病家族史", level: "warn" },
    ],
    allergy: "无",
    family: "父亲 2 型糖尿病",
    history: "无",
    exam: [
      { label: "BMI", value: "24.6 肥胖", flag: "danger" },
      { label: "腰围", value: "72 cm", flag: "danger" },
      { label: "空腹血糖", value: "6.3", flag: "warn" },
      { label: "血压", value: "118/74", flag: "warn" },
    ],
    summary: "内分泌科转诊复核通过后，将基于本次体检自动生成饮食+运动为主的减重方案。",
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

const riskStyle = {
  warn: "bg-warm/15 text-warm",
  danger: "bg-danger/10 text-danger",
} as const;

function PlanPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? cases.find((c) => c.id === activeId) ?? null : null;
  const pendingCount = cases.filter((c) => c.status === "待确认").length;


  // ============ List view ============
  if (!active) {
    const pending = cases.filter((c) => c.status === "待确认");
    const others = cases.filter((c) => c.status !== "待确认");
    return (
      <div>
        <StatusBar title="方案确认" />
        <div className="px-5 pb-8 pt-2">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h1 className="text-xl font-bold">方案确认</h1>
              <p className="text-xs text-muted-foreground">
                有健康风险的儿童 · AI 生成方案后由医生确认，确认后自动同步家长
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-warm/15 px-2.5 py-1 text-[11px] font-medium text-warm">
              {pendingCount} 待确认
            </span>
          </div>

          <p className="mb-2 mt-2 text-[11px] font-medium text-muted-foreground">
            待确认
          </p>
          <div className="mb-4 space-y-2">
            {pending.length === 0 && (
              <p className="rounded-xl bg-surface-2 p-4 text-center text-xs text-muted-foreground">
                暂无待确认方案
              </p>
            )}
            {pending.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className="flex w-full items-center gap-3 rounded-2xl bg-surface p-3 text-left shadow-sm ring-1 ring-warm/30"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warm/15 text-sm font-bold text-warm">
                  {c.name.slice(-1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {c.id} {c.name}
                    <span className="ml-2 text-[11px] font-normal text-muted-foreground">
                      {c.grade} · {c.age}岁{c.gender}
                    </span>
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {c.risks.slice(0, 3).map((r) => (
                      <span
                        key={r.text}
                        className={`rounded px-1.5 py-0.5 text-[10px] ${riskStyle[r.level]}`}
                      >
                        {r.text}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    {c.version} · {c.updated}
                  </p>
                </div>
                <span className="shrink-0 text-muted-foreground">›</span>
              </button>
            ))}
          </div>

          {others.length > 0 && (
            <>
              <p className="mb-2 text-[11px] font-medium text-muted-foreground">
                其他方案
              </p>
              <div className="space-y-2">
                {others.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-surface p-3 text-left ring-1 ring-border/60"
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
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ============ Detail view ============
  return (
    <div>
      <StatusBar title="方案详情" />
      <div className="px-5 pb-8 pt-2">
        <button
          onClick={() => setActiveId(null)}
          className="mb-3 flex items-center gap-1 text-xs text-muted-foreground"
        >
          ‹ 返回方案列表
        </button>

        <h1 className="text-xl font-bold">
          {active.name} · 专案 {active.version}
        </h1>
        <p className="mb-3 text-xs text-muted-foreground">
          AI 基于本次体检 + 基础信息生成，医生确认后同步家长
        </p>

        {/* Active case header */}
        <div className="mb-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">基础档案</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusStyle[active.status]}`}>
              {active.status}
            </span>
          </div>

          {/* 健康风险 */}
          {active.risks.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[11px] text-muted-foreground">健康风险</p>
              <div className="flex flex-wrap gap-1.5">
                {active.risks.map((r) => (
                  <span key={r.text} className={`rounded-full px-2 py-0.5 text-[10px] ${riskStyle[r.level]}`}>
                    {r.text}
                  </span>
                ))}
              </div>
            </div>
          )}

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
                    <span className="flex items-center gap-1.5 text-sm font-semibold">
                      <span className={`grid h-6 w-6 place-items-center rounded-lg text-[12px] ${categoryStyle[s.category].cls}`}>
                        {categoryStyle[s.category].icon}
                      </span>
                      {s.title}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${categoryStyle[s.category].cls}`}>
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
                  {s.extra.length > 0 && (
                    <div className="mt-3 border-t border-border/60 pt-2">
                      <p className="mb-1 text-[11px] text-muted-foreground">附加建议</p>
                      {s.extra.map((e) => (
                        <label key={e} className="flex items-start gap-2 py-1 text-xs">
                          <input type="checkbox" className="mt-0.5 accent-deep" />
                          <span>{e}</span>
                        </label>
                      ))}
                    </div>
                  )}
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
                        确认并同步家长
                      </button>
                    }
                    title="确认该方案并同步家长？"
                    description="确认后系统将自动同步至家长端，健管师同步跟进；历史版本进入方案版本管理。"
                    confirmText={`确认 ${active.version}`}
                    toastMessage="方案已确认并同步家长"
                    toastDescription={`${active.name} · ${active.version} · 家长端已推送`}
                    onConfirm={() => setActiveId(null)}
                  />
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  一儿一案 · 确认后自动同步家长，可失效或更新
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

