import { LogoutButton } from "@/components/shared/logout";

export default function Admin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <main className="bg-background min-h-screen w-full max-w-3xl">
        <div className="flex flex-col min-h-screen items-center justify-center w-full">
          <section className="flex flex-col gap-4 items-start text-left">
            <h1 className="text-2xl">user admin management</h1>
            <p className="text-muted-foreground text-sm">
              currently in development
            </p>
            <LogoutButton />
          </section>
        </div>
      </main>
    </div>
  );
}
