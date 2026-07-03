import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";
import { useState } from "react";

export const Route = createFileRoute("/school/notify")({
  component: NotifyPage,
});

type P = { name: string; class: string; state: "未授权" | "未问卷" | "未读报告" | "已终止"; phone: string; contact?: string };

const parents: P[] = [
  { name: "王小明 家长", class: "2年2班", state: "未授权", phone: "138****1234" },
  { name: "陈小美 家长", class: "4年2班", state: "未授权", phone: "139****2233", contact: "已电话" },
  { name: "赵小欣 家长", class: "2年1班", state: "未问卷", phone: "137****4455" },
  { name: "张小乐 家长", class: "1年1班", state: "未问卷", phone: "158****6677" },
  { name: "李小雨 家长", class: "3年3班", state: "未读报告", phone: "136****8899", contact: "已微信" },
  { name: "钱小可 家长", class: "6年2班", state: "已终止", phone: "150****3344" },
];

const tabs = ["未授权", "未问卷", "未读报告", "已终止"] as const;

function NotifyPage() {
  const [t, setT] = useState<(typeof tabs)[number]>("未授权");
  const list = parents.filter((p) => p.state === t);

  return (
    <div>
      <StatusBar title="家长通知与授权" />
      <div className="px-5 pt-2">
        <div className="mb-1 flex items-center gap-2">
          <Link to="/school" className="text-lg text-muted-foreground">‹</Link>
          <h1 className="text-xl font-bold">家长通知与授权</h1>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">春季体检 · 阳光小学</p>

        {/* 统计 */}
        <div className="mb-3 grid grid-cols-4 gap-2">
          {[
            { k: "已授权", v: 383, c: "success" },
            { k: "未授权", v: 18, c: "warm" },
            { k: "问卷", v: 401, c: "teal" },
            { k: "放弃", v: 4, c: "muted-foreground" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-surface p-3 text-center shadow-sm ring-1 ring-border/60">
              <p className={`text-lg font-extrabold text-${s.c}`}>{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>

        {/* 一键提醒 */}
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-teal/15 to-deep/15 p-4 ring-1 ring-teal/20">
          <p className="text-sm font-semibold">📣 一键发送体检通知</p>
          <p className="mt-1 text-[11px] text-muted-foreground">通过微信 / 短信推送体检时间、地点、注意事项</p>
          <div className="mt-3 flex gap-2">
            <ActionSheet
              trigger={<button className="flex-1 rounded-xl bg-teal py-2 text-xs font-medium text-teal-foreground">发送体检通知</button>}
              title="向全体家长发送体检通知？"
              description="将通过微信 / 短信推送体检时间、地点与注意事项。已终止家庭不会再收到通知。"
              confirmText="确认发送 442 位"
              toastMessage="通知已发送 442 位家长"
              toastType="success"
            />
            <button className="rounded-xl bg-surface px-3 py-2 text-xs ring-1 ring-border/60">查看已通知 442</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((k) => (
            <button
              key={k}
              onClick={() => setT(k)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${
                t === k ? "bg-teal text-teal-foreground" : "bg-surface ring-1 ring-border/60 text-muted-foreground"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {t !== "已终止" && (
          <ActionSheet
            trigger={
              <button className="mb-3 w-full rounded-xl bg-warm py-2 text-xs font-medium text-warm-foreground">
                一键提醒 {list.length} 位{t}家长
              </button>
            }
            title={`提醒 ${list.length} 位${t}家长`}
            description="将通过微信服务通知 + 短信双通道提醒，24 小时内不重复发送。"
            confirmText="确认提醒"
            toastMessage={`已提醒 ${list.length} 位家长`}
            toastDescription="预计 5 分钟内送达"
          />
        )}
      </div>

      <ul className="space-y-2 px-5 pb-8">
        {list.map((p) => (
          <li key={p.name} className="rounded-2xl bg-surface p-3 shadow-sm ring-1 ring-border/60">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-lg">👨‍👩‍👧</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <span className="text-[11px] text-muted-foreground">{p.class}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {p.phone}
                  {p.contact && ` · 班主任${p.contact}`}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <button className="rounded-full bg-teal/15 px-3 py-1 text-[10px] text-teal">提醒</button>
                <button className="rounded-full bg-surface-2 px-3 py-1 text-[10px] text-muted-foreground">已联系</button>
              </div>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="rounded-2xl bg-surface p-8 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-border/60">
            暂无{t}家长
          </li>
        )}
      </ul>
    </div>
  );
}
