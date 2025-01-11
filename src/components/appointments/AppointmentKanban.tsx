import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = [
  { id: 'completed', title: 'Complété', color: 'bg-yellow-50' },
  { id: 'corrected', title: 'Corrigé', color: 'bg-[#e6f4f7]' }, // Bleu clair avec nuance turquoise
  { id: 'sent', title: 'Envoyé', color: 'bg-[#e6f7f4]' }, // Vert turquoise clair
];

// Mock data pour la démonstration
const mockAppointments = {
  corrected: [
    {
      id: '1',
      client: 'Jean Dupont',
      patient: 'Spirit',
      type: 'Examen annuel',
      date: '2024-03-20',
      time: '14:00'
    }
  ],
  sent: [
    {
      id: '2',
      client: 'Marie Martin',
      patient: 'Luna',
      type: 'Contrôle',
      date: '2024-03-20',
      time: '15:30'
    }
  ],
  completed: []
};

export function AppointmentKanban() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-300px)]">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} rounded-lg p-4 flex flex-col`}
          >
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center justify-between">
              {column.title}
              <span className="bg-white px-2 py-1 rounded text-sm">
                {mockAppointments[column.id]?.length || 0}
              </span>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3">
              {mockAppointments[column.id]?.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{appointment.client}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      column.id === 'completed' ? 'bg-yellow-100 text-yellow-800' :
                      column.id === 'corrected' ? 'bg-[#cce9ef] text-[#2b7385]' :
                      'bg-[#cceee7] text-[#2b856f]'
                    }`}>
                      {column.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{appointment.patient} - {appointment.type}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {appointment.time}
                    <Calendar size={14} className="ml-2 mr-1" />
                    {appointment.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}