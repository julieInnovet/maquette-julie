import React from 'react';
import { MapPin, Route } from 'lucide-react';

export function AppointmentMap() {
  const handleOptimizeRoute = () => {
    // Logique d'optimisation de tournée à implémenter
    console.log('Optimisation de la tournée...');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Tournée du jour</h3>
        <button
          onClick={handleOptimizeRoute}
          className="flex items-center gap-2 px-4 py-2 bg-[#61beae] text-white rounded-lg hover:bg-[#4a9589] transition-colors"
        >
          <Route size={20} />
          Optimisation de tournée
        </button>
      </div>
      
      <div className="grid grid-cols-3 h-[calc(100vh-300px)]">
        {/* Liste des RDV */}
        <div className="border-r overflow-y-auto p-4 space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-[#e6f7f4] rounded-full flex items-center justify-center">
                <span className="text-[#61beae] font-medium">1</span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">09:00 - Jean Dupont</div>
              <div className="text-sm text-gray-600">Spirit - Examen annuel</div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <MapPin size={14} className="mr-1" />
                123 Rue des Écuries, Paris
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-[#e6f7f4] rounded-full flex items-center justify-center">
                <span className="text-[#61beae] font-medium">2</span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">10:30 - Marie Martin</div>
              <div className="text-sm text-gray-600">Luna - Contrôle</div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <MapPin size={14} className="mr-1" />
                456 Avenue des Chevaux, Paris
              </div>
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className="col-span-2 bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Carte en cours de chargement...</p>
          </div>
        </div>
      </div>
    </div>
  );
}