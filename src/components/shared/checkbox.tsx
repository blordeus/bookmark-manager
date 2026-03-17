type CheckboxProps = {
  checked?: boolean;
  label: string;
  count?: number;
};

export function Checkbox({ checked = false, label, count }: CheckboxProps) {
  return (
    <label className="flex w-full cursor-pointer items-center justify-between rounded-radius-10 px-150 py-100 transition hover:bg-neutral-100 dark:hover:bg-darkneutral-800">
      <span className="flex items-center gap-150">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
            checked
              ? "border-teal-800 bg-teal-800"
              : "border-neutral-400 bg-white dark:border-darkneutral-300 dark:bg-darkneutral-800"
          }`}
        >
          {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
        </span>

        <span className="text-[14px] font-medium leading-[140%] text-neutral-900 dark:text-white">
          {label}
        </span>
      </span>

      {typeof count === "number" ? (
        <span className="ml-150 inline-flex min-w-6 items-center justify-center rounded-full bg-neutral-100 px-100 py-25 text-[12px] font-medium leading-none text-neutral-500 dark:bg-darkneutral-500 dark:text-darkneutral-100">
          {count}
        </span>
      ) : null}
    </label>
  );
}