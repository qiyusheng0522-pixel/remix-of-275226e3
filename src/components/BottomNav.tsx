import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type NavItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

export function BottomNav({ items, accent = "warm" }: { items: NavItem[]; accent?: "warm" | "teal" | "deep" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const accentText = accent === "teal" ? "text-teal" : accent === "deep" ? "text-deep" : "text-warm";
  const accentBg = accent === "teal" ? "bg-teal/15" : accent === "deep" ? "bg-deep/15" : "bg-warm/15";

  return (
    <nav className="sticky bottom-0 z-20 mt-auto border-t border-border bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = pathname === it.to;
          return (
            <li key={it.to} className="flex">
              <Link
                to={it.to}
                className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-2xl transition ${
                    active ? `${accentBg} ${accentText}` : ""
                  }`}
                >
                  {it.icon}
                </span>
                <span className={active ? `${accentText} font-medium` : ""}>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
