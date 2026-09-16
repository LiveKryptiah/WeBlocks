import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-ink text-white hover:bg-ink-soft dark:bg-white dark:text-[#08090a] dark:hover:bg-[#e5e5e6]",
      outline:
        "bg-white border border-hairline text-ink hover:bg-canvas-soft dark:bg-transparent dark:border-[#23252a] dark:text-white dark:hover:bg-[#161718]",
      soft:
        "bg-canvas-soft text-ink hover:bg-field border-none dark:bg-[#161718] dark:text-white dark:hover:bg-[#23252a]",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-body-sm gap-1.5",
      md: "h-11 px-6 text-body gap-2",
      lg: "h-14 px-8 text-link gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export const ButtonPrimary = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="primary" {...props} />);
ButtonPrimary.displayName = "ButtonPrimary";

export const ButtonOutline = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="outline" {...props} />);
ButtonOutline.displayName = "ButtonOutline";

export const ButtonSoft = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="soft" {...props} />);
ButtonSoft.displayName = "ButtonSoft";
