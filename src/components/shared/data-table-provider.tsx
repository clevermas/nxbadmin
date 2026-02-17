"use client";
import {
  createContext,
  ReactNode,
  TransitionStartFunction,
  useTransition,
} from "react";

interface DataTableConextProps {
  filter: {
    transition: boolean;
    startTransition: TransitionStartFunction;
  };
}
export const DataTableContext = createContext<DataTableConextProps>({
  filter: {
    transition: false,
    startTransition: () => {},
  },
});

interface DataTableProviderProps {
  children: ReactNode;
}
export const DataTableProvider = ({ children }: DataTableProviderProps) => {
  const [transition, startTransition] = useTransition();

  return (
    <DataTableContext value={{ filter: { transition, startTransition } }}>
      {children}
    </DataTableContext>
  );
};
