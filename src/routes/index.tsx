import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Landing,
});

const roles = [
  {
    to: "/parent",
    tint: "from-warm to-warm/70",
    ring: "ring-warm/30",
    icon: "👨‍👩‍👧",
    title: "家长端",
    subtitle: "查看孩子体检报告、完成家庭健康呵护任务",
    features: ["体检报告解读", "每日呵护任务", "健康管理师沟通"],
  },
  {
    to: "/school",
    tint: "from-teal to-teal/70",
    ring: "ring-teal/30",
    icon: "🏫",
    title: "学校端",
    subtitle: "组织体检批次、跟进授权与需关注学生",
    features: ["班级排程", "家长授权跟进", "现场协同"],
  },
  {
    to: "/doctor",
    tint: "from-deep to-deep/70",
    ring: "ring-deep/30",
    icon: "🩺",
    title: "医生端",
    subtitle: "校内录检、报告审核与重点儿童干预",
    features: ["现场录检", "风险复核", "健康方案下发"],
  },
] as const;

function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-warm/15 via-surface-2 to-teal/15">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-14">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-warm to-teal text-3xl shadow-lg shadow-warm/30">
            🌤️
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            阳光校园健康
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            儿童体检 · 家校医协同 · 全周期呵护
          </p>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">选择你的身份进入</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col gap-4">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className={`group relative overflow-hidden rounded-3xl bg-surface p-5 shadow-sm ring-1 ${r.ring} transition active:scale-[0.98]`}
            >
              <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${r.tint} opacity-20 blur-2xl`} />
              <div className="flex items-start gap-4">
                <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${r.tint} text-2xl text-white shadow-md`}>
                  {r.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{r.title}</h3>
                    <span className="text-muted-foreground group-hover:text-foreground">→</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {r.subtitle}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.features.map((f) => (
                      <span key={f} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-auto pt-8 text-center text-[11px] text-muted-foreground">
          原型演示 · Mock 数据 · v0.1
        </p>
      </div>
    </div>
  );
}
