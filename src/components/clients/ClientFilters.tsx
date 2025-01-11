import React from 'react';
import { X, Search } from 'lucide-react';

interface ClientFiltersProps {
  onClose: () => void;
}

export function ClientFilters({ onClose }: ClientFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-900">Filtres</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            placeholder="Filtrer par ville..."
          />
        </div>

        {/* Nombre d'animaux */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre d'animaux
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent">
            <option value="">Tous</option>
            <option value="1">1 animal</option>
            <option value="2-3">2-3 animaux</option>
            <option value="4+">4 animaux ou plus</option>
          </select>
        </div>

        {/* Dernier RDV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dernier rendez-vous
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent">
            <option value="">Tous</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <div className="space-y-2">
            {['Actif', 'Inactif', 'En attente'].map((status) => (
              <div key={status} className="flex items-center">
                <input
                  type="checkbox"
                  id={`status-${status}`}
                  className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                />
                <label
                  htmlFor={`status-${status}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t flex justify-end space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
            Réinitialiser
          </button>
          <button className="px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
}