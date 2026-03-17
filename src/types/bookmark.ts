export type SortOption =
  | "recently_added"
  | "recently_visited"
  | "most_visited";

export type SidebarTag = {
  name: string;
  count: number;
};

export type Profile = {
  full_name: string;
  email: string;
  theme: "light" | "dark";
};

export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  url: string;
  favicon_url?: string | null;
  tags: string[];
  visit_count: number;
  created_at: string;
  updated_at: string;
  last_visited_at: string | null;
  is_archived: boolean;
  is_pinned: boolean;
};