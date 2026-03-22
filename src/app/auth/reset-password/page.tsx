import Link from "next/link";

import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ResetPassword({ searchParams }: PageProps) {
  const { token } = await searchParams;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        {token && (
          <CardDescription>Enter your new password below.</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {token ? (
          <ResetPasswordForm token={(token as string) ?? ""} />
        ) : (
          <div className="flex flex-col items-start justify-center space-y-4">
            <Link href={routes.forgotPassword} className="hover:underline">
              Request a new link
            </Link>
          </div>
        )}
        <div className="flex justify-center gap-1">
          <div className="text-sm text-muted-foreground">
            Remember your password?{" "}
          </div>
          <Link href={routes.login} className="hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
