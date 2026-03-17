import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";
import { mockBookmarks } from "@/lib/utils/mock-bookmarks";

export default function ArchivedPage() {
  const archivedBookmarks = mockBookmarks.filter((bookmark) => bookmark.is_archived);

  return (
    <section className="space-y-300">
      <div className="rounded-radius-16 bg-white p-250 shadow-soft dark:bg-darkneutral-600">
        <BookmarksHeading title="Archived bookmarks">
          <SortDropdown />
        </BookmarksHeading>
      </div>

      <BookmarkGrid bookmarks={archivedBookmarks} />
    </section>
  );
}