"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Button } from "@/components/shared/button";
import { MobileSidebarDrawer } from "./mobile-sidebar-drawer";
import { ProfileDropdown } from "./profile-dropdown";

type AppHeaderProps = {
  currentPath: string;
  profile: {
    full_name: string;
    email: string;
  };
};

export function AppHeader({ currentPath, profile }: AppHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-200 sm:flex-row sm:items-center">
        <div className="flex items-center gap-150 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-radius-10 border border-neutral-400 bg-white text-neutral-900 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white"
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
          <Button className="w-full sm:w-auto">+ Add Bookmark</Button>
          <ProfileDropdown name={profile.full_name} email={profile.email} />
        </div>
      </header>

      <MobileSidebarDrawer
        open={open}
        onClose={() => setOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
}