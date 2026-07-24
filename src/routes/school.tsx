import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

import { EIcon } from "@/components/EIcon";
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
          { to: "/school", label: "工作台", icon: <EIcon e="🏫" /> },
          { to: "/school/today", label: "今日体检", icon: <EIcon e="📅" /> },
          { to: "/school/students", label: "学生", icon: <EIcon e="👨‍🎓" /> },
          { to: "/school/intasks", label: "任务", icon: <EIcon e="✅" /> },
          { to: "/school/me", label: "我的", icon: <EIcon e="👤" /> },
        ]}
      />
    </MobileFrame>
  );
}
