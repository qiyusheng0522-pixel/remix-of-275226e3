import { createFileRoute } from "@tanstack/react-router";
import { StatusBar } from "@/components/MobileFrame";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { EIcon } from "@/components/EIcon";
/**
 * 进入咨询页时可携带的检索参数（全部可选）：
 * - `q`     直接提问的问题原文（首页「饮食建议」等快捷入口使用）
 * - `topic` 报告页传入的主题关键字，会映射为一句问题
 * - `from`  来源标记，用于在页头展示上下文
 * 说明：键均为可选，Link 才可以不传 search。
 */
type CommSearch = { q?: string; topic?: string; from?: string };

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

export const Route = createFileRoute("/parent/comm")({
  validateSearch: (s: Record<string, unknown>): CommSearch => ({
    q: str(s.q),
    topic: str(s.topic),
    from: str(s.from),
  }),
  component: CommPage,
});

// 报告页只给 topic，这里翻译成自然语言问题后走同一套问答逻辑
const topicToQuestion: Record<string, string> = {
  report: "帮我解读这次的体检报告",
  "ai-report": "帮我解读这次的体检报告",
  BMI: "小阳 BMI 偏高，饮食上怎么调整？",
  体重: "小阳 体重偏高，饮食上怎么调整？",
  身高: "身高偏矮，需要额外补钙吗？",
  视力: "视力 4.9 需要配镜吗？",
  龋齿: "孩子龋齿要怎么处理？",
  血压: "儿童血压偏高要注意什么？",
};

function resolveQuestion(s: CommSearch): string | undefined {
  if (s.q) return s.q;
  if (!s.topic) return undefined;
  return topicToQuestion[s.topic] ?? `帮我解读体检报告里的「${s.topic}」`;
}

/**
 * AI 回答采用结构化模板而非整段文字，固定为
 *   结论 → 依据标签 → 分节建议（饮食/运动/监测…） → 就医提示
 * 便于家长快速扫读。
 */
type Answer = {
  title: string;
  summary?: string;
  tags?: string[];
  sections: { icon: string; heading: string; items: string[] }[];
  tip?: string;
};

type Msg =
  | { from: "me"; text: string; time: string }
  | { from: "ai"; time: string; typing: true }
  | { from: "ai"; time: string; answer: Answer };

const suggestPool = [
  "小阳 BMI 偏高，日常怎么调整？",
  "夜里咳嗽要不要去医院？",
  "视力 4.9 需要配镜吗？",
  "怎么安排一周的运动计划？",
  "孩子挑食不爱吃蔬菜怎么办？",
  "睡眠时间多少算达标？",
  "过敏性鼻炎家里要注意什么？",
  "身高偏矮，需要额外补钙吗？",
  "屏幕时间怎么控制才合理？",
  "换季感冒预防有什么建议？",
  "早餐怎么搭配更营养？",
  "运动后干咳需要就医吗？",
];

const quickChips = [
  { icon: <EIcon e="📋" />, label: "体检解读" },
  { icon: <EIcon e="🥗" />, label: "今日食谱" },
  { icon: <EIcon e="🏃" />, label: "运动打卡" },
  { icon: <EIcon e="📝" />, label: "复查计划" },
];

