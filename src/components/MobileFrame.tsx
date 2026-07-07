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
    <div className="min-h-screen w-full bg-gradient-to-b from-warm/10 via-surface-2 to-teal/10">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <div className={`flex min-h-screen flex-1 flex-col ${bg}`}>{children}</div>
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
