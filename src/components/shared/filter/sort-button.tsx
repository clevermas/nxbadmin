"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FilterSortButtonProps {
  children: React.ReactNode;

  column: string;
  sort?: string | null;
  order?: string | null;
  disabled?: boolean;

  onSortChange: (column: string) => void;
}
export const FilterSortButton = ({
  children,
  column,
  sort,
  order,
  disabled,
  onSortChange,
}: FilterSortButtonProps) => {
  const handleSort = () => onSortChange(column);

  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      onKeyDown={handleSort}
      disabled={disabled}
    >
      {children}
      {sort === column &&
        (order === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
    </Button>
  );
};
