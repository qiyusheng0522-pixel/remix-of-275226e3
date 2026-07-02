import { createFileRoute } from "@tanstack/react-router";
import { child, abnormalItems, reviewPlan } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/report")({
  component: ReportPage,
});

const trend = [125, 126, 126.5, 127, 127.5, 128];
const weightTrend = [25.8, 26.2, 26.5, 26.9, 27.2, 27.5];

function ReportPage() {
  return (
    <div>
      <StatusBar title="体检报告" />
      <div className="px-5 pb-8 pt-2">
        <header className="mb-4">
          <h1 className="text-xl font-bold">{child.name} 的体检报告</h1>
          <p className="text-xs text-muted-foreground">
            体检日期 {child.lastExam} · 报告已发布
          </p>
        </header>

        {/* Summary */}
        <div className="mb-4 overflow-hidden rounded-3xl bg-gradient-to-br from-warning/25 to-warm/15 p-5 ring-1 ring-warning/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-warning-foreground/80">整体风险等级</p>
              <p className="mt-1 text-2xl font-extrabold text-warning-foreground">
                {child.riskLevel} · 需关注
              </p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-warning/40 text-2xl">
              🟡
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground/80">
            医生解读：小雨整体健康状况良好，BMI 略偏轻，建议加强饮食营养密度并观察运动后呼吸情况。
          </p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-xl bg-surface/60 py-2 text-xs font-medium backdrop-blur">
              查看医生完整解读
            </button>
            <button className="rounded-xl bg-warm px-4 py-2 text-xs font-medium text-warm-foreground">
              已阅
            </button>
          </div>
        </div>

        {/* Abnormal items */}
        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">异常/需关注项目</h2>
            <span className="text-[11px] text-muted-foreground">共 {abnormalItems.length} 项</span>
          </div>
          <ul className="divide-y divide-border/60">
            {abnormalItems.map((it) => (
              <li key={it.name} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm">{it.name}</p>
                  <p className="text-[11px] text-muted-foreground">值：{it.value}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] ${
                    it.level === "success"
                      ? "bg-success/15 text-success"
                      : it.level === "warning"
                      ? "bg-warning/25 text-warning-foreground"
                      : "bg-danger/15 text-danger"
                  }`}
                >
                  {it.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Trend */}
        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <h2 className="mb-3 text-sm font-semibold">身高体重趋势（近 6 次）</h2>
          <div className="grid grid-cols-2 gap-3">
            <MiniChart label="身高 cm" data={trend} color="teal" />
            <MiniChart label="体重 kg" data={weightTrend} color="warm" />
          </div>
        </section>

        {/* Review plan */}
        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <h2 className="mb-3 text-sm font-semibold">复评计划</h2>
          <ol className="relative space-y-4 border-l-2 border-dashed border-teal/40 pl-4">
            {reviewPlan.map((r, i) => (
              <li key={r.type} className="relative">
                <span
                  className={`absolute -left-[22px] top-1 grid h-4 w-4 place-items-center rounded-full text-[10px] ring-2 ring-surface ${
                    i === 0 ? "bg-warm text-warm-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <p className="text-sm font-medium">{r.type}</p>
                <p className="text-[11px] text-muted-foreground">
                  {r.when} · {r.date}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="rounded-2xl bg-teal/10 p-4 text-xs leading-relaxed text-deep ring-1 ring-teal/20">
          💡 建议 4 周内在家完成体重记录与饮食追踪。如出现运动后持续咳嗽 &gt; 3 天，请联系健康管理师。
        </div>
      </div>
    </div>
  );
}

function MiniChart({ label, data, color }: { label: string; data: number[]; color: "warm" | "teal" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stroke = color === "warm" ? "var(--warm)" : "var(--teal)";
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 80 - 10}`)
    .join(" ");
  return (
    <div className={`rounded-xl p-3 ${color === "warm" ? "bg-warm/10" : "bg-teal/10"}`}>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{data[data.length - 1]}</p>
      <svg viewBox="0 0 100 100" className="mt-1 h-14 w-full">
        <polyline points={points} fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
