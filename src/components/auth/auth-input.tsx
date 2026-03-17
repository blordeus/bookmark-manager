import { cn } from "@/lib/utils/cn";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function AuthInput({
  label,
  name,
  type = "text",
  error,
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-100">
      <label
        htmlFor={name}
        className="block text-[14px] font-semibold leading-[140%] text-neutral-900 dark:text-white"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className={cn(
          "w-full rounded-radius-10 border bg-white px-200 py-150 text-[16px] font-medium leading-[130%] text-neutral-900 outline-none transition",
          "placeholder:text-neutral-500",
          "focus:border-teal-800 focus:ring-2 focus:ring-teal-800/20",
          "dark:border-darkneutral-500 dark:bg-darkneutral-800 dark:text-white dark:placeholder:text-darkneutral-100",
          error && "border-red-800 focus:border-red-800 focus:ring-red-800/20",
        )}
        {...props}
      />

      {error ? (
        <p className="text-[14px] font-medium text-red-800">{error}</p>
      ) : null}
    </div>
  );
}