import { createClient } from "@/lib/supabase/server";
import type { Bookmark, SortOption } from "@/types/bookmark";

type BookmarkRow = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  url: string;
  favicon_url: string | null;
  visit_count: number;
  created_at: string;
  updated_at: string;
  last_visited_at: string | null;
  is_archived: boolean;
  is_pinned: boolean;
  bookmark_tags: { tag_name: string }[];
};

function mapBookmark(row: BookmarkRow): Bookmark {
  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    description: row.description,
    url: row.url,
    favicon_url: row.favicon_url,
    visit_count: row.visit_count,
    created_at: row.created_at,
    updated_at: row.updated_at,
    last_visited_at: row.last_visited_at,
    is_archived: row.is_archived,
    is_pinned: row.is_pinned,
    tags: row.bookmark_tags.map((tag) => tag.tag_name),
  };
}

function applySort(bookmarks: Bookmark[], sort: SortOption) {
  const sorted = [...bookmarks];

  if (sort === "most_visited") {
    sorted.sort((a, b) => b.visit_count - a.visit_count);
  }

  if (sort === "recently_visited") {
    sorted.sort((a, b) => {
      const aTime = a.last_visited_at ? new Date(a.last_visited_at).getTime() : 0;
      const bTime = b.last_visited_at ? new Date(b.last_visited_at).getTime() : 0;
      return bTime - aTime;
    });
  }

  if (sort === "recently_added") {
    sorted.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  return sorted;
}

export async function getBookmarks({
  isArchived = false,
  query = "",
  tags = [],
  sort = "recently_added",
}: {
  isArchived?: boolean;
  query?: string;
  tags?: string[];
  sort?: SortOption;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      id,
      user_id,
      title,
      description,
      url,
      favicon_url,
      visit_count,
      created_at,
      updated_at,
      last_visited_at,
      is_archived,
      is_pinned,
      bookmark_tags ( tag_name )
    `)
    .eq("is_archived", isArchived);

  if (error || !data) {
    return [];
  }

  let bookmarks = (data as BookmarkRow[]).map(mapBookmark);

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    bookmarks = bookmarks.filter((bookmark) => {
      return (
        bookmark.title.toLowerCase().includes(normalizedQuery) ||
        bookmark.description.toLowerCase().includes(normalizedQuery) ||
        bookmark.url.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (tags.length > 0) {
    const normalizedTags = tags.map((tag) => tag.toLowerCase());

    bookmarks = bookmarks.filter((bookmark) =>
      normalizedTags.every((tag) =>
        bookmark.tags.some((bookmarkTag) => bookmarkTag.toLowerCase() === tag),
      ),
    );
  }

  if (!isArchived) {
    const pinned = bookmarks.filter((bookmark) => bookmark.is_pinned);
    const unpinned = bookmarks.filter((bookmark) => !bookmark.is_pinned);

    return [
      ...applySort(pinned, sort),
      ...applySort(unpinned, sort),
    ];
  }

  return applySort(bookmarks, sort);
}