import React from "react"

function AppHeader({ setShowNewOrder }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Gestione Ordini Ristorante</h1>
        <button className="btn btn-primary" onClick={() => setShowNewOrder(true)}>
          + Nuovo Ordine
        </button>
      </div>
    </header>
  )
}

export default AppHeader