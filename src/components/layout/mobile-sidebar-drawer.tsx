"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { TagFilterItem } from "@/components/dashboard/tag-filter-item";
import type { SidebarStats } from "@/lib/utils/sidebar-stats";
import { SidebarNavItem } from "./sidebar-nav-item";

type MobileSidebarDrawerProps = {
  open: boolean;
  onClose: () => void;
  currentPath: string;
  sidebarStats: SidebarStats;
};

export function MobileSidebarDrawer({
  open,
  onClose,
  currentPath,
  sidebarStats
}: MobileSidebarDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40"
        aria-label="Close sidebar"
      />

      <aside className="absolute left-0 top-0 h-full w-[320px] max-w-[88%] overflow-y-auto bg-surface p-250 shadow-soft">
        <div className="mb-300 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-[20px] font-bold text-app"
          >
            Bookmark Manager
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-radius-10 p-100 text-app"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
               <TagFilterItem key={tag.name} label={tag.name} count={tag.count}/>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}