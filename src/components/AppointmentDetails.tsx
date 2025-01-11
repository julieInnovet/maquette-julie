import React from 'react';
import { MapPin, Calendar, Mail, X } from 'lucide-react';
import { AppointmentRequest } from '../types';

interface AppointmentDetailsProps {
  appointment: AppointmentRequest;
  onClose: () => void;
  onSchedule: (appointment: AppointmentRequest) => void;
  onSendEmail: (appointment: AppointmentRequest) => void;
}

export function AppointmentDetails({ 
  appointment, 
  onClose,
  onSchedule,
  onSendEmail
}: AppointmentDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Détails de la demande</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <p className="mt-1 text-lg">{appointment.clientName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cheval</label>
              <p className="mt-1 text-lg">{appointment.horseName}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse de l'écurie</label>
            <div className="mt-1 flex items-start gap-2">
              <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={20} />
              <p className="text-lg">{appointment.stableAddress}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motif de consultation</label>
            <p className="mt-1 text-lg">{appointment.consultationReason}</p>
          </div>

          {appointment.preferredDateTime && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Date/Heure souhaitées</label>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="text-gray-400" size={20} />
                <p className="text-lg">{new Date(appointment.preferredDateTime).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end gap-4">
          <button
            onClick={() => onSendEmail(appointment)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Mail size={20} />
            Envoyer un email
          </button>
          <button
            onClick={() => onSchedule(appointment)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Calendar size={20} />
            Planifier dans Outlook
          </button>
        </div>
      </div>
    </div>
  );
}