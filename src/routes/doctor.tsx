import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

import { EIcon } from "@/components/EIcon";
export const Route = createFileRoute("/doctor")({
  component: DoctorLayout,
});

function DoctorLayout() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col pb-16">
        <Outlet />
      </div>
      <BottomNav
        accent="deep"
        items={[
          { to: "/doctor", label: "工作台", icon: <EIcon e="🩺" /> },
          { to: "/doctor/exam", label: "用户", icon: <EIcon e="👥" /> },
          { to: "/doctor/plan", label: "方案", icon: <EIcon e="📋" /> },
          { to: "/doctor/comm", label: "沟通", icon: <EIcon e="💬" /> },
          { to: "/doctor/me", label: "我的", icon: <EIcon e="👤" /> },
        ]}
      />
    </MobileFrame>
  );
}
