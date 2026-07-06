import { createFileRoute, Link } from "@tanstack/react-router";
import { child, reviewPlan } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/report")({
  component: ReportPage,
});


const trend = [125, 126, 126.5, 127, 127.5, 128];
const weightTrend = [25.8, 26.2, 26.5, 26.9, 27.2, 27.5];

type Level = "ok" | "warn" | "bad";
type Item = { name: string; value: string; ref: string; level: Level };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "体格发育",
    items: [
      { name: "身高", value: "138 cm", ref: "P75", level: "ok" },
      { name: "体重", value: "32.5 kg", ref: "P85 · 偏重", level: "bad" },
      { name: "BMI", value: "17.1", ref: "14.5–16.8", level: "bad" },
      { name: "腰围", value: "62 cm", ref: "≤ 64 cm", level: "ok" },
    ],
  },
  {
    title: "视力与眼健康",
    items: [
      { name: "裸眼视力 (左)", value: "5.0", ref: "≥ 5.0", level: "ok" },
      { name: "裸眼视力 (右)", value: "5.0", ref: "≥ 5.0", level: "ok" },
      { name: "屈光度 (左)", value: "+0.25D", ref: "±0.50D", level: "ok" },
      { name: "眼位", value: "正位", ref: "正位", level: "ok" },
    ],
  },
  {
    title: "口腔",
    items: [
      { name: "龋齿", value: "0 颗", ref: "0 颗", level: "ok" },
      { name: "牙列", value: "整齐", ref: "整齐", level: "ok" },
    ],
  },
  {
    title: "内科",
    items: [
      { name: "血压", value: "102/66 mmHg", ref: "< 120/80", level: "ok" },
      { name: "心率", value: "88 bpm", ref: "70–110", level: "ok" },
      { name: "肺部听诊", value: "呼吸音清", ref: "正常", level: "ok" },
    ],
  },
  {
    title: "过敏与呼吸",
    items: [
      { name: "过敏原-尘螨", value: "阳性 (++)", ref: "阴性", level: "bad" },
      { name: "肺功能 FEV1", value: "98%", ref: "≥ 80%", level: "ok" },
      { name: "运动后咳嗽", value: "偶发", ref: "无", level: "warn" },
    ],
  },
];

type ArchiveKind = "exam" | "review" | "hospital";
type ArchiveEntry = { date: string; kind: ArchiveKind; tags: string[]; note?: string };
type ArchiveYear = { year: string; entries: ArchiveEntry[] };

const archives: ArchiveYear[] = [
  {
    year: "26年",
    entries: [
      { date: "9月18日", kind: "exam", tags: ["校内体检", "新生入校备案"], note: "身高 138 · BMI 17.1 · 视力 4.9/4.8" },
      { date: "6月05日", kind: "review", tags: ["复查·眼科"], note: "屈光度 -0.75D，建议 3 月后复查" },
      { date: "3月22日", kind: "hospital", tags: ["医院·呼吸科"], note: "运动后咳嗽评估，肺功能正常" },
    ],
  },
  {
    year: "25年",
    entries: [
      { date: "9月18日", kind: "exam", tags: ["校内体检"], note: "BMI 16.8 · 视力 5.0/4.9" },
      { date: "3月18日", kind: "review", tags: ["复查·体重"], note: "BMI 16.5，建议加强营养" },
    ],
  },
  {
    year: "24年",
    entries: [
      { date: "9月10日", kind: "exam", tags: ["校内体检"], note: "首次入校体检，各项正常" },
      { date: "4月02日", kind: "hospital", tags: ["医院·过敏原筛查"], note: "尘螨阳性 (++)" },
    ],
  },
];

const kindStyle: Record<ArchiveKind, { dot: string; badge: string; label: string }> = {
  exam: { dot: "bg-teal", badge: "bg-teal text-teal-foreground", label: "体检" },
  review: { dot: "bg-warm", badge: "bg-warm text-warm-foreground", label: "复查" },
  hospital: { dot: "bg-deep", badge: "bg-deep text-deep-foreground", label: "就诊" },
};

const dot: Record<Level, string> = {
  ok: "bg-success",
  warn: "bg-warning",
  bad: "bg-danger",
};

const valueColor: Record<Level, string> = {
  ok: "text-foreground",
  warn: "text-warning-foreground",
  bad: "text-danger",
};

