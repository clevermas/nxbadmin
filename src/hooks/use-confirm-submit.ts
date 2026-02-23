import { useRef, useState } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

interface UseSubmitWithConfirmProps<TFieldValues extends FieldValues> {
  onSubmit: (data: TFieldValues) => void;
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
}
export const useConfirmSubmit = <TFieldValues extends FieldValues>({
  onSubmit,
  handleSubmit,
}: UseSubmitWithConfirmProps<TFieldValues>) => {
  const [open, setOpen] = useState(false);
  const isPrevalidating = useRef(false);

  const onBeforeConfirm = () => {
    if (!isPrevalidating.current) {
      isPrevalidating.current = true;
      handleSubmit(onBeforeConfirm)();
    } else {
      isPrevalidating.current = false;
      setOpen(true);
    }
  };

  const onOpenChange = (value: boolean) => setOpen(value);

  const handleConfirm = () => handleSubmit(onSubmit)();

  return {
    onBeforeConfirm,
    onConfirm: handleConfirm,
    open,
    onOpenChange,
  };
};
