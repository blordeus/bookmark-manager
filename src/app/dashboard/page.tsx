import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";

export default function Dashboard() {
  return (
    <section className="rounded-radius-16 bg-white p-250 shadow-soft dark:bg-darkneutral-600">
      <BookmarksHeading title="All bookmarks">
        <SortDropdown />
      </BookmarksHeading>

      <div className="mt-300 rounded-radius-12 border border-dashed border-neutral-400 p-400 text-[14px] font-medium text-neutral-500 dark:border-darkneutral-500 dark:text-darkneutral-100">
        Bookmark grid goes here in the next slice.
      </div>
    </section>
  );
}