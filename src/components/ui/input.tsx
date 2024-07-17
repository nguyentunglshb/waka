import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-xl border border-[#666] bg-transparent p-4 text-base text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#b3b3b3] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex w-full rounded-xl border border-[#666] bg-transparent p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#b3b3b3] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
