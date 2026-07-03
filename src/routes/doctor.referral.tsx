import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";

export const Route = createFileRoute("/doctor/referral")({
  component: ReferralPage,
});

const cases = [
  {
    name: "刘小强",
    class: "5年1班",
    dept: "肥胖 / 代谢门诊",
    reason: "BMI 26.4 + 腰围偏大",
    status: "健管师协助预约中",
    tint: "warm",
  },
  {
    name: "张小乐",
    class: "1年1班",
    dept: "变态反应科",
    reason: "疑似花粉过敏 + 夜间咳嗽",
    status: "已预约 · 04-08",
    tint: "teal",
  },
  {
    name: "陈静雅",
    class: "3年3班",
    dept: "心血管科（绿色通道）",
    reason: "多次血压偏高",
    status: "待家长确认",
    tint: "danger",
  },
];

function ReferralPage() {
  return (
    <div>
      <StatusBar title="转诊 / 绿色通道" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">转诊与绿色通道</h1>
        <p className="mb-4 text-xs text-muted-foreground">健康管理师协助预约 · 医嘱回流可追踪</p>

        <ul className="space-y-3">
          {cases.map((c) => (
            <li key={c.name} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">{c.name} · {c.class}</p>
                  <p className="mt-1 text-xs">科室：{c.dept}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">原因：{c.reason}</p>
                </div>
                <span className={`rounded-full bg-${c.tint}/15 px-2 py-0.5 text-[10px] text-${c.tint}`}>
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
