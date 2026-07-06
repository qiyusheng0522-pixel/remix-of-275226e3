import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/parent/")({
  component: ParentHome,
});

type Kid = {
  id: string;
  short: string;
  name: string;
  age: number;
  tag: string;
  tagColor: "warm" | "rose";
};

const kids: Kid[] = [
  { id: "yang", short: "阳", name: "小阳", age: 7, tag: "肥胖倾向", tagColor: "warm" },
  { id: "yu", short: "雨", name: "小雨", age: 9, tag: "哮喘风险", tagColor: "rose" },
];

const quickAsk = [
  { icon: "🥗", label: "饮食建议", to: "/parent/comm" },
  { icon: "🏃", label: "运动咨询", to: "/parent/comm" },
  { icon: "😴", label: "睡眠咨询", to: "/parent/comm" },
  { icon: "📋", label: "报告解读", to: "/parent/report" },
] as const;

const homeCare = [
  {
    icon: "🛏️",
    title: "床品除螨清洗提醒",
    cycle: "每 2 周 · 下次 04-12",
    tag: "过敏防护",
    tagClass: "bg-rose/10 text-rose",
    progress: 65,
    daysLeft: 5,
  },
  {
    icon: "⚖️",
    title: "晨起体重记录",
    cycle: "每周 1 次 · 下次 周日",
    tag: "体重管理",
    tagClass: "bg-warm/15 text-warm",
    progress: 40,
    daysLeft: 3,
  },
  {
    icon: "🪟",
    title: "开窗通风换气",
    cycle: "每日 15 分钟 · 今日待完成",
    tag: "通风湿度",
    tagClass: "bg-teal/15 text-teal",
    progress: 0,
    daysLeft: 0,
  },
  {
    icon: "💧",
    title: "空气加湿器换水",
    cycle: "每 3 天 · 下次 04-08",
    tag: "呼吸道",
    tagClass: "bg-teal/15 text-teal",
    progress: 30,
    daysLeft: 2,
  },
  {
    icon: "🦷",
    title: "儿童牙刷更换",
    cycle: "每 3 个月 · 下次 05-20",
    tag: "口腔",
    tagClass: "bg-success/15 text-success",
    progress: 55,
    daysLeft: 44,
  },
];


const encyclopedia = [
  {
    kind: "视频",
    kindBg: "from-warm/70 to-warm",
    title: "孩子近视防控：20-20-20 用眼休息怎么做",
    meta: "李医生 · 4 分钟 · 1.2 万阅读",
    badge: "必读",
    badgeClass: "bg-rose/15 text-rose",
    points: "+50 积分",
    pointsClass: "bg-warning/25 text-warning-foreground",
  },
  {
    kind: "图文",
    kindBg: "from-success/60 to-success/80",
    title: "学龄儿童均衡膳食：一周营养餐单推荐",
    meta: "营养师 · 6 分钟 · 8423 阅读",
    badge: "食谱",
    badgeClass: "bg-success/15 text-success",
    points: "+30 积分",
    pointsClass: "bg-warning/25 text-warning-foreground",
  },
  {
    kind: "直播",
    kindBg: "from-warm/60 to-rose/70",
    title: "本周四 · 入学体检常见问题答疑公开课",
    meta: "主任医师 · 直播预约 · 526 人…",
    badge: "预约",
    badgeClass: "bg-warning/20 text-warning-foreground",
    points: "+80 积分",
    pointsClass: "bg-warning/25 text-warning-foreground",
  },
];

