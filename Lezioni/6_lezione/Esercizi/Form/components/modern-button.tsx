"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient"
  size?: "sm" | "md" | "lg" | "icon"
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
}

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg transition-all duration-300",
  outline: "border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300",
  ghost: "hover:bg-accent/10 transition-all duration-300",
  gradient:
    "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300",
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2.5 text-base rounded-xl",
  lg: "px-6 py-3 text-lg rounded-2xl",
  icon: "w-10 h-10 rounded-xl flex items-center justify-center",
}

export function ModernButton({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  className,
  children,
  ...props
}: ModernButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm md:text-base",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {icon && !loading && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  )
}