function ReportPage() {
  return (
    <div>
      <StatusBar title="体检报告" />
      <div className="px-5 pb-28 pt-2">
        <header className="mb-4">
          <h1 className="text-xl font-bold">{child.name} 的体检报告</h1>
          <p className="text-xs text-muted-foreground">
            体检日期 {child.lastExam} · 阳光小学 · 三年级 3 班
          </p>
        </header>

        {/* Summary card */}
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
          <div className="mt-4 space-y-2 rounded-2xl bg-surface/70 p-3 backdrop-blur">
            <p className="text-[11px] font-semibold text-warm">🤖 AI 解读</p>
            <ul className="space-y-1.5 text-xs leading-relaxed text-foreground/85">
              <li>• <b>体重/BMI 偏高（肥胖倾向）</b>：控糖减重，每周 3 次中等强度运动 30 分钟。</li>
              <li>• <b>尘螨过敏 (++) · 运动后偶发咳嗽</b>：警惕哮喘倾向，做好家庭除螨与运动前热身。</li>
              <li>• 其他项目均在正常范围，继续保持。</li>
            </ul>
          </div>

          {/* 需就诊事项 · 快速预约 */}
          <div className="mt-3 space-y-2">
            <p className="text-[11px] font-semibold text-danger">⚠️ 建议尽快就诊</p>
            {[
              { dept: "儿童保健科", reason: "体重管理评估与营养指导", hospital: "市儿童医院" },
              { dept: "呼吸/过敏科", reason: "尘螨过敏 + 运动后咳嗽评估", hospital: "市儿童医院" },
            ].map((v) => (
              <div
                key={v.dept}
                className="flex items-center justify-between rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-danger/20"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    {v.dept}
                    <span className="ml-2 text-[11px] font-normal text-muted-foreground">
                      {v.hospital}
                    </span>
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {v.reason}
                  </p>
                </div>
                <button className="shrink-0 rounded-full bg-danger px-3 py-1.5 text-[11px] font-semibold text-danger-foreground">
                  预约挂号
                </button>
              </div>
            ))}
          </div>


        </div>



        {/* Detailed sections */}
        <div className="mb-4 space-y-3">
          {sections.map((s) => (
            <section
              key={s.title}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60"
            >
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <span className="h-4 w-1 rounded-full bg-teal" />
                {s.title}
              </h2>
              <ul className="divide-y divide-border/60">
                {s.items.map((it) => (
                  <li
                    key={it.name}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${dot[it.level]}`} />
                      <span className="text-sm">{it.name}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-sm font-semibold ${valueColor[it.level]}`}>
                        {it.value}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        参考 {it.ref}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* 报告解读 · 风险评估 */}
        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-4 w-1 rounded-full bg-warm" />
              报告解读 · 风险评估
            </h2>
            <span className="rounded-full bg-warm/10 px-2 py-0.5 text-[10px] text-warm">AI 生成</span>
          </div>
          <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
            综合本次体检数据与既往档案，共发现 2 项需关注异常，其余项目均在正常范围。
          </p>
          <ul className="space-y-3">
            {[
              {
                title: "肥胖倾向（体重 / BMI 偏高）",
                level: "中风险",
                levelClass: "bg-warning/20 text-warning-foreground",
                barClass: "bg-warning",
                barWidth: "60%",
                metrics: ["体重 32.5kg · P85", "BMI 17.1 · 参考 14.5–16.8"],
                risks: "长期可增加高血压、脂肪肝、性早熟及成年期代谢性疾病风险。",
                advice: "控糖限脂 + 每周≥3 次中等强度运动 30 分钟，3 个月复评 BMI。",
              },
              {
                title: "过敏性哮喘倾向（尘螨过敏 + 运动后咳嗽）",
                level: "高风险",
                levelClass: "bg-danger/15 text-danger",
                barClass: "bg-danger",
                barWidth: "80%",
                metrics: ["尘螨 IgE 阳性 (++)", "运动后偶发咳嗽", "肺功能 FEV1 98%"],
                risks: "有发展为运动诱发性哮喘的可能，季节交替期或剧烈运动后可能加重。",
                advice: "家庭除螨（床品高温清洗 / 除螨仪）+ 呼吸科门诊评估，必要时肺功能激发试验。",
              },
            ].map((r) => (
              <li
                key={r.title}
                className="rounded-2xl bg-surface-2 p-3 ring-1 ring-border/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{r.title}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${r.levelClass}`}>
                    {r.level}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${r.barClass}`} style={{ width: r.barWidth }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {r.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-white px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-foreground/85">
                  <b className="text-danger">风险：</b>{r.risks}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-foreground/85">
                  <b className="text-teal">建议：</b>{r.advice}
                </p>
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

        {/* Report archive */}
        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">报告档案</h2>
            <button className="text-xs font-medium text-teal">+ 添加报告</button>
          </div>
          <p className="mb-3 text-[11px] text-muted-foreground">
            可上传医院复查报告、既往体检单，同步至学校健康档案
          </p>
          <div className="space-y-5">
            {archives.map((a) => (
              <div key={a.year}>
                <p className="mb-2 text-base font-bold">{a.year}</p>
                <ol className="relative space-y-4 border-l-2 border-dashed border-teal/40 pl-4">
                  {a.entries.map((e) => {
                    const k = kindStyle[e.kind];
                    return (
                      <li key={e.date} className="relative">
                        <span
                          className={`absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full ring-2 ring-surface ${k.dot}`}
                        />
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-muted-foreground">{e.date}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] ${k.badge}`}>
                            {k.label}
                          </span>
                        </div>
                        {e.note && (
                          <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                            {e.note}
                          </p>
                        )}
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {e.tags.map((t) => (
                            <button
                              key={t}
                              className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] text-foreground ring-1 ring-border/60"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 冻结咨询栏 */}
      <div className="sticky bottom-0 left-0 right-0 z-30 mx-auto max-w-md border-t border-border/60 bg-surface/95 px-4 py-3 shadow-[0_-6px_20px_-8px_rgba(0,0,0,0.15)] backdrop-blur">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/parent/comm"
            search={{ topic: "report", from: "report" }}
            className="flex items-center justify-center gap-1.5 rounded-full bg-surface-2 py-2.5 text-xs font-semibold text-foreground ring-1 ring-border/60"
          >
            <span className="text-base">👨‍⚕️</span> 咨询医生
          </Link>
          <Link
            to="/parent/comm"
            search={{ topic: "ai-report", from: "report", auto: "1" }}
            className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-warm to-teal py-2.5 text-xs font-semibold text-white shadow-sm"
          >
            <span className="text-base">🤖</span> AI 解读报告
          </Link>
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
