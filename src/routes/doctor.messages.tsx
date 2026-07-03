import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/doctor/messages")({
  component: MessagesPage,
});

const groups = [
  {
    title: "高风险提醒",
    tint: "danger",
    items: [
      { t: "刘小强 血压偏高，已 3 次复测", time: "10 分钟前", to: "/doctor/focus" },
      { t: "陈静雅 建议绿色通道转诊", time: "1 小时前", to: "/doctor/referral" },
    ],
  },
  {
    title: "报告审核提醒",
    tint: "warm",
    items: [{ t: "三年级 3班 47 份报告待审核", time: "今日 09:00", to: "/doctor/review" }],
  },
  {
    title: "方案确认提醒",
    tint: "deep",
    items: [{ t: "李小雨 健康方案 v0.3 待确认", time: "昨日", to: "/doctor/plan" }],
  },
  {
    title: "健管师升级",
    tint: "teal",
    items: [{ t: "刘老师升级 2 例儿童", time: "12 分钟前", to: "/doctor/coord" }],
  },
  {
    title: "转诊处理提醒",
    tint: "warm",
    items: [{ t: "张小乐 变态反应科 已预约", time: "昨日", to: "/doctor/referral" }],
  },
];

function MessagesPage() {
  return (
    <div>
      <StatusBar title="消息" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">医生消息</h1>
        <p className="mb-4 text-xs text-muted-foreground">按类型分组 · 点击直达处理</p>

        <div className="space-y-4">
          {groups.map((g) => (
            <section key={g.title}>
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full bg-${g.tint}`} />
                <h2 className="text-sm font-semibold">{g.title}</h2>
                <span className="text-[11px] text-muted-foreground">· {g.items.length}</span>
              </div>
              <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
                {g.items.map((it, i) => (
                  <li key={i}>
                    <Link to={it.to} className="flex items-center gap-3 px-4 py-3 active:bg-surface-2">
                      <span className="flex-1 text-sm">{it.t}</span>
                      <span className="text-[11px] text-muted-foreground">{it.time}</span>
                      <span className="text-muted-foreground">›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
