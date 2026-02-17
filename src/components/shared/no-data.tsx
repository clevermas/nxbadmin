import { cn } from "@/lib/utils";

interface NoDataProps {
  className?: string;
}
export const NoData = ({ className }: NoDataProps) => {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center px-4 text-sm h-full max-h-screen -mt-16",
        className,
      )}
    >
      No data available
    </div>
  );
};
