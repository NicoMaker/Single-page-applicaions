import React from "react"
import OrderCard from "./OrderCard"

function OrdersGridContainer({ orders, dishes, calculateTotal, getTableName, setSelectedOrder, deleteOrder, setShowNewOrder }) {
  return (
    <div className="orders-grid">
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>Nessun ordine attivo</p>
          <button className="btn btn-primary" onClick={() => setShowNewOrder(true)}>
            Crea il primo ordine
          </button>
        </div>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            dishes={dishes}
            calculateTotal={calculateTotal}
            getTableName={getTableName}
            setSelectedOrder={setSelectedOrder}
            deleteOrder={deleteOrder}
          />
        ))
      )}
    </div>
  )
}

export default OrdersGridContainer