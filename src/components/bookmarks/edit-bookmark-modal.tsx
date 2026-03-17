"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateBookmarkAction } from "@/actions/bookmarks";
import { Modal } from "@/components/shared/modal";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import type { Bookmark } from "@/types/bookmark";

const initialState = {
  success: false,
  error: null,
};

type EditBookmarkModalProps = {
  bookmark: Bookmark;
  open: boolean;
  onClose: () => void;
};

export function EditBookmarkModal({
  bookmark,
  open,
  onClose,
}: EditBookmarkModalProps) {
  const [state, formAction] = useActionState(updateBookmarkAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Changes saved.");
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit bookmark"
      description="Update your saved link details — change the title, description, URL, or tags."
    >
      <form action={formAction} className="space-y-200">
        <input type="hidden" name="bookmarkId" value={bookmark.id} />
        <Field label="Title *" name="title" defaultValue={bookmark.title} />
        <Field
          label="Description *"
          name="description"
          defaultValue={bookmark.description}
          textarea
        />
        <Field label="Website URL *" name="url" defaultValue={bookmark.url} />
        <Field
          label="Tags *"
          name="tags"
          defaultValue={bookmark.tags.join(", ")}
        />

        <AuthFormMessage message={state.error} />

        <div className="flex justify-end gap-150">
          <button
            type="button"
            onClick={onClose}
            className="rounded-radius-10 border border-neutral-400 px-250 py-150 text-[14px] font-semibold text-neutral-900 dark:border-darkneutral-500 dark:text-white"
          >
            Cancel
          </button>
          <div className="w-[160px]">
            <AuthSubmitButton>Save Bookmark</AuthSubmitButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-100">
      <label
        htmlFor={name}
        className="block text-[14px] font-semibold text-neutral-900 dark:text-white"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          defaultValue={defaultValue}
          className="w-full rounded-radius-10 border border-neutral-400 bg-white px-200 py-150 text-[16px] text-neutral-900 outline-none focus:border-teal-800 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue}
          className="w-full rounded-radius-10 border border-neutral-400 bg-white px-200 py-150 text-[16px] text-neutral-900 outline-none focus:border-teal-800 dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white"
        />
      )}
    </div>
  );
}