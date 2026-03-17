type BookmarkTagProps = {
  label: string;
};

export function BookmarkTag({ label }: BookmarkTagProps) {
  return (
    <span className="inline-flex rounded-full bg-neutral-100 px-150 py-[6px] text-[12px] font-medium leading-[140%] text-neutral-800 dark:bg-darkneutral-500 dark:text-darkneutral-0">
      {label}
    </span>
  );
}