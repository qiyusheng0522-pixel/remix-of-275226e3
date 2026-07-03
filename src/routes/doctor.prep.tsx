import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";

export const Route = createFileRoute("/doctor/prep")({
  component: PrepPage,
});

const info = [
  { k: "学校", v: "阳光小学" },
  { k: "日期", v: "2025-04-03 (今日)" },
  { k: "场地", v: "教学楼一层 · 体检车 A/B" },
  { k: "班级排程", v: "9 个班 · 08:30 - 15:30" },
  { k: "体检人数", v: "214 人" },
  { k: "带队老师", v: "王主任 · 138****2201" },
];

const team = [
  { role: "带队医生", name: "陈医生（我）" },
  { role: "副手医生", name: "赵医生" },
  { role: "护士", name: "王护士 · 李护士" },
  { role: "健康管理师", name: "刘老师" },
];

const items = ["身高体重", "视力", "血压", "口腔", "呼吸/过敏问卷", "腰围（重点儿童）"];
const devices = ["身高体重仪 x2", "视力灯箱 x1", "电子血压计 x2", "腰围软尺 x2", "手持终端 x4"];
const notes = [
  "空腹项目：无（本次不采血）",
  "衣着轻便，学生请脱鞋量身高",
  "异常数据现场需 2 次复测",
  "呼吸/过敏问卷由班主任协助分发",
];

function PrepPage() {
  return (
    <div>
      <StatusBar title="体检前准备" />
      <div className="px-5 pb-8 pt-2">
        <h1 className="text-xl font-bold">体检前准备</h1>
        <p className="mb-4 text-xs text-muted-foreground">确认任务信息、团队、设备与标准</p>

        <Section title="基础信息">
          <ul className="divide-y divide-border/60">
            {info.map((r) => (
              <li key={r.k} className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">{r.k}</span>
                <span className="font-medium">{r.v}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="体检团队">
          <ul className="space-y-2">
            {team.map((t) => (
              <li key={t.role} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2 text-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-deep/15 text-xs">👤</span>
                <span className="text-muted-foreground">{t.role}</span>
                <span className="ml-auto font-medium">{t.name}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="体检项目">
          <div className="flex flex-wrap gap-2">
            {items.map((i) => (
              <span key={i} className="rounded-full bg-teal/10 px-3 py-1 text-xs text-teal">{i}</span>
            ))}
          </div>
        </Section>

        <Section title="设备准备清单">
          <ul className="space-y-1.5">
            {devices.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="accent-deep" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="注意事项 / 复测规则">
          <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            {notes.map((n, i) => (
              <li key={i}>· {n}</li>
            ))}
          </ul>
        </Section>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-xl bg-surface-2 py-3 text-sm">导出准备单</button>
          <button className="rounded-xl bg-deep py-3 text-sm font-semibold text-deep-foreground">
            确认已就绪
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
      <h2 className="mb-2 text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}
