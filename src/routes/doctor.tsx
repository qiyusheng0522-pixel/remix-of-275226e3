import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

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
          { to: "/doctor", label: "工作台", icon: "🩺" },
          { to: "/doctor/exam", label: "用户", icon: "👥" },
          { to: "/doctor/review", label: "复核", icon: "📝" },
          { to: "/doctor/plan", label: "方案", icon: "📋" },
          { to: "/doctor/me", label: "我的", icon: "👤" },
        ]}
      />
    </MobileFrame>
  );
}
