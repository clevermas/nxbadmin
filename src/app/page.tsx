import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="">
        <div className="container">
          <h1 className="text-lg">next better auth admin</h1>
          <p className="text-muted-foreground">user admin management</p>
          <Button className="mt-4">
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
