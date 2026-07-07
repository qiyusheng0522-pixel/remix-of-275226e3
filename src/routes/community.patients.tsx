import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/community/patients")({
  component: PatientsPage,
});

type Src = "全部" | "服务包" | "复诊转入";

type Patient = {
  name: string;
  age: string;
  src: Exclude<Src, "全部">;
  plan: string;
  from: string;
  next: string;
  adherence: number;
  tags: string[];
};

const patients: Patient[] = [
  {
    name: "刘小强",
    age: "10 岁 · 男",
    src: "服务包",
    plan: "儿童体重管理季度包（第 3 周）",
    from: "家长于 04-01 商城购买",
    next: "04-15 上门随访 · 测体重腰围",
    adherence: 82,
    tags: ["BMI 24.6", "运动打卡 ↑"],
  },
  {
    name: "陈小美",
    age: "9 岁 · 女",
    src: "复诊转入",
    plan: "哮喘长期维持 · 家庭雾化指导",
    from: "市儿童医院 呼吸科 李主任 04-10 转入",
    next: "04-24 家庭访视",
    adherence: 65,
    tags: ["峰流速稳定", "夜咳↓"],
  },
  {
    name: "王小美",
    age: "8 岁 · 女",
    src: "服务包",
    plan: "近视防控半年包（第 2 月）",
    from: "家长于 03-05 商城购买",
    next: "04-18 屈光复查",
    adherence: 90,
    tags: ["裸眼 4.8", "户外 ≥2h/日"],
  },
  {
    name: "张小乐",
    age: "6 岁 · 男",
    src: "复诊转入",
    plan: "过敏性鼻炎季节维持",
    from: "区妇幼保健院 04-08 转入",
    next: "04-20 电话随访",
    adherence: 48,
    tags: ["用药依从↓", "需家长强化"],
  },
];

function PatientsPage() {
  const [src, setSrc] = useState<Src>("全部");
  const list = patients.filter((p) => src === "全部" || p.src === src);
  return (
    <div>
      <StatusBar title="居民健康档案" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">在管儿童患者</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          服务包 · 复诊转入 · 全部支持家庭随访与耗材配送
        </p>

        <div className="mb-3 flex gap-2">
          {(["全部", "服务包", "复诊转入"] as Src[]).map((k) => (
            <button
              key={k}
              onClick={() => setSrc(k)}
              className={`rounded-full px-3 py-1 text-[12px] ring-1 ${
                src === k
                  ? "bg-warm text-warm-foreground ring-transparent"
                  : "bg-surface ring-border"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {list.map((p) => (
            <li
              key={p.name}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {p.name}
                    <span className="ml-2 text-[11px] text-muted-foreground">
                      {p.age}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{p.from}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    p.src === "服务包"
                      ? "bg-warm/15 text-warm"
                      : "bg-teal/15 text-teal"
                  }`}
                >
                  {p.src}
                </span>
              </div>

              <p className="mt-2 rounded-xl bg-surface-2 p-2 text-[12px]">
                📋 {p.plan}
              </p>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">下次任务：{p.next}</span>
                <span
                  className={
                    p.adherence >= 80
                      ? "text-teal"
                      : p.adherence >= 60
                      ? "text-warm"
                      : "text-rose"
                  }
                >
                  执行率 {p.adherence}%
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-xl bg-surface-2 py-2 text-xs">
                  查看档案
                </button>
                <button className="flex-1 rounded-xl bg-teal/15 py-2 text-xs text-teal">
                  记录随访
                </button>
                <button className="flex-1 rounded-xl bg-warm py-2 text-xs font-medium text-warm-foreground">
                  联系家长
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
