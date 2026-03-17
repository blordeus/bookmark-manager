export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-radius-16 border border-dashed border-neutral-400 bg-white p-400 text-center dark:border-darkneutral-500 dark:bg-darkneutral-600">
      <h2 className="text-[20px] font-bold leading-[120%] text-neutral-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-150 text-[14px] font-medium leading-[150%] text-neutral-500 dark:text-darkneutral-100">
        {description}
      </p>
    </div>
  );
}