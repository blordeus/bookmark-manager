export type SortOption = "recently_added" | "recently_visited" | "most_visited";

export type SidebarTag = {
  name: string;
  count: number;
};

export type Profile = {
  full_name: string;
  email: string;
  theme: "light" | "dark";
};