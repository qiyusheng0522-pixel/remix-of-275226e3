import { createFileRoute, useParams, useNavigate, Link } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { findExamUser, nextPendingExamUser } from "@/lib/exam-users";

export const Route = createFileRoute("/doctor/entry/$id")({
  component: EntryPage,
});

type FieldType = "number" | "text";
type Source = "auto" | "manual";
type Field = {
  key: string;
  label: string;
  type: FieldType;
  unit?: string;
  source: Source;
  ref?: string; // reference range hint
};
type Node = {
  key: string;
  name: string;
  icon: string;
  device?: string; // 自动采集设备名
  fields: Field[];
};

const NODES: Node[] = [
  {
    key: "body",
    name: "身高体重",
    icon: "📏",
    device: "身高体重一体机",
    fields: [
      { key: "height", label: "身高", type: "number", unit: "cm", source: "auto" },
      { key: "weight", label: "体重", type: "number", unit: "kg", source: "auto" },
      { key: "bmi", label: "BMI", type: "number", source: "auto", ref: "14.5–16.8" },
    ],
  },
  {
    key: "vision",
    name: "视力",
    icon: "👁",
    device: "自动视力筛查仪",
    fields: [
      { key: "left", label: "左眼", type: "number", source: "auto", ref: "≥ 4.9" },
      { key: "right", label: "右眼", type: "number", source: "auto", ref: "≥ 4.9" },
      { key: "visionNote", label: "备注", type: "text", source: "manual" },
    ],
  },
  {
    key: "bp",
    name: "血压 / 心率",
    icon: "💓",
    device: "电子血压计",
    fields: [
      { key: "sbp", label: "收缩压", type: "number", unit: "mmHg", source: "auto" },
      { key: "dbp", label: "舒张压", type: "number", unit: "mmHg", source: "auto" },
      { key: "hr", label: "心率", type: "number", unit: "bpm", source: "auto" },
    ],
  },
  {
    key: "oral",
    name: "口腔",
    icon: "🦷",
    fields: [
      { key: "caries", label: "龋齿颗数", type: "number", source: "manual" },
      { key: "oralNote", label: "口腔检查描述", type: "text", source: "manual" },
    ],
  },
  {
    key: "internal",
    name: "内科查体",
    icon: "🩺",
    fields: [
      { key: "heartLung", label: "心肺听诊", type: "text", source: "manual" },
      { key: "abdomen", label: "腹部触诊", type: "text", source: "manual" },
    ],
  },
  {
    key: "lab",
    name: "实验室",
    icon: "🧪",
    device: "生化分析仪",
    fields: [
      { key: "glu", label: "空腹血糖", type: "number", unit: "mmol/L", source: "auto", ref: "3.9–6.1" },
      { key: "hb", label: "血红蛋白", type: "number", unit: "g/L", source: "auto", ref: "115–150" },
    ],
  },
];

const MOCK_AUTO: Record<string, string> = {
  height: "138",
  weight: "32.5",
  bmi: "17.1",
  left: "4.8",
  right: "4.7",
  sbp: "108",
  dbp: "68",
  hr: "88",
  glu: "6.3",
  hb: "128",
};

// Simple Web Speech recognition wrapper
function useSpeech(onText: (t: string) => void) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);

  const start = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error("当前浏览器不支持语音识别", { description: "请手动输入或使用 Chrome" });
      return;
    }
    const rec = new SR();
    rec.lang = "zh-CN";
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      onText(text);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };
  const stop = () => {
    recRef.current?.stop?.();
    setListening(false);
  };
  return { listening, start, stop };
}

