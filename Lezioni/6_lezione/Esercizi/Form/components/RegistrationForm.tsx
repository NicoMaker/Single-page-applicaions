"use client"

import type React from "react"

import { useState } from "react"
import PasswordRequirements from "./PasswordRequirements"
import SuccessMessage from "./SuccessMessage"
import { ModernButton } from "./modern-button"
import { ModernCard, ModernCardTitle, ModernCardDescription, ModernCardContent } from "./modern-card"
import { ModernInputWrapper } from "./modern-input-wrapper"
import { ModernDivider } from "./modern-divider"
import { AnimationWrapper } from "./animation-wrapper"

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface ErrorsState {
  [key: string]: string
}

interface TouchedState {
  [key: string]: boolean
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<ErrorsState>({})
  const [touched, setTouched] = useState<TouchedState>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const checkPasswordRequirements = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()]/.test(password),
    }
  }

  const validateField = (name: string, value: string, currentData = formData): string => {
    let error = ""

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Il nome utente è obbligatorio."
        } else if (value.trim().length < 3) {
          error = "Il nome utente deve contenere almeno 3 caratteri."
        }
        break

      case "email":
        if (!value) {
          error = "L'email è obbligatoria."
        } else if (!EMAIL_REGEX.test(value)) {
          error = "Il formato dell'email non è valido."
        }
        break

      case "password":
        if (!value) {
          error = "La password è obbligatoria."
        } else if (!PASSWORD_REGEX.test(value)) {
          error = "La password non soddisfa tutti i requisiti."
        }
        break

      case "confirmPassword":
        if (!value) {
          error = "La conferma password è obbligatoria."
        } else if (value !== currentData.password) {
          error = "Le password non coincidono."
        }
        break

      default:
        break
    }
    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    if (touched[name]) {
      const error = validateField(name, value, newFormData)
      setErrors((prev) => {
        const newErrors = { ...prev, [name]: error }

        if (name === "password" && touched.confirmPassword) {
          newErrors.confirmPassword = validateField("confirmPassword", newFormData.confirmPassword, newFormData)
        }

        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const currentErrors: ErrorsState = {}
    let isValid = true
    ;["username", "email", "password", "confirmPassword"].forEach((field) => {
      const error = validateField(field, formData[field as keyof FormState])
      if (error) {
        currentErrors[field] = error
        isValid = false
      }
    })

    setErrors(currentErrors)
    setTouched({ username: true, email: true, password: true, confirmPassword: true })
    return isValid
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Dati di registrazione validi:", formData)
      setIsSubmitted(true)
    }
  }

  const handleNewRegistration = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setErrors({})
    setTouched({})
    setIsSubmitted(false)
  }

  const passwordRequirements = checkPasswordRequirements(formData.password)
  const passwordCriteriaMet = Object.values(passwordRequirements).every((req) => req)

  const isFormValid =
    formData.username.trim() !== "" &&
    formData.username.trim().length >= 3 &&
    formData.email !== "" &&
    EMAIL_REGEX.test(formData.email) &&
    passwordCriteriaMet &&
    formData.confirmPassword !== "" &&
    formData.password === formData.confirmPassword

  if (isSubmitted) {
    return <SuccessMessage username={formData.username} onNewRegistration={handleNewRegistration} />
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-3 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <AnimationWrapper animation="slideIn" duration="500">
          <ModernCard variant="glassmorphism" className="mb-4 sm:mb-6 md:mb-8">
            <ModernCardContent className="text-center space-y-2 sm:space-y-3">
              <ModernCardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Crea il tuo account
              </ModernCardTitle>
              <ModernCardDescription className="text-sm sm:text-base md:text-lg">
                Unisciti a migliaia di utenti felici
              </ModernCardDescription>
            </ModernCardContent>
          </ModernCard>
        </AnimationWrapper>

        <AnimationWrapper animation="slideIn" delay="100" duration="500">
          <ModernCard variant="glassmorphism" className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              <AnimationWrapper animation="fadeIn" delay="150" duration="500">
                <ModernInputWrapper
                  label="Nome Utente"
                  hint="Minimo 3 caratteri"
                  error={touched.username ? errors.username : undefined}
                  required
                >
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Scegli un username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base
                      border-2 transition-all duration-300 outline-none
                      bg-background/50 backdrop-blur-sm
                      placeholder:text-muted-foreground/50
                      focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20
                      ${touched.username && errors.username ? "border-destructive bg-destructive/5 focus:ring-destructive/20 focus:border-destructive" : "border-border/50 hover:border-border"}
                    `}
                  />
                </ModernInputWrapper>
              </AnimationWrapper>

              <AnimationWrapper animation="fadeIn" delay="200" duration="500">
                <ModernInputWrapper label="Email" error={touched.email ? errors.email : undefined} required>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@esempio.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base
                      border-2 transition-all duration-300 outline-none
                      bg-background/50 backdrop-blur-sm
                      placeholder:text-muted-foreground/50
                      focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20
                      ${touched.email && errors.email ? "border-destructive bg-destructive/5 focus:ring-destructive/20 focus:border-destructive" : "border-border/50 hover:border-border"}
                    `}
                  />
                </ModernInputWrapper>
              </AnimationWrapper>

              <AnimationWrapper animation="fadeIn" delay="250" duration="500">
                <div>
                  <ModernInputWrapper label="Password" error={touched.password ? errors.password : undefined} required>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`
                        w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base
                        border-2 transition-all duration-300 outline-none
                        bg-background/50 backdrop-blur-sm
                        placeholder:text-muted-foreground/50
                        focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20
                        ${touched.password && errors.password ? "border-destructive bg-destructive/5 focus:ring-destructive/20 focus:border-destructive" : "border-border/50 hover:border-border"}
                      `}
                    />
                  </ModernInputWrapper>

                  {formData.password && <PasswordRequirements requirements={passwordRequirements} />}
                </div>
              </AnimationWrapper>

              <AnimationWrapper animation="fadeIn" delay="300" duration="500">
                <ModernInputWrapper
                  label="Conferma Password"
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                  required
                >
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base
                      border-2 transition-all duration-300 outline-none
                      bg-background/50 backdrop-blur-sm
                      placeholder:text-muted-foreground/50
                      focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20
                      ${!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword ? "border-accent/50 bg-accent/5" : ""}
                      ${touched.confirmPassword && errors.confirmPassword ? "border-destructive bg-destructive/5 focus:ring-destructive/20 focus:border-destructive" : "border-border/50 hover:border-border"}
                    `}
                  />
                </ModernInputWrapper>
              </AnimationWrapper>

              <AnimationWrapper animation="scaleIn" delay="350" duration="500">
                <ModernButton
                  type="submit"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  disabled={!isFormValid}
                  className="mt-6 sm:mt-8 button-interaction"
                >
                  {isFormValid ? "Registrati Ora" : "Completa tutti i campi"}
                </ModernButton>
              </AnimationWrapper>

              <AnimationWrapper animation="fadeIn" delay="400" duration="500">
                <ModernDivider withText="oppure" />
              </AnimationWrapper>

              <AnimationWrapper animation="fadeIn" delay="450" duration="500">
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Accettando, accetti i nostri{" "}
                  <a href="#" className="text-primary hover:underline font-medium transition-colors duration-300">
                    Termini di Servizio
                  </a>
                </p>
              </AnimationWrapper>
            </form>
          </ModernCard>
        </AnimationWrapper>

        <AnimationWrapper animation="fadeIn" delay="500" duration="700">
          <p className="text-center text-muted-foreground mt-4 sm:mt-6 text-xs sm:text-sm">
            Hai già un account?{" "}
            <a href="#" className="text-primary hover:underline font-semibold transition-colors duration-300">
              Accedi qui
            </a>
          </p>
        </AnimationWrapper>
      </div>
    </div>
  )
}
