import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/community/consult")({
  component: ConsultPage,
});

const threads = [
  {
    from: "刘小强家长",
    tag: "服务包",
    tint: "warm",
    time: "12 分钟前",
    msg: "孩子最近说跳绳时膝盖有点酸，是不是运动量太大了？",
    unread: true,
  },
  {
    from: "陈小美家长",
    tag: "转社区",
    tint: "teal",
    time: "1 小时前",
    msg: "夜间又咳嗽了 2 次，需要临时加用支气管扩张剂吗？",
    unread: true,
  },
  {
    from: "王小美家长",
    tag: "服务包",
    tint: "warm",
    time: "今日 09:20",
    msg: "视力表在哪里可以买？孩子想在家自测。",
    unread: true,
  },
  {
    from: "张小乐家长",
    tag: "转社区",
    tint: "teal",
    time: "昨日",
    msg: "鼻喷激素用多久可以停？会不会有依赖？",
    unread: false,
  },
  {
    from: "赵小明家长",
    tag: "一般咨询",
    tint: "muted",
    time: "昨日",
    msg: "孩子接种疫苗后当天可以洗澡吗？",
    unread: false,
  },
];

const quickReplies = [
  "感谢反馈，请先按方案继续观察 24 小时",
  "建议尽快到社区门诊面诊评估",
  "已为您预约上门随访",
  "相关宣教资料已推送到您的消息",
];

function ConsultPage() {
  const [active, setActive] = useState(0);
  const t = threads[active];

  return (
    <div>
      <StatusBar title="咨询回复" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">咨询回复</h1>
        <p className="mb-3 text-xs text-muted-foreground">
          在管家庭咨询 · 承诺 24h 内回复
        </p>

        <ul className="mb-4 space-y-2">
          {threads.map((th, i) => (
            <li key={i}>
              <button
                onClick={() => setActive(i)}
                className={`w-full rounded-2xl p-3 text-left ring-1 transition ${
                  active === i
                    ? "bg-warm/10 ring-warm"
                    : "bg-surface ring-border/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{th.from}</span>
                    <span
                      className={`rounded-full bg-${th.tint}/15 px-1.5 py-0.5 text-[10px] text-${th.tint}`}
                    >
                      {th.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {th.unread && (
                      <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {th.time}
                    </span>
                  </div>
                </div>
                <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground">
                  {th.msg}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <p className="text-xs text-muted-foreground">
            回复 · {t.from}（{t.tag}）
          </p>
          <p className="mt-2 rounded-xl bg-surface-2 p-3 text-[12px] leading-relaxed">
            {t.msg}
          </p>

          <p className="mt-3 text-[11px] text-muted-foreground">快速回复模板</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {quickReplies.map((q) => (
              <button
                key={q}
                className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-foreground/80"
              >
                {q}
              </button>
            ))}
          </div>

          <textarea
            placeholder="输入回复…（可附加宣教材料）"
            className="mt-3 h-24 w-full resize-none rounded-xl bg-surface-2 p-3 text-xs outline-none"
          />
          <div className="mt-2 flex gap-2">
            <button className="flex-1 rounded-xl bg-surface-2 py-2 text-xs">
              附宣教
            </button>
            <button className="flex-1 rounded-xl bg-teal/15 py-2 text-xs text-teal">
              升级医生
            </button>
            <button className="flex-1 rounded-xl bg-warm py-2 text-xs font-medium text-warm-foreground">
              发送回复
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
