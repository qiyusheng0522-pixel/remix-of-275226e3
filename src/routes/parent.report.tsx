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
        <details className="group mb-3 overflow-hidden rounded-3xl bg-gradient-to-br from-warning/25 to-warm/15 ring-1 ring-warning/30">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-warning/40 text-base">🟡</span>
              <div>
                <p className="text-[11px] text-warning-foreground/80">整体风险等级</p>
                <p className="text-sm font-bold text-warning-foreground">{child.riskLevel} · 需关注</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground transition group-open:rotate-180">▾</span>
          </summary>
          <div className="px-4 pb-4">
            <div className="space-y-2 rounded-2xl bg-surface/70 p-3 backdrop-blur">
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
        </details>




        {/* Detailed sections - 风琴样式，默认收起 */}
        <div className="mb-4 space-y-2">
          {sections.map((s) => {
            const abnormal = s.items.filter((it) => it.level !== "ok").length;
            const hasAb = abnormal > 0;
            return (
              <details
                key={s.title}
                className="group rounded-2xl bg-surface shadow-sm ring-1 ring-border/60 open:ring-teal/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-1 rounded-full bg-teal" />
                    <span className="text-sm font-semibold">{s.title}</span>
                    <span className="text-[11px] text-muted-foreground">
                      共 {s.items.length} 项
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasAb ? (
                      <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-medium text-danger">
                        异常 {abnormal} 项
                      </span>
                    ) : (
                      <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] text-success">
                        全部正常
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground transition group-open:rotate-180">
                      ▾
                    </span>
                  </div>
                </summary>
                <ul className="divide-y divide-border/60 px-4 pb-3">
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
              </details>
            );
          })}
        </div>


        {/* 报告解读 · 风险评估 */}
        <details className="group mb-3 rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-warm" />
              <span className="text-sm font-semibold">报告解读 · 风险评估</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-warm/10 px-2 py-0.5 text-[10px] text-warm">AI 生成</span>
              <span className="text-xs text-muted-foreground transition group-open:rotate-180">▾</span>
            </div>
          </summary>
          <div className="px-4 pb-4">
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
          </div>
        </details>



        {/* 健康管理方案 · 护理 / 运动 / 饮食 */}
        <details className="group mb-3 rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-teal" />
              <span className="text-sm font-semibold">健康管理方案</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] text-teal">医生 + 营养师</span>
              <span className="text-xs text-muted-foreground transition group-open:rotate-180">▾</span>
            </div>
          </summary>
          <div className="px-4 pb-4">
          <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
            结合本次报告异常项，为{child.name}生成 12 周家庭管理方案，可按周执行并同步随访。
          </p>

          <div className="space-y-3">
            {[
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
            ].map((p) => (
              <details
                key={p.title}
                className={`group overflow-hidden rounded-2xl bg-${p.tint}/5 ring-1 ring-${p.tint}/20`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-3">
                  <div className="flex items-center gap-2">
                    <span className={`grid h-8 w-8 place-items-center rounded-xl bg-${p.tint}/15 text-base`}>
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

          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-xl bg-surface-2 py-2 text-xs">导出 PDF</button>
            <Link
              to="/parent/comm"
              className="flex-1 rounded-xl bg-teal py-2 text-center text-xs font-medium text-teal-foreground"
            >
              咨询健管师
            </Link>
          </div>
          </div>
        </details>





        {/* Trend */}
        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">近期身体趋势（近 6 次）</h2>
            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] text-teal">AI 解读</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniChart label="身高 cm" data={trend} color="teal" />
            <MiniChart label="体重 kg" data={weightTrend} color="warm" />
          </div>

          {/* 趋势解读 */}
          <ul className="mt-3 space-y-2 text-[11px] leading-relaxed">
            <li className="rounded-xl bg-teal/10 p-2.5 ring-1 ring-teal/20">
              <p className="font-semibold text-teal">📈 身高：138 cm · 半年增长 3 cm</p>
              <p className="mt-0.5 text-foreground/80">
                增速处于 P75 参考区间，符合学龄期正常发育曲线。
              </p>
            </li>
            <li className="rounded-xl bg-warm/10 p-2.5 ring-1 ring-warm/25">
              <p className="font-semibold text-warm">⚠️ 体重：27.5 kg → 32.5 kg · 半年增长 5 kg</p>
              <p className="mt-0.5 text-foreground/80">
                增速偏快，BMI 由 16.5 上升至 17.1，已高于同龄参考上限，建议控制增速。
              </p>
            </li>
            <li className="rounded-xl bg-surface-2 p-2.5 ring-1 ring-border/60">
              <p className="font-semibold">💡 综合结论</p>
              <p className="mt-0.5 text-foreground/80">
                身高稳步增长但体重增速超身高增速，呈"体重追赶型"趋势，建议减少高糖零食、增加户外活动，3 个月后复评。
              </p>
            </li>
          </ul>
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
        <details className="group mb-3 rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
            <span className="text-sm font-semibold">报告档案</span>
            <div className="flex items-center gap-2">
              <button className="text-xs font-medium text-teal">+ 添加</button>
              <span className="text-xs text-muted-foreground transition group-open:rotate-180">▾</span>
            </div>
          </summary>
          <div className="px-4 pb-4">
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
          </div>
        </details>


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
