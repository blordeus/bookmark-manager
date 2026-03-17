import type { Bookmark } from "@/types/bookmark";

export type SidebarTagCount = {
  name: string;
  count: number;
};

export type SidebarStats = {
  homeCount: number;
  archivedCount: number;
  tagCounts: SidebarTagCount[];
};

export function getSidebarStats(bookmarks: Bookmark[]): SidebarStats {
  const tagMap = new Map<string, number>();

  let homeCount = 0;
  let archivedCount = 0;

  for (const bookmark of bookmarks) {
    if (bookmark.is_archived) {
      archivedCount += 1;
    } else {
      homeCount += 1;
    }

    for (const tag of bookmark.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  const tagCounts = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    homeCount,
    archivedCount,
    tagCounts,
  };
}