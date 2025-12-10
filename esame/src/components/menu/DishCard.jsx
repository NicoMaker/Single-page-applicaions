import React from 'react';
import Badge from '../Badge';

const DishCard = ({ dish, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group p-5 border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 transition-all duration-300 text-left w-full hover:scale-105 hover:shadow-lg"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-orange-600 transition-colors">
            {dish.nome}
          </h4>
          <p className="text-sm text-gray-600 mb-2">{dish.categoria}</p>
          {dish.vegetariano && (
            <Badge variant="success">🌱 Vegetariano</Badge>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-orange-600">€{dish.prezzo.toFixed(2)}</span>
        </div>
      </div>
      {dish.descrizione && (
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{dish.descrizione}</p>
      )}
    </button>
  );
};

export default DishCard;