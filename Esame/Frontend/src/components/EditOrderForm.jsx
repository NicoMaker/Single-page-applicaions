import React, { useState } from "react"

function EditOrderForm({ order, dishes, onSave, onCancel }) {
  const [editedDishes, setEditedDishes] = useState([...order.dishes])

  const updateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      setEditedDishes(editedDishes.filter((d) => d.id !== dishId))
    } else {
      setEditedDishes(editedDishes.map((d) => (d.id === dishId ? { ...d, qty: newQty } : d)))
    }
  }

  const addDish = (dishId) => {
    const existingDish = editedDishes.find((d) => d.id === dishId)
    if (existingDish) {
      updateQuantity(dishId, existingDish.qty + 1)
    } else {
      setEditedDishes([...editedDishes, { id: dishId, qty: 1 }])
    }
  }

  return (
    <>
      <div className="form-group">
        <label>Piatti nell'ordine:</label>
        {editedDishes.length > 0 ? (
          <ul className="edit-dishes-list">
            {editedDishes.map((orderDish) => {
              const dish = dishes.find((d) => d.id === orderDish.id)
              if (!dish) return null

              return (
                <li key={orderDish.id} className="edit-dish-item">
                  <span className="dish-name">{dish.nome}</span>
                  <div className="quantity-controls">
                    <button className="btn btn-small" onClick={() => updateQuantity(orderDish.id, orderDish.qty - 1)}>
                      -
                    </button>
                    <span className="quantity">{orderDish.qty}</span>
                    <button className="btn btn-small" onClick={() => updateQuantity(orderDish.id, orderDish.qty + 1)}>
                      +
                    </button>
                  </div>
                  <span className="dish-subtotal">€{(dish.prezzo * orderDish.qty).toFixed(2)}</span>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="empty-selection">Nessun piatto nell'ordine</p>
        )}
      </div>

      <div className="form-group">
        <label>Aggiungi altri piatti:</label>
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
                <button className="btn btn-small btn-primary" onClick={() => addDish(dish.id)}>
                  + Aggiungi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onCancel}>
          Annulla
        </button>
        <button className="btn btn-primary" onClick={() => onSave(editedDishes)}>
          Salva Modifiche
        </button>
      </div>
    </>
  )
}

export default EditOrderForm