"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get("q") ?? "";

  function updateSearch(nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue.trim()) {
      params.set("q", nextValue.trim());
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-radius-10 border border-app bg-surface-input py-150 pl-11 pr-4 text-[14px] font-medium text-app outline-none transition placeholder:text-muted focus:border-teal-800 focus:ring-2 focus:ring-teal-800/20"
      />
    </div>
  );
}