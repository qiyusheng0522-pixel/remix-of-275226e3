import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { StatusBar } from "@/components/MobileFrame";
import { EIcon } from "@/components/EIcon";
import { VerdictCard } from "@/components/VerdictCard";
import { evaluateExercise, saveCheckin, TARGET_MINUTES } from "@/lib/checkin";

export const Route = createFileRoute("/parent/checkin/exercise")({
  component: ExerciseCheckin,
});

const ITEMS = [
  { name: "亲子跳绳", icon: "🤸" },
  { name: "快走", icon: "🚶" },
  { name: "骑行", icon: "🚲" },
  { name: "球类", icon: "⚽" },
];

const MINUTE_PRESETS = [10, 15, 20, 30, 45];

/** 主观强度：1–3。附心率区间帮助家长判断 */
const INTENSITIES = [
  { v: 1, label: "轻松", hint: "能正常说话 · 心率 <110" },
  { v: 2, label: "适中", hint: "微喘但能交流 · 心率 110–150" },
  { v: 3, label: "吃力", hint: "说话困难 · 心率 >150" },
];

/** 疲惫度 1–5 */
const FATIGUES = [
  { v: 1, label: "不累" },
  { v: 2, label: "略累" },
  { v: 3, label: "一般" },
  { v: 4, label: "很累" },
  { v: 5, label: "累瘫" },
];

function ExerciseCheckin() {
  const navigate = useNavigate();
  const [item, setItem] = useState(ITEMS[0].name);
  const [minutes, setMinutes] = useState(TARGET_MINUTES);
  const [intensity, setIntensity] = useState(0);
  const [fatigue, setFatigue] = useState(0);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  // 强度与疲惫度都是主观项，必须家长确认后才能提交，否则评估会失真
  const ready = intensity > 0 && fatigue > 0;
  const verdict = ready ? evaluateExercise({ minutes, intensity, fatigue }) : null;

  const submit = () => {
    if (!ready) return;
    saveCheckin({
      kind: "exercise",
      item,
      minutes,
      intensity,
      fatigue,
      note,
      at: new Date().toISOString(),
    });
    setSaved(true);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface-2">
      <StatusBar title="运动打卡" />

      <header className="flex shrink-0 items-center gap-2 bg-surface px-4 py-2.5 shadow-sm">
        <Link to="/parent" aria-label="返回" className="grid h-8 w-8 place-items-center rounded-full bg-surface-2">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">今天运动得怎么样</p>
          <p className="truncate text-[10px] text-muted-foreground">
            今日推荐 {TARGET_MINUTES} 分钟 · 数据用于校准方案
          </p>
        </div>
      </header>

      {saved && verdict ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          <div className="rounded-2xl bg-surface p-5 text-center shadow-sm ring-1 ring-border/60">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-xl text-success">
              <EIcon e="✓" />
            </span>
            <p className="mt-2 text-sm font-bold">运动打卡完成</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {item} · {minutes} 分钟 · {INTENSITIES[intensity - 1].label} · 疲惫 {fatigue}/5
            </p>
          </div>
          <VerdictCard v={verdict} />
          <p className="text-center text-[10px] text-muted-foreground text-pretty">
            连续 7 天的数据会用于自动调整下周运动清单
          </p>
          <button
            onClick={() => navigate({ to: "/parent" })}
            className="mt-auto shrink-0 rounded-full bg-rose py-3 text-sm font-semibold text-rose-foreground"
          >
            返回首页
          </button>
        </div>
      ) : (
        <>
          <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {/* 项目 */}
            <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
              <p className="mb-2 text-[12px] font-semibold">运动项目</p>
              <div className="flex gap-2">
                {ITEMS.map((it) => (
                  <button
                    key={it.name}
                    onClick={() => setItem(it.name)}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 text-[11px] font-medium ring-1 transition ${
                      item === it.name
                        ? "bg-rose/10 text-rose ring-rose/40"
                        : "bg-surface-2 text-muted-foreground ring-transparent"
                    }`}
                  >
                    <span className="text-[15px]">
                      <EIcon e={it.icon} />
                    </span>
                    <span className="truncate">{it.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 时长 */}
            <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
              <div className="mb-2 flex items-baseline justify-between">
                <p className="text-[12px] font-semibold">实际时长</p>
                <p className="text-[12px]">
                  <b className="text-lg tabular-nums">{minutes}</b>
                  <span className="text-muted-foreground"> / {TARGET_MINUTES} 分钟</span>
                </p>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                aria-label="实际运动时长（分钟）"
                className="w-full accent-rose"
              />
              <div className="mt-2 flex gap-1.5">
                {MINUTE_PRESETS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={`flex-1 rounded-lg py-1.5 text-[11px] transition ${
                      minutes === m ? "bg-rose text-rose-foreground" : "bg-surface-2 text-muted-foreground"
                    }`}
                  >
                    {m}′
                  </button>
                ))}
              </div>
            </section>

            {/* 强度 */}
            <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
              <p className="mb-2 text-[12px] font-semibold">
                运动强度 <span className="font-normal text-muted-foreground">（必填）</span>
              </p>
              <div className="space-y-1.5">
                {INTENSITIES.map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setIntensity(o.v)}
                    className={`flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left ring-1 transition ${
                      intensity === o.v
                        ? "bg-rose/10 ring-rose/40"
                        : "bg-surface-2 ring-transparent"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ring-1 ${
                        intensity === o.v ? "bg-rose ring-rose" : "ring-border"
                      }`}
                    >
                      {intensity === o.v && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-medium">{o.label}</span>
                      <span className="block truncate text-[10px] text-muted-foreground">{o.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* 疲惫度 */}
            <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
              <p className="mb-2 text-[12px] font-semibold">
                运动后疲惫度 <span className="font-normal text-muted-foreground">（必填）</span>
              </p>
              <div className="flex gap-1.5">
                {FATIGUES.map((f) => (
                  <button
                    key={f.v}
                    onClick={() => setFatigue(f.v)}
                    className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 ring-1 transition ${
                      fatigue === f.v
                        ? "bg-rose/10 ring-rose/40"
                        : "bg-surface-2 ring-transparent"
                    }`}
                  >
                    <span className={`text-[13px] font-bold ${fatigue === f.v ? "text-rose" : "text-muted-foreground"}`}>
                      {f.v}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{f.label}</span>
                  </button>
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="补充情况，如「中途休息了两次」「有点咳嗽」"
                className="mt-2.5 w-full resize-none rounded-xl bg-surface-2 p-2.5 text-[12px] outline-none ring-1 ring-transparent placeholder:text-muted-foreground focus:ring-rose/40"
              />
            </section>

            {/* 填完即时给出匹配度预判，提交前家长就能看到结论 */}
            {verdict && <VerdictCard v={verdict} />}
          </div>

          <div className="shrink-0 px-4 pb-4">
            <button
              onClick={submit}
              disabled={!ready}
              className="w-full rounded-full bg-rose py-3 text-sm font-semibold text-rose-foreground transition disabled:bg-muted disabled:text-muted-foreground"
            >
              {ready ? "提交打卡" : "请选择强度与疲惫度"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
