import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";
import { EmptyState } from "@/components/shared/empty-state";
import { getBookmarks } from "@/lib/utils/bookmark-queries";
import { getBookmarksHeading } from "@/lib/utils/page-heading";
import {
  getSearchQuery,
  getSortQuery,
  getTagsQuery,
} from "@/lib/utils/search-params";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const query = getSearchQuery(params.q);
  const tags = getTagsQuery(params.tags);
  const sort = getSortQuery(params.sort);

  const bookmarks = await getBookmarks({
    isArchived: false,
    query,
    tags,
    sort,
  });

  const heading = getBookmarksHeading({
    query,
    tags,
    isArchived: false,
  });

  return (
    <section className="space-y-300">
      <div className="rounded-radius-16 bg-surface p-250 shadow-soft">
        <BookmarksHeading title={heading}>
          <SortDropdown />
        </BookmarksHeading>
      </div>

      {bookmarks.length > 0 ? (
        <BookmarkGrid bookmarks={bookmarks} />
      ) : (
        <EmptyState
          title="No matching bookmarks"
          description="Try changing your search, tags, or sort options."
        />
      )}
    </section>
  );
}