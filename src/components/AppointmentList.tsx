import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { AppointmentRequest, SortConfig } from '../types';

interface AppointmentListProps {
  appointments: AppointmentRequest[];
  onViewDetails: (appointment: AppointmentRequest) => void;
}

export function AppointmentList({ appointments, onViewDetails }: AppointmentListProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'createdAt', 
    direction: 'desc' 
  });
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredAppointments = sortedAppointments.filter(appointment => 
    appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.consultationReason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: keyof AppointmentRequest) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par client, cheval ou motif..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('clientName')}>
                <div className="flex items-center">
                  Client
                  {sortConfig.key === 'clientName' && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('horseName')}>
                <div className="flex items-center">
                  Cheval
                  {sortConfig.key === 'horseName' && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left">Motif</th>
              <th className="px-6 py-3 text-left">Statut</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr 
                key={appointment.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{appointment.clientName}</td>
                <td className="px-6 py-4">{appointment.horseName}</td>
                <td className="px-6 py-4">{appointment.consultationReason}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    appointment.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {appointment.status === 'pending' ? 'En attente' : 'Planifié'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onViewDetails(appointment)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end gap-2"
                  >
                    <Calendar size={16} />
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}