import type { ReactNode } from "react";
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

export function StatusBar({ title, right }: { title?: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[11px] text-muted-foreground">
      <span>9:41</span>
      <span className="font-medium">{title}</span>
      <span className="flex items-center gap-1">
        {right}
        <span>●●●</span>
      </span>
    </div>
  );
}
