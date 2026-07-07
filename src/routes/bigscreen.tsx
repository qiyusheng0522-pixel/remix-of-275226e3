import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/bigscreen")({
  component: BigScreen,
});

const kpis = [
  { label: "在册适龄儿童", value: 128460, unit: "人", tint: "#38bdf8" },
  { label: "本年度已入学体检", value: 116329, unit: "人", tint: "#22d3ee" },
  { label: "体检完成率", value: 90.6, unit: "%", tint: "#34d399" },
  { label: "异常检出率", value: 18.4, unit: "%", tint: "#fbbf24" },
  { label: "重点儿童在管", value: 4212, unit: "人", tint: "#f472b6" },
  { label: "转诊完成率", value: 87.3, unit: "%", tint: "#a78bfa" },
];

const progressByDistrict = [
  { name: "玄武", 已检: 95 },
  { name: "秦淮", 已检: 93 },
  { name: "建邺", 已检: 91 },
  { name: "鼓楼", 已检: 94 },
  { name: "栖霞", 已检: 88 },
  { name: "雨花台", 已检: 90 },
  { name: "江宁", 已检: 86 },
  { name: "浦口", 已检: 84 },
  { name: "六合", 已检: 82 },
  { name: "溧水", 已检: 79 },
  { name: "高淳", 已检: 81 },
];

// 南京市 11 个区覆盖 · 坐标基于示意地图 viewBox 500x520
const njMap: { name: string; x: number; y: number; schools: number; kids: number; rate: number }[] = [
  { name: "六合", x: 240, y: 55, schools: 42, kids: 11800, rate: 82 },
  { name: "浦口", x: 130, y: 155, schools: 34, kids: 9200, rate: 84 },
  { name: "栖霞", x: 340, y: 175, schools: 30, kids: 8600, rate: 88 },
  { name: "鼓楼", x: 225, y: 220, schools: 46, kids: 13200, rate: 94 },
  { name: "玄武", x: 285, y: 225, schools: 28, kids: 7900, rate: 95 },
  { name: "建邺", x: 210, y: 258, schools: 26, kids: 7400, rate: 91 },
  { name: "秦淮", x: 275, y: 265, schools: 32, kids: 9100, rate: 93 },
  { name: "雨花台", x: 240, y: 300, schools: 24, kids: 6800, rate: 90 },
  { name: "江宁", x: 290, y: 355, schools: 52, kids: 15400, rate: 86 },
  { name: "溧水", x: 265, y: 430, schools: 22, kids: 5900, rate: 79 },
  { name: "高淳", x: 245, y: 485, schools: 18, kids: 4600, rate: 81 },
];

const abnormalTop = [
  { name: "视力不良", value: 34.2 },
  { name: "超重 / 肥胖", value: 21.5 },
  { name: "龋齿", value: 19.8 },
  { name: "脊柱侧弯风险", value: 8.6 },
  { name: "血压偏高", value: 6.3 },
  { name: "过敏性鼻炎", value: 5.1 },
  { name: "心律异常", value: 2.9 },
];

const trend = [
  { m: "1月", 完成: 6200, 异常: 1120 },
  { m: "2月", 完成: 8800, 异常: 1580 },
  { m: "3月", 完成: 15400, 异常: 2830 },
  { m: "4月", 完成: 22100, 异常: 4080 },
  { m: "5月", 完成: 18600, 异常: 3420 },
  { m: "6月", 完成: 14300, 异常: 2610 },
  { m: "7月", 完成: 9800, 异常: 1810 },
  { m: "8月", 完成: 12100, 异常: 2260 },
  { m: "9月", 完成: 8929, 异常: 1642 },
];

const referral = [
  { name: "已建档随访", value: 62, color: "#22d3ee" },
  { name: "社区在管", value: 21, color: "#34d399" },
  { name: "医院复诊中", value: 12, color: "#fbbf24" },
  { name: "未响应", value: 5, color: "#f87171" },
];

const dimensions = [
  { k: "视力", A: 68 },
  { k: "体重", A: 74 },
  { k: "口腔", A: 71 },
  { k: "脊柱", A: 88 },
  { k: "血压", A: 92 },
  { k: "心肺", A: 95 },
  { k: "过敏", A: 82 },
];

