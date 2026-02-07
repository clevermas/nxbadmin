import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <main className="bg-background min-h-screen w-full max-w-3xl">
        <div className="flex flex-col min-h-screen items-center justify-center w-full">
          <section className="flex flex-col gap-4 items-start text-left">
            <h1 className="text-2xl">next better auth admin</h1>
            <p className="text-sm text-muted-foreground">
              user admin management
            </p>
            <Button>
              <Link href="/auth/login">Login</Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}
