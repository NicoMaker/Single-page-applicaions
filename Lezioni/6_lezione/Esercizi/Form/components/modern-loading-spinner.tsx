"use client"
import { cn } from "@/lib/utils"

interface ModernLoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "accent" | "muted"
  fullPage?: boolean
}

const sizeStyles = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

const variantStyles = {
  primary: "border-primary/30 border-t-primary",
  accent: "border-accent/30 border-t-accent",
  muted: "border-muted/30 border-t-muted-foreground",
}

export function ModernLoadingSpinner({
  size = "md",
  variant = "primary",
  fullPage = false,
}: ModernLoadingSpinnerProps) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
        <div className={cn("rounded-full border-4 animate-spin", sizeStyles[size], variantStyles[variant])} />
      </div>
    )
  }

  return <div className={cn("rounded-full border-4 animate-spin", sizeStyles[size], variantStyles[variant])} />
}
