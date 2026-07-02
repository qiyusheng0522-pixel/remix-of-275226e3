import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/school/me")({
  component: SchoolMe,
});

const groups = [
  {
    title: "校内协同",
    items: [
      { icon: "👨‍🏫", label: "班主任任务", right: "12 项进行中" },
      { icon: "🏥", label: "校医任务", right: "3 项待处理" },
      { icon: "⚽", label: "体育老师任务", right: "5 项" },
      { icon: "🍱", label: "食堂 / 后勤", right: "计划中" },
    ],
  },
  {
    title: "账号与说明",
    items: [
      { icon: "📩", label: "消息通知", right: "5 条未读" },
      { icon: "📜", label: "操作记录", right: "" },
      { icon: "🔒", label: "隐私与权限说明", right: "" },
      { icon: "❓", label: "帮助中心", right: "" },
    ],
  },
];

function SchoolMe() {
  return (
    <div>
      <StatusBar title="我的" />
      <div className="relative overflow-hidden px-5 pb-14 pt-4">
        <div className="absolute inset-0 -z-0 bg-gradient-to-br from-teal via-teal/70 to-deep" />
        <div className="relative flex items-center gap-4 text-white">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/25 text-3xl backdrop-blur">
            👨‍🏫
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">张老师</p>
            <p className="text-xs text-white/80">阳光小学 · 卫生保健老师</p>
          </div>
        </div>
      </div>

      <div className="-mt-8 px-5 pb-8">
        <div className="mb-5 grid grid-cols-3 gap-2 rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60">
          {[
            { k: "本学期体检", v: "486" },
            { k: "跟进任务", v: "24" },
            { k: "完成率", v: "78%" },
          ].map((s) => (
            <div key={s.k} className="text-center">
              <p className="text-lg font-extrabold text-teal">{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {groups.map((g) => (
            <section key={g.title}>
              <p className="mb-2 px-1 text-xs text-muted-foreground">{g.title}</p>
              <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
                {g.items.map((it) => (
                  <li key={it.label} className="flex items-center gap-3 px-4 py-3 active:bg-surface-2">
                    <span className="text-lg">{it.icon}</span>
                    <span className="flex-1 text-sm">{it.label}</span>
                    {it.right && <span className="text-[11px] text-muted-foreground">{it.right}</span>}
                    <span className="text-muted-foreground">›</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

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
