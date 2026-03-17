"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { TagFilterItem } from "@/components/dashboard/tag-filter-item";
import { mockTags } from "../../lib/utils/dashboard";
import { SidebarNavItem } from "./sidebar-nav-item";

type MobileSidebarDrawerProps = {
  open: boolean;
  onClose: () => void;
  currentPath: string;
};

export function MobileSidebarDrawer({
  open,
  onClose,
  currentPath,
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

      <aside className="absolute left-0 top-0 h-full w-[320px] max-w-[88%] overflow-y-auto bg-white p-250 shadow-soft dark:bg-darkneutral-600">
        <div className="mb-300 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-[20px] font-bold text-teal-800 dark:text-white"
          >
            Bookmark Manager
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-radius-10 p-100 text-neutral-900 dark:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
    </div>
  );
}