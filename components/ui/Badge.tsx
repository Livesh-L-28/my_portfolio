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
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    outline: "bg-transparent text-slate-600 border-slate-300",
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
