import React from "react"
import EditOrderForm from "./EditOrderForm"

function EditOrderModal({ selectedOrder, dishes, getTableName, updateOrder, setSelectedOrder }) {
  if (!selectedOrder) return null

  return (
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
  )
}

export default EditOrderModal