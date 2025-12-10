import React from 'react';
import { ChefHat } from 'lucide-react';

const Loading = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <ChefHat className="text-orange-500 animate-bounce" size={64} />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-ping" />
      </div>
      <p className="text-2xl text-gray-700 font-semibold mt-4">Caricamento in corso...</p>
    </div>
  </div>
);

export default Loading;