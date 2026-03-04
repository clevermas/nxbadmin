import Link from "next/link";
import { Suspense } from "react";

import { routes } from "@/config/routes";

import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="flex justify-center gap-1">
          <div className="text-sm text-muted-foreground">Not registered?</div>
          <Link href={routes.register} className="hover:underline">
            Create an account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
