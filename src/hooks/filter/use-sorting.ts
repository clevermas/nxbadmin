import { type SingleParserBuilder, useQueryState } from "nuqs";
import type { TransitionStartFunction } from "react";

import { DefaultFilterOrder } from "@/lib/filter";

interface UseSortingProps<T> {
  sortParser: SingleParserBuilder<{
    id?: T | null | undefined;
    order?: DefaultFilterOrder | null | undefined;
  }>;
  transition: boolean;
  startTransition: TransitionStartFunction;
}

const Order = DefaultFilterOrder;

export const useSorting = <T>({
  sortParser,
  transition,
  startTransition,
}: UseSortingProps<T>) => {
  const [sort, setSort] = useQueryState(
    "sort",
    sortParser
      ?.withOptions({ shallow: false, startTransition })
      .withDefault({ id: null, order: null }),
  );

  const { id: sortId, order } = sort;

  const handleSortChange = async (_id: string) => {
    let result = null;

    const id = _id as T;

    if (id === sortId) {
      if (order === Order.Asc) {
        result = {
          id,
          order: Order.Desc,
        };
      }
    } else {
      result = {
        id,
        order: Order.Asc,
      };
    }

    setSort(result);
  };

  return {
    sort: sortId,
    order,
    disabled: transition,
    onSortChange: handleSortChange,
  };
};
