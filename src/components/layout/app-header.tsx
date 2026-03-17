"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { AddBookmarkModal } from "@/components/bookmarks/add-bookmark-modal";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Button } from "@/components/shared/button";
import { MobileSidebarDrawer } from "./mobile-sidebar-drawer";
import { ProfileDropdown } from "./profile-dropdown";
import type { SidebarStats } from "@/lib/utils/sidebar-stats";

type AppHeaderProps = {
  currentPath: string;
  profile: {
    full_name: string;
    email: string;
  };
  sidebarStats: SidebarStats;
};

export function AppHeader({ currentPath, profile, sidebarStats }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-200 sm:flex-row sm:items-center">
        <div className="flex items-center gap-150 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-radius-10 border border-app bg-surface-input text-app"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <SearchBar />
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 lg:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-150">
          <Button className="w-full sm:w-auto" onClick={() => setShowAddModal(true)}>
            + Add Bookmark
          </Button>
          <ProfileDropdown name={profile.full_name} email={profile.email} />
        </div>
      </header>

      <MobileSidebarDrawer
        open={open}
        onClose={() => setOpen(false)}
        currentPath={currentPath}
        sidebarStats={sidebarStats}
      />

      <AddBookmarkModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}