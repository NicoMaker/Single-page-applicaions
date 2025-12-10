import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import Card from './Card';

const EmptyState = () => (
  <Card className="text-center py-16">
    <UtensilsCrossed className="mx-auto text-gray-300 mb-4" size={64} />
    <h3 className="text-2xl font-bold text-gray-600 mb-2">Nessun ordine attivo</h3>
    <p className="text-gray-500">Crea il primo ordine per iniziare!</p>
  </Card>
);

export default EmptyState;