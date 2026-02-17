import { type SingleParserBuilder, useQueryState } from "nuqs";
import {
  type TransitionStartFunction,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDebounce } from "@/hooks/use-debounce";

interface UseSearchProps {
  searchParser: SingleParserBuilder<string>;
  debounce?: number;
  transition: boolean;
  startTransition: TransitionStartFunction;
}

export const useSearch = ({
  searchParser,
  debounce,
  transition,
  startTransition,
}: UseSearchProps) => {
  const [search, setSearch] = useQueryState(
    "q",
    searchParser
      ?.withOptions({
        shallow: false,
        startTransition,
      })
      .withDefault(""),
  );

  const [inputValue, setInputValue] = useState(search);
  const searchRef = useRef<HTMLInputElement>(null);

  const isClearing = useRef(false);
  const isSearching = useRef(false);
  const isLateFocus = useRef<string | null>(null);

  const debouncedValue = useDebounce(
    inputValue ?? "",
    debounce ?? 300,
    (value) => {
      if (isClearing.current) {
        isClearing.current = false;
      } else {
        isSearching.current = true;
        setSearch(value);
      }
    },
  );

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    if (isLateFocus.current === "" && !transition) {
      isLateFocus.current = null;
    } else if (isLateFocus.current === "" && transition) {
      isLateFocus.current = "focus";
    } else if (isLateFocus.current === "focus" && !transition) {
      isLateFocus.current = null;
      focus();
    }

    if (!transition && (isSearching.current || isClearing.current)) {
      focus();
      isSearching.current = false;
      isLateFocus.current = "";
    }

    if (!transition && search) {
      focus();
    }

    function focus() {
      if (searchRef.current) {
        searchRef.current.value =
          debouncedValue === search ? (debouncedValue ?? "") : (search ?? "");
        searchRef.current.focus();
      }
    }
  }, [transition, debouncedValue, search]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleClear() {
    setSearch(null);
    isClearing.current = true;
  }

  return {
    searchRef,
    inputValue,
    onChange: handleSearch,
    onClear: handleClear,
  };
};
