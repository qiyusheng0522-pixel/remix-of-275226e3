import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";

// 是否已有体检报告 —— 没有报告时首页不展示任何待办事项
const HAS_REPORT = true;
const CONSENT_KEY = "parent_consent_v1";

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

// 与 /parent/care 保持一致的示例数据
const TODAY = "2026-04-08";
const daysAgo = (n: number) => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};
const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);

const homeCare = [
  { id: "weight", icon: "⚖️", title: "晨起体重记录", tag: "体重管理", tagClass: "bg-warm/15 text-warm", cycleDays: 7, lastDone: daysAgo(7) },
  { id: "bed", icon: "🛏️", title: "床品除螨清洗", tag: "过敏防护", tagClass: "bg-rose/10 text-rose", cycleDays: 14, lastDone: daysAgo(9) },
  { id: "vent", icon: "🪟", title: "开窗通风换气", tag: "通风湿度", tagClass: "bg-teal/15 text-teal", cycleDays: 1, lastDone: daysAgo(1) },
  { id: "humid", icon: "💧", title: "空气加湿器换水", tag: "呼吸道", tagClass: "bg-teal/15 text-teal", cycleDays: 3, lastDone: daysAgo(1) },
  { id: "brush", icon: "🦷", title: "儿童牙刷更换", tag: "口腔", tagClass: "bg-success/15 text-success", cycleDays: 90, lastDone: daysAgo(46) },
  { id: "vitd", icon: "☀️", title: "维生素 D 补充", tag: "营养", tagClass: "bg-warm/15 text-warm", cycleDays: 1, lastDone: daysAgo(1) },
];

