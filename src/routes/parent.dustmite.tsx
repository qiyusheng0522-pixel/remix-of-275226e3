import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/dustmite")({
  component: DustMitePage,
});

const weekly = [
  { icon: "🛏️", title: "床单换洗", done: true, note: "本周一 已完成" },
  { icon: "🌙", title: "枕套换洗", done: true, note: "本周一 已完成" },
  { icon: "🧺", title: "被套换洗", done: false, note: "建议今晚更换" },
  { icon: "🧸", title: "毛绒玩具清理/晾晒", done: false, note: "床边只留 1—2 只" },
  { icon: "🪟", title: "卧室通风 30 分钟", done: true, note: "今日 早晨" },
  { icon: "💧", title: "湿度检查（&lt;60%）", done: false, note: "保持干爽" },
];

const longTerm = [
  { k: "防螨套", v: "按产品说明定期清洗", cycle: "1 个月" },
  { k: "枕芯评估", v: "泛黄/塌陷时更换", cycle: "1—2 年" },
  { k: "床垫评估", v: "潮湿/霉味/塌陷时评估", cycle: "长期" },
];

function DustMitePage() {
  const done = weekly.filter((w) => w.done).length;
  return (
    <div>
      <StatusBar title="卧室除螨" />
      <div className="px-5 pb-8 pt-2">
        <div className="mb-4 overflow-hidden rounded-3xl bg-gradient-to-br from-teal to-teal/70 p-5 text-white shadow-lg shadow-teal/20">
          <p className="text-xs opacity-90">尘螨是过敏与夜间咳嗽的常见诱因</p>
          <h1 className="mt-1 text-lg font-bold">给{" "}{"小雨"} 一个干净的睡眠环境 🛏️</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${(done / weekly.length) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] opacity-90">本周完成 {done}/{weekly.length}</p>
            </div>
            <button className="rounded-full bg-white/25 px-3 py-1.5 text-xs backdrop-blur">
              全部提醒
            </button>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">本周任务</h2>
        <ul className="mb-5 space-y-2">
          {weekly.map((w) => (
            <li
              key={w.title}
              className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-xl">
                {w.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${w.done ? "text-muted-foreground line-through" : ""}`}>
                  {w.title}
                </p>
                <p className="text-[11px] text-muted-foreground" dangerouslySetInnerHTML={{__html: w.note}} />
              </div>
              {w.done ? (
                <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] text-success">✓</span>
              ) : (
                <button className="rounded-full bg-teal px-3 py-1 text-[11px] font-medium text-teal-foreground">
                  打卡
                </button>
              )}
            </li>
          ))}
        </ul>

        <h2 className="mb-2 text-sm font-semibold">长期评估</h2>
        <ul className="mb-4 divide-y divide-border/60 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
          {longTerm.map((l) => (
            <li key={l.k} className="flex items-start gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{l.k}</p>
                <p className="text-[11px] text-muted-foreground">{l.v}</p>
              </div>
              <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
                周期 {l.cycle}
              </span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-teal/10 p-4 text-xs leading-relaxed text-deep ring-1 ring-teal/20">
          💡 卧室尽量减少地毯、厚窗帘和大量毛绒玩具；保持通风与干爽是最简单有效的除螨方式。
        </div>
      </div>
    </div>
  );
}
