import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StatusBar } from "@/components/MobileFrame";
import { ActionSheet } from "@/components/ActionSheet";

import { EIcon } from "@/components/EIcon";
export const Route = createFileRoute("/parent/shop")({
  component: ShopPage,
});

type Cat = "全部" | "营养餐" | "服务包" | "健康商品";

type Product = {
  id: string;
  cat: Exclude<Cat, "全部">;
  icon: import("react").ReactNode;
  name: string;
  brief: string;
  tags: string[];
  price: number;
  unit: string;
  subscribable?: boolean; // 支持周期购买
  cycles?: { key: string; label: string; discount: number; note: string }[];
};

const products: Product[] = [
  {
    id: "meal-balance",
    cat: "营养餐",
    icon: <EIcon e="🥗" />,
    name: "均衡成长营养餐",
    brief: "营养师配比 · 每餐 500-600 kcal · 冷链配送到家",
    tags: ["7-12 岁", "低盐低糖", "含蔬果"],
    price: 42,
    unit: "份",
    subscribable: true,
    cycles: [
      { key: "single", label: "单次购买", discount: 1, note: "1 份 · 自选日期" },
      { key: "w1", label: "周套餐 · 5 天", discount: 0.95, note: "工作日午餐 · 5 份" },
      { key: "w2", label: "两周套餐 · 10 天", discount: 0.9, note: "10 份 · 自动周配送" },
      { key: "m1", label: "月套餐 · 20 天", discount: 0.85, note: "20 份 · 每周送达 · 随时暂停" },
    ],
  },
  {
    id: "meal-obesity",
    cat: "营养餐",
    icon: <EIcon e="🥦" />,
    name: "肥胖 / 代谢管理餐",
    brief: "针对 BMI 偏高儿童 · 医生联合定制",
    tags: ["低 GI", "高蛋白", "定量餐盒"],
    price: 48,
    unit: "份",
    subscribable: true,
    cycles: [
      { key: "single", label: "单次尝鲜", discount: 1, note: "1 份" },
      { key: "w1", label: "周套餐 · 5 天", discount: 0.95, note: "5 份 · 附体重跟踪表" },
      { key: "m1", label: "月套餐 · 20 天", discount: 0.85, note: "20 份 · 营养师 1v1 复盘 1 次" },
      { key: "q1", label: "季套餐 · 60 天", discount: 0.78, note: "60 份 · 每月体重/腰围随访" },
    ],
  },
  {
    id: "meal-allergy",
    cat: "营养餐",
    icon: <EIcon e="🍚" />,
    name: "低敏儿童营养餐",
    brief: "针对花粉 / 尘螨 / 食物过敏儿童 · 无常见致敏原",
    tags: ["无麸质可选", "无海鲜", "无坚果"],
    price: 52,
    unit: "份",
    subscribable: true,
    cycles: [
      { key: "single", label: "单次购买", discount: 1, note: "1 份" },
      { key: "w1", label: "周套餐 · 5 天", discount: 0.95, note: "5 份" },
      { key: "m1", label: "月套餐 · 20 天", discount: 0.88, note: "20 份 · 过敏原月度筛查报告" },
    ],
  },
  {
    id: "svc-obesity",
    cat: "服务包",
    icon: <EIcon e="⚖️" />,
    name: "儿童体重管理季度包",
    brief: "医生 + 营养师 + 健管师 · 3 个月体重曲线干预",
    tags: ["3 个月", "含 4 次随访", "1 次门诊"],
    price: 1280,
    unit: "季",
    subscribable: true,
    cycles: [
      { key: "q1", label: "季度包 · 3 个月", discount: 1, note: "标准方案" },
      { key: "h1", label: "半年包 · 6 个月", discount: 0.9, note: "延续干预 · 附赠体脂秤" },
      { key: "y1", label: "年包 · 12 个月", discount: 0.82, note: "全年跟踪 · 4 次门诊 + 智能秤" },
    ],
  },
  {
    id: "svc-asthma",
    cat: "服务包",
    icon: <EIcon e="🫁" />,
    name: "儿童哮喘管理年度包",
    brief: "呼吸科医生随访 · 峰流速仪 + 家庭雾化指导",
    tags: ["12 个月", "8 次随访", "2 次门诊"],
    price: 2680,
    unit: "年",
    subscribable: true,
    cycles: [
      { key: "y1", label: "年包 · 12 个月", discount: 1, note: "标准方案" },
      { key: "y2", label: "两年包", discount: 0.85, note: "长期管理 · 峰流速仪升级款" },
    ],
  },
  {
    id: "svc-vision",
    cat: "服务包",
    icon: <EIcon e="👀" />,
    name: "近视防控半年包",
    brief: "眼科医生 + 视功能训练 · 每月屈光复查",
    tags: ["6 个月", "6 次视力检查"],
    price: 1580,
    unit: "半年",
  },
  {
    id: "goods-scale",
    cat: "健康商品",
    icon: <EIcon e="⚖️" />,
    name: "儿童智能体脂秤",
    brief: "自动同步『我的数据』· 生成体重曲线",
    tags: ["蓝牙", "App 联动"],
    price: 289,
    unit: "台",
  },
  {
    id: "goods-mite",
    cat: "健康商品",
    icon: <EIcon e="🛏️" />,
    name: "除螨包月耗材",
    brief: "床品除螨喷雾 + 一次性防螨罩",
    tags: ["低敏", "月度补给"],
    price: 128,
    unit: "月",
    subscribable: true,
    cycles: [
      { key: "single", label: "单次购买", discount: 1, note: "1 份耗材" },
      { key: "m1", label: "月度订阅", discount: 0.9, note: "每月自动送达" },
      { key: "q1", label: "季度订阅", discount: 0.82, note: "每 3 月送达 · 立省更多" },
    ],
  },
  {
    id: "goods-vitd",
    cat: "健康商品",
    icon: <EIcon e="☀️" />,
    name: "儿童维生素 D 滴剂",
    brief: "医师推荐剂量 · 30 天装",
    tags: ["30 天", "药监备案"],
    price: 89,
    unit: "瓶",
    subscribable: true,
    cycles: [
      { key: "single", label: "单次购买", discount: 1, note: "1 瓶" },
      { key: "m1", label: "月度订阅", discount: 0.92, note: "每月 1 瓶自动配送" },
      { key: "q1", label: "季度订阅", discount: 0.85, note: "每季 3 瓶 · 更划算" },
    ],
  },
];

