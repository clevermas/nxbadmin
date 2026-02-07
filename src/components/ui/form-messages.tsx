export function FormSuccess({ message }: { message: string | undefined }) {
  if (!message) return null;
  return <div className="text-green-500 text-sm font-normal">{message}</div>;
}

export function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return <div className="text-destructive text-sm font-normal">{message}</div>;
}
