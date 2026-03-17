type BookmarksHeadingProps = {
  title: string;
  children?: React.ReactNode;
};

export function BookmarksHeading({
  title,
  children,
}: BookmarksHeadingProps) {
  return (
    <div className="flex flex-col gap-200 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[24px] font-bold leading-[140%] text-neutral-900 dark:text-white">
        {title}
      </h1>
      {children}
    </div>
  );
}