function TextFieldVoice({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { listening, start, stop } = useSpeech((t) => onChange((value ? value + " " : "") + t));
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-y rounded-xl bg-surface-2 p-3 pr-12 text-[13px] leading-relaxed outline-none ring-1 ring-transparent focus:ring-deep"
      />
      <button
        type="button"
        onClick={listening ? stop : start}
        className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-[13px] transition ${
          listening ? "bg-danger text-white animate-pulse" : "bg-deep/10 text-deep"
        }`}
        title={listening ? "停止录音" : "语音输入"}
      >
        🎤
      </button>
    </div>
  );
}

function EntryPage() {
  const { id } = useParams({ from: "/doctor/entry/$id" });
  const navigate = useNavigate();
  const user = findExamUser(id);
  const nextUser = nextPendingExamUser(id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [verified, setVerified] = useState<Record<string, boolean>>({});
  const [activeKey, setActiveKey] = useState<string>(NODES[0].key);
  const [submitted, setSubmitted] = useState(false);

  // 模拟自动采集（进入节点时，若未填则回填 mock）
  useEffect(() => {
    const node = NODES.find((n) => n.key === activeKey);
    if (!node) return;
    setValues((prev) => {
      const next = { ...prev };
      node.fields.forEach((f) => {
        if (f.source === "auto" && !next[f.key] && MOCK_AUTO[f.key]) {
          next[f.key] = MOCK_AUTO[f.key];
        }
      });
      return next;
    });
  }, [activeKey]);

  const progress = useMemo(() => {
    const done = NODES.filter((n) => verified[n.key]).length;
    return { done, total: NODES.length };
  }, [verified]);

  const active = NODES.find((n) => n.key === activeKey)!;

  const setV = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const nodeComplete = active.fields.every((f) =>
    f.source === "auto" ? !!values[f.key] : f.type === "text" ? true : !!values[f.key],
  );

  const verifyNode = () => {
    if (!nodeComplete) {
      toast.error("请补齐必填项");
      return;
    }
    setVerified((p) => ({ ...p, [active.key]: true }));
    toast.success(`${active.name} 已核对`, { description: `节点 ${progress.done + 1}/${progress.total}` });
    const i = NODES.findIndex((n) => n.key === active.key);
    if (i < NODES.length - 1) setActiveKey(NODES[i + 1].key);
  };

  const pullAuto = () => {
    setValues((prev) => {
      const next = { ...prev };
      active.fields.forEach((f) => {
        if (f.source === "auto" && MOCK_AUTO[f.key]) next[f.key] = MOCK_AUTO[f.key];
      });
      return next;
    });
    toast.success(`已从${active.device ?? "设备"}采集`);
  };

  return (
    <div className="min-h-full bg-muted/40">
      <StatusBar title="体检录入" />
      <div className="px-4 pb-24 pt-2">
        {/* Header */}
        <div className="mb-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-bold">学号 {id}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">阳光小学 · 三年级 3 班</p>
            </div>
            <span className="rounded-full bg-deep/10 px-2.5 py-1 text-[11px] font-medium text-deep">
              进度 {progress.done}/{progress.total}
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-deep transition-all"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
        </div>

        {/* Node tabs */}
        <div className="mb-3 -mx-1 flex gap-1.5 overflow-x-auto px-1">
          {NODES.map((n) => {
            const on = n.key === activeKey;
            const done = verified[n.key];
            return (
              <button
                key={n.key}
                onClick={() => setActiveKey(n.key)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] transition ${
                  on
                    ? "bg-deep text-deep-foreground"
                    : done
                    ? "bg-success/15 text-success ring-1 ring-success/30"
                    : "bg-surface text-muted-foreground ring-1 ring-border/60"
                }`}
              >
                {done ? "✓ " : ""}
                {n.icon} {n.name}
              </button>
            );
          })}
        </div>

        {/* Active node card */}
        <div className="rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border/60">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              <span>{active.icon}</span> {active.name}
            </p>
            {active.device && (
              <button
                onClick={pullAuto}
                className="rounded-full bg-deep/10 px-2.5 py-1 text-[11px] font-medium text-deep"
              >
                📡 采集 {active.device}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {active.fields.map((f) => (
              <div key={f.key}>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[12px] text-muted-foreground">
                    {f.label}
                    {f.unit && <span className="ml-1 opacity-70">({f.unit})</span>}
                    <span
                      className={`ml-2 rounded px-1 py-0.5 text-[10px] ${
                        f.source === "auto"
                          ? "bg-teal/10 text-teal"
                          : "bg-warm/10 text-warm"
                      }`}
                    >
                      {f.source === "auto" ? "自动" : "手动"}
                    </span>
                  </label>
                  {f.ref && (
                    <span className="text-[10px] text-muted-foreground">参考 {f.ref}</span>
                  )}
                </div>
                {f.type === "text" ? (
                  <TextFieldVoice
                    value={values[f.key] ?? ""}
                    onChange={(v) => setV(f.key, v)}
                    placeholder="点击麦克风语音输入，或手动填写"
                  />
                ) : (
                  <input
                    type="number"
                    inputMode="decimal"
                    value={values[f.key] ?? ""}
                    onChange={(e) => setV(f.key, e.target.value)}
                    className="w-full rounded-xl bg-surface-2 px-3 py-2.5 text-[14px] outline-none ring-1 ring-transparent focus:ring-deep"
                    placeholder={f.source === "auto" ? "等待设备采集…" : "手动输入"}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={verifyNode}
            disabled={verified[active.key]}
            className={`mt-5 w-full rounded-xl py-3 text-sm font-medium transition ${
              verified[active.key]
                ? "bg-success/15 text-success"
                : "bg-deep text-deep-foreground"
            }`}
          >
            {verified[active.key] ? "✓ 已核对" : "核对并保存"}
          </button>
        </div>

        {/* Submit all */}
        {progress.done === progress.total && (
          <button
            onClick={() => toast.success("已提交至报告审核", { description: `学号 ${id}` })}
            className="mt-4 w-full rounded-xl bg-success py-3 text-sm font-medium text-white"
          >
            全部节点已核对 · 提交报告
          </button>
        )}
      </div>
    </div>
  );
}
