import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/school")({
  component: SchoolLayout,
});

function SchoolLayout() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col pb-16">
        <Outlet />
      </div>
      <BottomNav
        accent="teal"
        items={[
          { to: "/school", label: "工作台", icon: "🏫" },
          { to: "/school/today", label: "今日体检", icon: "📅" },
          { to: "/school/students", label: "学生", icon: "👨‍🎓" },
          { to: "/school/intasks", label: "任务", icon: "✅" },
          { to: "/school/me", label: "我的", icon: "👤" },
        ]}
      />
    </MobileFrame>
  );
}
