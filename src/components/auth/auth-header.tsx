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
        <span className="text-[20px] font-bold text-teal-800">
          Bookmark Manager
        </span>
      </Link>

      <h1 className="text-[24px] font-bold leading-[140%] text-app">
        {title}
      </h1>
      <p className="mt-150 text-[14px] font-medium leading-[150%] text-muted">
        {description}
      </p>
    </div>
  );
}