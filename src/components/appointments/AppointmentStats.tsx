import React from 'react';
import { TrendingUp, TrendingDown, Users, Clock, Ban, DollarSign } from 'lucide-react';

export function AppointmentStats() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-navy-600 mb-4">Statistiques</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Taux d'occupation */}
        <div className="bg-navy-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy-600">Taux d'occupation</p>
              <p className="text-2xl font-semibold text-navy-700">85%</p>
            </div>
            <div className="p-3 bg-navy-100 rounded-full">
              <Clock className="w-6 h-6 text-navy-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+5%</span>
            <span className="text-gray-600 ml-2">vs mois dernier</span>
          </div>
        </div>

        {/* Patients vus */}
        <div className="bg-turquoise-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-turquoise-600">Patients vus</p>
              <p className="text-2xl font-semibold text-turquoise-700">124</p>
            </div>
            <div className="p-3 bg-turquoise-100 rounded-full">
              <Users className="w-6 h-6 text-turquoise-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-600 ml-2">ce mois</span>
          </div>
        </div>

        {/* Taux d'annulation */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Taux d'annulation</p>
              <p className="text-2xl font-semibold text-red-700">3.2%</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Ban className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">-1.5%</span>
            <span className="text-gray-600 ml-2">vs mois dernier</span>
          </div>
        </div>

        {/* Chiffre d'affaires */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">CA du mois</p>
              <p className="text-2xl font-semibold text-green-700">15 800€</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8%</span>
            <span className="text-gray-600 ml-2">vs mois dernier</span>
          </div>
        </div>
      </div>
    </div>
  );
}