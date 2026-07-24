import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

import { EIcon } from "@/components/EIcon";
export const Route = createFileRoute("/parent")({
  component: ParentLayout,
});

function ParentLayout() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col pb-16">
        <Outlet />
      </div>
      <BottomNav
        accent="rose"
        items={[
          { to: "/parent", label: "首页", icon: <EIcon e="🏠" /> },
          { to: "/parent/health-plan", label: "健康方案", icon: <EIcon e="📋" /> },
          { to: "/parent/comm", label: "健康助手", icon: <EIcon e="💬" /> },
          { to: "/parent/me", label: "我的", icon: <EIcon e="👤" /> },
        ]}
      />
    </MobileFrame>
  );
}
