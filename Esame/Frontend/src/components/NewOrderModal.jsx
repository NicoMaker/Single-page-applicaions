import React from "react"

function NewOrderModal({
  showNewOrder,
  setShowNewOrder,
  newOrder,
  setNewOrder,
  tables,
  dishes,
  createOrder,
  addDishToNewOrder,
  removeDishFromNewOrder,
}) {
  if (!showNewOrder) return null

  return (
    <div className="modal-overlay" onClick={() => setShowNewOrder(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Nuovo Ordine</h2>
          <button className="close-btn" onClick={() => setShowNewOrder(false)}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="form-group">
            <label>Seleziona Tavolo:</label>
            <select
              value={newOrder.tableId}
              onChange={(e) => setNewOrder({ ...newOrder, tableId: e.target.value })}
              className="select-input"
            >
              <option value="">-- Scegli un tavolo --</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Piatti Selezionati:</label>
            {newOrder.dishes.length > 0 ? (
              <ul className="selected-dishes">
                {newOrder.dishes.map((orderDish) => {
                  const dish = dishes.find((d) => d.id === orderDish.id)
                  return (
                    <li key={orderDish.id} className="selected-dish-item">
                      <span>
                        {dish?.nome} x{orderDish.qty}
                      </span>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => removeDishFromNewOrder(orderDish.id)}
                      >
                        Rimuovi
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="empty-selection">Nessun piatto selezionato</p>
            )}
          </div>

          <div className="form-group">
            <label>Aggiungi Piatti:</label>
            <div className="dishes-grid">
              {dishes.map((dish) => (
                <div key={dish.id} className="dish-card">
                  <div className="dish-card-header">
                    <h4>{dish.nome}</h4>
                    <span className="dish-price">€{dish.prezzo.toFixed(2)}</span>
                  </div>
                  <p className="dish-description">{dish.descrizione}</p>
                  <div className="dish-card-footer">
                    <span className="dish-category">{dish.categoria}</span>
                    <button className="btn btn-small btn-primary" onClick={() => addDishToNewOrder(dish.id)}>
                      + Aggiungi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowNewOrder(false)}>
            Annulla
          </button>
          <button className="btn btn-primary" onClick={createOrder}>
            Crea Ordine
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewOrderModal