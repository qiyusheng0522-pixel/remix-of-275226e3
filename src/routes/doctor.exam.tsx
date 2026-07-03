import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { SubNav, examSubNav } from "@/components/DoctorSubNav";
import { useState } from "react";

export const Route = createFileRoute("/doctor/exam")({
  component: ExamPage,
});

function ExamPage() {
  const [height, setHeight] = useState("128");
  const [weight, setWeight] = useState("27.5");
  const bmi = weight && height ? (+weight / (+height / 100) ** 2).toFixed(1) : "-";

  return (
    <div>
      <StatusBar title="校内录检" />
      <div className="px-5 pb-8 pt-2">
        {/* Class progress */}
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-deep to-teal p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] opacity-80">当前班级</p>
              <p className="text-base font-bold">阳光小学 · 三年级 3班</p>
            </div>
            <button className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] backdrop-blur">
              📷 扫码
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="mb-1 flex justify-between text-[11px]">
                <span>已检 28</span>
                <span>共 43 人</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-3 flex items-center gap-2 rounded-full bg-surface px-4 py-2 shadow-sm ring-1 ring-border/60">
          <span className="text-muted-foreground">🔍</span>
          <input
            placeholder="搜索学生 · 学号"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Current student */}
        <div className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-warm/15 text-2xl">
              🌸
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">李小雨 · 学号 20230318</p>
              <p className="text-[11px] text-muted-foreground">女 · 8 岁 · 三年级 3班</p>
            </div>
            <span className="rounded-full bg-warning/25 px-2 py-0.5 text-[10px] text-warning-foreground">
              历史需关注
            </span>
          </div>

          {/* Input grid */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="身高 cm" value={height} onChange={setHeight} />
            <Field label="体重 kg" value={weight} onChange={setWeight} />
            <Field label="腰围 cm" value="" onChange={() => {}} placeholder="选填" />
            <div className="rounded-xl bg-teal/10 p-3">
              <p className="text-[11px] text-muted-foreground">BMI 自动</p>
              <p className="mt-1 text-lg font-extrabold text-teal">{bmi}</p>
              <p className="text-[10px] text-muted-foreground">偏轻</p>
            </div>
            <Field label="收缩压" value="102" onChange={() => {}} />
            <Field label="舒张压" value="66" onChange={() => {}} />
          </div>

          {/* Extra items */}
          <div className="mt-3 space-y-2">
            {[
              { k: "视力 左/右", v: "5.0 / 4.8", flag: "warning" },
              { k: "呼吸/过敏问卷", v: "存在夜间咳嗽", flag: "warning" },
              { k: "口腔", v: "龋齿 2 颗", flag: "warm" },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2">
                <div>
                  <p className="text-[11px] text-muted-foreground">{r.k}</p>
                  <p className="text-sm">{r.v}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    r.flag === "warning"
                      ? "bg-warning/25 text-warning-foreground"
                      : "bg-warm/15 text-warm"
                  }`}
                >
                  需关注
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className="rounded-xl bg-warning/20 py-2 text-xs font-medium text-warning-foreground">
              标记复测
            </button>
            <button className="rounded-xl bg-surface-2 py-2 text-xs">标记缺检</button>
            <button className="rounded-xl bg-deep py-2 text-xs font-medium text-deep-foreground">
              提交数据
            </button>
          </div>
        </div>

        {/* Class queue */}
        <h2 className="mb-2 text-sm font-semibold">班级队列</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { n: "李小雨", s: "current" },
            { n: "王晨曦", s: "done" },
            { n: "刘思远", s: "done" },
            { n: "陈静雅", s: "wait" },
            { n: "赵一鸣", s: "wait" },
            { n: "钱佳琪", s: "wait" },
            { n: "孙欣然", s: "wait" },
            { n: "周乐言", s: "wait" },
          ].map((s) => (
            <div
              key={s.n}
              className={`rounded-xl p-2 text-center text-[11px] ${
                s.s === "current"
                  ? "bg-deep text-deep-foreground"
                  : s.s === "done"
                  ? "bg-success/15 text-success"
                  : "bg-surface text-muted-foreground ring-1 ring-border/60"
              }`}
            >
              {s.n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="rounded-xl bg-surface-2 p-3">
      <span className="block text-[11px] text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent text-lg font-bold outline-none placeholder:text-sm placeholder:font-normal placeholder:text-muted-foreground/60"
      />
    </label>
  );
}
