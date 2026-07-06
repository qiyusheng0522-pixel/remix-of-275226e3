import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";
import { child } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/parent/notice")({
  component: NoticePage,
});

const items = [
  { k: "体检时间", v: "2026-04-15（周三）08:30—11:30" },
  { k: "体检地点", v: "阳光小学 · 操场东侧体检车" },
  { k: "体检机构", v: "阳光社区卫生服务中心" },
  { k: "体检项目", v: "身高、体重、BMI、腰围、血压、视力、口腔、呼吸/过敏问卷" },
  { k: "注意事项", v: "当日穿宽松衣物，早餐正常，避免剧烈运动" },
];

function NoticePage() {
  const [choice, setChoice] = useState<"agree" | "skip" | null>(null);
  const [signed, setSigned] = useState(false);
  const [authorized, setAuthorized] = useState(true); // 假设家长此前已授权
  const [revokeScope, setRevokeScope] = useState<"this" | "all">("this");

  return (
    <div>
      <StatusBar title="体检通知与授权" />
      <div className="px-5 pb-10 pt-2">
        <div className="mb-4 rounded-3xl bg-gradient-to-br from-teal/25 to-warm/15 p-5 ring-1 ring-teal/20">
          <p className="text-xs text-muted-foreground">阳光小学 · 春季体检通知</p>
          <h1 className="mt-1 text-lg font-bold">
            {child.name}的春季体检来啦 🌱
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-foreground/80">
            本次体检由学校统一组织，用于了解孩子基础健康情况。体检结果会向监护人反馈，并在您授权后用于生成孩子的健康报告和后续呵护提醒。您可以选择同意，也可以选择放弃。
          </p>
        </div>

        {/* 当前授权状态 · 可随时撤回 */}
        {authorized && (
          <section className="mb-4 rounded-2xl bg-success/10 p-4 ring-1 ring-success/25">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success text-success-foreground">✓</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">当前授权已生效</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  授权范围：本次春季体检 + 后续 12 个月家庭呵护 · 2026-04-08 签署
                </p>
                <p className="mt-2 text-[11px] text-foreground/80">
                  您可随时撤回本次授权或终止全部健康管理，历史体检记录会按规定保留。
                </p>
              </div>
            </div>

            <ActionSheet
              trigger={
                <button className="mt-3 w-full rounded-xl border border-danger/40 bg-white py-2 text-xs font-medium text-danger">
                  撤回 / 终止授权
                </button>
              }
              title="撤回或终止授权"
              description="请选择撤回范围。撤回后学校与健管师将立即停止对应数据处理。"
              confirmText="确认撤回"
              danger
              toastMessage={
                revokeScope === "all" ? "已终止全部健康管理" : "已撤回本次体检授权"
              }
              toastDescription={`签名人：李妈妈 · ${child.name}`}
              onConfirm={() => setAuthorized(false)}
            >
              <div className="space-y-2 text-xs">
                {[
                  {
                    key: "this" as const,
                    title: "仅撤回本次体检授权",
                    desc: "本次体检数据不再用于生成报告与呵护，已生成的历史报告保留。",
                  },
                  {
                    key: "all" as const,
                    title: "终止全部健康管理",
                    desc: "取消 12 个月呵护、随访与复评推送，历史数据按合规要求脱敏保留。",
                  },
                ].map((opt) => {
                  const active = revokeScope === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setRevokeScope(opt.key)}
                      className={`w-full rounded-xl p-3 text-left ring-1 transition ${
                        active ? "bg-danger/10 ring-danger/40" : "bg-surface-2 ring-border/60"
                      }`}
                    >
                      <p className={`text-sm font-medium ${active ? "text-danger" : ""}`}>
                        {opt.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{opt.desc}</p>
                    </button>
                  );
                })}
                <p className="pt-1 text-[11px] text-muted-foreground">
                  依据《个人信息保护法》，您有权随时撤回同意。撤回操作不影响撤回前基于同意进行的数据处理效力。
                </p>
              </div>
            </ActionSheet>
          </section>
        )}

        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <h2 className="mb-3 text-sm font-semibold">体检安排</h2>
          <ul className="divide-y divide-border/60 text-xs">
            {items.map((it) => (
              <li key={it.k} className="flex gap-3 py-2.5">
                <span className="w-16 shrink-0 text-muted-foreground">{it.k}</span>
                <span className="flex-1 text-foreground/90">{it.v}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <h2 className="mb-2 text-sm font-semibold">知情同意书</h2>
          <div className="max-h-40 overflow-y-auto rounded-xl bg-surface-2 p-3 text-[11px] leading-relaxed text-muted-foreground">
            体检数据将用于生成孩子的健康报告，并在您授权后用于后续家庭呵护、随访和复评提醒。您可以随时在"我的—终止健康管理"中停止后续服务，历史体检记录仍会保留。
            <br /><br />
            数据仅供学校校医、平台健康管理师、医生在授权范围内查看，不会用于商业目的。
          </div>
          <label className="mt-3 flex items-center gap-2 text-xs">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-warm" />
            <span>我已阅读并理解上述说明</span>
          </label>
        </section>

        {/* Choice */}
        <section className="mb-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setChoice("agree")}
            className={`rounded-2xl p-4 text-left ring-1 transition ${
              choice === "agree"
                ? "bg-warm text-warm-foreground ring-warm shadow-md"
                : "bg-surface ring-border/60"
            }`}
          >
            <div className="text-lg">✅</div>
            <p className="mt-1 text-sm font-semibold">同意本次体检</p>
            <p className="mt-0.5 text-[11px] opacity-80">授权数据生成报告与呵护</p>
          </button>
          <button
            onClick={() => setChoice("skip")}
            className={`rounded-2xl p-4 text-left ring-1 transition ${
              choice === "skip"
                ? "bg-muted ring-muted-foreground/40"
                : "bg-surface ring-border/60"
            }`}
          >
            <div className="text-lg">🙅</div>
            <p className="mt-1 text-sm font-semibold">放弃本次体检</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">本次不参加，不影响后续</p>
          </button>
        </section>

        {/* Signature */}
        {choice && (
          <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
            <h2 className="mb-2 text-sm font-semibold">监护人电子签名</h2>
            <div
              onClick={() => setSigned(true)}
              className={`grid h-28 place-items-center rounded-xl border-2 border-dashed text-xs transition ${
                signed
                  ? "border-warm bg-warm/10 text-warm"
                  : "border-border text-muted-foreground"
              }`}
            >
              {signed ? "✍ 李妈妈  ·  2026-04-08 20:14" : "点击此处手写签名"}
            </div>
          </section>
        )}

        <ActionSheet
          trigger={
            <button
              disabled={!choice || !signed}
              className="w-full rounded-2xl bg-warm py-3 text-sm font-semibold text-warm-foreground shadow-lg shadow-warm/20 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              {choice === "skip" ? "提交放弃申请" : "提交同意与授权"}
            </button>
          }
          title={choice === "skip" ? "确认放弃本次体检？" : "确认授权本次体检？"}
          description={
            choice === "skip"
              ? "本次不参加不影响后续入学与保险，你也可以稍后在通知里改回同意。"
              : "授权后学校将采集本次体检数据用于生成健康报告，健康管理师将根据报告为孩子安排家庭呵护计划。"
          }
          confirmText={choice === "skip" ? "确认放弃" : "确认授权"}
          danger={choice === "skip"}
          toastMessage={choice === "skip" ? "已提交放弃申请" : "授权成功 · 已同步学校"}
          toastDescription={`签名人：李妈妈 · ${child.name}`}
        >
          <div className="rounded-xl bg-surface-2 p-3 text-xs leading-relaxed text-muted-foreground">
            <p>孩子：<span className="font-medium text-foreground">{child.name}</span></p>
            <p className="mt-1">签名：✍ 李妈妈 · 2026-04-08 20:14</p>
            <p className="mt-1">生效范围：本次春季体检 + 后续 12 个月家庭呵护</p>
          </div>
        </ActionSheet>

        <Link
          to="/parent/me"
          className="mt-3 block text-center text-xs text-muted-foreground"
        >
          查看历史授权记录 →
        </Link>
      </div>
    </div>
  );
}
