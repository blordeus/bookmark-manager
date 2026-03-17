"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createBookmarkAction } from "@/actions/bookmarks";
import { Modal } from "@/components/shared/modal";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const initialState = {
  success: false,
  error: null,
};

type AddBookmarkModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AddBookmarkModal({ open, onClose }: AddBookmarkModalProps) {
  const [state, formAction] = useActionState(createBookmarkAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Bookmark added successfully.");
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a Bookmark"
      description="Save a link with details to keep your collection organized."
    >
      <form action={formAction} className="space-y-200">
        <Field label="Title *" name="title" />
        <Field label="Description *" name="description" textarea />
        <Field label="Website URL *" name="url" />
        <Field
          label="Tags *"
          name="tags"
          placeholder="e.g. design, learning, tools"
        />

        <AuthFormMessage message={state.error} />

        <div className="flex justify-end gap-150">
          <button
            type="button"
            onClick={onClose}
            className="rounded-radius-10 border border-app px-250 py-150 text-[14px] font-semibold text-app"
          >
            Cancel
          </button>
          <div className="w-[160px]">
            <AuthSubmitButton>Add Bookmark</AuthSubmitButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  label,
  name,
  placeholder,
  textarea = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-100">
      <label
        htmlFor={name}
        className="block text-[14px] font-semibold text-app"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          className="w-full rounded-radius-10 border border-app bg-surface-input px-200 py-150 text-[16px] text-app outline-none focus:border-teal-800"
        />
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-radius-10 border border-app bg-surface-input px-200 py-150 text-[16px] text-app outline-none focus:border-teal-800"
        />
      )}
    </div>
  );
}