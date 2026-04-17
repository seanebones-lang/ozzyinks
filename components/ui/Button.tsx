import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "sm" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pink)] disabled:opacity-40 disabled:pointer-events-none rounded-full";
  const sizes = {
    sm: "px-4 text-sm",
    md: "px-6 text-sm",
    lg: "min-h-12 px-8 py-3.5 text-base",
  };
  const variants = {
    primary:
      "bg-[var(--pink)] text-black hover:brightness-110 neon-ring shadow-[0_0_40px_rgba(255,45,166,0.25)]",
    ghost: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
    outline: "border border-[var(--border)] text-white hover:border-[var(--pink)] hover:text-[var(--pink)] bg-transparent",
  };
  return <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props} />;
});