function ParentHome() {
  const [activeKid, setActiveKid] = useState(kids[0].id);
  const kid = kids.find((k) => k.id === activeKid) ?? kids[0];
  const [catTab, setCatTab] = useState("全部");
  

  return (
    <div className="pb-4">
      <StatusBar title="童护佳 · 南京" />

      {/* Brand row */}
      <div className="flex items-center justify-between px-5 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-rose/15 text-rose">♥</span>
          <span className="text-sm font-bold">童护佳 · 南京</span>
        </div>
        <Link to="/parent/me" className="relative grid h-8 w-8 place-items-center rounded-full bg-surface shadow-sm ring-1 ring-border">
          🔔
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose" />
        </Link>
      </div>

      {/* Kid switcher */}
      <div className="grid grid-cols-2 gap-3 px-5">
        {kids.map((k) => {
          const active = k.id === activeKid;
          const activeStyle =
            k.tagColor === "warm"
              ? "bg-gradient-to-r from-warm to-warm/80 text-warm-foreground shadow-lg shadow-warm/30"
              : "bg-gradient-to-r from-rose to-rose/80 text-rose-foreground shadow-lg shadow-rose/30";
          return (
            <button
              key={k.id}
              onClick={() => setActiveKid(k.id)}
              className={`flex items-center gap-3 rounded-2xl p-2.5 text-left ring-1 transition ${
                active ? `${activeStyle} ring-transparent` : "bg-surface text-foreground ring-border"
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                  active
                    ? "bg-white/25 text-white backdrop-blur"
                    : k.tagColor === "warm"
                    ? "bg-warm/15 text-warm"
                    : "bg-rose/15 text-rose"
                }`}
              >
                {k.short}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  {k.name} · {k.age}岁
                </p>
                <p className={`truncate text-[11px] ${active ? "text-white/85" : "text-muted-foreground"}`}>
                  {k.tag}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Health advisor card — 精简后 */}
      <div className="mt-3 px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose/90 via-rose to-rose/70 p-4 text-white shadow-xl shadow-rose/30">
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />

          {/* 头像 + 标题 + 内嵌关注提示 */}
          <div className="relative flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/25 text-2xl backdrop-blur">
              👩‍⚕️
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-white/80">✨ 童护佳 · AI 健康顾问</p>
              <p className="mt-0.5 text-[15px] font-bold leading-tight">
                家长好，{kid.name}的体检数据已为您解读 🌸
              </p>
              <Link
                to="/parent/report"
                className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-medium text-rose"
              >
                发现 2 项需关注 · 身高体重 / 视力 ›
              </Link>
            </div>
          </div>

          {/* 咨询输入框 · 主 CTA */}
          <Link
            to="/parent/comm"
            className="relative mt-3 flex items-center gap-2 rounded-full bg-white pl-3 pr-1 py-1"
          >
            <span className="text-rose">💬</span>
            <span className="flex-1 truncate text-[13px] text-muted-foreground">
              向 AI 健康顾问咨询…
            </span>
            <span className="rounded-full bg-rose px-3 py-1 text-[11px] font-medium text-rose-foreground">
              咨询
            </span>
          </Link>

          {/* 4 个统一图标快捷入口 */}
          <div className="relative mt-2.5 grid grid-cols-4 gap-1.5">
            {quickAsk.map((q) => (
              <Link
                key={q.label}
                to={q.to}
                className="flex flex-col items-center gap-0.5 rounded-2xl bg-white/95 py-2 text-foreground"
              >
                <span className="text-lg leading-none">{q.icon}</span>
                <span className="text-[11px]">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>


      {/* 入学体检须知 banner */}
      <Link
        to="/parent/notice"
        className="mx-5 mt-3 flex items-center gap-3 rounded-2xl bg-warning/15 px-3 py-3 ring-1 ring-warning/30"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-warning text-[11px] font-bold leading-tight text-warning-foreground">
          检<br />前
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">本次入学体检 · 家长须知</p>
        </div>
        <span className="rounded-full bg-warning/20 px-2 py-1 text-[11px] text-warning-foreground">
          共 6 项 · <b>2 待办</b> · 1 已完成
        </span>
        <span className="text-muted-foreground">›</span>
      </Link>


      {/* 居家健康提醒 */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold">居家健康提醒</h3>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              周期性事项 · 可调整提醒日期，进度显示下次到期
            </p>
          </div>
        </div>
        <ul className="space-y-2">
          {homeCare.map((c) => {
            const dueSoon = c.daysLeft <= 2;
            return (
              <li key={c.title} className="rounded-2xl bg-surface-2 p-3">
                <div className="flex items-start gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-lg ring-1 ring-border">
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="min-w-0 flex-1 truncate text-[13px] font-semibold">
                        {c.title}
                      </p>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${c.tagClass}`}>
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{c.cycle}</p>
                    {/* progress bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${
                            dueSoon ? "bg-rose" : "bg-teal"
                          }`}
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span
                        className={`shrink-0 text-[10px] ${
                          dueSoon ? "text-rose" : "text-muted-foreground"
                        }`}
                      >
                        {c.daysLeft === 0 ? "今日到期" : `${c.daysLeft} 天后`}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>


      {/* 健康百科 */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold">健康百科</h3>
            <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[10px] text-rose">看完单篇得积分</span>
          </div>
          <button className="text-[11px] font-medium text-rose">进入百科 ›</button>
        </div>
        <div className="mb-3 flex gap-2 overflow-x-auto">
          {["全部", "▷ 视频", "🖼 图文", "📻 直播"].map((t) => {
            const label = t.replace(/^[^\u4e00-\u9fa5]+/, "").trim() || t;
            const active = catTab === label || (t === "全部" && catTab === "全部");
            return (
              <button
                key={t}
                onClick={() => setCatTab(label)}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] ring-1 transition ${
                  active
                    ? "bg-rose text-rose-foreground ring-transparent"
                    : "bg-surface text-foreground ring-border"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <ul className="space-y-2.5">
          {encyclopedia.map((a) => (
            <li key={a.title} className="flex gap-3 rounded-2xl bg-surface-2 p-2.5">
              <div
                className={`grid h-20 w-20 shrink-0 place-items-start rounded-xl bg-gradient-to-br ${a.kindBg} p-1.5`}
              >
                <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] text-white backdrop-blur">
                  {a.kind}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <p className="text-[13px] font-semibold leading-snug">{a.title}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] ${a.badgeClass}`}>
                      {a.badge}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">{a.meta}</span>
                  </div>
                  <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${a.pointsClass}`}>
                    {a.points}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 服务商城 */}
      <section className="mx-5 mt-3">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-sm font-bold">童护佳健康服务商城</h3>
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success">医生甄选</span>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose/90 to-rose/70 p-4 text-white shadow-lg shadow-rose/30">
          <p className="text-[11px] text-white/85">✨ 儿科呼吸科医生 & 营养师联合甄选</p>
          <p className="mt-0.5 text-base font-bold">童护佳健康服务商城</p>
          <p className="mt-1 text-[12px] text-white/90">营养餐 · 专病服务包 · 健康商品 · 三大专区</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] backdrop-blur">
              已为 12,488 位小朋友服务
            </span>
            <button className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-rose">
              进入商城 ›
            </button>
          </div>
        </div>
      </section>

      {/* Terminate soft entry */}
      <Link
        to="/parent/terminate"
        className="mx-5 mt-3 block rounded-2xl bg-surface p-3 text-center text-[11px] text-muted-foreground shadow-sm ring-1 ring-border/60"
      >
        随时可 <span className="text-danger">终止后续健康管理</span> · 历史报告保留
      </Link>
    </div>
  );
}
