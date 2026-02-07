import { Eye, EyeClosed } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export const PasswordStrength = ({
  value,
  onChange,
  children,
  ...props
}: React.ComponentProps<"input"> & PasswordStrengthProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const calcScore = () => {
    let score = 0;

    rules.forEach((rule) => {
      if (rule.check(value)) score++;
    });

    return score;
  };

  const score = calcScore() as keyof typeof strength;

  const text = strength[score].text;
  const progress = strength[score].value;
  const color = strength[score].color;

  const toggleShow = () => setShowPassword((v) => !v);

  return (
    <>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
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

      {children}

      <div className="flex flex-col gap-4 mt-2">
        {text && <span className="font-medium text-primary">{text}</span>}

        <Progress value={progress} className="mt-0" color={color} />

        {score < 4 && (
          <>
            <span className="font-medium text-primary">Must include:</span>

            <ul className="mt-0">
              {rules.map((rule) => (
                <li
                  key={rule.text}
                  className={cn(
                    "pl-3 transition-color duration-500",
                    rule.check(value)
                      ? "text-green-600"
                      : "text-muted-foreground",
                  )}
                >
                  {rule.text}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

const strength = {
  0: {
    value: 0,
    color: "",
    text: "",
  },
  1: {
    value: 15,
    color: "bg-red-500",
    text: "Weak",
  },
  2: {
    value: 33,
    color: "bg-orange-500",
    text: "Weak",
  },
  3: {
    value: 66,
    color: "bg-yellow-500",
    text: "Medium",
  },
  4: {
    value: 100,
    color: "bg-green-500",
    text: "Strong",
  },
};

const rules = [
  { text: "8 characters", check: (password: string) => password.length >= 8 },
  { text: "1 number", check: (password: string) => /[0-9]/.test(password) },
  {
    text: "1 lowercase letter",
    check: (password: string) => /[a-z]/.test(password),
  },
  {
    text: "1 uppercase letter",
    check: (password: string) => /[A-Z]/.test(password),
  },
];
