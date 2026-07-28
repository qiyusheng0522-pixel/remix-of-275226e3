import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { X, ChevronUp, Check, RotateCcw, Minus, Plus } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { EIcon } from "@/components/EIcon";
import { findExamUser } from "@/lib/exam-users";
import {
  EXAM_ITEMS,
  evalItem,
  seedValue,
  rangeLabel,
  type ExamValue,
  type ExamItem,
  type ItemStatus,
} from "@/lib/exam-record";

export const Route = createFileRoute("/record/$id")({
  component: RecordPage,
});

function stepOf(item: ExamItem) {
  if (item.id.startsWith("vision")) return 0.1;
  if (item.id === "weight") return 0.1;
  return 1;
}

function fmt(n?: number) {
  if (n == null) return "--";
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function RecordPage() {
  return (
    <MobileFrame bg="bg-neutral-950">
      <Recorder />
    </MobileFrame>
  );
}

function Recorder() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const user = findExamUser(id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 自动项预采集读数直接落库，异常自动标记需重测
  const [values, setValues] = useState<Record<string, ExamValue>>(() => {
    const init: Record<string, ExamValue> = {};
    EXAM_ITEMS.forEach((it) => {
      if (it.source === "auto") {
        const seeded = seedValue(it);
        init[it.id] = { ...seeded, retest: evalItem(it, seeded) === "abnormal" };
      }
    });
    return init;
  });

  const totalSections = EXAM_ITEMS.length + 1; // + 复核提交

  const statuses = useMemo(
    () => EXAM_ITEMS.map((it) => evalItem(it, values[it.id])),
    [values],
  );
  const abnormalCount = statuses.filter((s) => s === "abnormal").length;
  const retestCount = EXAM_ITEMS.filter((it) => values[it.id]?.retest).length;
  const doneCount = statuses.filter((s) => s !== "empty").length;

  function updateValue(itemId: string, patch: Partial<ExamValue>) {
    setValues((s) => {
      const item = EXAM_ITEMS.find((i) => i.id === itemId)!;
      const merged = { ...(s[itemId] ?? {}), ...patch };
      merged.retest = evalItem(item, merged) === "abnormal";
      return { ...s, [itemId]: merged };
    });
  }
  function toggleRetest(itemId: string) {
    setValues((s) => ({ ...s, [itemId]: { ...(s[itemId] ?? {}), retest: !s[itemId]?.retest } }));
  }

  function scrollTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: index * el.clientHeight, behavior: "smooth" });
  }

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    if (idx !== active) setActive(idx);
  }

  function submit() {
    if (retestCount > 0) {
      toast.success("体检结果已提交", {
        description: `${retestCount} 项超范围已回传班主任，通知家长带${user?.name ?? "学生"}返场重测`,
      });
    } else {
      toast.success("体检结果已提交", { description: "各项指标正常，已同步至健康档案" });
    }
    navigate({ to: "/doctor/exam" });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-neutral-950 text-white">
      {/* 顶部：学生 + 进度 + 关闭 */}
      <header className="relative z-10 shrink-0 px-4 pb-2 pt-1">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/doctor/exam" })}
            aria-label="退出录入"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-center">
            <p className="text-[13px] font-semibold">{user?.name ?? "学生"}</p>
            <p className="text-[10px] text-white/50">
              {user?.grade ?? ""} · 学号 {id}
            </p>
          </div>
          <div className="flex h-8 items-center gap-1 rounded-full bg-white/10 px-2.5 text-[11px]">
            {abnormalCount > 0 ? (
              <span className="font-semibold text-danger">异常 {abnormalCount}</span>
            ) : (
              <span className="font-semibold text-success">正常</span>
            )}
          </div>
        </div>
        {/* 分段进度条 */}
        <div className="mt-2.5 flex gap-1">
          {EXAM_ITEMS.map((it, i) => {
            const st = statuses[i];
            const reached = i <= active;
            return (
              <div key={it.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                <div
                  className={`h-full rounded-full transition-all ${
                    !reached
                      ? "w-0"
                      : st === "abnormal"
                        ? "w-full bg-danger"
                        : st === "normal"
                          ? "w-full bg-success"
                          : "w-full bg-white/40"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </header>

      {/* 抖音式竖向滑动区 */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="no-scrollbar min-h-0 flex-1 snap-y snap-mandatory overflow-y-scroll overscroll-contain"
      >
        {EXAM_ITEMS.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            index={i}
            total={EXAM_ITEMS.length}
            status={statuses[i]}
            value={values[item.id]}
            onChange={(patch) => updateValue(item.id, patch)}
            onToggleRetest={() => toggleRetest(item.id)}
            onNext={() => scrollTo(i + 1)}
          />
        ))}

        {/* 复核提交页 */}
        <section className="flex h-full snap-start flex-col px-5 pb-4 pt-2">
          <h2 className="text-lg font-bold">复核并提交</h2>
          <p className="mt-0.5 text-[11px] text-white/50">
            {user?.name}（{id}）· 已录入 {doneCount}/{EXAM_ITEMS.length} 项
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-2xl font-extrabold text-danger">{abnormalCount}</p>
              <p className="text-[11px] text-white/60">超范围项</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-2xl font-extrabold text-warm">{retestCount}</p>
              <p className="text-[11px] text-white/60">标记需重测</p>
            </div>
          </div>

          <ul className="no-scrollbar mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto">
            {EXAM_ITEMS.map((it, i) => {
              const st = statuses[i];
              const v = values[it.id];
              return (
                <li key={it.id}>
                  <button
                    onClick={() => scrollTo(i)}
                    className="flex w-full items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2 text-left ring-1 ring-white/10 active:scale-[0.99]"
                  >
                    <span className="text-base">{<EIcon e={it.icon} className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}</span>
                    <span className="min-w-0 flex-1 truncate text-[12px]">{it.label}</span>
                    {v?.retest && (
                      <span className="rounded-full bg-warm/20 px-1.5 py-0.5 text-[9px] font-medium text-warm">需重测</span>
                    )}
                    <span className={`text-[12px] font-semibold tabular-nums ${st === "abnormal" ? "text-danger" : st === "normal" ? "text-success" : "text-white/40"}`}>
                      {readout(it, v)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={submit}
            className="mt-3 shrink-0 rounded-2xl bg-teal py-3.5 text-center text-sm font-bold text-teal-foreground active:scale-[0.98]"
          >
            提交并同步{retestCount > 0 ? " · 回传班主任重检" : ""}
          </button>
        </section>
      </div>
    </div>
  );
}

function readout(item: ExamItem, v?: ExamValue): string {
  const st = evalItem(item, v);
  if (st === "empty") return "待填";
  if (item.kind === "choice") return v?.choice ?? "待填";
  if (item.kind === "bp") return `${fmt(v?.value)}/${fmt(v?.valueDia)}`;
  return `${fmt(v?.value)}${item.unit ? " " + item.unit : ""}`;
}

function ItemCard({
  item,
  index,
  total,
  status,
  value,
  onChange,
  onToggleRetest,
  onNext,
}: {
  item: ExamItem;
  index: number;
  total: number;
  status: ItemStatus;
  value?: ExamValue;
  onChange: (patch: Partial<ExamValue>) => void;
  onToggleRetest: () => void;
  onNext: () => void;
}) {
  const abnormal = status === "abnormal";
  const step = stepOf(item);

  return (
    <section
      className={`relative flex h-full snap-start flex-col items-center justify-center px-6 transition-colors ${
        abnormal ? "bg-danger/10" : ""
      }`}
    >
      {/* 序号 + 采集方式 */}
      <div className="absolute left-6 top-3 flex items-center gap-2">
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
          {index + 1} / {total}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] ${
            item.source === "auto" ? "bg-teal/20 text-teal" : "bg-warm/20 text-warm"
          }`}
        >
          {item.source === "auto" ? "设备自动" : "医生手动"}
        </span>
      </div>

      {/* 主体 */}
      <div className="flex flex-col items-center text-center">
        <span className="text-4xl">{<EIcon e={item.icon} />}</span>
        <h2 className="mt-2 text-lg font-bold">{item.label}</h2>
        <p className="mt-1 text-[11px] text-white/45">{item.hint}</p>

        {/* 数值 / 血压 */}
        {item.kind !== "choice" ? (
          <div className="mt-5 flex items-end gap-3">
            {item.kind === "bp" ? (
              <div className="flex items-end gap-2">
                <Stepper
                  value={value?.value}
                  step={1}
                  onChange={(nv) => onChange({ value: nv })}
                  abnormal={abnormal}
                />
                <span className="pb-3 text-2xl font-bold text-white/40">/</span>
                <Stepper
                  value={value?.valueDia}
                  step={1}
                  onChange={(nv) => onChange({ valueDia: nv })}
                  abnormal={abnormal}
                />
              </div>
            ) : (
              <Stepper
                value={value?.value}
                step={step}
                onChange={(nv) => onChange({ value: nv })}
                abnormal={abnormal}
              />
            )}
            {item.unit ? <span className="pb-3 text-sm text-white/50">{item.unit}</span> : null}
          </div>
        ) : (
          <div className="mt-5 grid w-full max-w-[280px] grid-cols-2 gap-2">
            {item.options!.map((opt) => {
              const on = value?.choice === opt;
              const isNormal = opt === item.normalOption;
              return (
                <button
                  key={opt}
                  onClick={() => onChange({ choice: opt })}
                  className={`rounded-2xl px-3 py-3 text-[13px] font-medium ring-1 transition active:scale-95 ${
                    on
                      ? isNormal
                        ? "bg-success text-success-foreground ring-success"
                        : "bg-danger text-danger-foreground ring-danger"
                      : "bg-white/5 text-white/80 ring-white/10"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* 状态条 */}
        <div className="mt-5 h-7">
          {status === "abnormal" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/20 px-3 py-1 text-[12px] font-medium text-danger">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
              超出参考范围 · {rangeLabel(item)}
            </span>
          )}
          {status === "normal" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1 text-[12px] font-medium text-success">
              <Check className="h-3.5 w-3.5" /> 在正常范围内
            </span>
          )}
          {status === "empty" && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/50">
              请选择结果
            </span>
          )}
        </div>

        {/* 需重测开关 */}
        <button
          onClick={onToggleRetest}
          className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium ring-1 transition active:scale-95 ${
            value?.retest
              ? "bg-warm text-warm-foreground ring-warm"
              : "bg-white/5 text-white/60 ring-white/15"
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {value?.retest ? "已标记需重测" : "标记需重测"}
        </button>
      </div>

      {/* 底部：上滑确认 */}
      <button
        onClick={onNext}
        className="absolute inset-x-6 bottom-5 flex flex-col items-center gap-1 text-white/70 active:scale-95"
      >
        <ChevronUp className="h-5 w-5 animate-bounce" />
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-medium">
          上滑确认 · 下一项
        </span>
      </button>
    </section>
  );
}

function Stepper({
  value,
  step,
  onChange,
  abnormal,
}: {
  value?: number;
  step: number;
  onChange: (v: number) => void;
  abnormal: boolean;
}) {
  const dec = () => onChange(Number(((value ?? 0) - step).toFixed(1)));
  const inc = () => onChange(Number(((value ?? 0) + step).toFixed(1)));
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={dec}
        aria-label="减少"
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 active:scale-90"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className={`min-w-[84px] text-center text-5xl font-extrabold tabular-nums ${
          abnormal ? "text-danger" : "text-white"
        }`}
      >
        {fmt(value)}
      </span>
      <button
        onClick={inc}
        aria-label="增加"
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 active:scale-90"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
