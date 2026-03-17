"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  function updateSearch(nextValue: string) {
    setValue(nextValue);

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
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-darkneutral-100" />
      <input
        type="text"
        value={value}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-radius-10 border border-neutral-400 bg-white py-150 pl-11 pr-4 text-[14px] font-medium text-neutral-900 outline-none transition placeholder:text-neutral-500 focus:border-teal-800 focus:ring-2 focus:ring-teal-800/20 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white dark:placeholder:text-darkneutral-100"
      />
    </div>
  );
}