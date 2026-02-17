import { SingleParserBuilder, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";

interface UsePaginationProps {
  pageParser: SingleParserBuilder<number | null | undefined>;
  startTransition: TransitionStartFunction;
}

export const usePagination = ({
  pageParser,
  startTransition,
}: UsePaginationProps) => {
  const [_page, setPage] = useQueryState(
    "page",
    pageParser
      .withOptions({
        shallow: false,
        startTransition,
      })
      .withDefault(1),
  );
  const page = _page as number;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return { page, onChange: handlePageChange };
};

interface UseLimitProps<T> {
  limitParser: SingleParserBuilder<T | null | undefined>;
  startTransition: TransitionStartFunction;
  defaultLimit: T & {};
}

export const useLimit = <T>({
  limitParser,
  startTransition,
  defaultLimit,
}: UseLimitProps<T>) => {
  const [_limit, setLimit] = useQueryState(
    "limit",
    limitParser
      .withOptions({
        shallow: false,
        startTransition,
      })
      .withDefault(defaultLimit),
  );
  const limit = _limit as number;

  const handleLimitChange = (newLimit: string) => {
    setLimit(+newLimit as T & {});
  };

  return { limit, onChange: handleLimitChange };
};
