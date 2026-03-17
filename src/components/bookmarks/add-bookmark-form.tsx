"use client";

import { useActionState } from "react";
import { createBookmarkAction } from "@/actions/bookmarks";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const initialState = {
  success: false,
  error: null,
};

export function AddBookmarkForm() {
  const [state, formAction] = useActionState(createBookmarkAction, initialState);

  return (
    <form action={formAction} className="space-y-200 rounded-radius-16 bg-surface p-250 shadow-soft">
      <h2 className="text-[20px] font-bold leading-[120%] text-app">
        Add a bookmark
      </h2>

      <div className="space-y-100">
        <label htmlFor="title" className="block text-[14px] font-semibold text-app">
          Title *
        </label>
        <input
          id="title"
          name="title"
          className="w-full rounded-radius-10 border border-app bg-surface-input px-200 py-150 text-[16px] text-app outline-none focus:border-teal-800"
        />
      </div>

      <div className="space-y-100">
        <label htmlFor="description" className="block text-[14px] font-semibold text-app">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-radius-10 border border-app bg-surface-input px-200 py-150 text-[16px] text-app outline-none focus:border-teal-800"
        />
      </div>

      <div className="space-y-100">
        <label htmlFor="url" className="block text-[14px] font-semibold text-app">
          Website URL *
        </label>
        <input
          id="url"
          name="url"
          className="w-full rounded-radius-10 border border-app bg-surface-input px-200 py-150 text-[16px] text-app outline-none focus:border-teal-800"
        />
      </div>

      <div className="space-y-100">
        <label htmlFor="tags" className="block text-[14px] font-semibold text-app">
          Tags *
        </label>
        <input
          id="tags"
          name="tags"
          placeholder="e.g. design, learning, tools"
          className="w-full rounded-radius-10 border border-app bg-surface-input px-200 py-150 text-[16px] text-app outline-none focus:border-teal-800"
        />
      </div>

      <AuthFormMessage
        message={
          state.success ? "Bookmark added successfully." : state.error
        }
        success={state.success}
      />

      <AuthSubmitButton>Add Bookmark</AuthSubmitButton>
    </form>
  );
}