import { createFileRoute, Link } from "@tanstack/react-router";
import { child } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/health-plan")({
  component: HealthPlanPage,
});

const days = ["06/11", "06/12", "06/13", "06/14", "06/15"];

const meals = [
  {
    name: "早餐",
    kcal: 430,
    reason: "早餐提供全天 25–30% 能量，粗细搭配 + 优质蛋白可稳定上午血糖、改善注意力",
    source: "《中国学龄儿童膳食指南 (2022)》· 中国营养学会",
    groups: [
      { title: "粗细搭配主食", amount: "50–75 克(生重)", tips: "粗粮占 1/3 以上", tags: ["燕麦片", "玉米面", "全麦面包", "杂粮馒头"] },
      { title: "优质蛋白", amount: "1 份", tags: ["鸡蛋 1 个", "牛奶 250ml", "无糖豆浆 300ml"] },
      { title: "蔬菜或低糖水果", amount: "100–150 克", tags: ["黄瓜", "番茄", "蓝莓", "苹果"] },
    ],
  },
  {
    name: "午餐",
    kcal: 560,
    reason: "午餐承担全天最高供能，蛋白质与蔬菜比重提升有助于控重",
    source: "WHO《School-age children and adolescents nutrition guidance (2023)》",
  },
  {
    name: "晚餐",
    kcal: 440,
    reason: "晚餐能量适度下调、餐后 2 小时不进食，可减少肥胖与胰岛素抵抗风险",
    source: "《中国儿童青少年零食指南 (2018)》· 国家卫生健康委",
  },
];

const exercises = [
  {
    tag: "亲子共练",
    status: "已完成",
    title: "餐后控糖快走",
    level: "入门",
    tags: ["#体重管理", "#餐后代谢", "#亲子运动"],
    time: "午餐后 13:00",
    hr: "8–10 分钟",
    coach: "社区健身指导员 · 06:00",
    reason: "餐后 30 分钟中低强度活动可降低餐后血糖峰值约 12–17%，是学龄儿童控重的有效方式",
    source: "《中国儿童青少年身体活动指南 (2018)》· 国家卫健委疾控局",
  },
  {
    tag: "通用教学",
    status: "待打卡",
    title: "跳绳燃脂 20 分钟",
    level: "进阶",
    tags: ["#减脂", "#心肺提升"],
    time: "傍晚 17:30",
    hr: "心率 130–150",
    coach: "国家二级运动员 · 08:20",
    reason: "跳绳属于负重冲击运动，可同步促进骨密度增长与心肺耐力，每次≥15 分钟效果显著",
    source: "WHO《Physical activity for children and adolescents (2020)》· 每日 60min MVPA",
  },
];

