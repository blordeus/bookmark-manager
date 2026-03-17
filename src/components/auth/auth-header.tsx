import Link from "next/link";

export function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-400">
      <Link href="/" className="mb-300 inline-flex items-center gap-150">
        <span className="text-[20px] font-bold text-teal-800 dark:text-white">
          Bookmark Manager
        </span>
      </Link>

      <h1 className="text-[24px] font-bold leading-[140%] text-neutral-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-150 text-[14px] font-medium leading-[150%] text-neutral-800 dark:text-darkneutral-100">
        {description}
      </p>
    </div>
  );
}