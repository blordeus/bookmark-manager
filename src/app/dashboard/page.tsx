import { AddBookmarkForm } from "@/components/bookmarks/add-bookmark-form";
import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";
import { EmptyState } from "@/components/shared/empty-state";
import { getBookmarks } from "@/lib/utils/bookmark-queries";

export default async function DashboardPage() {
  const bookmarks = await getBookmarks(false);

  return (
    <section className="space-y-300">
      <AddBookmarkForm />

      <div className="rounded-radius-16 bg-white p-250 shadow-soft dark:bg-darkneutral-600">
        <BookmarksHeading title="All bookmarks">
          <SortDropdown />
        </BookmarksHeading>
      </div>

      {bookmarks.length > 0 ? (
        <BookmarkGrid bookmarks={bookmarks} />
      ) : (
        <EmptyState
          title="No bookmarks yet"
          description="Add your first bookmark to start building your collection."
        />
      )}
    </section>
  );
}