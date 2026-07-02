import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { classSchedule } from "@/lib/mock-data";

export const Route = createFileRoute("/school/tasks")({
  component: TasksPage,
});

const batches = [
  { name: "春季常规体检", org: "阳光社区卫生服务中心", date: "2025-03-15 ~ 03-22", status: "进行中" },
  { name: "口腔专项", org: "市口腔医院", date: "2025-04-08", status: "待启动" },
];

function TasksPage() {
  return (
    <div>
      <StatusBar title="体检任务" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">体检任务</h1>
        <p className="mb-4 text-xs text-muted-foreground">教育局下发 · 阳光小学</p>

        {/* Batches */}
        <div className="mb-5 space-y-3">
          {batches.map((b) => (
            <div key={b.name} className="overflow-hidden rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold">{b.name}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${
                        b.status === "进行中"
                          ? "bg-warm/15 text-warm"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{b.org}</p>
                  <p className="text-[11px] text-muted-foreground">📅 {b.date}</p>
                </div>
                <span className="text-muted-foreground">›</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  { k: "体检项目", v: "12 项" },
                  { k: "覆盖班级", v: "18 班" },
                  { k: "体检人数", v: "486" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-surface-2 py-1.5">
                    <p className="text-sm font-bold">{s.v}</p>
                    <p className="text-[10px] text-muted-foreground">{s.k}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">今日班级排程</h2>
          <div className="flex gap-1">
            <button className="rounded-full bg-teal/10 px-3 py-1 text-[11px] text-teal">今日</button>
            <button className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">明日</button>
          </div>
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[9px] top-2 h-full w-0.5 bg-border" />
          <ul className="space-y-3">
            {classSchedule.map((c, i) => (
              <li key={c.name} className="relative rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60">
                <span
                  className={`absolute -left-[22px] top-4 grid h-4 w-4 place-items-center rounded-full ring-4 ring-surface-2 ${
                    c.status === "已完成"
                      ? "bg-success"
                      : c.status === "进行中"
                      ? "bg-warm animate-pulse"
                      : "bg-muted"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {c.time} · {c.location} · 带队: 王老师
                    </p>
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
                </div>
                {i === 1 && (
                  <div className="mt-2 flex gap-2">
                    <button className="flex-1 rounded-xl bg-teal py-1.5 text-[11px] font-medium text-teal-foreground">
                      通知到场
                    </button>
                    <button className="rounded-xl bg-surface-2 px-3 py-1.5 text-[11px]">标记延迟</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
