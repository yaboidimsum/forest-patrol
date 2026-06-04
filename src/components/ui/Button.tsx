"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const base =
    "border-2 border-white px-4 py-3 md:px-5 md:py-4 inline-flex items-center justify-center font-mono whitespace-nowrap select-none transition-colors duration-150";

  const variants = {
    primary:
      "bg-accent text-border hover:bg-accent/90",
    secondary:
      "bg-transparent text-foreground border-white hover:bg-white/5",
    outline:
      "bg-transparent text-white border-white hover:bg-white/5",
    ghost:
      "bg-muted text-muted-fg border-muted hover:text-foreground hover:border-white",
  };

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={cn(
        base,
        variants[variant],
        "text-[clamp(1rem,2.5vw,2.5rem)] leading-none",
        fullWidth && "w-full",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
