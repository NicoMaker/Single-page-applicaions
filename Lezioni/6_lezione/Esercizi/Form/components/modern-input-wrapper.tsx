"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ModernInputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  size?: "sm" | "md" | "lg"
}

export function ModernInputWrapper({
  label,
  hint,
  error,
  required,
  size = "md",
  className,
  children,
  ...props
}: ModernInputWrapperProps) {
  return (
    <div className={cn("space-y-1.5 sm:space-y-2", className)} {...props}>
      {label && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
      )}

      <div className="relative">{children}</div>

      {error && (
        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top duration-200 flex items-center gap-1">
          <span>✕</span> {error}
        </p>
      )}
    </div>
  )
}
