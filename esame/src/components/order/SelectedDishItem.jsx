import React from 'react';

const SelectedDishItem = ({ item, dish, onQuantityChange }) => {
  if (!dish) return null;
  
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{dish.nome}</h4>
        <p className="text-sm text-gray-600">€{dish.prezzo.toFixed(2)} cad.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(item.id, item.qty - 1)}
            className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-bold transition-colors"
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={item.qty}
            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 0)}
            className="w-16 p-2 border-2 border-gray-300 rounded-lg text-center font-semibold focus:border-orange-500 focus:outline-none"
          />
          <button
            onClick={() => onQuantityChange(item.id, item.qty + 1)}
            className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 font-bold transition-colors"
          >
            +
          </button>
        </div>
        <span className="font-bold text-gray-900 w-24 text-right">
          €{(dish.prezzo * item.qty).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default SelectedDishItem;