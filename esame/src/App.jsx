import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, ShoppingCart } from 'lucide-react';

const API_BASE = 'http://localhost:8000';

export default function RestaurantOrdersApp() {
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes, dishesRes, tablesRes] = await Promise.all([
        fetch(`${API_BASE}/orders`),
        fetch(`${API_BASE}/dishes`),
        fetch(`${API_BASE}/tables`)
      ]);

      const ordersData = await ordersRes.json();
      const dishesData = await dishesRes.json();
      const tablesData = await tablesRes.json();

      setOrders(ordersData);
      setDishes(dishesData);
      setTables(tablesData);
      setLoading(false);
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
      setLoading(false);
    }
  };

  const getDishInfo = (dishId) => {
    return dishes.find(d => d.id === dishId);
  };

  const getTableName = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    return table ? table.nome : tableId;
  };

  const calculateOrderTotal = (orderDishes) => {
    return orderDishes.reduce((total, item) => {
      const dish = getDishInfo(item.id);
      return total + (dish ? dish.prezzo * item.qty : 0);
    }, 0);
  };

  const handleCreateOrder = async () => {
    if (!selectedTable || selectedDishes.length === 0) {
      alert('Seleziona un tavolo e almeno un piatto');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId: selectedTable,
          dishes: selectedDishes
        })
      });

      if (response.ok) {
        await loadData();
        setShowNewOrder(false);
        setSelectedTable('');
        setSelectedDishes([]);
      } else {
        const error = await response.json();
        alert(error.message || 'Errore nella creazione dell\'ordine');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nella creazione dell\'ordine');
    }
  };

  const handleUpdateOrder = async () => {
    if (!editingOrder || selectedDishes.length === 0) {
      alert('Seleziona almeno un piatto');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishes: selectedDishes
        })
      });

      if (response.ok) {
        await loadData();
        setEditingOrder(null);
        setSelectedDishes([]);
      } else {
        alert('Errore nell\'aggiornamento dell\'ordine');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nell\'aggiornamento dell\'ordine');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!confirm('Sei sicuro di voler eliminare questo ordine?')) return;

    try {
      const response = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadData();
      } else {
        alert('Errore nell\'eliminazione dell\'ordine');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nell\'eliminazione dell\'ordine');
    }
  };

  const startEditOrder = async (order) => {
    try {
      const response = await fetch(`${API_BASE}/orders/${order.id}`);
      const fullOrder = await response.json();
      setEditingOrder(fullOrder);
      setSelectedDishes(fullOrder.dishes || []);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  const addDishToSelection = (dishId) => {
    const existing = selectedDishes.find(d => d.id === dishId);
    if (existing) {
      setSelectedDishes(selectedDishes.map(d =>
        d.id === dishId ? { ...d, qty: d.qty + 1 } : d
      ));
    } else {
      setSelectedDishes([...selectedDishes, { id: dishId, qty: 1 }]);
    }
  };

  const updateDishQuantity = (dishId, qty) => {
    if (qty <= 0) {
      setSelectedDishes(selectedDishes.filter(d => d.id !== dishId));
    } else {
      setSelectedDishes(selectedDishes.map(d =>
        d.id === dishId ? { ...d, qty } : d
      ));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-2xl text-orange-600 font-semibold">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <ShoppingCart className="text-orange-500" size={36} />
                Gestionale Ordini
              </h1>
              <p className="text-gray-600 mt-1">Gestisci gli ordini del ristorante</p>
            </div>
            <button
              onClick={() => setShowNewOrder(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Nuovo Ordine
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{getTableName(order.tableId)}</h3>
                  <p className="text-sm text-gray-500">ID: {order.id.slice(0, 8)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditOrder(order)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {order.dishes && order.dishes.map((item, idx) => {
                  const dish = getDishInfo(item.id);
                  return dish ? (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">
                        {item.qty}x {dish.nome}
                      </span>
                      <span className="font-semibold text-gray-900">
                        €{(dish.prezzo * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Totale:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    €{calculateOrderTotal(order.dishes || []).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">Nessun ordine attivo</p>
          </div>
        )}

        {/* New/Edit Order Modal */}
        {(showNewOrder || editingOrder) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingOrder ? 'Modifica Ordine' : 'Nuovo Ordine'}
                </h2>
                <button
                  onClick={() => {
                    setShowNewOrder(false);
                    setEditingOrder(null);
                    setSelectedTable('');
                    setSelectedDishes([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {showNewOrder && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Seleziona Tavolo
                    </label>
                    <select
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    >
                      <option value="">-- Scegli un tavolo --</option>
                      {tables.map(table => (
                        <option key={table.id} value={table.id}>
                          {table.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {editingOrder && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700">
                      Tavolo: <span className="text-orange-600">{getTableName(editingOrder.tableId)}</span>
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Piatti Selezionati</h3>
                  {selectedDishes.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nessun piatto selezionato</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedDishes.map(item => {
                        const dish = getDishInfo(item.id);
                        return dish ? (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="font-medium text-gray-700">{dish.nome}</span>
                            <div className="flex items-center gap-3">
                              <input
                                type="number"
                                min="0"
                                value={item.qty}
                                onChange={(e) => updateDishQuantity(item.id, parseInt(e.target.value) || 0)}
                                className="w-20 p-2 border-2 border-gray-200 rounded-lg text-center focus:border-orange-500 focus:outline-none"
                              />
                              <span className="font-semibold text-gray-900 w-20 text-right">
                                €{(dish.prezzo * item.qty).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ) : null;
                      })}
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border-2 border-orange-200 mt-4">
                        <span className="text-lg font-bold text-gray-800">Totale:</span>
                        <span className="text-xl font-bold text-orange-600">
                          €{selectedDishes.reduce((sum, item) => {
                            const dish = getDishInfo(item.id);
                            return sum + (dish ? dish.prezzo * item.qty : 0);
                          }, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Menu</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dishes.map(dish => (
                      <button
                        key={dish.id}
                        onClick={() => addDishToSelection(dish.id)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">{dish.nome}</h4>
                            <p className="text-sm text-gray-600">{dish.categoria}</p>
                            {dish.vegetariano && (
                              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Vegetariano
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-orange-600">€{dish.prezzo.toFixed(2)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowNewOrder(false);
                    setEditingOrder(null);
                    setSelectedTable('');
                    setSelectedDishes([]);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Annulla
                </button>
                <button
                  onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  {editingOrder ? 'Salva Modifiche' : 'Crea Ordine'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}