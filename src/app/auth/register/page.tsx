import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 pt-6">
        <RegisterForm />
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary underline hover:no-underline font-medium"
          >
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
