"use client";

import { ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "@/constants/sort-options";

export function SortDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "recently_added";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function setSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  }

  const activeOption =
    SORT_OPTIONS.find((option) => option.value === currentSort) ??
    SORT_OPTIONS[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-100 rounded-radius-10 border border-neutral-400 bg-white px-200 py-150 text-[14px] font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white dark:hover:bg-darkneutral-500"
      >
        {activeOption.label}
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[220px] rounded-radius-16 border border-neutral-300 bg-white p-100 shadow-soft dark:border-darkneutral-500 dark:bg-darkneutral-600">
          {SORT_OPTIONS.map((option) => {
            const active = option.value === currentSort;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(option.value)}
                className="flex w-full items-center justify-between rounded-radius-10 px-150 py-125 text-left text-[14px] font-medium text-neutral-900 transition hover:bg-neutral-100 dark:text-white dark:hover:bg-darkneutral-500"
              >
                <span>{option.label}</span>
                {active ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}