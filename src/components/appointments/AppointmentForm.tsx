import React, { useState } from 'react';
import { X, Calendar, Clock, AlertCircle } from 'lucide-react';

interface AppointmentFormData {
  clientId: string;
  animalId: string;
  reason: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
}

interface AppointmentFormProps {
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => void;
}

// Mock data pour la démonstration
const mockClients = [
  { id: '1', name: 'Jean Dupont' },
  { id: '2', name: 'Marie Martin' }
];

const mockAnimals = {
  '1': [{ id: '1', name: 'Spirit' }],
  '2': [{ id: '2', name: 'Luna' }]
};

const consultationReasons = [
  'Vaccination',
  'Urgence',
  'Contrôle',
  'Chirurgie',
  'Suivi post-opératoire',
  'Dentisterie',
  'Examen annuel'
];

export function AppointmentForm({ onClose, onSubmit }: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    clientId: '',
    animalId: '',
    reason: '',
    date: '',
    time: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AppointmentFormData, string>> = {};

    if (!formData.clientId) newErrors.clientId = 'Veuillez sélectionner un client';
    if (!formData.animalId) newErrors.animalId = 'Veuillez sélectionner un animal';
    if (!formData.reason) newErrors.reason = 'Veuillez sélectionner un motif';
    if (!formData.date) newErrors.date = 'Veuillez sélectionner une date';
    if (!formData.time) newErrors.time = 'Veuillez sélectionner une heure';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Nouveau rendez-vous</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client
            </label>
            <select
              value={formData.clientId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  clientId: e.target.value,
                  animalId: '' // Reset animal when client changes
                });
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent ${
                errors.clientId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionner un client</option>
              {mockClients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            {errors.clientId && (
              <p className="mt-1 text-sm text-red-600">{errors.clientId}</p>
            )}
          </div>

          {/* Animal Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animal
            </label>
            <select
              value={formData.animalId}
              onChange={(e) => setFormData({ ...formData, animalId: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent ${
                errors.animalId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={!formData.clientId}
            >
              <option value="">Sélectionner un animal</option>
              {formData.clientId && mockAnimals[formData.clientId]?.map(animal => (
                <option key={animal.id} value={animal.id}>{animal.name}</option>
              ))}
            </select>
            {errors.animalId && (
              <p className="mt-1 text-sm text-red-600">{errors.animalId}</p>
            )}
          </div>

          {/* Consultation Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motif de consultation
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionner un motif</option>
              {consultationReasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heure
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="08:00"
                  max="19:00"
                  step="1800"
                />
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
              placeholder="Notes ou instructions particulières..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}