import React from 'react';
import { ChevronRight, Calendar, Phone, Mail } from 'lucide-react';
import { Client } from '../../types/client';

interface ClientListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  selectedClient: Client | null;
}

export function ClientList({ clients, onSelectClient, selectedClient }: ClientListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Liste des clients</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {clients.map((client) => (
          <button
            key={client.id}
            onClick={() => onSelectClient(client)}
            className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
              selectedClient?.id === client.id ? 'bg-turquoise-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {client.firstName} {client.lastName}
                  </h3>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(client.lastAppointment).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={16} />
                    {client.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={16} />
                    {client.email}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-navy-100 text-navy-600 rounded-full text-xs">
                    {client.animals.length} animaux
                  </span>
                  <span className="px-2 py-1 bg-turquoise-100 text-turquoise-600 rounded-full text-xs">
                    {client.stats.totalVisits} visites
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