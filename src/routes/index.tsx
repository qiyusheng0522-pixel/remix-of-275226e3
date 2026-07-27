import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Settings } from "lucide-react";

import { EIcon } from "@/components/EIcon";
import { MobileFrame, StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/")({
  component: Landing,
});

const roles = [
  {
    to: "/parent",
    tint: "from-warm to-warm/75",
    ring: "ring-warm/25",
    glow: "bg-warm/20",
    icon: <EIcon e="👨‍👩‍👧" />,
    title: "家长端",
    subtitle: "查看孩子体检报告、完成家庭健康呵护任务",
    features: ["体检报告解读", "每日呵护任务", "健康管理师沟通"],
  },
  {
    to: "/school",
    tint: "from-teal to-teal/75",
    ring: "ring-teal/25",
    glow: "bg-teal/20",
    icon: <EIcon e="🏫" />,
    title: "学校端",
    subtitle: "组织体检批次、跟进授权与需关注学生",
    features: ["班级排程", "家长授权跟进", "现场协同"],
  },
  {
    to: "/doctor",
    tint: "from-deep to-deep/75",
    ring: "ring-deep/25",
    glow: "bg-deep/20",
    icon: <EIcon e="🩺" />,
    title: "医生端",
    subtitle: "校内录检、报告审核与重点儿童干预",
    features: ["现场录检", "风险复核", "健康方案下发"],
  },
  {
    to: "/community",
    tint: "from-rose to-rose/75",
    ring: "ring-rose/25",
    glow: "bg-rose/20",
    icon: <EIcon e="🏥" />,
    title: "社区端",
    subtitle: "承接服务包与复诊转入患者，做长期随访与宣教",
    features: ["服务包随访", "复诊转社区", "宣教 / 咨询回复"],
  },
] as const;

function Landing() {
  return (
    <MobileFrame bg="bg-surface-2">
      <StatusBar />
      {/* Tint sits over an opaque screen base so the device bezel never shows
          through the translucent gradient stops. */}
      <div className="flex flex-1 flex-col bg-gradient-to-b from-warm/12 via-transparent to-teal/12 px-5 pb-8 pt-5">
        <header className="mb-7 text-center">
          <div className="mx-auto mb-3.5 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-warm to-teal text-[30px] text-white shadow-lg shadow-warm/25">
            <EIcon e="🌤️" />
          </div>
          <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-foreground">
            阳光校园健康
          </h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            儿童体检 · 家校医协同 · 全周期呵护
          </p>
        </header>

        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
            选择你的身份进入
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <nav aria-label="选择身份" className="flex flex-col gap-3">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className={`group relative overflow-hidden rounded-3xl bg-surface p-4 shadow-sm ring-1 transition hover:shadow-md active:scale-[0.985] ${r.ring}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${r.glow}`}
              />
              <div className="relative flex items-start gap-3.5">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-[22px] text-white shadow-sm ${r.tint}`}
                >
                  {r.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[17px] font-bold leading-none">{r.title}</h2>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/60 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-pretty text-muted-foreground">
                    {r.subtitle}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {r.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        <Link
          to="/admin"
          className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/70 p-3.5 transition hover:border-solid hover:bg-surface"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
            <Settings className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-medium tracking-widest text-muted-foreground">
              PC · 后台管理系统
            </span>
            <span className="mt-0.5 block truncate text-[13px] font-bold">
              学生同步 · 体检规划 · 数据统计
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
        </Link>

        <p className="mt-auto pt-6 text-center text-[10px] text-muted-foreground/70">
          原型演示 · Mock 数据 · v0.1
        </p>
      </div>
    </MobileFrame>
  );
}