const alerts = [
  { time: "10:24", tag: "预警", tint: "#f87171", msg: "宝山区体检进度落后目标 -11%，建议增派承检机构" },
  { time: "10:12", tag: "转诊", tint: "#fbbf24", msg: "浦东新区 128 例视力不良未按期到院复查" },
  { time: "09:58", tag: "上报", tint: "#22d3ee", msg: "闵行区完成本周异常汇总上报（1,284 例）" },
  { time: "09:41", tag: "宣教", tint: "#34d399", msg: "全市推送《春季儿童过敏防护》，覆盖 8.6 万家庭" },
  { time: "09:20", tag: "抽查", tint: "#a78bfa", msg: "市卫健委抽查 5 所小学体检质控，通过率 96%" },
  { time: "08:47", tag: "预警", tint: "#f87171", msg: "松江某校连续 3 天缺检率 > 8%，已通知教育局" },
];

const orgs = [
  { name: "阳光社区卫生服务中心", done: 8420, rate: 94 },
  { name: "市儿童医院浦东分院", done: 7620, rate: 91 },
  { name: "徐汇区妇幼保健院", done: 6980, rate: 96 },
  { name: "静安区中心医院", done: 6410, rate: 92 },
  { name: "闵行第二人民医院", done: 5820, rate: 85 },
];

