import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { EIcon } from "@/components/EIcon";

export const Route = createFileRoute("/admin")({
  component: AdminConsole,
  head: () => ({
    meta: [
      { title: "阳光校园健康 · 后台管理系统" },
      { name: "description", content: "学校学生同步、体检批次规划与调度、数据回流统计的 PC 后台" },
      { property: "og:title", content: "阳光校园健康 · 后台管理" },
      { property: "og:description", content: "学生同步 · 体检规划 · 数据回流统计" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type Tab = "overview" | "students" | "plan" | "schedule" | "stats";

const schools = [
  { name: "阳光小学", students: 1284, synced: "2026-09-15 08:20", status: "已同步" },
  { name: "青苗小学", students: 962, synced: "2026-09-14 17:50", status: "已同步" },
  { name: "实验二小", students: 1550, synced: "2026-09-10 09:10", status: "待同步" },
  { name: "海棠中学", students: 2103, synced: "2026-09-12 11:30", status: "已同步" },
];

const batches = [
  {
    id: "B-2026-09-18",
    date: "2026-09-18",
    school: "阳光小学",
    location: "行政楼 3F 体检中心",
    classes: ["三年级 1 班", "三年级 2 班", "三年级 3 班"],
    items: ["身高体重", "视力", "血压", "口腔", "内科", "血常规"],
    doctors: ["张主任", "李医生", "陈医生"],
    nurses: ["王护士", "刘护士"],
    students: 128,
    status: "进行中",
  },
  {
    id: "B-2026-09-20",
    date: "2026-09-20",
    school: "青苗小学",
    location: "操场东侧临时体检点",
    classes: ["一年级全", "二年级全"],
    items: ["身高体重", "视力", "口腔", "内科"],
    doctors: ["赵医生", "钱医生"],
    nurses: ["孙护士"],
    students: 240,
    status: "待开始",
  },
  {
    id: "B-2026-09-12",
    date: "2026-09-12",
    school: "海棠中学",
    location: "校医院 2F",
    classes: ["初一年级"],
    items: ["身高体重", "视力", "血压", "血常规", "尿常规", "心电图"],
    doctors: ["周主任", "吴医生"],
    nurses: ["郑护士", "王护士"],
    students: 320,
    status: "已完成",
  },
];

const kpis = [
  { k: "接入学校", v: "24", sub: "本学期" },
  { k: "在册学生", v: "18,642", sub: "已同步" },
  { k: "本月体检", v: "6,120", sub: "已完成" },
  { k: "异常检出率", v: "18.6%", sub: "近 30 天" },
];

const abnormalStats = [
  { name: "视力异常", value: 1032, pct: 32 },
  { name: "BMI 偏高", value: 684, pct: 22 },
  { name: "龋齿", value: 512, pct: 16 },
  { name: "血压偏高", value: 218, pct: 7 },
  { name: "过敏 / 哮喘", value: 174, pct: 6 },
  { name: "其他", value: 540, pct: 17 },
];

function AdminConsole() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "总览", icon: "📊" },
    { id: "students", label: "学校 / 学生同步", icon: "🏫" },
    { id: "plan", label: "体检规划", icon: "🗓️" },
    { id: "schedule", label: "调度安排", icon: "👥" },
    { id: "stats", label: "数据回流 / 统计", icon: "📈" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f4f6fb] text-slate-800">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-deep text-white">
            <EIcon e="🌤️" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold">阳光校园健康 · 后台管理</p>
            <p className="text-[11px] text-slate-500">Admin Console · v0.1</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">运行正常</span>
          <span>南京市教育局 · 管理员</span>
          <Link to="/" className="rounded-lg border border-slate-200 px-3 py-1 hover:bg-slate-50">
            返回门户
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="min-h-[calc(100vh-56px)] w-56 shrink-0 border-r border-slate-200 bg-white px-3 py-4">
          <ul className="space-y-1">
            {tabs.map((t) => {
              const on = tab === t.id;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setTab(t.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      on
                        ? "bg-teal/10 text-teal font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <EIcon e={t.icon} className="h-4 w-4" />
                    <span>{t.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-xl bg-gradient-to-br from-teal/10 to-deep/10 p-3 text-[11px] text-slate-600">
            <p className="font-semibold text-deep">数据流</p>
            <p className="mt-1 leading-relaxed">
              后台建档 → 手机端采集 → 数据回流 → 统计分析
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          {tab === "overview" && <Overview />}
          {tab === "students" && <Students />}
          {tab === "plan" && <Plan />}
          {tab === "schedule" && <Schedule />}
          {tab === "stats" && <Stats />}
        </main>
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 ${className}`}>
      {children}
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.k}>
            <p className="text-xs text-slate-500">{k.k}</p>
            <p className="mt-1 text-2xl font-bold text-slate-800">{k.v}</p>
            <p className="mt-1 text-[11px] text-slate-400">{k.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">近期体检批次</p>
            <span className="text-[11px] text-slate-400">共 {batches.length} 场</span>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="py-2 text-left font-normal">批次</th>
                <th className="text-left font-normal">学校</th>
                <th className="text-left font-normal">日期</th>
                <th className="text-left font-normal">人数</th>
                <th className="text-left font-normal">状态</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b border-slate-50">
                  <td className="py-2 font-mono text-xs text-slate-500">{b.id}</td>
                  <td>{b.school}</td>
                  <td>{b.date}</td>
                  <td>{b.students}</td>
                  <td>
                    <StatusBadge s={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <p className="mb-3 text-sm font-semibold">数据回流 · 今日</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-slate-500">已录入</span>
              <b>1,286</b>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-500">待审核</span>
              <b className="text-amber-600">128</b>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-500">异常标记</span>
              <b className="text-rose-600">96</b>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-500">已下发方案</span>
              <b className="text-teal">62</b>
            </li>
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[11px] text-slate-500">
            手机端体检结束后，数据自动回流至后台进行审核与统计。
          </div>
        </Card>
      </div>
    </div>
  );
}

function Students() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">学校学生同步</p>
            <p className="text-[11px] text-slate-500">
              对接教育局学籍系统 / 手动导入 Excel，同步在册学生名单
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-slate-50">
              导入 Excel
            </button>
            <button className="rounded-lg bg-teal px-3 py-1.5 text-xs text-white hover:opacity-90">
              一键同步学籍
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500">
            <tr className="border-b border-slate-100">
              <th className="py-2 text-left font-normal">学校</th>
              <th className="text-left font-normal">在册学生</th>
              <th className="text-left font-normal">最近同步</th>
              <th className="text-left font-normal">状态</th>
              <th className="text-left font-normal">操作</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.name} className="border-b border-slate-50">
                <td className="py-2 font-medium">{s.name}</td>
                <td>{s.students.toLocaleString()}</td>
                <td className="text-slate-500">{s.synced}</td>
                <td>
                  <StatusBadge s={s.status} />
                </td>
                <td>
                  <button className="text-xs text-teal hover:underline">同步 ›</button>
                  <button className="ml-3 text-xs text-slate-500 hover:underline">查看名单</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <p className="mb-2 text-sm font-semibold">同步字段映射</p>
        <div className="grid grid-cols-4 gap-2 text-[11px]">
          {["学号", "姓名", "性别", "出生日期", "年级", "班级", "监护人手机", "家庭住址"].map((f) => (
            <div key={f} className="rounded-lg bg-slate-50 px-3 py-2 text-slate-600">
              {f}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Plan() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">体检规划</p>
          <p className="text-[11px] text-slate-500">配置日期、学校 / 班级、场地、体检项目</p>
        </div>
        <button className="rounded-lg bg-teal px-3 py-1.5 text-xs text-white">+ 新建批次</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {batches.map((b) => (
          <Card key={b.id}>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-xs text-slate-500">{b.id}</p>
              <StatusBadge s={b.status} />
            </div>
            <p className="text-base font-bold">
              {b.school} · {b.date}
            </p>
            <p className="mt-1 text-xs text-slate-500">📍 {b.location}</p>

            <div className="mt-3 space-y-2 text-xs">
              <Row label="参检班级">
                <div className="flex flex-wrap gap-1">
                  {b.classes.map((c) => (
                    <span key={c} className="rounded bg-teal/10 px-2 py-0.5 text-teal">
                      {c}
                    </span>
                  ))}
                </div>
              </Row>
              <Row label="体检项目">
                <div className="flex flex-wrap gap-1">
                  {b.items.map((i) => (
                    <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                      {i}
                    </span>
                  ))}
                </div>
              </Row>
              <Row label="预计人数">
                <b>{b.students} 人</b>
              </Row>
            </div>

            <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
              <button className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs">编辑</button>
              <button className="flex-1 rounded-lg bg-slate-50 py-1.5 text-xs text-slate-600">调度安排</button>
              <button className="flex-1 rounded-lg bg-deep py-1.5 text-xs text-white">下发批次</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="mb-3 text-sm font-semibold">调度安排 · B-2026-09-18 阳光小学</p>
        <div className="grid grid-cols-6 gap-2 text-[11px]">
          <div className="col-span-1 rounded-lg bg-slate-50 p-2 font-semibold text-slate-500">工位 / 项目</div>
          {["08:30", "09:00", "09:30", "10:00", "10:30"].map((t) => (
            <div key={t} className="rounded-lg bg-slate-50 p-2 text-center font-semibold text-slate-500">
              {t}
            </div>
          ))}
          {[
            { name: "身高体重 · 王护士", cells: ["三1", "三1", "三2", "三2", "三3"] },
            { name: "视力 · 张主任", cells: ["三1", "三2", "三2", "三3", "三3"] },
            { name: "血压 · 李医生", cells: ["三1", "三1", "三2", "三3", "三3"] },
            { name: "口腔 · 陈医生", cells: ["三1", "三2", "三2", "三3", "—"] },
            { name: "内科 · 张主任", cells: ["三1", "三1", "三2", "三2", "三3"] },
          ].map((row) => (
            <>
              <div key={row.name} className="rounded-lg bg-white p-2 ring-1 ring-slate-100">
                {row.name}
              </div>
              {row.cells.map((c, i) => (
                <div
                  key={row.name + i}
                  className={`rounded-lg p-2 text-center ${
                    c === "—" ? "bg-slate-50 text-slate-300" : "bg-teal/10 text-teal"
                  }`}
                >
                  {c}
                </div>
              ))}
            </>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="mb-2 text-sm font-semibold">参检人员</p>
          <ul className="space-y-2 text-sm">
            {["张主任 · 内科 / 视力", "李医生 · 血压", "陈医生 · 口腔", "王护士 · 身高体重", "刘护士 · 采血"].map((p) => (
              <li key={p} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>{p}</span>
                <button className="text-xs text-teal">调整</button>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="mb-2 text-sm font-semibold">场地与设备</p>
          <ul className="space-y-2 text-sm">
            {[
              "行政楼 3F · 5 号工位",
              "身高体重仪 ×2 (已联网)",
              "自动视力仪 ×2 (已联网)",
              "电子血压计 ×2",
              "手动录入终端 ×3 (iPad)",
            ].map((p) => (
              <li key={p} className="rounded-lg bg-slate-50 px-3 py-2">
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[
          { k: "完成率", v: "94.8%" },
          { k: "异常检出", v: "1,138" },
          { k: "复核转诊", v: "126" },
          { k: "方案下发", v: "820" },
        ].map((k) => (
          <Card key={k.k}>
            <p className="text-xs text-slate-500">{k.k}</p>
            <p className="mt-1 text-2xl font-bold">{k.v}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <p className="mb-3 text-sm font-semibold">异常分布</p>
          <ul className="space-y-2">
            {abnormalStats.map((a) => (
              <li key={a.name}>
                <div className="flex items-center justify-between text-xs">
                  <span>{a.name}</span>
                  <span className="text-slate-500">
                    {a.value.toLocaleString()} · {a.pct}%
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal" style={{ width: `${a.pct * 2}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="mb-3 text-sm font-semibold">数据回流状态</p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-slate-500">手机端已上传</span>
              <b>6,024</b>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">自动同步设备</span>
              <b>4,120</b>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">手动录入</span>
              <b>1,904</b>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">待补录</span>
              <b className="text-amber-600">96</b>
            </li>
          </ul>
          <button className="mt-3 w-full rounded-lg bg-deep py-2 text-xs text-white">
            导出统计报表
          </button>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="w-16 shrink-0 text-slate-400">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    已同步: "bg-emerald-50 text-emerald-600",
    待同步: "bg-amber-50 text-amber-600",
    进行中: "bg-teal/10 text-teal",
    待开始: "bg-slate-100 text-slate-500",
    已完成: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] ${map[s] ?? "bg-slate-100 text-slate-500"}`}>
      {s}
    </span>
  );
}
