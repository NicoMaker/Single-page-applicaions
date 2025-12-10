import React from 'react';
import { Edit2, Trash2, Clock, UtensilsCrossed } from 'lucide-react';
import Card from '../Card';

const OrderCard = ({ order, onEdit, onDelete, getDishInfo, getTableName }) => {
  const calculateTotal = () => {
    return order.dishes?.reduce((total, item) => {
      const dish = getDishInfo(item.id);
      return total + (dish ? dish.prezzo * item.qty : 0);
    }, 0) || 0;
  };

  return (
    <Card hover className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 opacity-10 rounded-full -mr-16 -mt-16" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{getTableName(order.tableId)}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Clock size={14} />
            ID: {order.id.slice(0, 8)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all hover:scale-110"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={onDelete}
            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.dishes?.map((item, idx) => {
          const dish = getDishInfo(item.id);
          return dish ? (
            <div key={idx} className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {item.qty}
                </span>
                <span className="text-gray-700 font-medium">{dish.nome}</span>
              </div>
              <span className="font-bold text-gray-900">
                €{(dish.prezzo * item.qty).toFixed(2)}
              </span>
            </div>
          ) : null;
        })}
      </div>

      <div className="mt-6 pt-4 border-t-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Totale:</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            €{calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;