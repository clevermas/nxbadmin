import { cn } from "@/lib/utils";

import { Progress } from "@/components/ui/progress";

interface PasswordInputStrengthProps {
  value: string;
}

export const PasswordInputStrength = ({
  value: password,
}: PasswordInputStrengthProps) => {
  const calcScore = () => {
    let score = 0;

    rules.forEach((rule) => {
      if (rule.check(password)) score++;
    });

    return score;
  };

  const score = calcScore() as keyof typeof progress;

  const { text, value, color } = progress[score];

  return (
    <div className="flex flex-col gap-4 mt-2">
      {text && <span className="font-medium text-primary">{text}</span>}

      <Progress value={value} className="mt-0" color={color} />

      {score < 4 && (
        <>
          <span className="font-medium text-primary">Must include:</span>

          <ul className="mt-0">
            {rules.map((rule) => (
              <li
                key={rule.text}
                className={cn(
                  "pl-3 transition-color duration-500",
                  rule.check(password)
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
  );
};

const progress = {
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
