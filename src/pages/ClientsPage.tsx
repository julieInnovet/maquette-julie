import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Brain, ChevronRight } from 'lucide-react';
import { ClientList } from '../components/clients/ClientList';
import { ClientDetails } from '../components/clients/ClientDetails';
import { ClientFilters } from '../components/clients/ClientFilters';
import { ClientStats } from '../components/clients/ClientStats';
import { Client } from '../types/client';

// Mock data pour la démonstration
const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '0123456789',
    address: {
      street: '123 Rue des Écuries',
      city: 'Paris',
      postalCode: '75001'
    },
    animals: [],
    lastInteraction: new Date(),
    lastAppointment: new Date(),
    communicationPreferences: {
      email: true,
      sms: true,
      phone: false
    },
    consents: {
      marketing: true,
      dataProcessing: true,
      photos: false
    },
    notes: [],
    stats: {
      totalVisits: 12,
      canceledAppointments: 1,
      totalSpent: 1500
    }
  }
];

export function ClientsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Clients</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-navy-600 transition-colors"
              >
                <Filter size={20} />
                Filtres
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600 transition-colors">
                <Plus size={20} />
                Nouveau client
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un client par nom, email ou téléphone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors">
              <Brain size={20} />
              Assistant IA
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters Panel */}
          {showFilters && (
            <aside className="col-span-3">
              <ClientFilters onClose={() => setShowFilters(false)} />
            </aside>
          )}

          {/* Client List and Details */}
          <div className={`${showFilters ? 'col-span-9' : 'col-span-12'} grid ${selectedClient ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <section className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ClientList
                clients={mockClients}
                onSelectClient={setSelectedClient}
                selectedClient={selectedClient}
              />
            </section>

            {selectedClient && (
              <section className="bg-white rounded-lg shadow-lg overflow-hidden">
                <ClientDetails client={selectedClient} />
              </section>
            )}
          </div>
        </div>

        {/* Statistics */}
        <section className="mt-6">
          <ClientStats />
        </section>
      </main>
    </div>
  );
}