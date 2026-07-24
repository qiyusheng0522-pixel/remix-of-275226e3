import type { ReactNode } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { RoleSwitcher } from "./RoleSwitcher";

export function MobileFrame({
  children,
  bg = "bg-surface-2",
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 py-6 md:py-10">
      <div className="mx-auto w-full max-w-md">
        {/* Phone device frame */}
        <div className="relative mx-auto w-full max-w-[400px]">
          {/* Side buttons */}
          <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-slate-400/70" />
          <span className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-slate-400/70" />
          <span className="absolute -left-[3px] top-52 h-12 w-[3px] rounded-l bg-slate-400/70" />
          <span className="absolute -right-[3px] top-40 h-16 w-[3px] rounded-r bg-slate-400/70" />
          {/* Bezel */}
          <div className="rounded-[44px] bg-slate-900 p-[10px] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.55),0_0_0_2px_rgba(255,255,255,0.05)_inset]">
            <div className={`relative overflow-hidden rounded-[36px] ${bg}`}>
              {/* Dynamic Island / Notch */}
              <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-900" />
              <div className="flex min-h-[820px] flex-col pt-8">{children}</div>
              {/* Home indicator */}
              <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-slate-900/40" />
            </div>
          </div>
        </div>
        <RoleSwitcher />
      </div>
    </div>
  );
}

// Tab-root pages (each end's bottom-nav destinations) — don't show a back arrow here.
const TAB_ROOTS = new Set<string>([
  "/",
  "/parent",
  "/parent/",
  "/parent/health-plan",
  "/parent/comm",
  "/parent/me",
  "/doctor",
  "/doctor/",
  "/doctor/exam",
  "/doctor/plan",
  "/doctor/comm",
  "/doctor/me",
  "/school",
  "/school/",
  "/school/today",
  "/school/students",
  "/school/intasks",
  "/school/me",
  "/community",
  "/community/",
  "/community/patients",
  "/community/edu",
  "/community/consult",
  "/community/me",
]);

export function StatusBar({
  title,
  right,
  back,
}: {
  title?: string;
  right?: ReactNode;
  /** Force show/hide back button. Defaults: hidden on tab roots, shown elsewhere. */
  back?: boolean;
}) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showBack = back ?? !TAB_ROOTS.has(pathname);

  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[11px] text-muted-foreground">
      <span className="flex items-center gap-2">
        {showBack ? (
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="返回"
            className="-ml-1 flex h-6 w-6 items-center justify-center rounded-full text-[15px] text-foreground/80 hover:bg-surface-2"
          >
            ‹
          </button>
        ) : (
          <span>9:41</span>
        )}
      </span>
      <span className="font-medium">{title}</span>
      <span className="flex items-center gap-1">
        {right}
        <span>●●●</span>
      </span>
    </div>
  );
}
