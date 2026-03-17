import { cn } from "@/lib/utils/cn";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[343px] rounded-radius-16 bg-white p-300 shadow-soft",
        "sm:max-w-[440px] sm:p-400",
        "dark:bg-darkneutral-600",
        className,
      )}
    >
      {children}
    </div>
  );
}