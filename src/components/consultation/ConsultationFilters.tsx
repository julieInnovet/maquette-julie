import React from 'react';
import { X } from 'lucide-react';

interface ConsultationFiltersProps {
  onClose: () => void;
}

export function ConsultationFilters({ onClose }: ConsultationFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-900">Filtres</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <div className="space-y-2">
            {['À venir', 'En cours', 'Terminé', 'À facturer', 'Urgence'].map((status) => (
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

        {/* Type de consultation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de consultation
          </label>
          <div className="space-y-2">
            {['Routine', 'Urgence', 'Chirurgie', 'Vaccination', 'Suivi'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                />
                <label
                  htmlFor={`type-${type}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Période */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Période
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent">
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="custom">Personnalisé</option>
          </select>
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