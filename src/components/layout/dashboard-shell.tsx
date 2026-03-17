import type { SidebarStats } from "@/lib/utils/sidebar-stats";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

type DashboardShellProps = {
  currentPath: string;
  profile: {
    full_name: string;
    email: string;
  };
  sidebarStats: SidebarStats;
  children: React.ReactNode;
};

export function DashboardShell({
  currentPath,
  profile,
  sidebarStats,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-app px-200 py-200 sm:px-300 sm:py-300">
      <div className="mx-auto flex max-w-[1280px] gap-250">
        <AppSidebar currentPath={currentPath} sidebarStats={sidebarStats} />
        <div className="min-w-0 flex-1 space-y-300">
          <AppHeader currentPath={currentPath} profile={profile} sidebarStats={sidebarStats} />
          {children}
        </div>
      </div>
    </div>
  );
}