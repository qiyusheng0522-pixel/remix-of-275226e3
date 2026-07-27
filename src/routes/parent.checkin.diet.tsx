import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { StatusBar } from "@/components/MobileFrame";
import { EIcon } from "@/components/EIcon";
import { VerdictCard } from "@/components/VerdictCard";
import {
  evaluateDiet,
  saveCheckin,
  TARGET_KCAL,
  type DietInputMode,
} from "@/lib/checkin";

export const Route = createFileRoute("/parent/checkin/diet")({
  component: DietCheckin,
});

const MEALS = ["早餐", "午餐", "晚餐", "加餐"];

/** 文字模式下的常见食物快捷标签：点选即累加热量 */
const QUICK_FOODS = [
  { name: "杂粮饭 1 碗", kcal: 220 },
  { name: "白米饭 1 碗", kcal: 260 },
  { name: "清蒸鱼", kcal: 130 },
  { name: "鸡胸肉", kcal: 120 },
  { name: "西兰花", kcal: 40 },
  { name: "炒时蔬", kcal: 90 },
  { name: "鸡蛋 1 个", kcal: 75 },
  { name: "牛奶 250ml", kcal: 160 },
  { name: "炸鸡块", kcal: 300 },
  { name: "含糖饮料", kcal: 180 },
];

/** 拍照模式：模拟识图结果（每张图给一份识别项） */
const PHOTO_GUESSES = [
  { name: "杂粮饭", kcal: 220 },
  { name: "清蒸鲈鱼", kcal: 140 },
  { name: "炒青菜", kcal: 80 },
  { name: "紫菜蛋花汤", kcal: 60 },
];

/** 语音模式：模拟一段转写文本 */
const VOICE_TRANSCRIPT = "晚饭吃了一小碗杂粮饭、半条清蒸鱼、一份炒西兰花，没有喝饮料。";
const VOICE_ITEMS = [
  { name: "杂粮饭（小碗）", kcal: 180 },
  { name: "清蒸鱼（半条）", kcal: 110 },
  { name: "炒西兰花", kcal: 70 },
];

