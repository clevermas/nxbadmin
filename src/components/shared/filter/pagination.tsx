"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from "@/components/ui/pagination";
import { env } from "@/env";

interface FilterPaginationProps {
  baseURL: string;
  page: number;
  totalPages: number;
  disabled: boolean;
  maxVisiblePages?: number;

  onChange: (page: number) => void;
}
export const FilterPagination = (props: FilterPaginationProps) => {
  const { baseURL, page, totalPages, disabled, maxVisiblePages = 5 } = props;

  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(maxVisiblePages, totalPages),
  });

  useEffect(() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const newStart = Math.max(
      1,
      Math.min(page - halfVisible, totalPages - maxVisiblePages + 1),
    );
    const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [page, totalPages, maxVisiblePages]);

  const createPageUrl = (pageNumber: number) => {
    const url = new URL(baseURL, env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set("page", pageNumber.toString());
    return url.toString();
  };

  const handleEllipsisClick = (direction: "left" | "right") => {
    const newPage =
      direction === "left"
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);

    props.onChange(newPage);
  };

  return (
    <PaginationRoot
      className={cn(
        "mx-0 w-auto justify-end",
        disabled ? "pointer-events-none text-muted-foreground/80" : "",
      )}
    >
      <PaginationContent className="lg:gap-4 justify-end">
        <PaginationItem>
          <PaginationPrevious
            className={page <= 1 ? "hidden" : ""}
            href={createPageUrl(page - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) props.onChange(page - 1);
            }}
          />
        </PaginationItem>

        {visibleRange.start > 1 && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick("left");
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        {Array.from(
          { length: visibleRange.end - visibleRange.start + 1 },
          (_, index) => visibleRange.start + index,
        ).map((pageNumber) => {
          const isActive = pageNumber === page;
          let rel = "";

          if (pageNumber === page - 1) {
            rel = "prev";
          }

          if (pageNumber === page + 1) {
            rel = "next";
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={isActive}
                href={createPageUrl(pageNumber)}
                onClick={(e) => {
                  e.preventDefault();
                  props.onChange(pageNumber);
                }}
                {...(rel ? { rel } : {})}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {visibleRange.end < totalPages && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick("right");
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={page >= totalPages ? "hidden" : ""}
            href={createPageUrl(page + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) props.onChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
