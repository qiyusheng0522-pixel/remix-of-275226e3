import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";

export const Route = createFileRoute("/doctor/referral")({
  component: ReferralPage,
});

type Channel = "健管师升级" | "绿色通道" | "普通转诊";

type Case = {
  name: string;
  class: string;
  dept: string;
  reason: string;
  status: string;
  tint: "warm" | "teal" | "danger" | "deep";
  channel: Channel;
  source: string;
};

const cases: Case[] = [
  {
    name: "王小豆",
    class: "2年3班",
    dept: "内分泌科",
    reason: "肥胖 + 家族糖尿病史",
    status: "健管师复核中",
    tint: "danger",
    channel: "健管师升级",
    source: "刘健管师 · 04-02 升级",
  },
  {
    name: "赵一诺",
    class: "4年2班",
    dept: "呼吸科",
    reason: "运动后反复喘息",
    status: "待医生复核",
    tint: "warm",
    channel: "健管师升级",
    source: "王健管师 · 04-02 升级",
  },
  {
    name: "孙小雨",
    class: "3年1班",
    dept: "眼科",
    reason: "视力持续下降 · 3 月内",
    status: "待医生复核",
    tint: "warm",
    channel: "健管师升级",
    source: "王健管师 · 04-01 升级",
  },
  {
    name: "陈静雅",
    class: "3年3班",
    dept: "心血管科（绿色通道）",
    reason: "多次血压偏高",
    status: "待家长确认",
    tint: "danger",
    channel: "绿色通道",
    source: "医生 · 04-02 发起",
  },
  {
    name: "刘小强",
    class: "5年1班",
    dept: "肥胖 / 代谢门诊",
    reason: "BMI 26.4 + 腰围偏大",
    status: "健管师协助预约中",
    tint: "warm",
    channel: "普通转诊",
    source: "医生 · 04-01 发起",
  },
  {
    name: "张小乐",
    class: "1年1班",
    dept: "变态反应科",
    reason: "疑似花粉过敏 + 夜间咳嗽",
    status: "已预约 · 04-08",
    tint: "teal",
    channel: "普通转诊",
    source: "医生 · 03-30 发起",
  },
];

const channelStyle: Record<Channel, string> = {
  健管师升级: "bg-danger/15 text-danger",
  绿色通道: "bg-deep/15 text-deep",
  普通转诊: "bg-teal/15 text-teal",
};

const filters = ["全部", "健管师升级", "绿色通道", "普通转诊"] as const;

function ReferralPage() {
  const [f, setF] = useState<(typeof filters)[number]>("全部");
  const visible = cases.filter((c) => f === "全部" || c.channel === f);
  const counts: Record<string, number> = { 全部: cases.length };
  for (const c of cases) counts[c.channel] = (counts[c.channel] ?? 0) + 1;

  return (
    <div>
      <StatusBar title="转诊处理" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">转诊处理</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          健管师升级、绿色通道、普通转诊统一归口 · 健管师为发起渠道之一
        </p>

        <div className="mb-3 flex gap-2 overflow-x-auto">
          {filters.map((ff) => {
            const active = f === ff;
            return (
              <button
                key={ff}
                onClick={() => setF(ff)}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] ring-1 transition ${
                  active
                    ? "bg-deep text-deep-foreground ring-transparent"
                    : "bg-surface text-foreground ring-border"
                }`}
              >
                {ff} <span className="opacity-70">· {counts[ff] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <ul className="space-y-3">
          {visible.map((c) => (
            <li key={c.name} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
              <div className="mb-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${channelStyle[c.channel]}`}>
                  {c.channel}
                </span>
                <span className="truncate text-[11px] text-muted-foreground">{c.source}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{c.name} · {c.class}</p>
                  <p className="mt-1 text-xs">科室：{c.dept}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">原因：{c.reason}</p>
                </div>
                <span className={`shrink-0 rounded-full bg-${c.tint}/15 px-2 py-0.5 text-[10px] text-${c.tint}`}>
                  {c.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-xl bg-surface-2 py-2 text-xs">查看医嘱回流</button>
                <button className="flex-1 rounded-xl bg-teal/15 py-2 text-xs text-teal">就诊状态</button>
                <button className="flex-1 rounded-xl bg-deep py-2 text-xs font-medium text-deep-foreground">
                  后续随访
                </button>
              </div>
            </li>
          ))}
        </ul>

        <ActionSheet
          trigger={
            <button className="mt-4 w-full rounded-2xl border-2 border-dashed border-deep/40 py-3 text-sm text-deep">
              + 新建转诊
            </button>
          }
          title="新建转诊"
          description="健康管理师将协助家长完成挂号，医嘱回流后自动同步随访计划。"
          confirmText="创建转诊"
          toastMessage="转诊已创建 · 健管师协助中"
        >
          <div className="space-y-2 text-xs">
            <label className="block">
              <span className="text-muted-foreground">学生</span>
              <input placeholder="输入学生姓名或学号" className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none" />
            </label>
            <label className="block">
              <span className="text-muted-foreground">发起渠道</span>
              <select className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none">
                <option>健管师升级</option>
                <option>绿色通道</option>
                <option>普通转诊</option>
              </select>
            </label>
            <label className="block">
              <span className="text-muted-foreground">转诊科室</span>
              <select className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none">
                <option>肥胖 / 代谢门诊</option>
                <option>变态反应科</option>
                <option>呼吸科</option>
                <option>心血管科（绿色通道）</option>
              </select>
            </label>
            <label className="block">
              <span className="text-muted-foreground">转诊原因</span>
              <textarea rows={3} className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none" />
            </label>
          </div>
        </ActionSheet>
      </div>
    </div>
  );
}
