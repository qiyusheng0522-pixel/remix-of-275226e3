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
          { to: "/community", label: "今日待办", icon: "🏥" },
          { to: "/community/patients", label: "居民档案", icon: "👥" },
          { to: "/community/edu", label: "健康宣教", icon: "📢" },
          { to: "/community/consult", label: "咨询回复", icon: "💬" },
          { to: "/community/me", label: "我的", icon: "👤" },
        ]}
      />
    </MobileFrame>
  );
}
