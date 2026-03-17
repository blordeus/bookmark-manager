import { Checkbox } from "@/components/shared/checkbox";

type TagFilterItemProps = {
  label: string;
  count: number;
};

export function TagFilterItem({ label, count }: TagFilterItemProps) {
  return <Checkbox label={label} count={count} />;
}