function HealthPlanPage() {
  return (
    <div className="bg-surface-2">
      <StatusBar title="健康管理方案" />
      <div className="px-4 pb-28 pt-2">
        <header className="mb-3 px-1">
          <h1 className="text-xl font-bold">{child.name} 的健康方案</h1>
          <p className="text-xs text-muted-foreground">
            基于本次体检报告 · 医生 + AI 营养师联合生成
          </p>
        </header>

        {/* 报告详细解读 */}
        <section className="mb-4 rounded-3xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-warm" />
              <h2 className="text-sm font-bold">报告详细解读</h2>
            </div>
            <span className="rounded-full bg-warm/10 px-2 py-0.5 text-[10px] text-warm">AI 医师</span>
          </div>

          <div className="mt-3 rounded-2xl bg-gradient-to-br from-warning/15 to-warm/10 p-3 ring-1 ring-warning/20">
            <p className="text-[11px] font-semibold text-warning-foreground">🟡 整体评估</p>
            <p className="mt-1 text-[12px] leading-relaxed text-foreground/85">
              {child.name}本次体检整体发育良好，身高处于 P75，各项内科与视力指标正常。
              主要异常集中在 <b>体重/BMI 偏高</b> 及 <b>尘螨过敏合并运动后咳嗽</b> 两方面，
              属于需干预的中高风险，若长期忽视可能发展为儿童肥胖症或运动诱发性哮喘。
            </p>
          </div>

          <ul className="mt-3 space-y-2">
            {[
              {
                dot: "bg-danger",
                title: "① 肥胖倾向（BMI 17.1 · P85）",
                desc: "近半年体重增长 5kg 而身高仅增长 3cm，呈体重追赶型。需在 12 周内通过饮食+运动干预将 BMI 降至 16.5 以下。",
              },
              {
                dot: "bg-warning",
                title: "② 过敏性哮喘倾向",
                desc: "尘螨 IgE (++) 阳性合并运动后偶发咳嗽，肺功能虽正常但存在气道高反应可能，需家庭除螨 + 呼吸科评估。",
              },
              {
                dot: "bg-success",
                title: "③ 其他项目",
                desc: "视力 5.0、口腔无龋、血压心率均在正常范围，继续保持现有作息与用眼习惯。",
              },
            ].map((r) => (
              <li key={r.title} className="rounded-2xl bg-surface-2 p-3">
                <div className="flex items-start gap-2">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${r.dot}`} />
                  <div>
                    <p className="text-[13px] font-semibold">{r.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-foreground/80">{r.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 饮食方案 - 图片同款样式 */}
        <section className="mb-4 overflow-hidden rounded-3xl bg-teal/10 shadow-sm">
          <div className="px-4 pt-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">通用饮食方案</h2>
                <p className="text-[11px] text-muted-foreground">基于国家儿童营养指南 · 控糖限脂建议</p>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface text-lg">🥗</span>
            </div>

            <div className="mt-3 flex gap-6 border-b border-teal/20">
              <button className="relative pb-2 text-[13px] font-semibold text-teal">
                营养方案
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded bg-teal" />
              </button>
              <button className="pb-2 text-[13px] text-muted-foreground">药食同源</button>
            </div>
          </div>

          <div className="mx-4 mt-3 rounded-2xl bg-surface p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px]">当前您执行的是 <span className="font-semibold text-warm">营养方案</span></p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[12px] text-muted-foreground">用餐时间：<span className="font-semibold text-foreground">07:30–18:00</span></p>
              <span className="rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-medium text-teal">已选择该方案</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative grid h-32 w-32 place-items-center">
                <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface-2)" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F5A524" strokeWidth="3.5" strokeDasharray="50 100" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1E90FF" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-50" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#5AC8FA" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-75" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <p className="text-lg font-bold leading-none">1434</p>
                  <p className="text-[10px] text-muted-foreground">Kcal</p>
                </div>
              </div>
              <ul className="flex-1 space-y-2 text-[12px]">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#F5A524]" />碳水化合物</span>
                  <span className="text-muted-foreground">177.3g</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#1E90FF]" />脂肪</span>
                  <span className="text-muted-foreground">43.4g</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#5AC8FA]" />蛋白质</span>
                  <span className="text-muted-foreground">84.3g</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 flex gap-3 border-b border-border/50 pb-2 text-[13px]">
              {days.map((d, i) => (
                <button
                  key={d}
                  className={`relative pb-1 ${i === 0 ? "font-semibold text-teal" : "text-muted-foreground"}`}
                >
                  {d}
                  {i === 0 && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded bg-teal" />}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-xl bg-teal/10 py-2.5 text-[12px] font-medium text-teal">
                ↻ 不想吃全部换
              </button>
              <Link to="/parent/shop" className="flex-1 rounded-xl bg-warm/15 py-2.5 text-center text-[12px] font-semibold text-warm">
                去买菜 ›
              </Link>
            </div>

            <p className="mt-3 text-[11px] text-muted-foreground">
              带 <span className="text-danger">ⓘ</span> 食谱包含卫健委公布的药食同源药材，点击查看功效
            </p>

            <div className="mt-3 space-y-2">
              {meals.map((m, i) => (
                <div key={m.name} className="rounded-2xl bg-surface-2 p-3">
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="text-teal">{i === 0 ? "⌄" : "›"}</span>
                    <b>{m.name}</b>
                    <span className="text-muted-foreground">约 {m.kcal} 千卡</span>
                    <span className="text-[11px] text-muted-foreground">· 推荐结构</span>
                  </div>

                  {/* 推荐理由 + 科学出处 */}
                  <div className="mt-2 rounded-xl bg-warm/10 p-2.5 ring-1 ring-warm/20">
                    <p className="text-[11px] leading-relaxed text-foreground/85">
                      <b className="text-warm">推荐理由：</b>{m.reason}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      📚 出处：{m.source}
                    </p>
                  </div>


                  {m.groups && (
                    <div className="mt-2 space-y-2">
                      <p className="text-[11px] text-muted-foreground">
                        推荐结构：粗细搭配主食 + 优质蛋白 + 蔬菜/水果
                      </p>
                      {m.groups.map((g) => (
                        <div key={g.title} className="rounded-xl bg-surface p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-[13px] font-semibold">{g.title}</p>
                            <span className="text-[12px] font-semibold text-teal">{g.amount}</span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {g.tags.map((t) => (
                              <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] text-foreground/80 ring-1 ring-border/60">
                                {t}
                              </span>
                            ))}
                          </div>
                          {g.tips && (
                            <p className="mt-1.5 text-[11px] text-muted-foreground">提示：{g.tips}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="h-4" />
        </section>

        {/* 运动方案 - 图片同款样式 */}
        <section className="mb-4 overflow-hidden rounded-3xl bg-teal/10 p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                今日运动 <span className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-normal text-muted-foreground">通用方案 · 免费</span>
              </h2>
              <p className="mt-1 text-[11px] text-muted-foreground">通用指南建议：每周 ≥150 分钟中等强度有氧</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface text-lg">💗</span>
          </div>

          <div className="mt-3 rounded-2xl bg-surface p-4">
            <div className="flex items-center justify-between text-[12px]">
              <span>今日打卡进度</span>
              <span className="text-muted-foreground">完成度</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <p className="text-lg font-bold">1 <span className="text-[12px] font-normal text-muted-foreground">/ 2 项</span></p>
              <p className="text-lg font-bold text-teal">50%</p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-1/2 rounded-full bg-teal" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-rose/10 px-3 py-2.5 ring-1 ring-rose/20">
            <p className="text-[12px]"><span className="mr-1 text-danger">⚠</span><b>运动风险提示</b> 胸闷/头晕请立即停止，血糖 &lt;5.6…</p>
            <span className="text-muted-foreground">▾</span>
          </div>


          <div className="mt-4 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-teal">〰 今日运动清单 <span className="ml-1 rounded-md bg-teal/15 px-1.5 py-0.5 text-[11px]">{exercises.length} 项</span></p>
            <button className="text-[11px] text-muted-foreground">打卡记录 ›</button>
          </div>

          <div className="mt-2 space-y-3">
            {exercises.map((e) => (
              <div key={e.title} className="overflow-hidden rounded-2xl bg-surface">
                <div className="flex">
                  <div className="relative grid w-32 shrink-0 place-items-center bg-gradient-to-br from-warm/70 to-warm p-3 text-white">
                    <span className="absolute left-2 top-2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-warm">{e.tag}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-warm">▶</span>
                    <p className="absolute inset-x-0 bottom-2 truncate px-2 text-center text-[10px]">{e.coach}</p>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-success/15 px-1.5 py-0.5 text-[10px] font-medium text-success">✓ {e.status}</span>
                    </div>
                    <p className="mt-1 text-[13px] font-bold">{e.title} <span className="ml-1 rounded-md bg-teal/10 px-1.5 py-0.5 text-[10px] font-normal text-teal">{e.level}</span></p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {e.tags.map((t) => (
                        <span key={t} className="rounded-md bg-teal/10 px-1.5 py-0.5 text-[10px] text-teal">{t}</span>
                      ))}
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">🕐 {e.time} · 〰 {e.hr}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 border-t border-border/50 bg-surface-2 px-3 py-2 text-[11px] text-muted-foreground">
                  🔒 开通专属方案解锁 <b className="text-foreground">奥运冠军 1:1 陪练</b> 与个性化强度调整
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 家庭护理 */}
        <section className="mb-4 rounded-3xl bg-rose/10 p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                家庭护理 <span className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-normal text-muted-foreground">尘螨过敏 · 每周</span>
              </h2>
              <p className="mt-1 text-[11px] text-muted-foreground">改善家庭环境，减少过敏原暴露</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface text-lg">🏠</span>
          </div>

          <div className="mt-3 space-y-2">
            {[
              { title: "床品高温清洗", desc: "≥60℃ 每周 1 次，晾晒 2h 以上", freq: "周日", done: true },
              { title: "除螨仪深度清理", desc: "床垫 / 沙发 / 地毯重点区域", freq: "周三 / 六", done: false },
              { title: "更换防螨床罩", desc: "枕套、被套每 3 个月更换", freq: "季度", done: false },
              { title: "室内湿度监测", desc: "维持 40–50%，超标启动除湿", freq: "每日", done: true },
            ].map((c) => (
              <div key={c.title} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] ${c.done ? "bg-success text-success-foreground" : "border border-border bg-surface-2 text-muted-foreground"}`}>
                  {c.done ? "✓" : ""}
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground">{c.desc}</p>
                </div>
                <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[11px] text-rose">{c.freq}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 商城 BANNER */}
        <Link
          to="/parent/shop"
          className="mt-4 block overflow-hidden rounded-2xl bg-gradient-to-r from-rose/20 via-warm/15 to-teal/20 p-4 ring-1 ring-rose/25"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface/80 text-2xl">
              🛒
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-foreground">方案配套优选商城</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                除螨床罩 · 低 GI 主食 · 亲子跳绳，方案同款一站备齐
              </p>
            </div>
            <span className="text-rose">›</span>
          </div>
        </Link>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-30 mx-auto max-w-md border-t border-border/60 bg-surface/95 px-3 py-3 backdrop-blur">
        <Link
          to="/parent/comm"
          className="block rounded-full bg-gradient-to-r from-warm to-teal py-2.5 text-center text-[13px] font-semibold text-white"
        >
          咨询健管师
        </Link>
      </div>
    </div>
  );
}
