import { useState, useEffect, useCallback } from "react"

const API_URL = "http://localhost:8000"

export const useRestaurantData = () => {
  const [orders, setOrders] = useState([])
  const [dishes, setDishes] = useState([])
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)

  // --- FUNZIONI DI CARICAMENTO DATI ---
  const loadData = useCallback(async () => {
    try {
      const [ordersRes, dishesRes, tablesRes] = await Promise.all([
        fetch(`${API_URL}/orders`, { mode: "cors" }),
        fetch(`${API_URL}/dishes`, { mode: "cors" }),
        fetch(`${API_URL}/tables`, { mode: "cors" }),
      ])

      if (!ordersRes.ok || !dishesRes.ok || !tablesRes.ok) {
        throw new Error("Errore nel caricamento dei dati. Assicurati che il backend sia avviato.")
      }

      const ordersData = await ordersRes.json()
      const dishesData = await dishesRes.json()
      const tablesData = await tablesRes.json()

      const ordersWithDetails = await Promise.all(
        ordersData.map(async (order) => {
          const detailRes = await fetch(`${API_URL}/orders/${order.id}`, { mode: "cors" })
          if (!detailRes.ok) return order 
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

  // --- FUNZIONI API (MUTAZIONE) ---
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo ordine?")) return
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, { method: "DELETE", mode: "cors" })
      if (response.status === 204 || response.ok) {
        await loadData() 
        return true
      } else {
        const errorText = await response.text()
        throw new Error(`Errore ${response.status}: ${errorText}`)
      }
    } catch (error) {
      console.error("[v0] Errore eliminazione ordine:", error)
      alert("Errore durante l'eliminazione dell'ordine: " + error.message)
      return false
    }
  }

  const createOrder = async (newOrderData) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderData),
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Errore ${response.status}: ${errorText}`)
      }
      await loadData()
      return true
    } catch (error) {
      console.error("[v0] Errore creazione ordine:", error)
      alert("Errore durante la creazione dell'ordine: " + error.message)
      return false
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
      await loadData() 
      return true
    } catch (error) {
      console.error("[v0] Errore aggiornamento ordine:", error)
      alert("Errore durante l'aggiornamento dell'ordine: " + error.message)
      return false
    }
  }

  // --- FUNZIONI DI UTILITÀ ---
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
    return table ? table.nome : `Tavolo ${tableId}`
  }

  return {
    orders,
    dishes,
    tables,
    loading,
    calculateTotal,
    getTableName,
    deleteOrder,
    createOrder,
    updateOrder,
  }
}