import React from 'react';
import { UtensilsCrossed, ShoppingCart, ChefHat } from 'lucide-react';

import DishCard from '../menu/DishCard';
import SelectedDishItem from './SelectedDishItem';

const OrderModalContent = ({
  isNewOrder,
  editingOrder,
  tables,
  dishes,
  selectedTable,
  setSelectedTable,
  selectedDishes,
  addDishToSelection,
  updateDishQuantity,
  calculateSelectionTotal,
  getDishInfo,
  getTableName,
}) => {
  return (
    <div className="p-6">
      {/* Table Selection - Solo per Nuovo Ordine */}
      {isNewOrder && (
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <UtensilsCrossed size={18} />
            Seleziona Tavolo
          </label>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-medium bg-white"
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

      {/* Table Info - Solo per Modifica Ordine */}
      {editingOrder && (
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
          <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <UtensilsCrossed size={16} />
            Tavolo: <span className="text-orange-600 text-lg">{getTableName(editingOrder.tableId)}</span>
          </p>
        </div>
      )}

      {/* Selected Dishes */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ShoppingCart size={20} />
          Piatti Selezionati ({selectedDishes.length})
        </h3>
        {selectedDishes.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-500">Nessun piatto selezionato</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDishes.map(item => (
              <SelectedDishItem
                key={item.id}
                item={item}
                dish={getDishInfo(item.id)}
                onQuantityChange={updateDishQuantity}
              />
            ))}
            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-2 border-orange-300 mt-4">
              <span className="text-xl font-bold text-gray-800">Totale:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                €{calculateSelectionTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ChefHat size={20} />
          Menu Disponibile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dishes.map(dish => (
            <DishCard
              key={dish.id}
              dish={dish}
              onClick={() => addDishToSelection(dish.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderModalContent;