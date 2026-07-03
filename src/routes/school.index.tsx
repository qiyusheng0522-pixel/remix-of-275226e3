import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { schoolStats, classSchedule } from "@/lib/mock-data";

export const Route = createFileRoute("/school/")({
  component: SchoolHome,
});

const todos = [
  { icon: "🔔", title: "催办未授权家长", count: 18, tint: "warm", to: "/school/notify" },
  { icon: "📝", title: "未完成健康问卷", count: 85, tint: "teal", to: "/school/notify" },
  { icon: "🚫", title: "今日缺检学生", count: 6, tint: "warning", to: "/school/absent" },
  { icon: "📬", title: "报告未读家长", count: 89, tint: "deep", to: "/school/report" },
] as const;

const quick = [
  { icon: "🚨", label: "异常上报", to: "/school/abnormal" },
  { icon: "📊", label: "报告中心", to: "/school/report" },
  { icon: "🏥", label: "缺检补检", to: "/school/absent" },
  { icon: "⭐", label: "需关注", to: "/school/focus" },
] as const;

function SchoolHome() {
  const pct = Math.round((schoolStats.examined / schoolStats.totalStudents) * 100);
  return (
    <div>
      <StatusBar title="学校端" />

      <div className="relative overflow-hidden px-5 pb-6 pt-4">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/25 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">阳光小学 · 卫生保健老师</p>
            <h1 className="text-lg font-bold">今日体检工作台 🏫</h1>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-surface text-lg shadow-sm">🔔</button>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-teal to-deep p-5 text-white shadow-lg shadow-teal/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">春季体检 · 第 2 批次 · 进行中</p>
              <p className="mt-1 text-2xl font-extrabold">
                {schoolStats.examined}
                <span className="text-sm font-medium opacity-80"> / {schoolStats.totalStudents}</span>
              </p>
              <p className="text-[11px] opacity-80">已完成 · 进度 {pct}% · 今日 1-6 班</p>
            </div>
            <Link to="/school/today" className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-2xl backdrop-blur">
              📋
            </Link>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        <div className="grid grid-cols-4 gap-2">
          {[
            { k: "已授权", v: schoolStats.authorized, c: "success" },
            { k: "未授权", v: schoolStats.unauthorized, c: "warm" },
            { k: "问卷", v: schoolStats.questionnaireDone, c: "teal" },
            { k: "关注", v: schoolStats.needFocus, c: "warning" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-surface p-3 text-center shadow-sm ring-1 ring-border/60">
              <p className={`text-lg font-extrabold text-${s.c}`}>{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">待处理任务</h2>
            <span className="text-[11px] text-muted-foreground">一键处理</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {todos.map((t) => (
              <Link
                key={t.title}
                to={t.to}
                className={`rounded-2xl bg-${t.tint}/10 p-4 text-left ring-1 ring-${t.tint}/20`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xl">{t.icon}</span>
                  <span className={`text-xl font-extrabold text-${t.tint}`}>{t.count}</span>
                </div>
                <p className="text-xs">{t.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">今日班级排程</h2>
            <Link to="/school/today" className="text-xs text-teal">查看全部 →</Link>
          </div>
          <ul className="space-y-2">
            {classSchedule.slice(0, 4).map((c) => (
              <li key={c.name} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/15 text-sm font-bold text-teal">
                  {c.time.slice(0, 5)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.location} · {c.count} 人</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] ${
                    c.status === "已完成"
                      ? "bg-success/15 text-success"
                      : c.status === "进行中"
                      ? "bg-warm/15 text-warm"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">学生变化观察</h2>
            <Link to="/school/observe" className="text-xs text-teal">查看趋势 →</Link>
          </div>
          <Link to="/school/observe" className="block rounded-2xl bg-gradient-to-br from-teal/10 to-deep/10 p-4 ring-1 ring-teal/20">
            <p className="text-xs text-muted-foreground">家庭呵护任务启动率</p>
            <p className="mt-1 text-xl font-extrabold text-teal">72%</p>
            <p className="mt-1 text-[11px] text-muted-foreground">较上月 ↑ 8% · 体重/呼吸不适趋势下降</p>
          </Link>
        </section>

        <div className="grid grid-cols-4 gap-2 pb-6">
          {quick.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="flex flex-col items-center gap-1 rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60"
            >
              <span className="text-xl">{a.icon}</span>
              <span className="text-[11px] text-muted-foreground">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
