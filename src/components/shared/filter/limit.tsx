import { defaultFilterLimit } from "@/lib/filter";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterLimitProps {
  limit: number;
  disabled?: boolean;
  onChange: (value: string) => void;
}
export const FilterLimit = ({
  limit,
  disabled,
  onChange,
}: FilterLimitProps) => {
  return (
    <Select
      value={String(limit ?? 10)}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full max-w-18">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {defaultFilterLimit.map((item) => (
            <SelectItem key={item} value={`${item}`}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
