import type { Bookmark } from "@/types/bookmark";
import { BookmarkCard } from "./bookmark-card";

type BookmarkGridProps = {
  bookmarks: Bookmark[];
};

export function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  return (
    <div className="grid gap-200 md:grid-cols-2 xl:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}