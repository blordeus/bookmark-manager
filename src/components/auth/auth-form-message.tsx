type AuthFormMessageProps = {
  message?: string | null;
  success?: boolean;
};

export function AuthFormMessage({
  message,
  success = false,
}: AuthFormMessageProps) {
  if (!message) return null;

  return (
    <p
      className={
        success
          ? "text-[14px] font-medium text-teal-800 dark:text-darkneutral-0"
          : "text-[14px] font-medium text-red-800"
      }
    >
      {message}
    </p>
  );
}