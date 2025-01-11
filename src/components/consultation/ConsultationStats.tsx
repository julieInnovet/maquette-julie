import React from 'react';
import { Users, Clock, TrendingUp, Brain } from 'lucide-react';

export function ConsultationStats() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Statistiques des consultations</h3>
        <button className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-700">
          <Brain size={16} />
          Analyse IA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-navy-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy-600">Consultations aujourd'hui</p>
              <p className="text-2xl font-semibold text-navy-700">24</p>
            </div>
            <div className="p-3 bg-navy-100 rounded-full">
              <Users className="w-6 h-6 text-navy-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-navy-600">
            +3 vs hier
          </div>
        </div>

        <div className="bg-turquoise-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-turquoise-600">Temps moyen/consultation</p>
              <p className="text-2xl font-semibold text-turquoise-700">28min</p>
            </div>
            <div className="p-3 bg-turquoise-100 rounded-full">
              <Clock className="w-6 h-6 text-turquoise-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-turquoise-600">
            -5min vs moyenne
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Taux de satisfaction</p>
              <p className="text-2xl font-semibold text-green-700">96%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +2% ce mois
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">CA moyen/consultation</p>
              <p className="text-2xl font-semibold text-purple-700">125€</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-purple-600">
            +8% vs mois dernier
          </div>
        </div>
      </div>
    </div>
  );
}