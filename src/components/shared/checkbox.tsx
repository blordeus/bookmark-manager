type CheckboxProps = {
  checked?: boolean;
  label: string;
  count?: number;
};

export function Checkbox({ checked = false, label, count }: CheckboxProps) {
  return (
    <label className="flex w-full cursor-pointer items-center justify-between rounded-radius-10 px-150 py-100 transition hover:bg-surface-muted">
      <span className="flex items-center gap-150">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
            checked
              ? "border-teal-800 bg-teal-800"
              : "border-app bg-surface-input"
          }`}
        >
          {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
        </span>

        <span className="text-[14px] font-medium leading-[140%] text-app">
          {label}
        </span>
      </span>

      {typeof count === "number" ? (
        <span className="ml-150 inline-flex min-w-6 items-center justify-center rounded-full bg-surface-muted px-100 py-25 text-[12px] font-medium leading-none text-muted">
          {count}
        </span>
      ) : null}
    </label>
  );
}
