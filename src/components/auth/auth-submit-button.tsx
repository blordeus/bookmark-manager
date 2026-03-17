"use client";

import { useFormStatus } from "react-dom";

export function AuthSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-radius-10 bg-teal-800 px-250 py-150 text-[16px] font-semibold leading-[140%] text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}