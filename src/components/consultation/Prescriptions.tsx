import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, AlertCircle, FileText, Send } from 'lucide-react';

interface PrescriptionsProps {
  consultation: any;
}

export function Prescriptions({ consultation }: PrescriptionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const prescriptions = [
    {
      id: '1',
      medication: 'Phenylarthrite',
      dosage: '1 comprimé',
      frequency: '2 fois par jour',
      duration: '7 jours',
      warnings: ['Ne pas administrer à jeun'],
      status: 'active'
    },
    {
      id: '2',
      medication: 'Métacam',
      dosage: '20ml',
      frequency: '1 fois par jour',
      duration: '5 jours',
      warnings: ['Surveillance rénale conseillée'],
      status: 'active'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Prescriptions</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-600 rounded-lg hover:bg-navy-100">
            <FileText size={20} />
            Modèles
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
            <Plus size={20} />
            Nouvelle prescription
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un médicament..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
                  <Edit2 size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Posologie : {prescription.dosage}, {prescription.frequency}
              </p>
              <p className="text-sm text-gray-600">
                Durée : {prescription.duration}
              </p>
              {prescription.warnings.map((warning, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg">
                  <AlertCircle size={16} />
                  {warning}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button className="flex items-center gap-2 px-6 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
          <Send size={20} />
          Générer l'ordonnance
        </button>
      </div>
    </div>
  );
}