// 模拟 AI 答案库 —— 关键词命中后返回结构化建议
const answerBank: { keys: string[]; answer: Answer }[] = [
  {
    keys: ["饮食", "食谱", "怎么吃", "营养", "早餐", "三餐"],
    answer: {
      title: "小阳的饮食建议 · 控重期配餐",
      summary:
        "结合本次体检 BMI 17.1（P85，超重临界）与尘螨过敏，重点是「主食减量 + 蛋白质补足 + 规避高糖」，全天目标 1400–1600 kcal。",
      tags: ["BMI 17.1 · P85", "12 周控重", "尘螨 IgE ++"],
      sections: [
        {
          icon: "🍚",
          heading: "主食：减量换粗",
          items: [
            "晚餐主食减少 1/3，用杂粮饭 / 玉米替换白米白面",
            "拒绝油炸主食（炸鸡、薯条、葱油饼）每周 ≤ 1 次",
          ],
        },
        {
          icon: "🥦",
          heading: "配菜：先菜后饭",
          items: [
            "每餐蔬菜 ≥ 150 g，进餐顺序为蔬菜 → 蛋白 → 主食",
            "深色蔬菜占一半（西兰花、菠菜、胡萝卜）",
          ],
        },
        {
          icon: "🥛",
          heading: "蛋白与饮品",
          items: [
            "每日 1 个鸡蛋 + 300 ml 牛奶，保证生长期蛋白质",
            "含糖饮料全部替换为白水 / 无糖豆浆",
          ],
        },
        {
          icon: "📅",
          heading: "今日示范餐单",
          items: [
            "早餐：鸡蛋 1 个 + 无糖豆浆 250 ml + 杂粮馒头半个",
            "午餐：杂粮饭 1 小碗 + 清蒸鱼 + 炒时蔬",
            "晚餐：500–600 kcal，主食半碗 + 鸡胸肉 + 西兰花",
          ],
        },
      ],
      tip: "过敏提示：尘螨 IgE (++) 与食物无直接关系，无需忌口海鲜蛋奶；若 4 周内体重无下降，建议预约儿保科营养门诊。",
    },
  },
  {
    keys: ["BMI", "偏高", "肥胖", "体重"],
    answer: {
      title: "小阳 BMI 17.1（P85）· 超重临界",
      summary: "尚未达到肥胖标准，通过家庭干预即可回落，建议 12 周内下降 1.5–2 kg。",
      tags: ["超重临界", "12 周目标 -2 kg"],
      sections: [
        {
          icon: "🥗",
          heading: "饮食",
          items: ["晚餐主食减少 1/3，杂粮替换白米", "含糖饮料改为白水 / 无糖豆浆"],
        },
        {
          icon: "🏃",
          heading: "运动",
          items: ["每天餐后快走 15 分钟", "每周 3 次跳绳，每次 20 分钟"],
        },
        {
          icon: "⚖️",
          heading: "监测",
          items: ["每周日晨起空腹称重 1 次并记录", "体重曲线可在「健康方案」查看"],
        },
      ],
      tip: "若 4 周内无改善，建议预约儿保科营养门诊。",
    },
  },
  {
    keys: ["咳嗽", "夜里", "运动后"],
    answer: {
      title: "夜间干咳 · 可先家庭观察",
      summary: "本次体检尘螨 IgE (++)、肺功能正常，夜咳多为过敏性气道高反应。",
      tags: ["尘螨 IgE ++", "肺功能正常"],
      sections: [
        {
          icon: "🏠",
          heading: "家庭护理",
          items: ["床品 60℃ 高温清洗，每周 1 次", "卧室湿度维持 40–50%", "卧室每周除螨 1 次"],
        },
        { icon: "👀", heading: "观察窗口", items: ["先观察 3–5 天，记录咳嗽发生时段与频次"] },
      ],
      tip: "出现喘息、呼吸急促、发烧 > 38.5℃ 或影响睡眠，请立即到呼吸科就诊。",
    },
  },
  {
    keys: ["视力", "配镜", "4.9", "近视"],
    answer: {
      title: "视力 4.9 · 临界正常，暂不配镜",
      summary: "尚在临界范围，重点是干预用眼行为，避免进一步下降。",
      tags: ["裸眼 4.9", "3 个月复查"],
      sections: [
        {
          icon: "👁️",
          heading: "用眼习惯",
          items: ["20-20-20 法则：近距离用眼 20 分钟，远眺 20 秒", "阅读距离保持 33 cm 以上"],
        },
        { icon: "☀️", heading: "户外光照", items: ["每日 ≥ 2 小时户外自然光"] },
      ],
      tip: "3 个月后复测；若下降到 4.8，建议到医院做散瞳验光。",
    },
  },
  {
    keys: ["运动", "计划", "一周", "打卡"],
    answer: {
      title: "一周运动清单 · 通用方案",
      summary: "以中等强度有氧为主，兼顾控重与体能，家长可一同参与。",
      tags: ["每周 5 练", "心率 130–150"],
      sections: [
        {
          icon: "📅",
          heading: "周计划",
          items: [
            "周一 / 三 / 五：跳绳 20 分钟",
            "周二 / 四：亲子快走 30 分钟（餐后 30 分钟内）",
            "周六：户外骑行或球类 45 分钟",
            "周日：休息 + 拉伸 10 分钟",
          ],
        },
      ],
      tip: "可到「健康方案 › 更多运动」加入 AI 推荐，或参与周边家长发布的活动。",
    },
  },
  {
    keys: ["挑食", "蔬菜", "不爱吃"],
    answer: {
      title: "孩子挑食 · 循序渐进 5 步法",
      summary: "挑食干预靠重复暴露，不靠强迫，通常需要 8–15 次尝试。",
      sections: [
        {
          icon: "🥕",
          heading: "操作步骤",
          items: [
            "一次只加 1 种新蔬菜，量从 1 勺开始",
            "与孩子喜欢的食物同盘出现（如番茄配意面）",
            "邀请孩子一起洗菜 / 摆盘，提升接受度",
            "家长以身作则，同吃同赞",
          ],
        },
      ],
      tip: "至少尝试 8–15 次再判断是否真的不接受，避免贴「挑食」标签。",
    },
  },
  {
    keys: ["睡眠", "几点", "达标"],
    answer: {
      title: "学龄儿童睡眠 · 推荐 9–12 小时",
      summary: "6–12 岁建议 21:00 前入睡，6:30–7:00 起床。",
      tags: ["9–12 小时", "21:00 前入睡"],
      sections: [
        {
          icon: "😴",
          heading: "作息安排",
          items: ["21:00 前入睡，早晨 6:30–7:00 起床", "睡前 1 小时不使用电子屏幕"],
        },
        { icon: "🥤", heading: "饮食配合", items: ["下午 15:00 后避免含糖 / 含咖啡因饮料"] },
      ],
    },
  },
  {
    keys: ["过敏", "鼻炎", "尘螨"],
    answer: {
      title: "过敏性鼻炎 · 家庭护理清单",
      summary: "尘螨是主要诱因，环境控制比用药更关键。",
      tags: ["尘螨 IgE ++"],
      sections: [
        {
          icon: "🛏️",
          heading: "床品与卧室",
          items: [
            "床品 ≥ 60℃ 高温清洗，每周 1 次",
            "使用防螨床罩，每季度更换",
            "卧室湿度 40–50%，配备除湿 / 新风",
            "避免毛绒玩具堆积在床上",
          ],
        },
      ],
      tip: "症状持续 > 2 周或影响睡眠，建议到耳鼻喉科就诊。",
    },
  },
];