function DietCheckin() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState("晚餐");
  const [mode, setMode] = useState<DietInputMode>("photo");

  // 拍照
  const fileRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [recognizing, setRecognizing] = useState(false);
  const [recognized, setRecognized] = useState<typeof PHOTO_GUESSES>([]);

  // 语音
  const [recording, setRecording] = useState(false);
  const [voiceSec, setVoiceSec] = useState(0);
  const [transcript, setTranscript] = useState("");

  // 文字
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const [saved, setSaved] = useState(false);

  // 录音计时器：组件卸载或停止时必须清理，否则会持续 setState
  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setVoiceSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  // 预览图用的 object URL 需要回收，避免内存泄漏
  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p)), [photos]);

  const addPhotos = (files: FileList | null) => {
    if (!files?.length) return;
    const urls = Array.from(files)
      .slice(0, 4 - photos.length)
      .map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls]);
    // 模拟上传后的 AI 识图
    setRecognizing(true);
    setTimeout(() => {
      setRecognized(PHOTO_GUESSES.slice(0, Math.min(4, photos.length + urls.length + 1)));
      setRecognizing(false);
    }, 1200);
  };

  const stopRecording = () => {
    setRecording(false);
    // 模拟语音转写
    setTimeout(() => setTranscript(VOICE_TRANSCRIPT), 600);
  };

  const togglePick = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  // 各模式下的热量与描述
  const kcal =
    mode === "photo"
      ? recognized.reduce((s, r) => s + r.kcal, 0)
      : mode === "voice"
        ? transcript
          ? VOICE_ITEMS.reduce((s, r) => s + r.kcal, 0)
          : 0
        : QUICK_FOODS.filter((f) => picked.includes(f.name)).reduce((s, f) => s + f.kcal, 0);

  const desc =
    mode === "photo"
      ? recognized.map((r) => r.name).join("、")
      : mode === "voice"
        ? transcript
        : [picked.join("、"), text].filter(Boolean).join("；");

  const ready = kcal > 0;

  const submit = () => {
    if (!ready) return;
    saveCheckin({
      kind: "diet",
      meal,
      mode,
      text: desc,
      photoCount: photos.length,
      voiceSec,
      kcal,
      at: new Date().toISOString(),
    });
    setSaved(true);
  };

  const MODES: { key: DietInputMode; icon: string; label: string }[] = [
    { key: "photo", icon: "📷", label: "拍照" },
    { key: "voice", icon: "🎤", label: "语音" },
    { key: "text", icon: "✍️", label: "文字" },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface-2">
      <StatusBar title="饮食打卡" />

      <header className="flex shrink-0 items-center gap-2 bg-surface px-4 py-2.5 shadow-sm">
        <Link to="/parent" aria-label="返回" className="grid h-8 w-8 place-items-center rounded-full bg-surface-2">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">今天吃了什么</p>
          <p className="truncate text-[10px] text-muted-foreground">
            推荐上限 {TARGET_KCAL} kcal · 记录后自动核对是否匹配
          </p>
        </div>
      </header>

      {saved ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          <div className="rounded-2xl bg-surface p-5 text-center shadow-sm ring-1 ring-border/60">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-xl text-success">
              <EIcon e="✓" />
            </span>
            <p className="mt-2 text-sm font-bold">{meal}打卡完成</p>
            <p className="mt-1 text-[11px] text-muted-foreground text-pretty">{desc}</p>
          </div>
          <VerdictCard v={evaluateDiet(kcal)} />
          <button
            onClick={() => navigate({ to: "/parent" })}
            className="mt-auto shrink-0 rounded-full bg-rose py-3 text-sm font-semibold text-rose-foreground"
          >
            返回首页
          </button>
        </div>
      ) : (
        <>
          <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {/* 餐次 */}
            <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
              <p className="mb-2 text-[12px] font-semibold">餐次</p>
              <div className="flex gap-2">
                {MEALS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMeal(m)}
                    className={`flex-1 rounded-xl py-2 text-[12px] font-medium transition ${
                      meal === m ? "bg-rose text-rose-foreground" : "bg-surface-2 text-muted-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </section>

            {/* 记录方式 */}
            <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
              <p className="mb-2 text-[12px] font-semibold">记录方式</p>
              <div className="flex gap-2">
                {MODES.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 text-[11px] font-medium ring-1 transition ${
                      mode === m.key
                        ? "bg-rose/10 text-rose ring-rose/40"
                        : "bg-surface-2 text-muted-foreground ring-transparent"
                    }`}
                  >
                    <span className="text-[15px]">
                      <EIcon e={m.icon} />
                    </span>
                    {m.label}
                  </button>
                ))}
              </div>

              {/* --- 拍照 --- */}
              {mode === "photo" && (
                <div className="mt-3">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    className="sr-only"
                    onChange={(e) => addPhotos(e.target.files)}
                  />
                  <div className="flex flex-wrap gap-2">
                    {photos.map((src, i) => (
                      <div key={src} className="relative h-20 w-20 overflow-hidden rounded-xl ring-1 ring-border">
                        <img src={src} alt={`餐食照片 ${i + 1}`} className="h-full w-full object-cover" />
                        <button
                          onClick={() => setPhotos((p) => p.filter((x) => x !== src))}
                          aria-label="删除照片"
                          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-[10px] text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {photos.length < 4 && (
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="grid h-20 w-20 place-items-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground"
                      >
                        <span className="text-lg">
                          <EIcon e="📷" />
                        </span>
                        <span className="text-[10px]">拍照/上传</span>
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    最多 4 张 · 拍清整桌菜识别更准
                  </p>

                  {recognizing && (
                    <p className="mt-2 flex items-center gap-1.5 text-[11px] text-rose">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" />
                      AI 正在识别菜品…
                    </p>
                  )}
                  {!recognizing && recognized.length > 0 && (
                    <div className="mt-2 rounded-xl bg-surface-2 p-2.5">
                      <p className="text-[11px] font-semibold">识别结果（可确认）</p>
                      <ul className="mt-1.5 space-y-1">
                        {recognized.map((r) => (
                          <li key={r.name} className="flex items-center justify-between text-[11px]">
                            <span className="min-w-0 flex-1 truncate text-muted-foreground">{r.name}</span>
                            <span className="shrink-0 font-medium">{r.kcal} kcal</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* --- 语音 --- */}
              {mode === "voice" && (
                <div className="mt-3 flex flex-col items-center">
                  <button
                    onClick={() => (recording ? stopRecording() : (setVoiceSec(0), setTranscript(""), setRecording(true)))}
                    className={`grid h-20 w-20 place-items-center rounded-full text-2xl transition ${
                      recording
                        ? "animate-pulse bg-rose text-rose-foreground"
                        : "bg-rose/10 text-rose ring-1 ring-rose/30"
                    }`}
                    aria-label={recording ? "停止录音" : "开始录音"}
                  >
                    <EIcon e="🎤" />
                  </button>
                  <p className="mt-2 text-[12px] font-semibold tabular-nums">
                    {recording ? `录音中 ${voiceSec}s` : voiceSec > 0 ? `已录 ${voiceSec}s` : "点击开始说话"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {recording ? "再次点击结束" : "例如「晚饭吃了一碗杂粮饭和清蒸鱼」"}
                  </p>

                  {recording && (
                    <div className="mt-2 flex h-6 items-end gap-0.5">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-1 animate-pulse rounded-full bg-rose/60"
                          style={{ height: `${8 + ((i * 7) % 16)}px`, animationDelay: `${i * 60}ms` }}
                        />
                      ))}
                    </div>
                  )}

                  {transcript && (
                    <div className="mt-3 w-full rounded-xl bg-surface-2 p-2.5">
                      <p className="text-[11px] font-semibold">语音转写</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground text-pretty">
                        {transcript}
                      </p>
                      <ul className="mt-2 space-y-1 border-t border-border/60 pt-2">
                        {VOICE_ITEMS.map((r) => (
                          <li key={r.name} className="flex items-center justify-between text-[11px]">
                            <span className="min-w-0 flex-1 truncate text-muted-foreground">{r.name}</span>
                            <span className="shrink-0 font-medium">{r.kcal} kcal</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* --- 文字 --- */}
              {mode === "text" && (
                <div className="mt-3">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    placeholder="补充说明，如「主食只吃了半碗」"
                    className="w-full resize-none rounded-xl bg-surface-2 p-2.5 text-[12px] outline-none ring-1 ring-transparent placeholder:text-muted-foreground focus:ring-rose/40"
                  />
                  <p className="mb-1.5 mt-2 text-[11px] font-semibold">选择本餐食物</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_FOODS.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => togglePick(f.name)}
                        className={`rounded-full px-2.5 py-1 text-[11px] transition ${
                          picked.includes(f.name)
                            ? "bg-rose text-rose-foreground"
                            : "bg-surface-2 text-muted-foreground"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 实时热量对照 */}
            {ready && (
              <section className="rounded-2xl bg-surface p-3.5 shadow-sm ring-1 ring-border/60">
                <div className="flex items-baseline justify-between">
                  <p className="text-[12px] font-semibold">本餐合计</p>
                  <p className="text-[12px]">
                    <b className="text-lg">{kcal}</b>
                    <span className="text-muted-foreground"> / {TARGET_KCAL} kcal</span>
                  </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${kcal > TARGET_KCAL ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${Math.min(100, (kcal / TARGET_KCAL) * 100)}%` }}
                  />
                </div>
              </section>
            )}
          </div>

          <div className="shrink-0 px-4 pb-4">
            <button
              onClick={submit}
              disabled={!ready}
              className="w-full rounded-full bg-rose py-3 text-sm font-semibold text-rose-foreground transition disabled:bg-muted disabled:text-muted-foreground"
            >
              {ready ? "提交打卡" : "请先记录本餐内容"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
