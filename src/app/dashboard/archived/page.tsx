import { BookmarksHeading } from "@/components/dashboard/bookmarks-heading";
import { SortDropdown } from "@/components/layout/sort-dropdown";

export default function ArchivedPage() {
  return (
    <section className="rounded-radius-16 bg-white p-250 shadow-soft dark:bg-darkneutral-600">
      <BookmarksHeading title="Archived bookmarks">
        <SortDropdown />
      </BookmarksHeading>

      <div className="mt-300 rounded-radius-12 border border-dashed border-neutral-400 p-400 text-[14px] font-medium text-neutral-500 dark:border-darkneutral-500 dark:text-darkneutral-100">
        Archived bookmark grid goes here in the next slice.
      </div>
    </section>
  );
}