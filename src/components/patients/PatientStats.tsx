import React from 'react';
import { Activity, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export function PatientStats() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistiques patients</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-navy-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy-600">Patients actifs</p>
              <p className="text-2xl font-semibold text-navy-700">247</p>
            </div>
            <div className="p-3 bg-navy-100 rounded-full">
              <Activity className="w-6 h-6 text-navy-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-navy-600">
            +12 ce mois
          </div>
        </div>

        <div className="bg-turquoise-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-turquoise-600">Consultations ce mois</p>
              <p className="text-2xl font-semibold text-turquoise-700">156</p>
            </div>
            <div className="p-3 bg-turquoise-100 rounded-full">
              <Calendar className="w-6 h-6 text-turquoise-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-turquoise-600">
            +5% vs mois dernier
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Vaccinations à jour</p>
              <p className="text-2xl font-semibold text-green-700">92%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +2% ce trimestre
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Rappels en retard</p>
              <p className="text-2xl font-semibold text-red-700">18</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-red-600">
            -3 cette semaine
          </div>
        </div>
      </div>
    </div>
  );
}