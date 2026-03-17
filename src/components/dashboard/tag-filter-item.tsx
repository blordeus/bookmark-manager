"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/shared/checkbox";

type TagFilterItemProps = {
  label: string;
  count: number;
};

export function TagFilterItem({ label, count }: TagFilterItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const normalizedLabel = label.toLowerCase();

  const selectedTags = (searchParams.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const checked = selectedTags.includes(label.toLowerCase());

  function toggleTag() {
    const params = new URLSearchParams(searchParams.toString());
    const nextTags = new Set(selectedTags);

    if (checked) {
      nextTags.delete(label.toLowerCase());
    } else {
      nextTags.add(label.toLowerCase());
    }

    const finalTags = Array.from(nextTags);

    if (finalTags.length > 0) {
      params.set("tags", finalTags.join(","));
    } else {
      params.delete("tags");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <button type="button" onClick={toggleTag} className="w-full text-left">
      <Checkbox checked={checked} label={label} count={count} />
    </button>
  );
}