"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ModernDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "dashed" | "dotted"
  withText?: string
  vertical?: boolean
}

export function ModernDivider({
  variant = "solid",
  withText,
  vertical = false,
  className,
  ...props
}: ModernDividerProps) {
  const borderStyles = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
  }

  if (vertical) {
    return <div className={cn("h-full border-l border-border/30", borderStyles[variant], className)} {...props} />
  }

  if (withText) {
    return (
      <div className={cn("flex items-center gap-2 sm:gap-3", className)} {...props}>
        <div className={cn("flex-1 border-t border-border/30", borderStyles[variant])} />
        <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">{withText}</span>
        <div className={cn("flex-1 border-t border-border/30", borderStyles[variant])} />
      </div>
    )
  }

  return <div className={cn("border-t border-border/30", borderStyles[variant], className)} {...props} />
}
