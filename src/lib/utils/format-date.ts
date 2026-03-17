import { format } from "date-fns";

export function formatShortDate(dateString: string | null) {
  if (!dateString) return "Never";

  return format(new Date(dateString), "dd MMM");
}