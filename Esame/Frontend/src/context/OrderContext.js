import React, { createContext, useContext, useState } from "react"
import { useRestaurantData } from "../hooks/useRestaurantData"

const OrderContext = createContext(null)

export const useOrderData = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrderData deve essere usato all'interno di un OrderProvider")
  }
  return context
}

export const OrderProvider = ({ children }) => {
  const data = useRestaurantData()
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [newOrder, setNewOrder] = useState({ tableId: "", dishes: [] })

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
  
  const handleCreateOrder = async () => {
    if (!newOrder.tableId) {
      alert("Seleziona un tavolo")
      return
    }
    if (newOrder.dishes.length === 0) {
      alert("Aggiungi almeno un piatto")
      return
    }
    const success = await data.createOrder(newOrder)
    if (success) {
      setShowNewOrder(false)
      setNewOrder({ tableId: "", dishes: [] })
    }
  }

  const handleUpdateOrder = async (orderId, updatedDishes) => {
      const success = await data.updateOrder(orderId, updatedDishes)
      if (success) {
          setSelectedOrder(null)
      }
  }

  const contextValue = {
    ...data, 
    
    // Stato e funzioni UI/Modals
    selectedOrder,
    setSelectedOrder,
    showNewOrder,
    setShowNewOrder,
    newOrder,
    setNewOrder,
    addDishToNewOrder,
    removeDishFromNewOrder,

    // Funzioni API gestite
    handleCreateOrder,
    handleUpdateOrder,
  }

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  )
}