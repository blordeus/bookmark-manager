import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

type DashboardShellProps = {
  currentPath: string;
  profile: {
    full_name: string;
    email: string;
  };
  children: React.ReactNode;
};

export function DashboardShell({
  currentPath,
  profile,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-neutral-100 px-200 py-200 dark:bg-darkneutral-900 sm:px-300 sm:py-300">
      <div className="mx-auto flex max-w-[1280px] gap-250">
        <AppSidebar currentPath={currentPath} />

        <div className="min-w-0 flex-1 space-y-300">
          <AppHeader currentPath={currentPath} profile={profile} />
          {children}
        </div>
      </div>
    </div>
  );
}