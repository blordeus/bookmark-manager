"use client";

import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { useState, useTransition } from "react";
import { logoutAction } from "@/actions/auth";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { useTheme } from "@/hooks/use-theme";

type ProfileDropdownProps = {
  name: string;
  email: string;
};

export function ProfileDropdown({ name, email }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-100 rounded-radius-10 border border-neutral-400 bg-white p-100 transition hover:bg-neutral-100 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:hover:bg-darkneutral-500"
      >
        <Avatar name={name} />
        <ChevronDown className="hidden h-4 w-4 text-neutral-900 sm:block dark:text-white" />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[280px] rounded-radius-16 border border-neutral-300 bg-white p-250 shadow-soft dark:border-darkneutral-500 dark:bg-darkneutral-600">
          <div className="flex items-center gap-150">
            <Avatar name={name} />
            <div>
              <p className="text-[14px] font-semibold text-neutral-900 dark:text-white">
                {name}
              </p>
              <p className="text-[12px] font-medium text-neutral-500 dark:text-darkneutral-100">
                {email}
              </p>
            </div>
          </div>

          <div className="my-250 h-px bg-neutral-300 dark:bg-darkneutral-500" />

          <div className="space-y-150">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-darkneutral-100">
              Theme
            </p>

            <div className="flex gap-100">
              <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                className="flex-1 gap-100"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                className="flex-1 gap-100"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>

          <div className="my-250 h-px bg-neutral-300 dark:bg-darkneutral-500" />

          <button
            type="button"
            onClick={() =>
              startTransition(async () => {
                await logoutAction();
              })
            }
            disabled={pending}
            className="inline-flex items-center gap-100 text-[14px] font-semibold text-neutral-900 dark:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}