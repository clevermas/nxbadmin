import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FilterSearchProps {
  searchRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}
export const FilterSearch = ({
  searchRef,
  inputValue,
  disabled,
  onChange,
  onClear,
}: FilterSearchProps) => {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        ref={searchRef}
        value={inputValue}
        onChange={onChange}
        disabled={disabled}
        placeholder="Search for email"
        className="text-sm"
      />
      <InputGroupAddon align="inline-end">
        {inputValue ? (
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-full"
            disabled={disabled}
            onClick={onClear}
          >
            {" "}
            <X />{" "}
          </Button>
        ) : (
          <Search
            className={cn("mr-1", disabled && "text-muted-foreground/50")}
          />
        )}
      </InputGroupAddon>
    </InputGroup>
  );
};
