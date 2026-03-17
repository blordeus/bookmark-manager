"use client";

import { useTransition } from "react";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/shared/button";

type BookmarkConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant?: "primary" | "destructive";
  onConfirm: () => Promise<void>;
};

export function BookmarkConfirmDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel,
  confirmVariant = "primary",
  onConfirm,
}: BookmarkConfirmDialogProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <div className="flex justify-end gap-150">
        <Button variant="secondary" onClick={onClose} disabled={pending}>
          Cancel
        </Button>
        <Button
          variant={confirmVariant}
          onClick={() =>
            startTransition(async () => {
              await onConfirm();
              onClose();
            })
          }
          disabled={pending}
        >
          {pending ? "Please wait..." : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}