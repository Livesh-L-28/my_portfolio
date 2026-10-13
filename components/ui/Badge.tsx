import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "cyan" | "emerald" | "amber" | "neutral" | "outline";
  className?: string;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
  size = "sm",
}) => {
  const variantStyles = {
    violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    neutral: "bg-zinc-800/80 text-zinc-300 border-zinc-700/60",
    outline: "bg-transparent text-zinc-400 border-zinc-800",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-mono",
    md: "px-3 py-1 text-xs font-mono",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border tracking-wide font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
