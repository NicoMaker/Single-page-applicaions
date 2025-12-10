"use client"

import { useState, useEffect } from "react"
import "./App.css"

const API_URL = "http://localhost:8000"

function App() {
  const [orders, setOrders] = useState([])
  const [dishes, setDishes] = useState([])
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [newOrder, setNewOrder] = useState({ tableId: "", dishes: [] })

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [ordersRes, dishesRes, tablesRes] = await Promise.all([
        fetch(`${API_URL}/orders`),
        fetch(`${API_URL}/dishes`),
        fetch(`${API_URL}/tables`),
      ])

      if (!ordersRes.ok || !dishesRes.ok || !tablesRes.ok) {
        console.error("[v0] Errore nel caricamento dei dati")
        alert("Errore nel caricamento dei dati. Assicurati che il backend sia avviato su http://localhost:8000")
        setLoading(false)
        return
      }

      const ordersData = await ordersRes.json()
      const dishesData = await dishesRes.json()
      const tablesData = await tablesRes.json()

      // Carico i dettagli completi per ogni ordine
      const ordersWithDetails = await Promise.all(
        ordersData.map(async (order) => {
          const detailRes = await fetch(`${API_URL}/orders/${order.id}`)
          return await detailRes.json()
        }),
      )

      setOrders(ordersWithDetails)
      setDishes(dishesData)
      setTables(tablesData)
      setLoading(false)
    } catch (error) {
      console.error("[v0] Errore caricamento dati:", error)
      alert("Impossibile connettersi al backend. Verifica che sia attivo su http://localhost:8000")
      setLoading(false)
    }
  }

  const calculateTotal = (orderDishes) => {
    if (!orderDishes || orderDishes.length === 0) {
      return 0
    }

    const total = orderDishes.reduce((sum, orderDish) => {
      const dish = dishes.find((d) => d.id === orderDish.id)
      if (dish) {
        return sum + dish.prezzo * orderDish.qty
      }
      return sum
    }, 0)

    return total
  }

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo ordine?")) return

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        mode: "cors",
      })

      // Il backend restituisce 204 No Content, non c'è JSON da parsare
      if (response.status === 204 || response.ok) {
        console.log("[v0] Ordine eliminato con successo")
        await loadData()
      } else {
        throw new Error(`Errore ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Errore eliminazione ordine:", error)
      alert("Errore durante l'eliminazione dell'ordine. Verifica la connessione al backend.")
    }
  }

  const createOrder = async () => {
    if (!newOrder.tableId) {
      alert("Seleziona un tavolo")
      return
    }

    if (newOrder.dishes.length === 0) {
      alert("Aggiungi almeno un piatto")
      return
    }

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      })

      if (!response.ok) {
        throw new Error(`Errore ${response.status}`)
      }

      setShowNewOrder(false)
      setNewOrder({ tableId: "", dishes: [] })
      await loadData()
    } catch (error) {
      console.error("[v0] Errore creazione ordine:", error)
      alert("Errore durante la creazione dell'ordine")
    }
  }

  const updateOrder = async (orderId, updatedDishes) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dishes: updatedDishes }),
      })

      if (!response.ok) {
        throw new Error(`Errore ${response.status}`)
      }

      setSelectedOrder(null)
      await loadData()
    } catch (error) {
      console.error("[v0] Errore aggiornamento ordine:", error)
      alert("Errore durante l'aggiornamento dell'ordine")
    }
  }

  const addDishToNewOrder = (dishId) => {
    const existingDish = newOrder.dishes.find((d) => d.id === dishId)
    if (existingDish) {
      setNewOrder({
        ...newOrder,
        dishes: newOrder.dishes.map((d) => (d.id === dishId ? { ...d, qty: d.qty + 1 } : d)),
      })
    } else {
      setNewOrder({
        ...newOrder,
        dishes: [...newOrder.dishes, { id: dishId, qty: 1 }],
      })
    }
  }

  const removeDishFromNewOrder = (dishId) => {
    setNewOrder({
      ...newOrder,
      dishes: newOrder.dishes.filter((d) => d.id !== dishId),
    })
  }

  const getTableName = (tableId) => {
    const table = tables.find((t) => t.id === tableId)
    return table ? table.nome : tableId
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Caricamento...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Gestione Ordini Ristorante</h1>
          <button className="btn btn-primary" onClick={() => setShowNewOrder(true)}>
            + Nuovo Ordine
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="orders-grid">
          {orders.length === 0 ? (
            <div className="empty-state">
              <p>Nessun ordine attivo</p>
              <button className="btn btn-primary" onClick={() => setShowNewOrder(true)}>
                Crea il primo ordine
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const total = calculateTotal(order.dishes)

              return (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Tavolo {getTableName(order.tableId)}</h3>
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
            })
          )}
        </div>
      </main>

      {showNewOrder && (
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
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Modifica Ordine - Tavolo {getTableName(selectedOrder.tableId)}</h2>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <EditOrderForm
                order={selectedOrder}
                dishes={dishes}
                onSave={(updatedDishes) => updateOrder(selectedOrder.id, updatedDishes)}
                onCancel={() => setSelectedOrder(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

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

export default App
