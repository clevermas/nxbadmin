"use client";
import { useContext, useEffect, useRef } from "react";

import { routes } from "@/config/routes";

import { defaultFilterLimit } from "@/lib/filter";
import { limitParser, pageParser, searchParser } from "@/schemas/filter.schema";

import { DataTableContext } from "@/components/shared/data-table-provider";
import { useLimit, usePagination } from "@/hooks/filter/use-pagination";
import { useSearch } from "@/hooks/filter/use-search";
import { FilterLimit } from "./limit";
import { FilterPagination } from "./pagination";
import { FilterSearch } from "./search";

// Pagination
interface DataTableFilterPaginationProps {
  totalPages: number;
}
export const DataTableFilterPagination = ({
  totalPages,
}: DataTableFilterPaginationProps) => {
  const {
    filter: { transition, startTransition },
  } = useContext(DataTableContext);

  const pagination = usePagination({
    pageParser,
    startTransition,
  });

  return (
    <FilterPagination
      baseURL={routes.admin}
      totalPages={totalPages}
      disabled={transition}
      {...pagination}
    ></FilterPagination>
  );
};

// Limit
export const DataTableFilterLimit = () => {
  const {
    filter: { transition, startTransition },
  } = useContext(DataTableContext);

  const defaultLimit =
    defaultFilterLimit.find((l) => l === 10) ?? defaultFilterLimit[0];

  const limit = useLimit<defaultFilterLimit>({
    limitParser,
    defaultLimit: defaultLimit,
    startTransition,
  });

  return <FilterLimit disabled={transition} {...limit}></FilterLimit>;
};

// Search
export const DataTableFilterSearch = () => {
  const {
    filter: { transition, startTransition },
  } = useContext(DataTableContext);

  const search = useSearch({
    searchParser,
    debounce: 700,
    transition,
    startTransition,
  });

  return <FilterSearch disabled={transition} {...search}></FilterSearch>;
};

// Debounce
interface DataTableFilterDebounceProps {
  value?: number;
}
export const DataTableFilterDebounce = ({
  value,
}: DataTableFilterDebounceProps) => {
  const {
    filter: { transition, startTransition },
  } = useContext(DataTableContext);

  const start = useRef(0);
  const isDebounce = useRef(false);

  const debounce = value ?? 300;

  useEffect(() => {
    let handler: number;

    const elapsed = Date.now() - start.current;

    if (transition && !isDebounce.current) {
      start.current = Date.now();
    } else if (!transition && elapsed < debounce) {
      startTransition(
        () =>
          new Promise((resolve) => {
            isDebounce.current = true;
            handler = setTimeout(() => {
              isDebounce.current = false;
              resolve();
            }, debounce - elapsed) as unknown as number;
          }),
      );
    }

    return () => {
      if (!isDebounce.current) clearTimeout(handler);
    };
  }, [debounce, transition, startTransition]);

  return <></>;
};
