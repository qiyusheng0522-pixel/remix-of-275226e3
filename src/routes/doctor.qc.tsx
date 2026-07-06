import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";
import { useState } from "react";

export const Route = createFileRoute("/doctor/qc")({
  component: ReportReviewPage,
});

const tabs = ["待审核", "已通过", "已退回"] as const;

type Item = {
  name: string;
  class: string;
  risk: "高危" | "中危";
  issue: string;
  detail: string;
  ai: string;
};

const data: Record<(typeof tabs)[number], Item[]> = {
  待审核: [
    {
      name: "刘小强",
      class: "5年1班",
      risk: "高危",
      issue: "BMI 26.4 · 血压 138/92",
      detail: "肥胖合并偏高血压，需人工二次审核后签发",
      ai: "AI 建议：转心内科复评，家长同步生活方式干预",
    },
    {
      name: "陈静雅",
      class: "3年3班",
      risk: "高危",
      issue: "血压 首测 138/92 · 复测 132/88",
      detail: "复测仍偏高，报告需医生确认",
      ai: "AI 建议：标注为『血压偏高，建议动态监测』",
    },
    {
      name: "李小雨",
      class: "3年3班",
      risk: "中危",
      issue: "身高 128 → 125 cm",
      detail: "与半年前数据方向矛盾，疑测量误差",
      ai: "AI 建议：退回体检机构核实测量",
    },
  ],
  已通过: [
    {
      name: "王晨曦",
      class: "3年3班",
      risk: "中危",
      issue: "视力 4.9",
      detail: "已人工确认，报告已签发",
      ai: "AI 建议：3 个月复查",
    },
  ],
  已退回: [
    {
      name: "赵一鸣",
      class: "3年3班",
      risk: "中危",
      issue: "缺 视力（左眼）",
      detail: "已退回体检机构补录",
      ai: "—",
    },
  ],
};

function ReportReviewPage() {
  const [t, setT] = useState<(typeof tabs)[number]>("待审核");
  const list = data[t];
  const highCount = data["待审核"].filter((i) => i.risk === "高危").length;

  return (
    <div>
      <StatusBar title="报告审核" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">报告审核</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          高风险体检数据须医生人工二次审核后方可签发 · 待审核 {data["待审核"].length} 项（含高危 {highCount}）
        </p>

        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((k) => (
            <button
              key={k}
              onClick={() => setT(k)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${
                t === k ? "bg-deep text-deep-foreground" : "bg-surface ring-1 ring-border/60 text-muted-foreground"
              }`}
            >
              {k} · {data[k].length}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {list.map((r) => (
            <li key={r.name + r.issue} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{r.name} · {r.class}</p>
                  <p className="mt-1 text-xs text-warm">⚠ {r.issue}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{r.detail}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    r.risk === "高危" ? "bg-danger/15 text-danger" : "bg-warm/15 text-warm"
                  }`}
                >
                  {r.risk}
                </span>
              </div>
              <p className="mt-2 rounded-lg bg-surface-2 px-2.5 py-1.5 text-[11px] text-muted-foreground">
                ✨ {r.ai}
              </p>
              {t === "待审核" && (
                <div className="mt-3 flex gap-2">
                  <ActionSheet
                    trigger={<button className="flex-1 rounded-xl bg-surface-2 py-2 text-xs">退回补录</button>}
                    title="退回体检机构补录？"
                    description={`${r.name} · ${r.detail}`}
                    confirmText="退回"
                    toastMessage="已退回补录"
                    toastType="info"
                  />
                  <ActionSheet
                    trigger={<button className="flex-1 rounded-xl bg-warm/15 py-2 text-xs text-warm">标记复测</button>}
                    title="标记待复测？"
                    confirmText="标记"
                    toastMessage="已加入复测队列"
                    toastType="warning"
                  />
                  <ActionSheet
                    trigger={
                      <button className="flex-1 rounded-xl bg-deep py-2 text-xs font-medium text-deep-foreground">
                        审核签发
                      </button>
                    }
                    title="确认人工二次审核通过？"
                    description="签发后报告将同步至家长与校方。"
                    confirmText="签发"
                    toastMessage="报告已签发 ✓"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
