export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-radius-16 border border-dashed border-app bg-surface p-400 text-center">
      <h2 className="text-[20px] font-bold leading-[120%] text-app">
        {title}
      </h2>
      <p className="mt-150 text-[14px] font-medium leading-[150%] text-muted">
        {description}
      </p>
    </div>
  );
}