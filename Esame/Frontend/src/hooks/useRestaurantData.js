import { useState, useEffect, useCallback } from "react"

const API_URL = "http://localhost:8000"

export const useRestaurantData = () => {
  const [orders, setOrders] = useState([])
  const [dishes, setDishes] = useState([])
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)

  // Stati per la gestione dell'UI che App deve controllare
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [newOrder, setNewOrder] = useState({ tableId: "", dishes: [] })

  const loadData = useCallback(async () => {
    try {
      const [ordersRes, dishesRes, tablesRes] = await Promise.all([
        fetch(`${API_URL}/orders`, { mode: "cors" }),
        fetch(`${API_URL}/dishes`, { mode: "cors" }),
        fetch(`${API_URL}/tables`, { mode: "cors" }),
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

      const ordersWithDetails = await Promise.all(
        ordersData.map(async (order) => {
          const detailRes = await fetch(`${API_URL}/orders/${order.id}`, { mode: "cors" })
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
  }, [])

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [loadData])

  const calculateTotal = (orderDishes) => {
    if (!orderDishes || orderDishes.length === 0) return 0
    const total = orderDishes.reduce((sum, orderDish) => {
      const dish = dishes.find((d) => d.id === orderDish.id)
      return sum + (dish ? dish.prezzo * orderDish.qty : 0)
    }, 0)
    return total
  }

  const getTableName = (tableId) => {
    const table = tables.find((t) => t.id === tableId)
    return table ? table.nome : tableId
  }

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo ordine?")) return
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, { method: "DELETE", mode: "cors" })
      if (response.status === 204 || response.ok) {
        console.log("[v0] Ordine eliminato con successo")
        await loadData()
      } else {
        const errorText = await response.text()
        throw new Error(`Errore ${response.status}: ${errorText}`)
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
        const errorText = await response.text()
        throw new Error(`Errore ${response.status}: ${errorText}`)
      }
      console.log("[v0] Ordine creato con successo")
      setShowNewOrder(false)
      setNewOrder({ tableId: "", dishes: [] })
      await loadData()
    } catch (error) {
      console.error("[v0] Errore creazione ordine:", error)
      alert("Errore durante la creazione dell'ordine: " + error.message)
    }
  }

  const updateOrder = async (orderId, updatedDishes) => {
    try {
      const payload = { dishes: updatedDishes }
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Errore ${response.status}: ${errorText}`)
      }
      console.log("[v0] Ordine aggiornato con successo")
      setSelectedOrder(null)
      await loadData()
    } catch (error) {
      console.error("[v0] Errore aggiornamento ordine:", error)
      alert("Errore durante l'aggiornamento dell'ordine: " + error.message)
    }
  }

  // --- FUNZIONI DI MANIPOLAZIONE DELLO STATO NEW ORDER (Rimaste qui per coerenza) ---
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

  // Restituisce tutti i dati, gli stati e le funzioni necessari al componente App
  return {
    orders,
    dishes,
    tables,
    loading,
    selectedOrder,
    setSelectedOrder,
    showNewOrder,
    setShowNewOrder,
    newOrder,
    setNewOrder,
    calculateTotal,
    getTableName,
    deleteOrder,
    createOrder,
    updateOrder,
    addDishToNewOrder,
    removeDishFromNewOrder,
  }
}