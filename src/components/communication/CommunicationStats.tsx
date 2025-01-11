import React from 'react';
import { MessageCircle, Clock, TrendingUp, Users } from 'lucide-react';

export function CommunicationStats() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistiques de communication</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-navy-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy-600">Messages non lus</p>
              <p className="text-2xl font-semibold text-navy-700">12</p>
            </div>
            <div className="p-3 bg-navy-100 rounded-full">
              <MessageCircle className="w-6 h-6 text-navy-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-navy-600">
            +3 aujourd'hui
          </div>
        </div>

        <div className="bg-turquoise-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-turquoise-600">Temps de réponse moyen</p>
              <p className="text-2xl font-semibold text-turquoise-700">2.5h</p>
            </div>
            <div className="p-3 bg-turquoise-100 rounded-full">
              <Clock className="w-6 h-6 text-turquoise-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-turquoise-600">
            -30min vs hier
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Taux de résolution</p>
              <p className="text-2xl font-semibold text-green-700">94%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +2% cette semaine
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Clients actifs</p>
              <p className="text-2xl font-semibold text-purple-700">156</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-purple-600">
            +8 cette semaine
          </div>
        </div>
      </div>
    </div>
  );
}