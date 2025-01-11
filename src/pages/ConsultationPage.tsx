import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Filter, 
  Plus, 
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { ConsultationDashboard } from '../components/consultation/ConsultationDashboard';
import { ConsultationDetails } from '../components/consultation/ConsultationDetails';
import { ConsultationFilters } from '../components/consultation/ConsultationFilters';
import { ConsultationStats } from '../components/consultation/ConsultationStats';

export function ConsultationPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Stethoscope className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Consultations</h1>
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
                Nouvelle consultation
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par patient, propriétaire ou type de consultation..."
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

          {/* Status Tabs */}
          <div className="flex gap-4 mt-4">
            {[
              { icon: Clock, label: 'À venir', count: 5, color: 'text-yellow-600 bg-yellow-50' },
              { icon: Stethoscope, label: 'En cours', count: 3, color: 'text-blue-600 bg-blue-50' },
              { icon: CheckCircle, label: 'Terminé', count: 12, color: 'text-green-600 bg-green-50' },
              { icon: DollarSign, label: 'À facturer', count: 4, color: 'text-purple-600 bg-purple-50' },
              { icon: AlertCircle, label: 'Urgences', count: 1, color: 'text-red-600 bg-red-50' }
            ].map(({ icon: Icon, label, count, color }) => (
              <button
                key={label}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${color} transition-colors`}
              >
                <Icon size={20} />
                <span>{label}</span>
                <span className="ml-2 px-2 py-0.5 bg-white rounded-full text-sm">
                  {count}
                </span>
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
              <ConsultationFilters onClose={() => setShowFilters(false)} />
            </aside>
          )}

          {/* Consultation List and Details */}
          <div className={`${showFilters ? 'col-span-9' : 'col-span-12'} grid ${selectedConsultation ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <section className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ConsultationDashboard
                onSelectConsultation={setSelectedConsultation}
                selectedConsultation={selectedConsultation}
              />
            </section>

            {selectedConsultation && (
              <section className="bg-white rounded-lg shadow-lg overflow-hidden">
                <ConsultationDetails consultation={selectedConsultation} />
              </section>
            )}
          </div>
        </div>

        {/* Statistics */}
        <section className="mt-6">
          <ConsultationStats />
        </section>
      </main>
    </div>
  );
}