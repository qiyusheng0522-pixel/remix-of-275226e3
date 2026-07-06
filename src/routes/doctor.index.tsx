import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/doctor/")({
  component: DoctorHome,
});

type Stat = {
  icon: string;
  iconBg: string;
  label: string;
  sub: string;
  value: number;
  unit: string;
  valueColor: string;
  to: "/doctor/referral" | "/doctor/qc" | "/doctor/messages" | "/doctor/plan";
};

const stats: Stat[] = [
  {
    icon: "🔄",
    iconBg: "bg-danger/10 text-danger",
    label: "待转诊",
    sub: "健管师升级 / 上转",
    value: 6,
    unit: "单待处理",
    valueColor: "text-danger",
    to: "/doctor/referral",
  },
  {
    icon: "📝",
    iconBg: "bg-teal/15 text-teal",
    label: "报告审核",
    sub: "三年级 3 班",
    value: 47,
    unit: "份待审",
    valueColor: "text-teal",
    to: "/doctor/review",
  },
  {
    icon: "🔍",
    iconBg: "bg-warm/15 text-warm",
    label: "数据质控",
    sub: "BMI 异常 3 条",
    value: 12,
    unit: "条待核",
    valueColor: "text-warm",
    to: "/doctor/qc",
  },
  {
    icon: "💬",
    iconBg: "bg-deep/15 text-deep",
    label: "待回复",
    sub: "家长 / 健管师消息",
    value: 5,
    unit: "条未读",
    valueColor: "text-deep",
    to: "/doctor/messages",
  },
  {
    icon: "📋",
    iconBg: "bg-success/15 text-success",
    label: "方案确认",
    sub: "健管师已同步",
    value: 4,
    unit: "份待确认",
    valueColor: "text-success",
    to: "/doctor/plan",
  },
];

type Todo = {
  id: string;
  name: string;
  tags: { text: string; cls: string }[];
  desc: string;
  to: "/doctor/referral" | "/doctor/review" | "/doctor/qc" | "/doctor/plan" | "/doctor/messages";
};

const todos: Todo[] = [
  {
    id: "0617",
    name: "王小豆",
    tags: [
      { text: "转诊", cls: "bg-danger/10 text-danger" },
      { text: "紧急", cls: "bg-danger text-danger-foreground" },
    ],
    desc: "内分泌科转诊复核（健管师升级）· SLA 2h",
    to: "/doctor/referral",
  },
  {
    id: "0508",
    name: "三年级 3 班",
    tags: [
      { text: "报告审核", cls: "bg-teal/15 text-teal" },
      { text: "紧急", cls: "bg-danger text-danger-foreground" },
    ],
    desc: "47 份体检报告审核 · 17:00 前完成",
    to: "/doctor/review",
  },
  {
    id: "0423",
    name: "阳光小学",
    tags: [{ text: "数据质控", cls: "bg-warm/15 text-warm" }],
    desc: "校内录检 12 条数据 · BMI 异常 3 条待复核",
    to: "/doctor/qc",
  },
  {
    id: "0402",
    name: "陈敏 家长",
    tags: [{ text: "待回复", cls: "bg-deep/15 text-deep" }],
    desc: "咨询：孩子夜间咳嗽是否需要复诊 · 已等 2h",
    to: "/doctor/messages",
  },
  {
    id: "0315",
    name: "李小雨",
    tags: [{ text: "方案确认", cls: "bg-success/15 text-success" }],
    desc: "健康方案 v0.3 待确认 · 健管师已同步",
    to: "/doctor/plan",
  },
];

function DoctorHome() {
  const totalTodo = stats.reduce((s, x) => s + x.value, 0);

  return (
    <div className="pb-4">
      <StatusBar title="童护佳 · 医生端" />

      {/* Top bar: 工作台 */}
      <div className="flex items-center justify-between bg-surface px-5 py-3">
        <span className="text-xl text-muted-foreground">‹</span>
        <h1 className="text-base font-bold">工作台</h1>
        <div className="flex items-center gap-3">
          <Link to="/doctor/messages" className="relative text-lg">
            🔔
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </Link>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-teal text-sm font-bold text-teal-foreground">
            陈
          </span>
        </div>
      </div>

      {/* Greeting card */}
      <div className="px-5 pt-3">
        <div className="rounded-2xl bg-gradient-to-r from-teal to-teal/80 p-5 text-teal-foreground shadow-lg shadow-teal/25">
          <p className="text-lg font-bold">陈医生，早上好 👋</p>
          <p className="mt-1 text-[13px] text-white/85">
            儿童保健科 · 今日 {totalTodo} 项待处理
          </p>
        </div>
      </div>

      {/* 今日待办 stats */}
      <section className="px-5 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-teal">〰</span> 今日待办
          </h3>
          <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] text-teal">
            共 {totalTodo} 项
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60"
            >
              <div className="flex items-start justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${s.iconBg}`}>
                  {s.icon}
                </span>
                <div className="text-right">
                  <p className={`text-2xl font-bold leading-none ${s.valueColor}`}>{s.value}</p>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold">{s.label}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{s.sub}</p>
                </div>
                <p className="shrink-0 text-[11px] text-muted-foreground">{s.unit}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 入校体检 · 前置准备 */}
      <section className="px-5 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-teal">🚌</span> 入校体检准备
          </h3>
          <span className="rounded-full bg-warm/15 px-2.5 py-0.5 text-[11px] text-warm">
            明日 08:30 出发
          </span>
        </div>
        <Link
          to="/doctor/prep"
          className="block rounded-2xl bg-gradient-to-br from-deep to-deep/85 p-4 text-deep-foreground shadow-lg shadow-deep/25"
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-[15px] font-bold">阳光小学 · 春季体检</p>
              <p className="mt-1 text-[12px] text-white/85">
                214 人 · 9 个班 · 教学楼一层体检车 A/B
              </p>
            </div>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px]">未就绪</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[11px]">
            {[
              { k: "基础信息", v: "✓" },
              { k: "团队", v: "4 人" },
              { k: "设备", v: "5/5" },
              { k: "注意事项", v: "4 条" },
            ].map((it) => (
              <div key={it.k} className="rounded-xl bg-white/10 py-2">
                <p className="text-sm font-bold">{it.v}</p>
                <p className="mt-0.5 text-white/80">{it.k}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/80">
            点击查看：基础信息 / 体检团队 / 项目 / 设备清单 / 复测规则 ›
          </p>
        </Link>
      </section>



      {/* 今日待办清单 */}
      <section className="px-5 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-teal">📋</span> 今日待办清单
          </h3>
          <span className="text-[11px] text-muted-foreground">共 {todos.length} 项 · 按优先级</span>
        </div>
        <ul className="space-y-2.5">
          {todos.map((t, i) => (
            <Link
              key={t.id}
              to={t.to}
              className="flex items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-[13px] font-bold text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {t.tags.map((tag) => (
                    <span key={tag.text} className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${tag.cls}`}>
                      {tag.text}
                    </span>
                  ))}
                  <span className="truncate text-[14px] font-semibold">
                    {t.id} {t.name}
                  </span>
                </div>
                <p className="mt-1 truncate text-[12px] text-muted-foreground">{t.desc}</p>
              </div>
              <span className="text-muted-foreground">›</span>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
