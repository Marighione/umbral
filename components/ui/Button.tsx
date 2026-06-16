"use client";

import { cn } from "@/lib/cn";

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonProps["variant"], string> = {
  primary:
    "bg-coral text-white hover:bg-coral-hover",
  secondary:
    "bg-transparent text-coral border-[1.5px] border-coral hover:bg-coral-light",
  ghost:
    "bg-transparent text-text-base hover:bg-bg-alt",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-[14px]",
  md: "px-6 py-3 text-[16px]",
  lg: "px-8 py-4 text-[16px]",
};

export function Button({
  variant,
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-body font-semibold rounded-full transition-all duration-200",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
