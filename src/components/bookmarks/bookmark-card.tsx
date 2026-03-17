/* eslint-disable @next/next/no-img-element */
import { Pin } from "lucide-react";
import type { Bookmark } from "@/types/bookmark";
import { BookmarkActionsMenu } from "./bookmark-actions-menu";
import { BookmarkMetadata } from "./bookmark-metadata";
import { BookmarkTag } from "./bookmark-tag";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const hostname = new URL(bookmark.url).hostname.replace("www.", "");

  return (
    <article className="rounded-radius-16 border border-app bg-surface p-250 shadow-soft">
      <div className="flex items-start justify-between gap-150">
        <div className="min-w-0 flex items-start gap-150">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-radius-10 bg-surface-elevated">
            {bookmark.favicon_url ? (
              <img src={bookmark.favicon_url} alt="" className="h-5 w-5" />
            ) : null}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-[20px] font-bold leading-[120%] text-app">
              {bookmark.title}
            </h2>
            <p className="mt-050 truncate text-[14px] font-medium leading-[150%] text-muted">
              {hostname}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-100">
          {!bookmark.is_archived && bookmark.is_pinned ? (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-radius-10 bg-surface-elevated text-teal-800">
              <Pin className="h-4 w-4 fill-current" />
            </span>
          ) : null}

          <BookmarkActionsMenu bookmark={bookmark} />
        </div>
      </div>

      <p className="mt-200 text-[14px] font-medium leading-[150%] text-muted">
        {bookmark.description}
      </p>

      <div className="mt-200 flex flex-wrap gap-100">
        {bookmark.tags.map((tag) => (
          <BookmarkTag key={tag} label={tag} />
        ))}
      </div>

      <div className="mt-250 border-t border-app pt-200">
        <BookmarkMetadata
          visitCount={bookmark.visit_count}
          createdAt={bookmark.created_at}
          lastVisitedAt={bookmark.last_visited_at}
        />

        {bookmark.is_archived ? (
          <div className="mt-150">
            <span className="inline-flex rounded-full bg-surface-elevated px-150 py-[6px] text-[12px] font-semibold text-app">
              Archived
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}