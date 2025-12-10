import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react'; // <-- AGGIUNTO 'Check'

import Button from './components/Button';
import Card from './components/Card';
import Modal from './components/Modal';
import Loading from './components/Loading';
import EmptyState from './components/EmptyState';
import Badge from './components/Badge';
import OrderCard from './components/order/OrderCard';
import OrderModalContent from './components/order/OrderModalContent';

const API_BASE = 'http://localhost:8000';

// Main App Component
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

  const getDishInfo = (dishId) => dishes.find(d => d.id === dishId);
  const getTableName = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    return table ? table.nome : tableId;
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
        body: JSON.stringify({ tableId: selectedTable, dishes: selectedDishes })
      });

      if (response.ok) {
        await loadData();
        closeModal();
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
        body: JSON.stringify({ dishes: selectedDishes })
      });

      if (response.ok) {
        await loadData();
        closeModal();
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
      const response = await fetch(`${API_BASE}/orders/${orderId}`, { method: 'DELETE' });
      if (response.ok) await loadData();
      else alert('Errore nell\'eliminazione dell\'ordine');
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

  const closeModal = () => {
    setShowNewOrder(false);
    setEditingOrder(null);
    setSelectedTable('');
    setSelectedDishes([]);
  };

  const calculateSelectionTotal = () => {
    return selectedDishes.reduce((sum, item) => {
      const dish = getDishInfo(item.id);
      return sum + (dish ? dish.prezzo * item.qty : 0);
    }, 0);
  };

  if (loading) return <Loading />;

  const modalTitle = editingOrder ? 'Modifica Ordine' : 'Nuovo Ordine';
  const modalFooter = (
    <div className="flex gap-3">
      <Button variant="secondary" onClick={closeModal} className="flex-1">
        Annulla
      </Button>
      <Button
        variant="primary"
        onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}
        icon={Check}
        className="flex-1"
      >
        {editingOrder ? 'Salva Modifiche' : 'Crea Ordine'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-white to-orange-50 border-2 border-orange-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
                <ShoppingCart className="text-orange-500" size={42} />
                Gestionale Ordini
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Sistema di gestione ordini ristorante</p>
              <div className="flex gap-3 mt-3">
                <Badge variant="info">{orders.length} ordini attivi</Badge>
                <Badge variant="success">{tables.length} tavoli disponibili</Badge>
              </div>
            </div>
            <Button variant="primary" onClick={() => setShowNewOrder(true)} icon={Plus}>
              Nuovo Ordine
            </Button>
          </div>
        </Card>

        {/* Orders Grid */}
        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onEdit={() => startEditOrder(order)}
                onDelete={() => handleDeleteOrder(order.id)}
                getDishInfo={getDishInfo}
                getTableName={getTableName}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={showNewOrder || !!editingOrder}
          onClose={closeModal}
          title={modalTitle}
          footer={modalFooter}
        >
          <OrderModalContent
            isNewOrder={showNewOrder}
            editingOrder={editingOrder}
            tables={tables}
            dishes={dishes}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            selectedDishes={selectedDishes}
            addDishToSelection={addDishToSelection}
            updateDishQuantity={updateDishQuantity}
            calculateSelectionTotal={calculateSelectionTotal}
            getDishInfo={getDishInfo}
            getTableName={getTableName}
          />
        </Modal>
      </div>
    </div>
  );
}