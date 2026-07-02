import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { doctorStats } from "@/lib/mock-data";

export const Route = createFileRoute("/doctor/")({
  component: DoctorHome,
});

const urgent = [
  { icon: "🚨", label: "健康管理师升级", count: 3, tint: "danger" },
  { icon: "📝", label: "待审核报告", count: doctorStats.pendingReview, tint: "warm" },
  { icon: "🔍", label: "待质控数据", count: doctorStats.pendingQC, tint: "warning" },
  { icon: "⭐", label: "重点复核", count: doctorStats.focusPool, tint: "teal" },
];

function DoctorHome() {
  return (
    <div>
      <StatusBar title="医生端" />

      <div className="relative overflow-hidden px-5 pb-6 pt-4">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-deep/25 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">下午好，陈医生</p>
            <h1 className="text-lg font-bold">今日工作台 🩺</h1>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-surface text-lg shadow-sm">
            🔔
          </button>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-deep to-teal p-5 text-white shadow-lg shadow-deep/25">
          <p className="text-xs opacity-90">今日进校体检</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold">{doctorStats.todaySchool}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-white">
            <Stat k="体检人数" v={doctorStats.todayCount} />
            <Stat k="已录入" v={168} />
            <Stat k="待复测" v={9} />
          </div>
          <div className="mt-4 flex gap-2">
            <Link to="/doctor/exam" className="flex-1 rounded-xl bg-white/20 py-2 text-center text-xs font-medium backdrop-blur">
              进入现场录检
            </Link>
            <button className="rounded-xl bg-white px-4 py-2 text-xs font-medium text-deep">
              确认准备
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        {/* Urgent */}
        <section>
          <h2 className="mb-2 text-sm font-semibold">待处理提醒</h2>
          <div className="grid grid-cols-2 gap-3">
            {urgent.map((u) => (
              <button
                key={u.label}
                className={`rounded-2xl bg-${u.tint}/10 p-4 text-left ring-1 ring-${u.tint}/20`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xl">{u.icon}</span>
                  <span className={`text-2xl font-extrabold text-${u.tint}`}>{u.count}</span>
                </div>
                <p className="text-xs">{u.label}</p>
              </button>
            ))}
          </div>
        </section>

        {/* High risk shortcut */}
        <Link
          to="/doctor/focus"
          className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-danger/15 to-warm/10 p-4 ring-1 ring-danger/20"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-danger/20 text-xl">
              🔴
            </div>
            <div>
              <p className="text-sm font-semibold">高风险儿童 · 3 名待复核</p>
              <p className="text-[11px] text-muted-foreground">2 名肥胖代谢风险 · 1 名过敏</p>
            </div>
          </div>
          <span className="text-muted-foreground">›</span>
        </Link>

        {/* Today schedule */}
        <section className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <h2 className="mb-3 text-sm font-semibold">进校任务安排</h2>
          <ul className="space-y-2">
            {[
              { school: "阳光小学", date: "今日 08:30", status: "进行中", count: 214 },
              { school: "阳光小学", date: "明日 08:30", status: "计划中", count: 272 },
              { school: "启明中学", date: "04-08", status: "待确认", count: 380 },
            ].map((s, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-deep/15 text-lg">
                  🏫
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{s.school}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.date} · {s.count} 人
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] ${
                    s.status === "进行中"
                      ? "bg-warm/15 text-warm"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="pb-6" />
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="rounded-xl bg-white/20 py-1.5 backdrop-blur">
      <p className="text-lg font-extrabold">{v}</p>
      <p className="text-[10px] opacity-80">{k}</p>
    </div>
  );
}
