"use client"

import type React from "react"

interface FormFieldProps {
  label: string
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  success?: boolean
  hint?: string
}

export default function FormField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  success,
  hint,
}: FormFieldProps) {
  const hasError = error && touched

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-foreground">
        {label}
        {hint && <span className="text-xs text-muted-foreground ml-2">({hint})</span>}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`
          w-full px-4 py-3 rounded-xl font-medium text-base
          border-2 transition-all duration-300 outline-none
          bg-background/50 backdrop-blur-sm
          placeholder:text-muted-foreground/50
          focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20
          ${hasError ? "border-destructive bg-destructive/5 focus:ring-destructive/20 focus:border-destructive" : "border-border/50 hover:border-border"}
          ${success ? "border-accent/50 bg-accent/5" : ""}
        `}
      />

      {hasError && (
        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top duration-200">
          ✕ {error}
        </p>
      )}

      {success && (
        <p className="text-xs font-medium text-accent animate-in fade-in slide-in-from-top duration-200">
          ✓ Le password coincidono!
        </p>
      )}
    </div>
  )
}
