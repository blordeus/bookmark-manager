type CheckboxProps = {
  checked?: boolean;
  label: string;
  count?: number;
};

export function Checkbox({ checked = false, label, count }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-150 rounded-radius-10 px-150 py-125 hover:bg-neutral-100 dark:hover:bg-darkneutral-800">
      <span className="flex items-center gap-150">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
            checked
              ? "border-teal-800 bg-teal-800"
              : "border-neutral-400 bg-white dark:border-darkneutral-300 dark:bg-darkneutral-800"
          }`}
        >
          {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
        </span>

        <span className="text-[14px] font-medium text-neutral-900 dark:text-white">
          {label}
        </span>
      </span>

      {typeof count === "number" ? (
        <span className="text-[12px] font-medium text-neutral-500 dark:text-darkneutral-100">
          {count}
        </span>
      ) : null}
    </label>
  );
}