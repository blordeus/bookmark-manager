import { createClient } from "@/lib/supabase/server";
import type { Bookmark } from "@/types/bookmark";

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

export async function getBookmarks(isArchived = false) {
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
    .eq("is_archived", isArchived)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as BookmarkRow[]).map(mapBookmark);
}