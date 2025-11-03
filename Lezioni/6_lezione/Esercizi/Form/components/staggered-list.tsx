"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface StaggeredListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[]
  animation?: "slideIn" | "fadeIn" | "scaleIn"
  delayBetweenItems?: number
  duration?: "200" | "300" | "500" | "700" | "1000"
}

const animationClasses = {
  slideIn: "animate-in slide-in-from-top",
  fadeIn: "fade-in",
  scaleIn: "scale-in",
}

const durationClasses: Record<string, string> = {
  "200": "duration-200",
  "300": "duration-300",
  "500": "duration-500",
  "700": "duration-700",
  "1000": "duration-1000",
}

export function StaggeredList({
  items,
  animation = "slideIn",
  delayBetweenItems = 100,
  duration = "500",
  className,
  ...props
}: StaggeredListProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(animationClasses[animation], durationClasses[duration])}
          style={{
            animationDelay: `${index * delayBetweenItems}ms`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
