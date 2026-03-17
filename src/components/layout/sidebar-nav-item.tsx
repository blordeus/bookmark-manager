import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type SidebarNavItemProps = {
  href: string;
  label: string;
  count?: number;
  active?: boolean;
};

export function SidebarNavItem({
  href,
  label,
  count,
  active = false,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between rounded-radius-10 px-200 py-150 text-[14px] font-semibold transition",
        active
          ? "bg-teal-800 text-white"
          : "text-app hover:bg-surface-muted",
      )}
    >
      <span>{label}</span>
      {typeof count === "number" ? <span>{count}</span> : null}
    </Link>
  );
}