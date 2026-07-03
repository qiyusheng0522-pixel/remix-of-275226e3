import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

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
        accent="warm"
        items={[
          { to: "/parent", label: "首页", icon: "🏠" },
          { to: "/parent/report", label: "报告", icon: "📋" },
          { to: "/parent/care", label: "呵护", icon: "💗" },
          { to: "/parent/record", label: "记录", icon: "✏️" },
          { to: "/parent/me", label: "我的", icon: "👤" },
        ]}
      />
    </MobileFrame>
  );
}
