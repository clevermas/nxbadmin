import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 pt-6">
        <LoginForm />
        <div className="text-center text-sm text-muted-foreground">
          Not registered?{" "}
          <Link
            href="/auth/register"
            className="text-primary underline hover:no-underline font-medium"
          >
            Create an account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
