"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimationWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: "slideIn" | "fadeIn" | "scaleIn" | "slideInLeft" | "slideInRight"
  delay?: "75" | "100" | "150" | "200" | "300" | "500"
  duration?: "200" | "300" | "500" | "700" | "1000"
  hover?: boolean
  interactive?: boolean
  stagger?: number
}

const animationClasses = {
  slideIn: "animate-in slide-in-from-top",
  fadeIn: "fade-in",
  scaleIn: "scale-in",
  slideInLeft: "slide-in-from-left",
  slideInRight: "slide-in-from-right",
}

const delayClasses: Record<string, string> = {
  "75": "delay-75",
  "100": "delay-100",
  "150": "delay-150",
  "200": "delay-200",
  "300": "delay-300",
  "500": "delay-500",
}

const durationClasses: Record<string, string> = {
  "200": "duration-200",
  "300": "duration-300",
  "500": "duration-500",
  "700": "duration-700",
  "1000": "duration-1000",
}

export function AnimationWrapper({
  animation = "slideIn",
  delay,
  duration = "500",
  hover = false,
  interactive = false,
  stagger,
  className,
  style,
  children,
  ...props
}: AnimationWrapperProps) {
  return (
    <div
      className={cn(
        animationClasses[animation],
        delay && delayClasses[delay],
        durationClasses[duration],
        hover && "interactive-hover",
        interactive && "interactive-focus",
        className,
      )}
      style={{
        ...style,
        ...(stagger && { animationDelay: `${stagger}ms` }),
      }}
      {...props}
    >
      {children}
    </div>
  )
}
