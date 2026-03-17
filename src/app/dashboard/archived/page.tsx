import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";
import { EmptyState } from "@/components/shared/empty-state";
import { getBookmarks } from "@/lib/utils/bookmark-queries";

export default async function ArchivedPage() {
  const bookmarks = await getBookmarks(true);

  return (
    <section className="space-y-300">
      <div className="rounded-radius-16 bg-white p-250 shadow-soft dark:bg-darkneutral-600">
        <BookmarksHeading title="Archived bookmarks">
          <SortDropdown />
        </BookmarksHeading>
      </div>

      {bookmarks.length > 0 ? (
        <BookmarkGrid bookmarks={bookmarks} />
      ) : (
        <EmptyState
          title="No archived bookmarks"
          description="Archived bookmarks will appear here."
        />
      )}
    </section>
  );
}