import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { EIcon } from "@/components/EIcon";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/parent/punch")({
  component: PunchPage,
});

/** 与首页 todayTasks 保持一致的任务定义 */
const TASKS = [
  { id: "rope", icon: "🤸", name: "亲子跳绳 · 20 分钟", slot: "19:00" },
  { id: "dinner", icon: "🥦", name: "晚餐 · 500-600 kcal", slot: "18:00" },
  { id: "vitd", icon: "☀️", name: "维生素 D 补充", slot: "08:00" },
  { id: "vent", icon: "🪟", name: "开窗通风换气", slot: "10:00" },
  { id: "screen", icon: "📵", name: "屏幕时间 ≤ 1 小时", slot: "21:00" },
];

const TODAY = new Date("2026-04-08");
const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

/** 最近 7 天（含今天），最新的排在最右 */
function recentDays() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() - (6 - i));
    return {
      key: d.toISOString().slice(0, 10),
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      week: WEEKDAY[d.getDay()],
      isToday: i === 6,
    };
  });
}

/** 演示用的历史漏打卡记录：dateKey -> 已完成的任务 id */
const history: Record<string, string[]> = {
  "2026-04-08": ["dinner", "vent"],
  "2026-04-07": ["rope", "dinner", "vitd", "vent", "screen"],
  "2026-04-06": ["dinner", "vitd"],
  "2026-04-05": ["rope", "vent", "screen"],
  "2026-04-04": ["dinner", "vitd", "vent", "screen"],
  "2026-04-03": [],
  "2026-04-02": ["rope", "dinner", "vitd", "vent"],
};

function PunchPage() {
  const days = useMemo(recentDays, []);
  const [date, setDate] = useState(days[6].key);
  // 本次补记的勾选：dateKey -> Set(taskId)
  const [added, setAdded] = useState<Record<string, string[]>>({});
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const baseDone = history[date] ?? [];
  const extra = added[date] ?? [];
  const isDone = (id: string) => baseDone.includes(id) || extra.includes(id);

  const toggle = (id: string) => {
    if (baseDone.includes(id)) return; // 已打卡的不允许取消
    setSaved(false);
    setAdded((a) => {
      const cur = a[date] ?? [];
      return { ...a, [date]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
    });
  };

  const doneCount = TASKS.filter((t) => isDone(t.id)).length;
  const pct = Math.round((doneCount / TASKS.length) * 100);
  const selectedDay = days.find((d) => d.key === date);

  return (
    <div className="relative flex h-full flex-1 flex-col bg-background">
      <StatusBar title="补充打卡" />

      {/* 返回 + 标题 */}
      <div className="flex items-center gap-2 px-5 pb-2 pt-1">
        <Link
          to="/parent"
          aria-label="返回首页"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface shadow-sm ring-1 ring-border"
        >
          <EIcon e="‹" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold">补充打卡</p>
          <p className="truncate text-[11px] text-muted-foreground">
            可补记最近 7 天 · 已打卡的记录不可撤销
          </p>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-4">
        {/* 日期选择 */}
        <div className="mt-1 flex gap-1.5">
          {days.map((d) => {
            const active = d.key === date;
            const dayDone = (history[d.key] ?? []).length + (added[d.key] ?? []).length;
            const full = dayDone >= TASKS.length;
            return (
              <button
                key={d.key}
                onClick={() => {
                  setDate(d.key);
                  setSaved(false);
                }}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 ring-1 transition ${
                  active
                    ? "bg-rose text-rose-foreground ring-rose"
                    : "bg-surface text-foreground ring-border/60"
                }`}
              >
                <span className="text-[10px] opacity-70">{d.week}</span>
                <span className="text-[11px] font-semibold">{d.label}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    full ? "bg-success" : dayDone > 0 ? "bg-warning" : "bg-border"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* 当日完成度 */}
        <section className="mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">
              {selectedDay?.isToday ? "今天" : `${selectedDay?.label} 周${selectedDay?.week}`}
              {" · "}
              {doneCount}/{TASKS.length} 项
            </p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                pct === 100
                  ? "bg-success/15 text-success"
                  : "bg-warning/20 text-warning-foreground"
              }`}
            >
              {pct}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className={`h-full rounded-full transition-all ${pct === 100 ? "bg-success" : "bg-warm"}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <ul className="mt-3 space-y-2">
            {TASKS.map((t) => {
              const done = isDone(t.id);
              const locked = baseDone.includes(t.id);
              return (
                <li
                  key={t.id}
                  className={`flex items-center gap-3 rounded-2xl p-3 ring-1 ${
                    done ? "bg-success/8 ring-success/25" : "bg-surface-2 ring-border/50"
                  }`}
                >
                  <span className="text-lg">
                    <EIcon e={t.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-[13px] ${done ? "text-muted-foreground" : "font-medium"}`}>
                      {t.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      建议时段 {t.slot}
                      {locked ? " · 当日已打卡" : done ? " · 本次补记" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => toggle(t.id)}
                    disabled={locked}
                    aria-label={done ? `${t.name} 已完成` : `补记 ${t.name}`}
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] ring-1 transition ${
                      done
                        ? "bg-success text-success-foreground ring-success"
                        : "bg-white text-transparent ring-border hover:ring-rose"
                    } ${locked ? "opacity-60" : ""}`}
                  >
                    <EIcon e="✓" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 备注 */}
        <section className="mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <p className="text-sm font-bold">补记说明（选填）</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            例如「当天外出旅行，跳绳改为爬山 1 小时」
          </p>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setSaved(false);
            }}
            rows={3}
            maxLength={200}
            placeholder="填写实际完成情况，健管师可见…"
            className="mt-2 w-full resize-none rounded-xl bg-surface-2 p-3 text-[13px] outline-none ring-1 ring-border/50 placeholder:text-muted-foreground focus:ring-rose"
          />
          <p className="mt-1 text-right text-[10px] text-muted-foreground">{note.length}/200</p>
        </section>

        <p className="mt-3 flex gap-1.5 rounded-2xl bg-warning/12 px-3 py-2.5 text-[11px] leading-relaxed text-warning-foreground">
          <span className="shrink-0">
            <EIcon e="ℹ️" />
          </span>
          <span className="min-w-0 flex-1 text-pretty">
            补记数据会标记为「家长补录」，与当日实时打卡区分统计，不影响健康方案的完成率评估。
          </span>
        </p>
      </div>

      {/* 底部保存 */}
      <div className="border-t border-border/60 bg-surface/95 px-5 py-3 backdrop-blur">
        <button
          onClick={() => setSaved(true)}
          disabled={extra.length === 0 && !note.trim()}
          className="w-full rounded-full bg-rose py-3 text-[13px] font-semibold text-rose-foreground shadow-sm transition disabled:bg-surface-2 disabled:text-muted-foreground disabled:shadow-none"
        >
          {saved
            ? "已保存 ✓"
            : extra.length > 0
              ? `保存补记（${extra.length} 项）`
              : "请选择要补记的任务"}
        </button>
      </div>
    </div>
  );
}
