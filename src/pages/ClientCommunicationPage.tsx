import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Search, Filter, Brain } from 'lucide-react';
import { CommunicationList } from '../components/communication/CommunicationList';
import { CommunicationDetails } from '../components/communication/CommunicationDetails';
import { CommunicationFilters } from '../components/communication/CommunicationFilters';
import { CommunicationStats } from '../components/communication/CommunicationStats';
import { CommunicationType } from '../types/communication';

export function ClientCommunicationPage() {
  const [activeTab, setActiveTab] = useState<CommunicationType>('email');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunication, setSelectedCommunication] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <MessageCircle className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Communication client</h1>
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
                <Brain size={20} />
                Assistant IA
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher dans les communications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Communication Tabs */}
          <div className="flex gap-4 mt-4">
            {[
              { type: 'email', label: 'E-mails', icon: Mail },
              { type: 'phone', label: 'Téléphone', icon: Phone },
              { type: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
              { type: 'secure_message', label: 'Messages sécurisés', icon: MessageCircle },
            ].map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setActiveTab(type as CommunicationType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === type
                    ? 'bg-navy-50 text-navy-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters Panel */}
          {showFilters && (
            <aside className="col-span-3">
              <CommunicationFilters onClose={() => setShowFilters(false)} />
            </aside>
          )}

          {/* Communication List and Details */}
          <div className={`${showFilters ? 'col-span-9' : 'col-span-12'} grid ${selectedCommunication ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <section className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CommunicationList
                type={activeTab}
                onSelect={setSelectedCommunication}
                selectedId={selectedCommunication?.id}
              />
            </section>

            {selectedCommunication && (
              <section className="bg-white rounded-lg shadow-lg overflow-hidden">
                <CommunicationDetails communication={selectedCommunication} />
              </section>
            )}
          </div>
        </div>

        {/* Statistics */}
        <section className="mt-6">
          <CommunicationStats />
        </section>
      </main>
    </div>
  );
}