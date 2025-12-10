-
"use client"

import "./App.css"
import { useRestaurantData } from "./hooks/useRestaurantData" 

import AppHeader from "./components/AppHeader"
import OrdersGridContainer from "./components/OrdersGridContainer"
import GrandTotalFooter from "./components/GrandTotalFooter"
import NewOrderModal from "./components/NewOrderModal"
import EditOrderModal from "./components/EditOrderModal"


function App() {
  const {
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
  } = useRestaurantData()

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
      <AppHeader setShowNewOrder={setShowNewOrder} />

      <main className="main-content">
        <OrdersGridContainer
          orders={orders}
          dishes={dishes}
          calculateTotal={calculateTotal}
          getTableName={getTableName}
          setSelectedOrder={setSelectedOrder}
          deleteOrder={deleteOrder}
          setShowNewOrder={setShowNewOrder} 
        />

        <GrandTotalFooter orders={orders} calculateTotal={calculateTotal} />
      </main>

      {/* MODALE NUOVO ORDINE */}
      <NewOrderModal
        showNewOrder={showNewOrder}
        setShowNewOrder={setShowNewOrder}
        newOrder={newOrder}
        setNewOrder={setNewOrder}
        tables={tables}
        dishes={dishes}
        createOrder={createOrder}
        addDishToNewOrder={addDishToNewOrder}
        removeDishFromNewOrder={removeDishFromNewOrder}
      />

      <EditOrderModal
        selectedOrder={selectedOrder}
        dishes={dishes}
        getTableName={getTableName}
        updateOrder={updateOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </div>
  )
}

export default App