const fallbackAnswer: Answer = {
  title: "已收到你的问题",
  summary: "结合小阳最近的体检报告与日常打卡数据，先给你 3 条通用建议。",
  sections: [
    {
      icon: "📋",
      heading: "通用建议",
      items: [
        "保持每日 60 分钟中等强度运动",
        "每周家庭健康打卡 ≥ 4 次",
        "若持续 1 周不改善，建议咨询在线健管师",
      ],
    },
  ],
  tip: "可继续追问更具体的问题，例如「晚餐怎么配」「夜咳要不要就医」。",
};

function pickAnswer(q: string): Answer {
  return answerBank.find((a) => a.keys.some((k) => q.includes(k)))?.answer ?? fallbackAnswer;
}

/** 结构化回答卡片：结论 → 依据标签 → 分节要点 → 就医/追问提示 */
function AnswerCard({ a }: { a: Answer }) {
  return (
    <div className="space-y-2.5 py-1">
      <div>
        <p className="text-[13px] font-bold leading-snug text-pretty">{a.title}</p>
        {a.summary && (
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground text-pretty">
            {a.summary}
          </p>
        )}
      </div>

      {a.tags && a.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {a.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-rose/10 px-2 py-0.5 text-[10px] font-medium text-rose"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {a.sections.map((s, i) => (
          <div key={s.heading} className="rounded-xl bg-surface-2 p-2.5">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[11px] shadow-sm">
                <EIcon e={s.icon} />
              </span>
              <span className="min-w-0 flex-1 truncate">
                {i + 1}. {s.heading}
              </span>
            </p>
            <ul className="mt-1.5 space-y-1">
              {s.items.map((it) => (
                <li key={it} className="flex gap-1.5 text-[12px] leading-relaxed">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-rose/60" />
                  <span className="min-w-0 flex-1 text-muted-foreground text-pretty">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {a.tip && (
        <p className="flex gap-1.5 rounded-xl bg-warning/12 px-2.5 py-2 text-[11px] leading-relaxed text-warning-foreground">
          <span className="shrink-0">
            <EIcon e="ℹ️" />
          </span>
          <span className="min-w-0 flex-1 text-pretty">{a.tip}</span>
        </p>
      )}
    </div>
  );
}

function CommPage() {
  const search = Route.useSearch();
  const presetQuestion = resolveQuestion(search);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [seed, setSeed] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const start = (seed * 4) % suggestPool.length;
    return Array.from({ length: 4 }, (_, i) => suggestPool[(start + i) % suggestPool.length]);
  }, [seed]);

  const ask = useCallback((q: string) => {
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMsgs((m) => [...m, { from: "me", text: q, time: t }, { from: "ai", time: t, typing: true }]);
    // 模拟流式回答
    setTimeout(() => {
      setMsgs((m) => {
        const copy = [...m];
        const idx = copy.map((x) => "typing" in x).lastIndexOf(true);
        if (idx >= 0) copy[idx] = { from: "ai", time: t, answer: pickAnswer(q) };
        return copy;
      });
    }, 900);
  }, []);

  // 携带 ?q= 进入时自动提问一次（StrictMode 下用 ref 去重）
  const askedFor = useRef<string | null>(null);
  useEffect(() => {
    if (presetQuestion && askedFor.current !== presetQuestion) {
      askedFor.current = presetQuestion;
      ask(presetQuestion);
    }
  }, [presetQuestion, ask]);

  // 新消息后滚到底部，保证长回答的开头可见
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const send = () => {
    if (!text.trim()) return;
    ask(text.trim());
    setText("");
  };

  const empty = msgs.length === 0;

  // min-h-0 + overflow-hidden keep the composer inside the phone screen: without
  // them the flex column grows past the frame and the input ends up unreachable
  // behind the tab bar.
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-rose/25 via-rose/10 to-rose/5">
      <StatusBar title="健康咨询" />

      {/* Header — 对话开始后收成一行，把空间让给回答内容 */}
      {empty ? (
        <div className="relative px-5 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-serif text-3xl font-bold italic text-rose">Hello~</p>
              <p className="mt-1 text-lg font-bold text-foreground">我是你的健康小助手</p>
              <p className="mt-1 text-[12px] text-rose/90">体检解读 · 居家护理 · 复查提醒</p>
            </div>
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose to-rose/70 text-4xl shadow-lg shadow-rose/30">
              {<EIcon e="🐥" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-5 pb-1 pt-1">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose to-rose/70 text-[15px] text-white">
            <EIcon e="🐥" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-bold">健康小助手</p>
            <p className="truncate text-[10px] text-muted-foreground">
              {search.from === "report" ? "来自体检报告 · 已带入上下文" : "基于小阳的体检报告作答"}
            </p>
          </div>
        </div>
      )}

      {/* Body */}
      <div ref={bodyRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pt-3">
        {empty ? (
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-white/60">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">你可能想问</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                  PICKS FOR YOU
                </p>
              </div>
              <button
                onClick={() => setSeed((s) => s + 1)}
                className="flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-[11px] text-muted-foreground"
              >
                <span>⟳</span> 换一批
              </button>
            </div>
            <ul className="space-y-2">
              {suggestions.map((q) => (
                <li key={q}>
                  <button
                    onClick={() => ask(q)}
                    className="flex w-full items-center gap-2.5 rounded-full bg-surface-2 px-3 py-2.5 text-left"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-[11px] text-background">
                      #
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">
                      {q}
                    </span>
                    <span className="text-muted-foreground">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-3 pb-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === "me"
                      ? "max-w-[85%] whitespace-pre-wrap bg-rose text-rose-foreground"
                      : "w-[92%] bg-white text-foreground shadow-sm ring-1 ring-border/60"
                  }`}
                >
                  {"typing" in m ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" style={{ animationDelay: "120ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose" style={{ animationDelay: "240ms" }} />
                      <span className="ml-1 text-[12px]">健康小助手正在思考…</span>
                    </span>
                  ) : "answer" in m ? (
                    <AnswerCard a={m.answer} />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5 pb-2 pt-2">
        {quickChips.map((c) => (
          <button
            key={c.label}
            onClick={() => ask(c.label)}
            className="flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] text-foreground shadow-sm ring-1 ring-border/50"
          >
            <span>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="shrink-0 px-3 pb-3">
        <div className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 shadow-sm ring-1 ring-border/50">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            // 中文输入法下 Enter 用于确认候选词，此时不应发送
            onKeyDown={(e) => {
              if (e.key !== "Enter" || e.nativeEvent.isComposing || e.keyCode === 229) return;
              send();
            }}
            placeholder="健康答疑，问问小助手"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={send}
            className="grid h-9 w-9 place-items-center rounded-full bg-rose text-rose-foreground"
            aria-label="发送"
          >
            {<EIcon e="➤" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />}
          </button>
        </div>
      </div>
    </div>
  );
}
