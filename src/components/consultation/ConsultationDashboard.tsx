import React from 'react';
import { Calendar, Clock, FileText, AlertCircle } from 'lucide-react';

interface ConsultationDashboardProps {
  onSelectConsultation: (consultation: any) => void;
  selectedConsultation: any;
}

export function ConsultationDashboard({ onSelectConsultation, selectedConsultation }: ConsultationDashboardProps) {
  // Mock data for demonstration
  const consultations = [
    {
      id: '1',
      patient: 'Spirit',
      owner: 'Jean Dupont',
      type: 'Examen annuel',
      status: 'pending',
      time: '14:00',
      date: '2024-03-20',
      priority: 'normal'
    },
    {
      id: '2',
      patient: 'Luna',
      owner: 'Marie Martin',
      type: 'Urgence - Boiterie',
      status: 'in_progress',
      time: '14:30',
      date: '2024-03-20',
      priority: 'urgent'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Liste des consultations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {consultations.map((consultation) => (
          <button
            key={consultation.id}
            onClick={() => onSelectConsultation(consultation)}
            className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
              selectedConsultation?.id === consultation.id ? 'bg-turquoise-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {consultation.patient} - {consultation.owner}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    consultation.priority === 'urgent' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {consultation.priority === 'urgent' ? 'Urgent' : 'Normal'}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {consultation.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {consultation.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={16} />
                    {consultation.type}
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    consultation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : consultation.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {consultation.status === 'pending' ? 'À venir' :
                     consultation.status === 'in_progress' ? 'En cours' : 'Terminé'}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}