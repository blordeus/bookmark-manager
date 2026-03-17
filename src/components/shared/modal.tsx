"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-200">
      <div
        className={cn(
          "relative w-full max-w-[560px] rounded-radius-16 bg-surface p-300 shadow-soft",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-200 top-200 inline-flex h-9 w-9 items-center justify-center rounded-radius-10 text-muted transition hover:bg-surface-muted hover:text-app"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-250 pr-500">
          <h2 className="text-[24px] font-bold leading-[140%] text-app">
            {title}
          </h2>
          {description ? (
            <p className="mt-100 text-[14px] font-medium leading-[150%] text-muted">
              {description}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </div>
  );
}