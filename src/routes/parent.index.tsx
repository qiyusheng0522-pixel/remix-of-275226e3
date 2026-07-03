import { createFileRoute, Link } from "@tanstack/react-router";
import { child, todayTasks } from "@/lib/mock-data";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/")({
  component: ParentHome,
});

function ParentHome() {
  const doneCount = todayTasks.filter((t) => t.done).length;
  const pct = Math.round((doneCount / todayTasks.length) * 100);

  return (
    <div>
      <StatusBar title="阳光校园" />

      {/* Header */}
      <div className="relative overflow-hidden px-5 pb-6 pt-4">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warm/20 blur-3xl" />
        <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-teal/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">下午好，李妈妈</p>
            <h1 className="text-lg font-bold">今天也要照顾好小雨 ☀️</h1>
          </div>
          <Link to="/parent/me" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-lg shadow-sm">
            🔔
          </Link>
        </div>

        {/* Child card */}
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-warm to-warm/70 p-5 text-white shadow-lg shadow-warm/30">
          <div className="flex items-start gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/25 text-3xl backdrop-blur">
              {child.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-lg font-bold">{child.name}</h2>
                <span className="rounded-full bg-white/25 px-2 py-0.5 text-[11px]">
                  {child.age}岁 · {child.gender}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-white/80">
                {child.school} · {child.grade}{child.className}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  { k: "身高", v: `${child.height}cm` },
                  { k: "体重", v: `${child.weight}kg` },
                  { k: "BMI", v: child.bmi },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-white/20 py-1.5 backdrop-blur">
                    <div className="text-sm font-bold">{s.v}</div>
                    <div className="text-[10px] text-white/80">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        {/* 体检通知横幅 */}
        <Link
          to="/parent/notice"
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal/20 to-warm/10 p-4 ring-1 ring-teal/20"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal text-lg text-teal-foreground">
            📢
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">春季体检通知已到达</p>
            <p className="text-[11px] text-muted-foreground">4 月 15 日 · 阳光小学 · 需家长授权</p>
          </div>
          <span className="rounded-full bg-warm px-2.5 py-1 text-[11px] text-warm-foreground">去授权</span>
        </Link>

        {/* Latest exam */}
        <Link
          to="/parent/report"
          className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/15 text-xl">📋</div>
            <div>
              <p className="text-sm font-semibold">最近一次体检</p>
              <p className="text-xs text-muted-foreground">{child.lastExam} · 报告已发布</p>
            </div>
          </div>
          <span className="rounded-full bg-warning/20 px-2.5 py-1 text-[11px] font-medium text-warning-foreground">
            黄色·需关注
          </span>
        </Link>

        {/* 呵护摘要（生活化文案） */}
        <div className="rounded-2xl bg-warm/10 p-4 ring-1 ring-warm/20">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">🌱</span>
            <span className="text-sm font-semibold text-warm">孩子今日呵护</span>
          </div>
          <p className="text-xs leading-relaxed text-foreground/85">
            小雨这次学校体检后，有 <b>2 项</b> 需要家庭关注：
          </p>
          <ul className="mt-1.5 space-y-1 text-xs text-foreground/85">
            <li>· 体重管理需关注</li>
            <li>· 呼吸运动需关注</li>
          </ul>
          <p className="mt-3 text-xs font-medium">今天先做 3 件小事：</p>
          <ul className="mt-1 space-y-1 text-xs text-foreground/85">
            <li>☐ 今天不喝含糖饮料</li>
            <li>☐ 晚上 21:30 前开始睡前准备</li>
            <li>☐ 记录运动后是否咳嗽 / 胸闷</li>
          </ul>
        </div>

        {/* Today tasks */}
        <div className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">今日呵护任务</p>
              <p className="text-[11px] text-muted-foreground">
                已完成 {doneCount}/{todayTasks.length}
              </p>
            </div>
            <Link to="/parent/care" className="text-xs text-warm">
              查看全部 →
            </Link>
          </div>
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-warm to-teal transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ul className="space-y-2">
            {todayTasks.slice(0, 3).map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2"
              >
                <span className="text-lg">{t.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>
                    {t.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{t.tag} · {t.time}</p>
                </div>
                {t.done ? (
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] text-success">已完成</span>
                ) : (
                  <button className="rounded-full bg-warm px-3 py-1 text-[11px] font-medium text-warm-foreground">
                    打卡
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Review + Health manager */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/parent/review" className="rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 p-4 ring-1 ring-teal/20">
            <div className="mb-1 text-lg">🗓️</div>
            <p className="text-xs text-muted-foreground">下次复评</p>
            <p className="mt-1 text-sm font-semibold">1 月复评</p>
            <p className="text-[11px] text-muted-foreground">5 月 15 日 · 待问卷</p>
          </Link>
          <Link
            to="/parent/comm"
            className="rounded-2xl bg-gradient-to-br from-warm/20 to-warm/5 p-4 ring-1 ring-warm/20"
          >
            <div className="mb-1 text-lg">💬</div>
            <p className="text-xs text-muted-foreground">健康管理师</p>
            <p className="mt-1 text-sm font-semibold">在线咨询</p>
            <p className="text-[11px] text-muted-foreground">今日 2 条新回复</p>
          </Link>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "✍️", label: "授权", to: "/parent/notice" },
            { icon: "👶", label: "绑定", to: "/parent/bind" },
            { icon: "🛏️", label: "除螨", to: "/parent/dustmite" },
            { icon: "📄", label: "隐私", to: "/parent/me" },
          ].map((a) => (
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

        {/* Terminate soft entry */}
        <Link
          to="/parent/terminate"
          className="mb-6 block rounded-2xl bg-surface p-3 text-center text-xs text-muted-foreground shadow-sm ring-1 ring-border/60"
        >
          随时可 <span className="text-danger">终止后续健康管理</span> · 历史报告保留
        </Link>
      </div>
    </div>
  );
}
