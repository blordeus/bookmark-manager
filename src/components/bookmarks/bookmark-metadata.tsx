import { formatShortDate } from "@/lib/utils/format-date";

type BookmarkMetadataProps = {
  visitCount: number;
  createdAt: string;
  lastVisitedAt: string | null;
};

export function BookmarkMetadata({
  visitCount,
  createdAt,
  lastVisitedAt,
}: BookmarkMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-150 gap-y-050 text-[12px] font-medium leading-[140%] text-muted">
      <span>{visitCount} views</span>
      <span>•</span>
      <span>{formatShortDate(createdAt)}</span>
      <span>•</span>
      <span>{formatShortDate(lastVisitedAt)}</span>
    </div>
  );
}