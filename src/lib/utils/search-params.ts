import type { SortOption } from "@/types/bookmark";

export function getSearchQuery(
  value: string | string[] | undefined,
) {
  if (!value) return "";
  return Array.isArray(value) ? value[0] : value;
}

export function getTagsQuery(
  value: string | string[] | undefined,
) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return [];

  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function getSortQuery(
  value: string | string[] | undefined,
): SortOption {
  const raw = Array.isArray(value) ? value[0] : value;

  if (
    raw === "recently_added" ||
    raw === "recently_visited" ||
    raw === "most_visited"
  ) {
    return raw;
  }

  return "recently_added";
}