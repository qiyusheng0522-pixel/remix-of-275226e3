import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/community")({
  component: CommunityLayout,
});

function CommunityLayout() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col pb-16">
        <Outlet />
      </div>
      <BottomNav
        accent="warm"
        items={[
          { to: "/community", label: "工作台", icon: "🏥" },
          { to: "/community/patients", label: "在管患者", icon: "👥" },
          { to: "/community/consult", label: "健康咨询", icon: "💬" },
          { to: "/community/me", label: "我的", icon: "👤" },
        ]}
      />
    </MobileFrame>
  );
}
