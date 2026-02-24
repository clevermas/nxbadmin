import { Eye, EyeClosed } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShow = () => setShowPassword((v) => !v);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={className}
        {...props}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="hover:underline hover:text-ring focus-visible:text-ring text-ring/50 outline-none absolute top-1/2 right-2 transform -translate-y-1/2"
      >
        {showPassword ? <EyeClosed width={18} /> : <Eye width={18} />}
      </button>
    </div>
  );
};
