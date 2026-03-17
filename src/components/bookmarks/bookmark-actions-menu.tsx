"use client";

import { Copy, EllipsisVertical, ExternalLink, Pencil, Pin, ArchiveRestore, Archive, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type BookmarkActionsMenuProps = {
  isArchived: boolean;
  isPinned: boolean;
};

export function BookmarkActionsMenu({
  isArchived,
  isPinned,
}: BookmarkActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
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
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[200px] rounded-radius-16 border border-neutral-300 bg-white p-100 shadow-soft dark:border-darkneutral-500 dark:bg-darkneutral-600">
          <MenuItem icon={<ExternalLink className="h-4 w-4" />} label="Visit" />
          <MenuItem icon={<Copy className="h-4 w-4" />} label="Copy URL" />

          {!isArchived ? (
            <>
              <MenuItem
                icon={<Pin className="h-4 w-4" />}
                label={isPinned ? "Unpin" : "Pin"}
              />
              <MenuItem icon={<Pencil className="h-4 w-4" />} label="Edit" />
              <MenuItem icon={<Archive className="h-4 w-4" />} label="Archive" />
            </>
          ) : (
            <>
              <MenuItem
                icon={<ArchiveRestore className="h-4 w-4" />}
                label="Unarchive"
              />
              <MenuItem
                icon={<Trash2 className="h-4 w-4" />}
                label="Delete permanently"
                destructive
              />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  destructive = false,
}: {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
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