const cats: Cat[] = ["全部", "营养餐", "服务包", "健康商品"];

function ShopPage() {
  const [c, setC] = useState<Cat>("全部");
  const list = products.filter((p) => c === "全部" || p.cat === c);

  return (
    <div>
      <StatusBar title="健康服务商城" />
      <div className="px-5 pb-24 pt-2">
        <div className="mb-3 rounded-2xl bg-gradient-to-r from-rose/90 to-rose/70 p-4 text-white shadow-lg shadow-rose/30">
          <p className="text-[11px] text-white/85">{<EIcon e="✨" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />} 儿科医生 & 营养师联合甄选</p>
          <p className="mt-0.5 text-base font-bold">童护佳健康服务商城</p>
          <p className="mt-1 text-[12px] text-white/90">
            营养餐 · 服务包 · 健康商品 · 均支持按周期订阅，随时暂停
          </p>
        </div>

        <div className="mb-3 flex gap-2 overflow-x-auto">
          {cats.map((k) => {
            const active = c === k;
            return (
              <button
                key={k}
                onClick={() => setC(k)}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] ring-1 transition ${
                  active
                    ? "bg-rose text-rose-foreground ring-transparent"
                    : "bg-surface text-foreground ring-border"
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>

        <ul className="space-y-3">
          {list.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
              <div className="flex gap-3 p-3">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-warm/10 text-3xl">
                  {p.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    {p.subscribable && (
                      <span className="shrink-0 rounded-full bg-teal/15 px-1.5 py-0.5 text-[10px] text-teal">
                        可周期购
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{p.brief}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 bg-surface-2/50 px-3 py-2">
                <p className="text-sm">
                  <span className="text-[11px] text-muted-foreground">￥</span>
                  <span className="font-bold text-rose">{p.price}</span>
                  <span className="text-[11px] text-muted-foreground"> /{p.unit}起</span>
                </p>
                <BuySheet product={p} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BuySheet({ product }: { product: Product }) {
  const cycles = product.cycles ?? [{ key: "single", label: "单次购买", discount: 1, note: "1 份" }];
  const [cycleKey, setCycleKey] = useState(cycles[0].key);
  const [qty, setQty] = useState(1);
  const [startDate, setStartDate] = useState("2026-04-15");
  const [addr, setAddr] = useState("默认地址：上海市徐汇区…");
  const cycle = cycles.find((x) => x.key === cycleKey) ?? cycles[0];
  const total = Math.round(product.price * cycle.discount * qty);

  return (
    <ActionSheet
      trigger={
        <button className="rounded-full bg-rose px-3 py-1.5 text-[12px] font-medium text-rose-foreground">
          立即购买
        </button>
      }
      title={product.name}
      description={product.brief}
      confirmText={`确认下单 ￥${total}`}
      toastMessage={cycle.key === "single" ? "已下单，客服将联系您 " : "周期订阅已创建 "}
    >
      <div className="space-y-3 text-xs">
        {product.subscribable && (
          <div>
            <p className="mb-1 text-muted-foreground">选择周期</p>
            <div className="grid grid-cols-2 gap-2">
              {cycles.map((cy) => {
                const active = cy.key === cycleKey;
                return (
                  <button
                    key={cy.key}
                    onClick={() => setCycleKey(cy.key)}
                    className={`rounded-xl p-2 text-left ring-1 transition ${
                      active
                        ? "bg-rose/10 ring-rose text-foreground"
                        : "bg-surface-2 ring-border/60"
                    }`}
                  >
                    <p className="text-[12px] font-semibold">{cy.label}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{cy.note}</p>
                    {cy.discount < 1 && (
                      <p className="mt-1 text-[10px] text-rose">
                        立省 {Math.round((1 - cy.discount) * 100)}%
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <label className="block">
          <span className="text-muted-foreground">
            {product.cat === "营养餐" ? "首次配送日期" : cycle.key === "single" ? "开始日期" : "首次生效日期"}
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
          />
        </label>

        <div className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2">
          <span className="text-muted-foreground">数量</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-7 w-7 place-items-center rounded-full bg-surface ring-1 ring-border"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid h-7 w-7 place-items-center rounded-full bg-surface ring-1 ring-border"
            >
              +
            </button>
          </div>
        </div>

        <label className="block">
          <span className="text-muted-foreground">收货 / 服务地址</span>
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            className="mt-1 w-full rounded-xl bg-surface-2 px-3 py-2 outline-none"
          />
        </label>

        {product.subscribable && cycle.key !== "single" && (
          <p className="rounded-lg bg-teal/10 px-2.5 py-1.5 text-[11px] text-teal">
            {<EIcon e="✓" className="inline-block h-[1.15em] w-[1.15em] align-[-0.15em]" />} 周期订阅可随时在「我的 · 我的订单」中暂停或退订
          </p>
        )}

        <div className="flex items-center justify-between border-t border-border/60 pt-2">
          <span className="text-muted-foreground">合计</span>
          <span className="text-base font-bold text-rose">￥{total}</span>
        </div>
      </div>
    </ActionSheet>
  );
}
