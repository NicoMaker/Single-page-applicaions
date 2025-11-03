"use client"

interface SuccessMessageProps {
  username: string
  onNewRegistration: () => void
}

export default function SuccessMessage({ username, onNewRegistration }: SuccessMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center animate-in zoom-in duration-500">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-accent to-primary/50 flex items-center justify-center shadow-lg shadow-accent/30 animate-bounce">
              <span className="text-5xl">🎉</span>
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-card backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-border/40 space-y-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                Registrazione Completata!
              </h2>
              <p className="text-muted-foreground">
                Benvenuto <span className="font-bold text-foreground">{username}</span> 👋
              </p>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>✓ Account creato con successo</p>
              <p>✓ Puoi accedere al tuo profilo</p>
              <p>✓ Inizia a esplorare</p>
            </div>

            <button
              onClick={onNewRegistration}
              className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
            >
              Nuova Registrazione
            </button>
          </div>

          <p className="text-center text-muted-foreground mt-6 text-sm">
            <a href="#" className="text-primary hover:underline font-semibold">
              Torna alla homepage
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
