import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { SubNav, reviewSubNav } from "@/components/DoctorSubNav";
import { useState } from "react";

export const Route = createFileRoute("/doctor/review")({
  component: ReviewPage,
});

const drafts = [
  { name: "刘小强", class: "5年1班", school: "阳光小学", risk: "红", issues: ["肥胖", "腰围偏大", "血压偏高"], flagged: true },
  { name: "张小乐", class: "1年1班", school: "阳光小学", risk: "橙", issues: ["过敏体质", "低体重"], flagged: true },
  { name: "王小明", class: "2年2班", school: "阳光小学", risk: "黄", issues: ["超重"], flagged: false },
  { name: "李小雨", class: "3年3班", school: "阳光小学", risk: "黄", issues: ["偏轻", "视力"], flagged: false },
  { name: "陈小美", class: "4年2班", school: "阳光小学", risk: "黄", issues: ["睡眠", "打鼾"], flagged: false },
];

const riskCls: Record<string, string> = {
  红: "bg-danger text-danger-foreground",
  橙: "bg-warm text-warm-foreground",
  黄: "bg-warning text-warning-foreground",
  绿: "bg-success text-success-foreground",
};

function ReviewPage() {
  const [tab, setTab] = useState<"待审核" | "高风险" | "已发布">("待审核");
  const list = tab === "高风险" ? drafts.filter((d) => d.flagged) : drafts;

  return (
    <div>
      <StatusBar title="报告审核" />
      <SubNav items={reviewSubNav} />
      <div className="mx-5 mt-2 rounded-xl bg-warm/10 p-3 text-[11px] leading-relaxed text-warm ring-1 ring-warm/20">
        高风险报告 100% 人工复核 · 语言不吓人、不空泛、有下一步 · 医生对医学判断负责
      </div>
      <div className="px-5 pt-3">
        <h1 className="text-xl font-bold">报告审核</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          待审核 47 · 高风险 3 · 已发布 165
        </p>

        <div className="mb-4 inline-flex rounded-full bg-muted p-1 text-xs">
          {(["待审核", "高风险", "已发布"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 ${
                tab === t ? "bg-surface font-semibold text-deep shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-3 px-5 pb-8">
        {list.map((d) => (
          <li key={d.name} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-2 text-lg">
                🧒
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{d.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${riskCls[d.risk]}`}>
                    {d.risk}
                  </span>
                  {d.flagged && (
                    <span className="rounded-full bg-danger/15 px-2 py-0.5 text-[10px] text-danger">
                      重点
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {d.school} · {d.class}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {d.issues.map((i) => (
                    <span
                      key={i}
                      className="rounded-full bg-warm/10 px-2 py-0.5 text-[10px] text-warm"
                    >
                      # {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-surface-2 p-3 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">系统建议：</span>
              建议家庭进行体重与饮食管理，1 个月复评；
              {d.flagged && " 建议肥胖/代谢专科绿色通道。"}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-xl bg-surface-2 py-2 text-xs">驳回补录</button>
              <button className="flex-1 rounded-xl bg-warm/15 py-2 text-xs font-medium text-warm">
                修改建议
              </button>
              <button className="flex-1 rounded-xl bg-deep py-2 text-xs font-medium text-deep-foreground">
                审核发布
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
