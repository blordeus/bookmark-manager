import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-radius-10 px-250 py-150 text-[14px] font-semibold leading-[140%] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-800/30 disabled:pointer-events-none disabled:opacity-60",
        variant === "primary" &&
          "bg-teal-800 text-white hover:bg-teal-700",
        variant === "secondary" &&
          "border border-teal-800 bg-transparent text-teal-800 hover:bg-teal-800/5 dark:text-white dark:border-darkneutral-300 dark:hover:bg-darkneutral-500",
        variant === "ghost" &&
          "bg-transparent text-neutral-900 hover:bg-neutral-300 dark:text-white dark:hover:bg-darkneutral-500",
        variant === "destructive" &&
          "bg-red-800 text-white hover:bg-red-600",
        className,
      )}
      {...props}
    />
  );
}