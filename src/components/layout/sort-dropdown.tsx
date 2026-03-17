import { ChevronDown } from "lucide-react";

export function SortDropdown() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-100 rounded-radius-10 border border-neutral-400 bg-white px-200 py-150 text-[14px] font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white dark:hover:bg-darkneutral-500"
    >
      Sort by
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}