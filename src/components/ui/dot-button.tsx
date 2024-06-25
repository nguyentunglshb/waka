import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

type DotButtonProps = ComponentPropsWithRef<"button">;

export const DotButton: React.FC<DotButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      type="button"
      className={twMerge("size-1 rounded-full bg-white opacity-60", className)}
      {...restProps}
    >
      {children}
    </button>
  );
};
