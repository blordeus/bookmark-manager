import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";
import { mockBookmarks } from "@/lib/utils/mock-bookmarks";

export default function DashboardPage() {
  const activeBookmarks = mockBookmarks.filter((bookmark) => !bookmark.is_archived);

  return (
    <section className="space-y-300">
      <div className="rounded-radius-16 bg-white p-250 shadow-soft dark:bg-darkneutral-600">
        <BookmarksHeading title="All bookmarks">
          <SortDropdown />
        </BookmarksHeading>
      </div>

      <BookmarkGrid bookmarks={activeBookmarks} />
    </section>
  );
}