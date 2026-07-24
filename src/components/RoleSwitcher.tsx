import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import { EIcon } from "@/components/EIcon";
const roles = [
  { to: "/parent", label: "家长端", icon: <EIcon e="👨‍👩‍👧" />, color: "bg-warm" },
  { to: "/school", label: "学校端", icon: <EIcon e="🏫" />, color: "bg-teal" },
  { to: "/doctor", label: "医生端", icon: <EIcon e="🩺" />, color: "bg-deep" },
  { to: "/community", label: "社区端", icon: <EIcon e="🏥" />, color: "bg-rose" },
] as const;

export function RoleSwitcher() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (pathname === "/") return null;

  const current =
    roles.find((r) => pathname.startsWith(r.to)) ?? roles[0];

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 mx-auto flex w-full max-w-md justify-end px-3 pt-2">
      <div className="pointer-events-auto relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1.5 rounded-full ${current.color} px-3 py-1.5 text-[11px] font-medium text-white shadow-lg shadow-black/10`}
        >
          <span>{current.icon}</span>
          <span>切换端</span>
          <span className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-border">
            {roles.map((r) => {
              const active = pathname.startsWith(r.to);
              return (
                <Link
                  key={r.to}
                  to={r.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs active:bg-surface-2 ${
                    active ? "bg-surface-2 font-semibold" : ""
                  }`}
                >
                  <span className={`grid h-6 w-6 place-items-center rounded-lg ${r.color} text-white`}>
                    {r.icon}
                  </span>
                  <span className="flex-1">{r.label}</span>
                  {active && <span className="text-muted-foreground">·</span>}
                </Link>
              );
            })}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-t border-border px-3 py-2.5 text-xs text-muted-foreground active:bg-surface-2"
            >
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-muted">{<EIcon e="🏠" className="inline h-3.5 w-3.5" />}</span>
              <span>回到首页</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
