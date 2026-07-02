import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { child } from "@/lib/mock-data";

export const Route = createFileRoute("/parent/me")({
  component: MePage,
});

const groups = [
  {
    title: "儿童与授权",
    items: [
      { icon: "👶", label: "儿童档案", right: `${child.name} · ${child.grade}` },
      { icon: "🔗", label: "绑定儿童 / 多监护人", right: "1 名孩子" },
      { icon: "✍️", label: "授权与告知书", right: "已授权" },
      { icon: "🗂️", label: "授权与终止记录", right: "查看" },
    ],
  },
  {
    title: "健康与消息",
    items: [
      { icon: "📩", label: "消息通知", right: "3 条未读" },
      { icon: "🏥", label: "联系学校 / 健康管理师", right: "" },
      { icon: "🔒", label: "数据使用与隐私说明", right: "" },
      { icon: "❓", label: "帮助中心", right: "" },
    ],
  },
];

function MePage() {
  return (
    <div>
      <StatusBar title="我的" />

      {/* Header */}
      <div className="relative overflow-hidden px-5 pb-14 pt-4">
        <div className="absolute inset-0 -z-0 bg-gradient-to-br from-warm via-warm/70 to-teal" />
        <div className="relative flex items-center gap-4 text-white">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/25 text-3xl backdrop-blur">
            👩
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">李妈妈</p>
            <p className="text-xs text-white/80">监护人 · 138****2201</p>
          </div>
          <button className="rounded-full bg-white/25 px-3 py-1.5 text-xs text-white backdrop-blur">
            编辑
          </button>
        </div>
      </div>

      <div className="-mt-8 px-5 pb-8">
        {/* Child summary */}
        <div className="mb-5 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-warm/15 text-xl">
              {child.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{child.name}</p>
              <p className="text-[11px] text-muted-foreground">
                {child.school} · {child.grade}{child.className} · 学号 {child.studentId}
              </p>
            </div>
            <Link to="/parent/report" className="text-xs text-warm">档案 →</Link>
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-4">
          {groups.map((g) => (
            <section key={g.title}>
              <p className="mb-2 px-1 text-xs text-muted-foreground">{g.title}</p>
              <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
                {g.items.map((it) => (
                  <li
                    key={it.label}
                    className="flex items-center gap-3 px-4 py-3 active:bg-surface-2"
                  >
                    <span className="text-lg">{it.icon}</span>
                    <span className="flex-1 text-sm">{it.label}</span>
                    {it.right && (
                      <span className="text-[11px] text-muted-foreground">{it.right}</span>
                    )}
                    <span className="text-muted-foreground">›</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <button className="w-full rounded-2xl bg-surface p-3 text-sm text-danger shadow-sm ring-1 ring-danger/20">
            终止后续健康管理
          </button>
          <Link
            to="/"
            className="block w-full rounded-2xl bg-surface p-3 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-border/60"
          >
            切换身份
          </Link>
        </div>
      </div>
    </div>
  );
}
