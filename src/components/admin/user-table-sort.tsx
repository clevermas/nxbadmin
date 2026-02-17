import { useContext } from "react";

import { sortParser, type UserTableColumns } from "@/schemas/user-table.schema";

import { DataTableContext } from "@/components/shared/data-table-provider";
import { FilterSortButton } from "@/components/shared/filter/sort-button";
import { useSorting } from "@/hooks/filter/use-sorting";

interface UserTableSortProps {
  children: React.ReactNode;

  column: string;
}

export const UserTableSort = ({ children, column }: UserTableSortProps) => {
  const { filter } = useContext(DataTableContext);

  const sorting = useSorting<UserTableColumns>({
    sortParser,
    ...filter,
  });

  return (
    <FilterSortButton column={column} {...sorting}>
      {children}
    </FilterSortButton>
  );
};