function BigScreen() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => n.toLocaleString("zh-CN");

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#050a1f] p-6 font-sans text-slate-100">
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1920px]">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-3 text-xs text-cyan-300/80">
            <span>江苏省教育厅 · 南京市教育局体卫艺处</span>
            <span className="text-cyan-500/40">|</span>
            <span>数据接入：南京市 11 区 · 354 所小学 · 68 家承检机构</span>
          </div>
          <h1 className="bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 bg-clip-text text-2xl font-black tracking-widest text-transparent">
            江苏省南京市 · 儿童入学体检协同监测大屏
          </h1>
          <div className="text-right text-xs text-cyan-300/80">
            <div>{now.toLocaleDateString("zh-CN")} · {now.toLocaleTimeString("zh-CN")}</div>
            <div className="text-cyan-500/60">卫健委 · 妇幼健康处 联合发布</div>
          </div>
        </header>

        {/* KPI row */}
        <div className="mb-4 grid grid-cols-6 gap-3">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="relative overflow-hidden rounded-lg border border-cyan-500/20 bg-gradient-to-br from-white/[0.03] to-transparent p-3 backdrop-blur"
            >
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl"
                style={{ background: k.tint }}
              />
              <p className="text-[11px] tracking-wider text-slate-400">{k.label}</p>
              <p className="mt-1 text-3xl font-black tabular-nums" style={{ color: k.tint }}>
                {typeof k.value === "number" && k.value % 1 !== 0 ? k.value.toFixed(1) : fmt(k.value)}
                <span className="ml-1 text-xs font-normal text-slate-400">{k.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* main grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* left */}
          <div className="col-span-3 space-y-3">
            <Panel title="各区体检进度（%）">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={progressByDistrict} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid stroke="#164e63" strokeDasharray="2 4" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#67e8f9" fontSize={10} />
                  <YAxis dataKey="name" type="category" stroke="#67e8f9" fontSize={11} width={40} />
                  <Tooltip {...tt} />
                  <Bar dataKey="已检" fill="url(#gradBar)" radius={[0, 4, 4, 0]} />
                  <defs>
                    <linearGradient id="gradBar" x1="0" x2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title="承检机构 TOP 5">
              <ul className="space-y-2 text-xs">
                {orgs.map((o, i) => (
                  <li key={o.name}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded text-[10px] font-bold ${
                            i < 3 ? "bg-cyan-500/30 text-cyan-200" : "bg-slate-700/40 text-slate-300"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-slate-200">{o.name}</span>
                      </span>
                      <span className="tabular-nums text-cyan-300">{fmt(o.done)}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-700/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                        style={{ width: `${o.rate}%` }}
                      />
                    </div>
                    <p className="mt-0.5 text-right text-[10px] text-slate-400">质控 {o.rate}%</p>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="重点儿童干预进度">
              <ul className="space-y-2 text-[11px]">
                {[
                  { k: "视力矫正跟踪", n: 1824, r: 78, c: "#f472b6" },
                  { k: "体重管理干预", n: 1256, r: 65, c: "#fbbf24" },
                  { k: "口腔龋齿治疗", n: 986, r: 82, c: "#34d399" },
                  { k: "脊柱侧弯复查", n: 412, r: 71, c: "#a78bfa" },
                  { k: "血压异常随访", n: 218, r: 88, c: "#38bdf8" },
                ].map((x) => (
                  <li key={x.k}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200">{x.k}</span>
                      <span className="tabular-nums text-slate-300">
                        <span className="text-cyan-300">{fmt(x.n)}</span>
                        <span className="ml-1 text-slate-500">人</span>
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-700/40">
                      <div className="h-full rounded-full" style={{ width: `${x.r}%`, background: x.c }} />
                    </div>
                    <p className="mt-0.5 text-right text-[10px] text-slate-400">完成 {x.r}%</p>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="本周家校医协同任务">
              <ul className="space-y-1.5 text-[11px]">
                {[
                  { t: "校方上传体检花名册", s: "完成", c: "#34d399", p: "98%" },
                  { t: "机构回传体检报告", s: "进行", c: "#22d3ee", p: "82%" },
                  { t: "异常结果分级派单", s: "进行", c: "#fbbf24", p: "67%" },
                  { t: "家长知情同意回收", s: "待办", c: "#f472b6", p: "45%" },
                  { t: "社区随访建档", s: "进行", c: "#a78bfa", p: "71%" },
                ].map((x) => (
                  <li key={x.t} className="flex items-center justify-between rounded border border-slate-700/40 bg-slate-800/20 px-2 py-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: x.c }} />
                      <span className="text-slate-200">{x.t}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="tabular-nums text-slate-400">{x.p}</span>
                      <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: `${x.c}25`, color: x.c }}>
                        {x.s}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          {/* center */}
          <div className="col-span-6 space-y-3">
            <NanjingMapPanel />

            <Panel title="全市体检完成 / 异常检出趋势">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trend} margin={{ left: 0, right: 16 }}>
                  <defs>
                    <linearGradient id="gDone" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gAbn" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f472b6" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#f472b6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#164e63" strokeDasharray="2 4" />
                  <XAxis dataKey="m" stroke="#67e8f9" fontSize={11} />
                  <YAxis stroke="#67e8f9" fontSize={11} />
                  <Tooltip {...tt} />
                  <Area type="monotone" dataKey="完成" stroke="#22d3ee" fill="url(#gDone)" strokeWidth={2} />
                  <Area type="monotone" dataKey="异常" stroke="#f472b6" fill="url(#gAbn)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            <div className="grid grid-cols-2 gap-3">
              <Panel title="TOP 异常检出（%）">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={abnormalTop} margin={{ left: 0, right: 16 }}>
                    <CartesianGrid stroke="#164e63" strokeDasharray="2 4" />
                    <XAxis dataKey="name" stroke="#67e8f9" fontSize={10} interval={0} angle={-15} height={40} />
                    <YAxis stroke="#67e8f9" fontSize={10} />
                    <Tooltip {...tt} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {abnormalTop.map((_, i) => (
                        <Cell key={i} fill={["#f472b6", "#fbbf24", "#34d399", "#a78bfa", "#38bdf8", "#f87171", "#fb923c"][i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="健康维度综合指数">
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={dimensions}>
                    <PolarGrid stroke="#164e63" />
                    <PolarAngleAxis dataKey="k" stroke="#67e8f9" fontSize={11} />
                    <Radar dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </Panel>
            </div>
          </div>

          {/* right */}
          <div className="col-span-3 space-y-3">
            <Panel title="异常后处置分布">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={referral}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={3}
                    stroke="#050a1f"
                  >
                    {referral.map((r) => (
                      <Cell key={r.name} fill={r.color} />
                    ))}
                  </Pie>
                  <Tooltip {...tt} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="grid grid-cols-2 gap-1 text-[11px]">
                {referral.map((r) => (
                  <li key={r.name} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ background: r.color }} />
                    <span className="text-slate-300">{r.name}</span>
                    <span className="ml-auto tabular-nums text-slate-400">{r.value}%</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="实时预警与协同事件" liveDot>
              <ul className="space-y-2 text-xs">
                {alerts.map((a, i) => (
                  <li
                    key={i}
                    className="rounded border border-slate-700/40 bg-slate-800/30 p-2"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span
                        className="rounded px-1.5 py-0.5 font-semibold"
                        style={{ background: `${a.tint}30`, color: a.tint }}
                      >
                        {a.tag}
                      </span>
                      <span className="text-slate-500">{a.time}</span>
                    </div>
                    <p className="mt-1 leading-relaxed text-slate-200">{a.msg}</p>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="家校医协同健康指数">
              <ResponsiveContainer width="100%" height={110}>
                <LineChart data={trend}>
                  <Line
                    type="monotone"
                    dataKey="完成"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={false}
                  />
                  <XAxis dataKey="m" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-emerald-300">92.4</p>
                <p className="text-[11px] text-slate-400">
                  较上月 <span className="text-emerald-300">▲ 2.1</span>
                </p>
              </div>
            </Panel>
          </div>
        </div>

        <footer className="mt-3 flex items-center justify-between border-t border-cyan-500/20 pt-2 text-[10px] text-slate-500">
          <span>数据来源：市教育局体卫艺处 · 市卫健委妇幼健康处 · 阳光校园健康平台</span>
          <span>刷新周期：60s · 当前接入承检机构在线 68 / 68</span>
        </footer>
      </div>
    </div>
  );
}

const tt = {
  contentStyle: {
    background: "rgba(3,10,30,0.9)",
    border: "1px solid #22d3ee55",
    borderRadius: 8,
    fontSize: 12,
    color: "#e2e8f0",
  },
  labelStyle: { color: "#67e8f9" },
};

function Panel({
  title,
  children,
  liveDot,
}: {
  title: string;
  children: React.ReactNode;
  liveDot?: boolean;
}) {
  return (
    <div className="relative rounded-lg border border-cyan-500/20 bg-white/[0.02] p-3 backdrop-blur">
      <div className="pointer-events-none absolute -left-px -top-px h-3 w-8 border-l-2 border-t-2 border-cyan-400" />
      <div className="pointer-events-none absolute -right-px -top-px h-3 w-8 border-r-2 border-t-2 border-cyan-400" />
      <div className="pointer-events-none absolute -bottom-px -left-px h-3 w-8 border-b-2 border-l-2 border-cyan-400" />
      <div className="pointer-events-none absolute -bottom-px -right-px h-3 w-8 border-b-2 border-r-2 border-cyan-400" />
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wider text-cyan-200">
          ▍{title}
        </h3>
        {liveDot && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            LIVE
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function NanjingMapPanel() {
  const totalSchools = njMap.reduce((s, d) => s + d.schools, 0);
  const totalKids = njMap.reduce((s, d) => s + d.kids, 0);
  const avgRate = Math.round(njMap.reduce((s, d) => s + d.rate, 0) / njMap.length);
  const maxKids = Math.max(...njMap.map((d) => d.kids));
  const color = (r: number) =>
    r >= 92 ? "#34d399" : r >= 85 ? "#22d3ee" : r >= 80 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative rounded-lg border border-cyan-500/20 bg-white/[0.02] p-3 backdrop-blur">
      <div className="pointer-events-none absolute -left-px -top-px h-3 w-8 border-l-2 border-t-2 border-cyan-400" />
      <div className="pointer-events-none absolute -right-px -top-px h-3 w-8 border-r-2 border-t-2 border-cyan-400" />
      <div className="pointer-events-none absolute -bottom-px -left-px h-3 w-8 border-b-2 border-l-2 border-cyan-400" />
      <div className="pointer-events-none absolute -bottom-px -right-px h-3 w-8 border-b-2 border-r-2 border-cyan-400" />

      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wider text-cyan-200">
          ▍江苏省南京市 · 项目辐射覆盖
        </h3>
        <div className="flex gap-3 text-[10px] text-slate-400">
          <span>覆盖区县 <span className="font-bold text-cyan-300">11 / 11</span></span>
          <span>覆盖学校 <span className="font-bold text-cyan-300">{totalSchools}</span> 所</span>
          <span>监测儿童 <span className="font-bold text-fuchsia-300">{totalKids.toLocaleString("zh-CN")}</span> 人</span>
          <span>体检完成 <span className="font-bold text-emerald-300">{avgRate}%</span></span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_180px] gap-3">
        {/* Map */}
        <div className="relative h-[420px] overflow-hidden rounded-md bg-gradient-to-b from-[#061a3a] via-[#04122a] to-[#020814] ring-1 ring-cyan-500/20">
          <svg viewBox="0 0 500 560" className="h-full w-full">
            <defs>
              <linearGradient id="dTop" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3ec6ff" />
                <stop offset="100%" stopColor="#1a6db8" />
              </linearGradient>
              <linearGradient id="dSide" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1a5a99" />
                <stop offset="100%" stopColor="#0a2547" />
              </linearGradient>
              <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              <filter id="topGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Floor glow */}
            <ellipse cx="250" cy="510" rx="230" ry="34" fill="url(#floorGlow)" />
            <ellipse cx="250" cy="510" rx="210" ry="26" fill="none" stroke="#22d3ee" strokeOpacity="0.35" strokeDasharray="2 6" />
            <ellipse cx="250" cy="510" rx="170" ry="20" fill="none" stroke="#22d3ee" strokeOpacity="0.25" />

            {(() => {
              const EXT = 12; // extrusion depth
              const districts: { name: string; pts: string; cx: number; cy: number }[] = [
                { name: "六合",   pts: "160,40 340,40 380,110 340,150 200,150 130,130",                 cx: 250, cy: 95  },
                { name: "浦口",   pts: "60,140 200,150 200,380 130,410 60,310",                          cx: 128, cy: 250 },
                { name: "栖霞",   pts: "340,150 440,150 450,300 380,400 320,380 320,150",               cx: 385, cy: 260 },
                { name: "鼓楼",   pts: "200,150 265,150 265,240 200,240",                                cx: 232, cy: 200 },
                { name: "玄武",   pts: "265,150 320,150 320,240 265,240",                                cx: 292, cy: 200 },
                { name: "建邺",   pts: "200,240 260,240 260,310 200,310",                                cx: 230, cy: 278 },
                { name: "秦淮",   pts: "260,240 320,240 320,310 260,310",                                cx: 290, cy: 278 },
                { name: "雨花台", pts: "200,310 320,310 320,380 200,380",                                cx: 260, cy: 348 },
                { name: "江宁",   pts: "130,380 380,380 380,440 250,460 130,440",                        cx: 250, cy: 418 },
                { name: "溧水",   pts: "170,460 340,460 355,490 190,490",                                cx: 262, cy: 478 },
                { name: "高淳",   pts: "190,490 355,490 335,510 210,510",                                cx: 272, cy: 500 },
              ];
              return (
                <>
                  {/* extruded side faces (drawn first so top overlays) */}
                  {districts.map((d) => (
                    <g key={`s-${d.name}`} transform={`translate(0, ${EXT})`}>
                      <polygon points={d.pts} fill="url(#dSide)" stroke="#0a1f3d" strokeWidth="1" />
                    </g>
                  ))}
                  {/* top faces */}
                  {districts.map((d) => {
                    const info = njMap.find((n) => n.name === d.name);
                    const c = info ? color(info.rate) : "#22d3ee";
                    return (
                      <g key={`t-${d.name}`}>
                        <polygon
                          points={d.pts}
                          fill="url(#dTop)"
                          stroke="#7dd3fc"
                          strokeWidth="1"
                          filter="url(#topGlow)"
                        />
                        {/* rate accent */}
                        <polygon points={d.pts} fill={c} fillOpacity="0.18" />
                        <text
                          x={d.cx}
                          y={d.cy - 2}
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="700"
                          fill="#eaf6ff"
                          style={{ letterSpacing: 1 }}
                        >
                          {d.name}
                        </text>
                        {info && (
                          <text
                            x={d.cx}
                            y={d.cy + 12}
                            textAnchor="middle"
                            fontSize="9"
                            fill="#7dd3fc"
                          >
                            {info.rate}%
                          </text>
                        )}
                      </g>
                    );
                  })}
                </>
              );
            })()}

            {/* Compass */}
            <g transform="translate(450,70)" opacity="0.8">
              <circle r="14" fill="none" stroke="#22d3ee" strokeWidth="1" />
              <text y="-16" textAnchor="middle" fontSize="10" fill="#22d3ee">N</text>
              <path d="M0,-10 L4,4 L0,0 L-4,4 Z" fill="#22d3ee" />
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-slate-950/70 px-2 py-1 text-[10px] text-slate-300 ring-1 ring-cyan-500/20">
            <span>完成率</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />≥92%</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan-400" />85–92%</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />80–85%</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" />&lt;80%</span>
          </div>
          <div className="absolute right-2 top-2 rounded bg-slate-950/70 px-2 py-1 text-[10px] text-cyan-300 ring-1 ring-cyan-500/20">
            南京市 · 3D 行政区示意
          </div>
        </div>

        {/* Right list */}
        <div className="max-h-[420px] overflow-auto pr-1 text-xs">
          <p className="mb-1 text-[10px] tracking-wider text-slate-400">区县明细</p>
          <ul className="space-y-1.5">
            {njMap
              .slice()
              .sort((a, b) => b.kids - a.kids)
              .map((d) => (
                <li
                  key={d.name}
                  className="flex items-center justify-between rounded border border-slate-700/40 bg-slate-800/30 px-2 py-1.5"
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: color(d.rate) }}
                    />
                    <span className="font-semibold text-slate-100">{d.name}</span>
                  </span>
                  <span className="text-right text-[10px] text-slate-400">
                    <div className="tabular-nums text-cyan-300">
                      {d.kids.toLocaleString("zh-CN")} 人
                    </div>
                    <div>{d.schools} 校 · {d.rate}%</div>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
