"use client";

import {
  Archive,
  ArchiveRestore,
  Copy,
  EllipsisVertical,
  ExternalLink,
  Pencil,
  Pin,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  archiveBookmarkAction,
  deleteBookmarkAction,
  togglePinBookmarkAction,
  unarchiveBookmarkAction,
} from "@/actions/bookmarks";
import { BookmarkConfirmDialog } from "@/components/bookmarks/bookmark-confirm-dialog";
import { EditBookmarkModal } from "@/components/bookmarks/edit-bookmark-modal";
import type { Bookmark } from "@/types/bookmark";

type BookmarkActionsMenuProps = {
  bookmark: Bookmark;
};

export function BookmarkActionsMenu({ bookmark }: BookmarkActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showUnarchive, setShowUnarchive] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleCopy() {
    navigator.clipboard.writeText(bookmark.url);
    toast.success("Link copied to clipboard.");
    setOpen(false);
  }

  function handleVisit() {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open bookmark actions"
          className="inline-flex h-9 w-9 items-center justify-center rounded-radius-10 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-darkneutral-100 dark:hover:bg-darkneutral-500 dark:hover:text-white"
        >
          <EllipsisVertical className="h-4 w-4" />
        </button>

        {open ? (
          <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[220px] rounded-radius-16 border border-neutral-300 bg-white p-100 shadow-soft dark:border-darkneutral-500 dark:bg-darkneutral-600">
            <ActionButton
              icon={<ExternalLink className="h-4 w-4" />}
              label="Visit"
              onClick={handleVisit}
            />
            <ActionButton
              icon={<Copy className="h-4 w-4" />}
              label="Copy URL"
              onClick={handleCopy}
            />

            {!bookmark.is_archived ? (
              <>
                <ActionButton
                  icon={<Pin className="h-4 w-4" />}
                  label={bookmark.is_pinned ? "Unpin" : "Pin"}
                  onClick={() =>
                    startTransition(async () => {
                      await togglePinBookmarkAction(bookmark.id, !bookmark.is_pinned);
                      toast.success(
                        bookmark.is_pinned
                          ? "Bookmark unpinned."
                          : "Bookmark pinned to top.",
                      );
                      setOpen(false);
                    })
                  }
                  disabled={pending}
                />

                <ActionButton
                  icon={<Pencil className="h-4 w-4" />}
                  label="Edit"
                  onClick={() => {
                    setShowEdit(true);
                    setOpen(false);
                  }}
                />

                <ActionButton
                  icon={<Archive className="h-4 w-4" />}
                  label="Archive"
                  onClick={() => {
                    setShowArchive(true);
                    setOpen(false);
                  }}
                />
              </>
            ) : (
              <>
                <ActionButton
                  icon={<ArchiveRestore className="h-4 w-4" />}
                  label="Unarchive"
                  onClick={() => {
                    setShowUnarchive(true);
                    setOpen(false);
                  }}
                />

                <ActionButton
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete permanently"
                  destructive
                  onClick={() => {
                    setShowDelete(true);
                    setOpen(false);
                  }}
                />
              </>
            )}
          </div>
        ) : null}
      </div>

      <EditBookmarkModal
        bookmark={bookmark}
        open={showEdit}
        onClose={() => setShowEdit(false)}
      />

      <BookmarkConfirmDialog
        open={showArchive}
        onClose={() => setShowArchive(false)}
        title="Archive bookmark"
        description="Are you sure you want to archive this bookmark?"
        confirmLabel="Archive"
        onConfirm={async () => {
          await archiveBookmarkAction(bookmark.id);
          toast.success("Bookmark archived.");
        }}
      />

      <BookmarkConfirmDialog
        open={showUnarchive}
        onClose={() => setShowUnarchive(false)}
        title="Unarchive bookmark"
        description="Move this bookmark back to your active list?"
        confirmLabel="Unarchive"
        onConfirm={async () => {
          await unarchiveBookmarkAction(bookmark.id);
          toast.success("Bookmark restored.");
        }}
      />

      <BookmarkConfirmDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete bookmark"
        description="Are you sure you want to delete this bookmark?"
        confirmLabel="Delete permanently"
        confirmVariant="destructive"
        onConfirm={async () => {
          await deleteBookmarkAction(bookmark.id);
          toast.success("Bookmark deleted.");
        }}
      />
    </>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  destructive = false,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center gap-150 rounded-radius-10 px-150 py-125 text-left text-[14px] font-medium transition ${
        destructive
          ? "text-red-800 hover:bg-red-600/10"
          : "text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-darkneutral-500"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}