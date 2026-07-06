import { createFileRoute, Link } from "@tanstack/react-router";
import { child } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/health-plan")({
  component: HealthPlanPage,
});

const plans = [
  {
    icon: "🏠",
    title: "健康护理",
    tint: "rose",
    summary: "尘螨过敏 · 家庭防护为主",
    items: [
      "床品每周 60℃ 以上高温清洗，晾晒 2 小时以上",
      "使用防螨床罩、枕套，每 3 个月更换一次",
      "每周使用除螨仪 2 次，重点清理床垫、沙发、地毯",
      "室内湿度控制在 40–50%，减少尘螨繁殖",
      "季节交替期备好家庭雾化设备与应急药品",
    ],
  },
  {
    icon: "🏃",
    title: "运动方案",
    tint: "teal",
    summary: "每周 ≥ 150 分钟中等强度 · 逐步减重",
    items: [
      "周一 / 三 / 五：亲子跳绳 20 分钟（分 2 组，每组 500 下）",
      "周二 / 四：户外骑行或快走 30 分钟",
      "周六：游泳 45 分钟（对哮喘倾向友好）",
      "运动前 5 分钟热身，随身携带温水与应急吸入器",
      "运动强度：心率 130–150 bpm，能说话但不能唱歌",
    ],
  },
  {
    icon: "🥗",
    title: "饮食方案",
    tint: "warm",
    summary: "控糖限脂 · 每日 1400–1600 kcal",
    items: [
      "早餐：全麦面包 + 鸡蛋 + 牛奶 250ml（约 400 kcal）",
      "午餐：杂粮饭 100g + 瘦肉 / 鱼 80g + 蔬菜 200g（约 550 kcal）",
      "晚餐：粗粮 80g + 豆制品 + 深色蔬菜（约 500 kcal）",
      "加餐：低糖水果 1 份（苹果 / 蓝莓），避免含糖饮料与油炸零食",
      "每日饮水 ≥ 1200 ml，少量多次",
      "推荐可直接订购『肥胖 / 代谢管理餐』，营养师已按上述方案配比",
    ],
    cta: { label: "去商城订餐", to: "/parent/shop" as const },
  },
];

function HealthPlanPage() {
  return (
    <div>
      <StatusBar title="健康管理方案" />
      <div className="px-5 pb-28 pt-2">
        <header className="mb-4">
          <h1 className="text-xl font-bold">{child.name} 的 12 周健康方案</h1>
          <p className="text-xs text-muted-foreground">
            基于本次体检报告 · 医生 + AI 营养师联合生成
          </p>
        </header>

        <div className="mb-4 rounded-3xl bg-gradient-to-br from-teal/15 to-warm/10 p-4 ring-1 ring-teal/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">方案编号</p>
              <p className="text-sm font-semibold">HP-2026-0918-{child.name.slice(-1)}01</p>
            </div>
            <span className="rounded-full bg-teal px-2.5 py-1 text-[11px] font-semibold text-teal-foreground">
              进行中 · 第 1 周
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-surface/80 p-2">
              <p className="text-[10px] text-muted-foreground">周期</p>
              <p className="text-sm font-bold">12 周</p>
            </div>
            <div className="rounded-xl bg-surface/80 p-2">
              <p className="text-[10px] text-muted-foreground">目标</p>
              <p className="text-sm font-bold">BMI ↓ 0.8</p>
            </div>
            <div className="rounded-xl bg-surface/80 p-2">
              <p className="text-[10px] text-muted-foreground">复评</p>
              <p className="text-sm font-bold">12 周后</p>
            </div>
          </div>
        </div>

        <p className="mb-2 px-1 text-[11px] text-muted-foreground">分项方案 · 点击展开</p>
        <div className="space-y-2">
          {plans.map((p) => (
            <details
              key={p.title}
              className={`group overflow-hidden rounded-2xl bg-${p.tint}/5 ring-1 ring-${p.tint}/20`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-3">
                <div className="flex items-center gap-2">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl bg-${p.tint}/15 text-base`}>
                    {p.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="text-[11px] text-muted-foreground">{p.summary}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground transition group-open:rotate-180">▾</span>
              </summary>
              <ul className="space-y-1.5 border-t border-border/40 bg-surface/70 px-4 py-3 text-[12px] leading-relaxed">
                {p.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-${p.tint}`} />
                    <span className="text-foreground/85">{it}</span>
                  </li>
                ))}
                {p.cta && (
                  <li className="pt-2">
                    <Link
                      to={p.cta.to}
                      className={`inline-flex items-center gap-1 rounded-full bg-${p.tint} px-3 py-1.5 text-[11px] font-medium text-${p.tint}-foreground`}
                    >
                      {p.cta.label} ›
                    </Link>
                  </li>
                )}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-xl bg-surface-2 py-2.5 text-xs">导出 PDF</button>
          <Link
            to="/parent/comm"
            className="flex-1 rounded-xl bg-teal py-2.5 text-center text-xs font-medium text-teal-foreground"
          >
            咨询健管师
          </Link>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-30 mx-auto max-w-md border-t border-border/60 bg-surface/95 px-4 py-3 backdrop-blur">
        <Link
          to="/parent/report"
          className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-warm to-teal py-2.5 text-xs font-semibold text-white"
        >
          返回体检报告
        </Link>
      </div>
    </div>
  );
}
