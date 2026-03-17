import type { Bookmark } from "@/types/bookmark";

export type TagCount = {
  name: string;
  count: number;
};

export function getTagCounts(bookmarks: Bookmark[]): TagCount[] {
  const counts = new Map<string, number>();

  for (const bookmark of bookmarks) {
    for (const tag of bookmark.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}