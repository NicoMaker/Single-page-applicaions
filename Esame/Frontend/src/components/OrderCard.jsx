import React from "react"

function OrderCard({ order, dishes, calculateTotal, getTableName, setSelectedOrder, deleteOrder }) {
  const total = calculateTotal(order.dishes)

  return (
    <div className="order-card">
      <div className="order-header">
        <h3>{getTableName(order.tableId)}</h3>
        <span className="order-id">#{order.id.slice(0, 8).toUpperCase()}</span>
      </div>

      <div className="order-dishes">
        <h4>Piatti ordinati:</h4>
        {order.dishes && order.dishes.length > 0 ? (
          <ul className="dishes-list">
            {order.dishes.map((orderDish, idx) => {
              const dish = dishes.find((d) => d.id === orderDish.id)
              if (!dish) return null

              return (
                <li key={idx} className="dish-item">
                  <div className="dish-info">
                    <span className="dish-name">{dish.nome}</span>
                    <span className="dish-qty">x{orderDish.qty}</span>
                  </div>
                  <div className="dish-prices">
                    <span className="dish-unit-price">€{dish.prezzo.toFixed(2)}</span>
                    <span className="dish-total-price">€{(dish.prezzo * orderDish.qty).toFixed(2)}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="no-dishes">Nessun piatto ordinato</p>
        )}
      </div>

      <div className="order-footer">
        <div className="order-total">
          <span>Totale:</span>
          <span className="total-amount">€{total.toFixed(2)}</span>
        </div>
        <div className="order-actions">
          <button className="btn btn-secondary" onClick={() => setSelectedOrder(order)}>
            Modifica
          </button>
          <button className="btn btn-danger" onClick={() => deleteOrder(order.id)}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderCard