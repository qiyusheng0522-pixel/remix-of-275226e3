import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/community/")({
  component: CommunityHome,
});

const stats = [
  { label: "服务包在管", value: 46, tint: "warm", hint: "购买服务包患者" },
  { label: "复诊转入", value: 12, tint: "teal", hint: "医院复诊后转社区" },
  { label: "今日随访", value: 8, tint: "deep", hint: "待完成" },
  { label: "待回复咨询", value: 5, tint: "rose", hint: "24h 内回复" },
];

const todos = [
  {
    tag: "服务包",
    tint: "warm",
    title: "刘小强 · 体重管理季度包",
    desc: "第 3 周随访 · 上传体重曲线 + 饮食反馈",
    due: "今日 17:00 前",
    to: "/community/patients",
  },
  {
    tag: "转社区",
    tint: "teal",
    title: "陈小美 · 哮喘复诊后转社区",
    desc: "医院方案：吸入激素维持 · 请建立家庭档案并安排 2 周随访",
    due: "48 小时内建档",
    to: "/community/patients",
  },
  {
    tag: "服务包",
    tint: "warm",
    title: "王小美 · 近视防控半年包",
    desc: "本月屈光复查提醒 · 预约社区视力筛查台",
    due: "本周内",
    to: "/community/patients",
  },
  {
    tag: "宣教",
    tint: "rose",
    title: "春季过敏原防护",
    desc: "面向已建档过敏体质儿童家长推送图文",
    due: "今日推送",
    to: "/community/edu",
  },
];

function CommunityHome() {
  return (
    <div>
      <StatusBar title="社区端 · 阳光社区卫生服务中心" />
      <div className="px-5 pb-8 pt-2">
        <header className="mb-4">
          <h1 className="text-xl font-bold">您好，社区全科医生 张医生</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            阳光社区卫生服务中心 · 儿童健康管理站
          </p>
        </header>

        <div className="mb-4 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl bg-${s.tint}/10 p-3 ring-1 ring-${s.tint}/25`}
            >
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
              <p className={`mt-0.5 text-2xl font-bold text-${s.tint}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="mb-3 rounded-2xl bg-gradient-to-r from-warm/20 to-teal/15 p-4 ring-1 ring-warm/20">
          <p className="text-[11px] text-muted-foreground">社区介入的两大场景</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-xl bg-surface/80 p-2">
              <p className="font-semibold text-warm">① 服务包患者</p>
              <p className="mt-0.5 text-muted-foreground">
                家长在商城购买服务包，社区承接线下随访、耗材配送
              </p>
            </div>
            <div className="rounded-xl bg-surface/80 p-2">
              <p className="font-semibold text-teal">② 复诊转社区</p>
              <p className="mt-0.5 text-muted-foreground">
                医院复诊后由医生转介，社区做长期维持与家庭指导
              </p>
            </div>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">今日待办</h2>
        <ul className="space-y-2">
          {todos.map((t, i) => (
            <li key={i}>
              <Link
                to={t.to}
                className="block rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full bg-${t.tint}/15 px-2 py-0.5 text-[10px] text-${t.tint}`}
                  >
                    {t.tag}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{t.due}</span>
                </div>
                <p className="mt-1.5 text-sm font-semibold">{t.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            to="/community/edu"
            className="rounded-2xl bg-rose/10 p-3 text-center ring-1 ring-rose/25"
          >
            <p className="text-lg">📢</p>
            <p className="mt-0.5 text-xs font-semibold">发起宣教</p>
            <p className="text-[10px] text-muted-foreground">按人群精准推送</p>
          </Link>
          <Link
            to="/community/consult"
            className="rounded-2xl bg-teal/10 p-3 text-center ring-1 ring-teal/25"
          >
            <p className="text-lg">💬</p>
            <p className="mt-0.5 text-xs font-semibold">咨询回复</p>
            <p className="text-[10px] text-muted-foreground">5 条待回复</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
