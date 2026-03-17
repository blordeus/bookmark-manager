type AvatarProps = {
  name: string;
};

export function Avatar({ name }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300 text-[14px] font-semibold text-neutral-900 dark:bg-darkneutral-500 dark:text-white">
      {initials}
    </div>
  );
}