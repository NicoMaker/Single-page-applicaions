"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ModernBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "accent"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
}

const variantStyles = {
  default: "bg-primary/10 text-primary border border-primary/20",
  success: "bg-accent/10 text-accent border border-accent/20",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200",
  error: "bg-destructive/10 text-destructive border border-destructive/20",
  info: "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-200",
  accent: "bg-accent/10 text-accent border border-accent/20",
}

const sizeStyles = {
  sm: "px-2 py-1 text-xs rounded-md",
  md: "px-3 py-1.5 text-sm rounded-lg",
  lg: "px-4 py-2 text-base rounded-xl",
}

export function ModernBadge({
  variant = "default",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ModernBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </div>
  )
}
