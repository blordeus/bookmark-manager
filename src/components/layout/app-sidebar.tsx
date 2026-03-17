import Link from "next/link";
import { TagFilterItem } from "@/components/dashboard/tag-filter-item";
import { mockTags } from "@/lib/utils/dashboard";
import { SidebarNavItem } from "./sidebar-nav-item";

type AppSidebarProps = {
  currentPath: string;
};

export function AppSidebar({ currentPath }: AppSidebarProps) {
  return (
    <aside className="hidden w-[272px] shrink-0 rounded-radius-16 bg-white p-250 shadow-soft lg:block dark:bg-darkneutral-600">
      <Link
        href="/dashboard"
        className="mb-300 inline-flex text-[20px] font-bold text-teal-800 dark:text-white"
      >
        Bookmark Manager
      </Link>

      <nav className="space-y-100">
        <SidebarNavItem
          href="/dashboard"
          label="Home"
          count={6}
          active={currentPath === "/dashboard"}
        />
        <SidebarNavItem
          href="/archived"
          label="Archived"
          count={12}
          active={currentPath === "/archived"}
        />
      </nav>

      <div className="mt-400">
        <p className="mb-150 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-darkneutral-100">
          Tags
        </p>

        <div className="space-y-050">
          {mockTags.map((tag) => (
            <TagFilterItem key={tag.name} label={tag.name} count={tag.count} />
          ))}
        </div>
      </div>
    </aside>
  );
}