const todayTasks = [
  { icon: "🤸", text: "亲子跳绳 · 20 分钟", done: false, tone: "warning" as const },
  { icon: "🥦", text: "晚餐 · 建议摄入 500-600 kcal", done: true, tone: "success" as const },
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
  const [showAllTasks, setShowAllTasks] = useState(false);

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
            </div>
          </div>

          {/* 体检关注 · 突出卡片 */}
          <Link
            to="/parent/report"
            className="mt-3 block rounded-2xl bg-white/95 p-3 shadow-sm ring-1 ring-white/60"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-danger/15 text-[12px]">⚠️</span>
                <span className="text-[12px] font-bold text-rose">本次体检 · 2 项需重点关注</span>
              </div>
              <span className="text-[11px] font-medium text-rose">查看报告 ›</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-warm/10 p-2">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                  <p className="text-[11px] font-semibold text-warm">体重偏高</p>
                </div>
                <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">BMI 17.1 · P85 · 建议 12 周控重</p>
              </div>
              <div className="rounded-xl bg-rose/10 p-2">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                  <p className="text-[11px] font-semibold text-rose">尘螨过敏</p>
                </div>
                <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">IgE (++) · 需家庭除螨</p>
              </div>
            </div>
          </Link>





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

      {/* Today tasks */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold">
            今天给 {kid.name} 做 {todayTasks.length} 件事
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              {todayTasks.filter((t) => t.done).length}/{todayTasks.length}
            </span>
            <button
              onClick={() => setShowAllTasks((v) => !v)}
              className="text-[11px] font-medium text-rose"
            >
              {showAllTasks ? "收起" : "查看全部"} ›
            </button>
          </div>
        </div>
        <ul className="space-y-2">
          {(showAllTasks ? todayTasks : todayTasks.slice(0, 2)).map((t) => {
            const toneBg = {
              warning: "bg-warning/10 ring-warning/25",
              success: "bg-success/10 ring-success/25",
              teal: "bg-teal/10 ring-teal/25",
              deep: "bg-deep/10 ring-deep/25",
            }[t.tone];
            return (
              <li
                key={t.text}
                className={`flex items-center gap-3 rounded-2xl p-3 ring-1 ${toneBg}`}
              >
                <span className="text-xl">{t.icon}</span>
                <p
                  className={`min-w-0 flex-1 text-sm ${
                    t.done ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {t.text}
                </p>
                {t.done ? (
                  <span className="rounded-full bg-success px-3 py-1 text-[11px] font-medium text-success-foreground">
                    已打卡 ✓
                  </span>
                ) : (
                  <button className="rounded-full border border-rose bg-white px-3 py-1 text-[11px] font-medium text-rose">
                    打卡
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* 居家健康提醒 */}
      <section className="mx-5 mt-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold">居家健康提醒</h3>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              周期性事项 · 可调整提醒日期，进度显示下次到期
            </p>
          </div>
          <Link to="/parent/care" className="shrink-0 text-[11px] text-muted-foreground">
            查看全部 ›
          </Link>
        </div>
        <ul className="space-y-2">
          {homeCare.map((c) => {
            const daysSince = dayDiff(c.lastDone, TODAY);
            const daysLeft = c.cycleDays - daysSince;
            const isDue = daysLeft <= 0;
            return (
              <li
                key={c.id}
                className={`rounded-xl p-2.5 ring-1 ${
                  isDue ? "bg-warm/10 ring-warm/30" : "bg-surface-2 ring-border/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-lg ring-1 ring-border">
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[13px] font-semibold">{c.title}</p>
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] ${c.tagClass}`}>
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      每 {c.cycleDays} 天 · 上次 {c.lastDone}
                      {isDue ? (
                        <span className="ml-1 font-medium text-warm">· 今日到期</span>
                      ) : (
                        <span className="ml-1">· {daysLeft} 天后</span>
                      )}
                    </p>
                  </div>
                  {isDue ? (
                    <ActionSheet
                      trigger={
                        <button className="shrink-0 rounded-full bg-warm px-2.5 py-1 text-[11px] text-warm-foreground">
                          去记录
                        </button>
                      }
                      title={c.id === "weight" ? "记录晨起体重" : `记录：${c.title}`}
                      description={c.id === "weight" ? "建议每周同一时间空腹测量，连续记录曲线更直观" : c.tag}
                      confirmText="保存记录"
                      toastMessage="已保存记录 ✓"
                    >
                      {c.id === "weight" ? (
                        <div className="space-y-2 text-xs">
                          <label className="block">
                            <span className="text-muted-foreground">测量日期</span>
                            <input
                              type="date"
                              defaultValue={TODAY}
                              className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
                            />
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <label className="block">
                              <span className="text-muted-foreground">体重 (kg)</span>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="如 28.6"
                                className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
                              />
                            </label>
                            <label className="block">
                              <span className="text-muted-foreground">身高 (cm)</span>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="如 128"
                                className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
                              />
                            </label>
                          </div>
                          <label className="block">
                            <span className="text-muted-foreground">测量方式</span>
                            <select className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none">
                              <option>手动录入</option>
                              <option>智能体脂秤同步</option>
                              <option>体检机构录入</option>
                            </select>
                          </label>
                          <label className="block">
                            <span className="text-muted-foreground">备注（可选）</span>
                            <textarea
                              rows={2}
                              placeholder="如：晨起空腹 / 运动后"
                              className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
                            />
                          </label>
                          <p className="rounded-lg bg-surface-2 px-2.5 py-1.5 text-[11px] text-muted-foreground">
                            💡 已连接的智能秤会自动同步，无需手动录入。
                            <Link to="/parent/me" className="ml-1 text-warm">前往「我的数据」管理</Link>
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs">
                          <label className="block">
                            <span className="text-muted-foreground">完成日期</span>
                            <input
                              type="date"
                              defaultValue={TODAY}
                              className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
                            />
                          </label>
                          <label className="block">
                            <span className="text-muted-foreground">备注（可选）</span>
                            <textarea
                              rows={2}
                              className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
                            />
                          </label>
                        </div>
                      )}
                    </ActionSheet>
                  ) : (
                    <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[11px] text-muted-foreground ring-1 ring-border">
                      已完成
                    </span>
                  )}
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
            <Link
              to="/parent/shop"
              className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-rose"
            >
              进入商城 ›
            </Link>
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
