import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useState } from "react";

export const Route = createFileRoute("/doctor/plan")({
  component: PlanPage,
});

const sections = [
  {
    title: "体重管理",
    color: "warm",
    items: [
      "饮食结构：主食粗细搭配、蔬菜 ≥ 300g/日",
      "含糖饮料 ≤ 1 次/周",
      "每日早餐规律、避免夜宵",
      "中高强度运动 60 分钟/日",
      "睡眠 ≥ 9 小时，22:00 前上床",
      "每周记录体重",
      "1 个月复评 BMI",
    ],
    extra: ["建议 3 个月肥胖专科复核", "暂不建议代谢检查"],
  },
  {
    title: "呼吸 / 哮喘 / 过敏",
    color: "teal",
    items: [
      "记录咳嗽、喘息、夜间症状",
      "记录诱因：尘螨 / 花粉 / 冷空气",
      "每周床品换洗、除螨",
      "运动前后观察呼吸与胸闷",
    ],
    extra: ["建议呼吸/过敏专科复核", "体育课注意强度调整", "校医现场观察 2 周"],
  },
  {
    title: "既往用药 / 医嘱",
    color: "deep",
    items: [
      "家长已上传：布地奈德鼻喷 · 每日 1 次",
      "提醒继续遵医嘱使用，不自动开药",
      "如症状加重及时就医",
    ],
    extra: ["医生确认用药提醒 · 已开启"],
  },
];

function PlanPage() {
  const [tab, setTab] = useState<"草稿" | "已发布" | "历史">("草稿");

  return (
    <div>
      <StatusBar title="健康方案" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">儿童健康方案</h1>
        <p className="mb-3 text-xs text-muted-foreground">李小雨 · 三年级 3班 · v0.3 草稿</p>

        <div className="mb-4 inline-flex rounded-full bg-muted p-1 text-xs">
          {(["草稿", "已发布", "历史"] as const).map((t) => (
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

        <div className="mb-4 rounded-2xl bg-gradient-to-br from-deep/10 to-teal/10 p-4 ring-1 ring-deep/20">
          <p className="text-[11px] text-muted-foreground">系统草稿 · 健康管理师整理</p>
          <p className="mt-1 text-sm leading-relaxed">
            基于本次体检 BMI 16.8 偏轻 + 夜间咳嗽，建议以家庭呵护为主，1 个月复评，暂不转诊。
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((s) => (
            <details key={s.title} open className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
              <summary className="flex cursor-pointer items-center justify-between">
                <span className="text-sm font-semibold">{s.title}</span>
                <span className={`rounded-full bg-${s.color}/15 px-2 py-0.5 text-[10px] text-${s.color}`}>
                  已勾选 {s.items.length}
                </span>
              </summary>
              <ul className="mt-3 space-y-1.5">
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

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button className="rounded-xl bg-surface-2 py-3 text-xs">保存草稿</button>
          <button className="rounded-xl bg-warm/15 py-3 text-xs text-warm">同步学校</button>
          <button className="rounded-xl bg-deep py-3 text-xs font-medium text-deep-foreground">
            发布给家长
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          发布后进入方案版本管理，可失效或更新
        </p>
      </div>
    </div>
  );
}
