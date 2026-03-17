import Link from "next/link";
import { TagFilterItem } from "@/components/dashboard/tag-filter-item";
import type { SidebarStats } from "@/lib/utils/sidebar-stats";
import { SidebarNavItem } from "./sidebar-nav-item";

type AppSidebarProps = {
  currentPath: string;
  sidebarStats: SidebarStats;
};

export function AppSidebar({ currentPath, sidebarStats }: AppSidebarProps) {
  return (
    <aside className="hidden w-[272px] shrink-0 rounded-radius-16 border border-app bg-surface p-250 shadow-soft lg:block">
      <Link
        href="/dashboard"
        className="mb-300 inline-flex text-[20px] font-bold text-app"
      >
        Bookmark Manager
      </Link>

      <nav className="space-y-100">
        <SidebarNavItem
          href="/dashboard"
          label="Home"
          count={sidebarStats.homeCount}
          active={currentPath === "/dashboard"}
        />
        <SidebarNavItem
          href="/dashboard/archived"
          label="Archived"
          count={sidebarStats.archivedCount}
          active={currentPath === "/dashboard/archived"}
        />
      </nav>

      <div className="mt-400">
        <p className="mb-150 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
          Tags
        </p>

        <div className="space-y-25">
          {sidebarStats.tagCounts.map((tag) => (
            <TagFilterItem key={tag.name} label={tag.name} count={tag.count} />
          ))}
        </div>
      </div>
    </aside>
  );
}