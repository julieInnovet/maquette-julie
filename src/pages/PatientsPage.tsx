import React, { useState } from 'react';
import { Search, Filter, Plus, Brain, Stethoscope } from 'lucide-react';
import { PatientList } from '../components/patients/PatientList';
import { PatientDetails } from '../components/patients/PatientDetails';
import { PatientFilters } from '../components/patients/PatientFilters';
import { PatientStats } from '../components/patients/PatientStats';
import { Patient } from '../types/patient';

// Mock data pour la démonstration
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Spirit',
    species: 'Cheval',
    breed: 'Pur-sang arabe',
    gender: 'male',
    birthDate: new Date('2019-05-15'),
    weight: 450,
    transponderNumber: '250268501234567',
    status: 'active',
    careStatus: 'up_to_date',
    detentionAddress: {
      street: '123 Rue des Écuries',
      city: 'Paris',
      postalCode: '75001'
    },
    owner: {
      id: '1',
      name: 'Jean Dupont',
      phone: '0123456789',
      email: 'jean.dupont@email.com'
    },
    medicalInfo: {
      allergies: ['Pénicilline'],
      chronicConditions: [],
      meatExclusion: true,
      meatExclusionHistory: [
        {
          date: new Date('2023-01-15'),
          reason: 'Demande du propriétaire',
          declaredBy: 'Dr. Martin'
        }
      ]
    },
    lastVisit: new Date('2024-02-15'),
    nextAppointment: new Date('2024-04-15')
  }
];

export function PatientsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Stethoscope className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Patients</h1>
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
                Nouveau patient
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un patient par nom, propriétaire ou numéro de transpondeur..."
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
              <PatientFilters onClose={() => setShowFilters(false)} />
            </aside>
          )}

          {/* Patient List and Details */}
          <div className={`${showFilters ? 'col-span-9' : 'col-span-12'} grid ${selectedPatient ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <section className="bg-white rounded-lg shadow-lg overflow-hidden">
              <PatientList
                patients={mockPatients}
                onSelectPatient={setSelectedPatient}
                selectedPatient={selectedPatient}
              />
            </section>

            {selectedPatient && (
              <section className="bg-white rounded-lg shadow-lg overflow-hidden">
                <PatientDetails patient={selectedPatient} />
              </section>
            )}
          </div>
        </div>

        {/* Statistics */}
        <section className="mt-6">
          <PatientStats />
        </section>
      </main>
    </div>
  );
}