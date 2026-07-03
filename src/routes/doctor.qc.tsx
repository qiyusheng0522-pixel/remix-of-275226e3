import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { SubNav, examSubNav } from "@/components/DoctorSubNav";
import { ActionSheet } from "@/components/ActionSheet";
import { useState } from "react";

export const Route = createFileRoute("/doctor/qc")({
  component: QCPage,
});

const tabs = ["缺失", "异常值", "重复", "待复测", "逻辑冲突"] as const;

const data: Record<(typeof tabs)[number], { name: string; class: string; issue: string; detail: string }[]> = {
  缺失: [
    { name: "赵一鸣", class: "3年3班", issue: "缺 视力", detail: "左眼未录入" },
    { name: "孙欣然", class: "3年3班", issue: "缺 腰围", detail: "重点儿童必填" },
  ],
  异常值: [
    { name: "刘小强", class: "5年1班", issue: "BMI 26.4", detail: "超参考区间" },
    { name: "李小雨", class: "3年3班", issue: "身高 128 → 125", detail: "低于半年前 3cm" },
  ],
  重复: [{ name: "王晨曦", class: "3年3班", issue: "同一学生录入 2 次", detail: "机构提交冲突" }],
  待复测: [
    { name: "陈静雅", class: "3年3班", issue: "血压 138/92", detail: "首测偏高，待 15 分钟复测" },
  ],
  逻辑冲突: [
    { name: "张小乐", class: "1年1班", issue: "体重 ↑ 身高 ↓", detail: "与上次数据方向矛盾" },
  ],
};

function QCPage() {
  const [t, setT] = useState<(typeof tabs)[number]>("缺失");
  const list = data[t];

  return (
    <div>
      <StatusBar title="数据质控" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">数据质控</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          阳光小学 · 三年级 · 待处理 {Object.values(data).reduce((a, b) => a + b.length, 0)} 项
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
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">{r.name} · {r.class}</p>
                  <p className="mt-1 text-xs text-warm">⚠ {r.issue}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{r.detail}</p>
                </div>
              </div>
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
                      确认通过
                    </button>
                  }
                  title="确认质控通过？"
                  description="该条数据将进入报告生成阶段。"
                  confirmText="通过"
                  toastMessage="质控已通过 ✓"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <h2 className="mb-2 text-sm font-semibold">数据质量报告</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { k: "完整率", v: "97.2%" },
              { k: "复测率", v: "4.2%" },
              { k: "异常率", v: "6.5%" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-surface-2 py-2">
                <p className="text-base font-extrabold text-deep">{s.v}</p>
                <p className="text-[10px] text-muted-foreground">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
