interface PasswordRequirementsProps {
  requirements: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

export default function PasswordRequirements({ requirements }: PasswordRequirementsProps) {
  const requirementsList = [
    { key: "length", label: "Almeno 8 caratteri" },
    { key: "uppercase", label: "Una lettera maiuscola" },
    { key: "lowercase", label: "Una lettera minuscola" },
    { key: "number", label: "Un numero" },
    { key: "special", label: "Un carattere speciale (!@#$...)" },
  ]

  return (
    <div className="mt-4 p-4 rounded-xl bg-background/50 border border-border/30 space-y-2 animate-in fade-in slide-in-from-top duration-300">
      {requirementsList.map(({ key, label }) => {
        const isMet = requirements[key as keyof typeof requirements]
        return (
          <div
            key={key}
            className={`flex items-center gap-2.5 text-sm font-medium transition-all duration-300 ${
              isMet ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                isMet ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground border border-border/50"
              }`}
            >
              {isMet ? "✓" : "○"}
            </span>
            <span>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
