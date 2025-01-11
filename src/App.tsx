import React from 'react';
import { Dashboard } from './components/Dashboard';
import { AppointmentRequest } from './types';

// Mock user data
const currentUser = {
  name: 'Dr Julie Samama',
  role: 'veterinarian' as const,
  specialty: 'Vétérinaire Équin'
};

// Mock appointments data
const mockAppointments: AppointmentRequest[] = [
  {
    id: '1',
    clientName: 'Jean Dupont',
    horseName: 'Spirit',
    stableAddress: '123 Rue des Écuries, 75001 Paris',
    consultationReason: 'Examen annuel',
    preferredDateTime: '2024-03-20T14:00:00',
    email: 'jean.dupont@email.com',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00'
  },
  {
    id: '2',
    clientName: 'Marie Martin',
    horseName: 'Luna',
    stableAddress: '456 Avenue des Chevaux, 75002 Paris',
    consultationReason: 'Boiterie',
    status: 'pending',
    createdAt: '2024-03-16T09:15:00'
  },
  {
    id: '3',
    clientName: 'Pierre Dubois',
    horseName: 'Éclair',
    stableAddress: '789 Boulevard Équestre, 75003 Paris',
    consultationReason: 'Vaccination',
    preferredDateTime: '2024-03-20T10:00:00',
    email: 'pierre.dubois@email.com',
    status: 'scheduled',
    createdAt: '2024-03-14T11:00:00'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Dashboard
          appointments={mockAppointments}
          selectedAppointment={null}
          currentUser={currentUser}
        />
      </main>
    </div>
  );
}

export default App;