import React from "react"

function GrandTotalFooter({ orders, calculateTotal }) {
  if (orders.length === 0) return null

  return (
    <div className="grand-total-container">
      <div className="grand-total-card">
        <span className="grand-total-label">Totale Generale di Tutti gli Ordini:</span>
        <span className="grand-total-amount">
          €{orders.reduce((sum, order) => sum + calculateTotal(order.dishes), 0).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default GrandTotalFooter