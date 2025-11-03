"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "glassmorphism"
  interactive?: boolean
}

const variantStyles = {
  default: "bg-card border border-border/40 shadow-sm",
  elevated: "bg-card border border-border/40 shadow-xl hover:shadow-2xl transition-shadow duration-300",
  outline: "bg-transparent border-2 border-border/50 hover:border-primary/50 transition-colors duration-300",
  glassmorphism: "bg-card/50 backdrop-blur-xl border border-border/40 shadow-xl",
}

export function ModernCard({ variant = "default", interactive = false, className, ...props }: ModernCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300",
        variantStyles[variant],
        interactive && "cursor-pointer hover:scale-105 hover:shadow-lg",
        className,
      )}
      {...props}
    />
  )
}

export function ModernCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2 mb-4", className)} {...props} />
}

export function ModernCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  )
}

export function ModernCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs sm:text-sm text-muted-foreground", className)} {...props} />
}

export function ModernCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3 sm:space-y-4", className)} {...props} />
}

export function ModernCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-border/20",
        className,
      )}
      {...props}
    />
  )
}
