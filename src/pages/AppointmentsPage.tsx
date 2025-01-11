import React, { useState } from 'react';
import { Calendar, KanbanSquare, GanttChart, Filter, Map, PlusCircle } from 'lucide-react';
import { AppointmentCalendar } from '../components/appointments/AppointmentCalendar';
import { AppointmentKanban } from '../components/appointments/AppointmentKanban';
import { AppointmentGantt } from '../components/appointments/AppointmentGantt';
import { AppointmentForm } from '../components/appointments/AppointmentForm';
import { AppointmentStats } from '../components/appointments/AppointmentStats';
import { AppointmentMap } from '../components/appointments/AppointmentMap';
import { AppointmentFilters } from '../components/appointments/AppointmentFilters';
import { ViewType } from '../types';

export function AppointmentsPage() {
  const [currentView, setCurrentView] = useState<ViewType>('calendar');
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleNewAppointment = (formData) => {
    // Ici, vous ajouteriez normalement l'appel à votre API pour sauvegarder le rendez-vous
    const newAppointment = {
      id: Date.now().toString(),
      clientName: formData.clientId, // Dans une vraie application, vous récupéreriez le nom du client
      horseName: formData.animalId, // Idem pour le nom de l'animal
      consultationReason: formData.reason,
      preferredDateTime: `${formData.date}T${formData.time}`,
      status: formData.status,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [...prev, newAppointment]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-navy-600">Rendez-vous</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-navy-600 transition-colors"
              >
                <Filter size={20} />
                Filtres
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600 transition-colors"
              >
                <PlusCircle size={20} />
                Nouveau RDV
              </button>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { label: 'Agenda', icon: <Calendar size={20} />, view: 'calendar' },
              { label: 'Kanban', icon: <KanbanSquare size={20} />, view: 'kanban' },
              { label: 'Gantt', icon: <GanttChart size={20} />, view: 'gantt' },
              { label: 'Carte', icon: <Map size={20} />, view: 'map' },
            ].map(({ label, icon, view }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view as ViewType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === view
                    ? 'bg-navy-50 text-navy-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Filter Panel */}
          {showFilters && (
            <aside className="col-span-3">
              <AppointmentFilters onClose={() => setShowFilters(false)} />
            </aside>
          )}

          {/* Main View Content */}
          <section className={`${showFilters ? 'col-span-9' : 'col-span-12'}`}>
            {currentView === 'calendar' && <AppointmentCalendar />}
            {currentView === 'kanban' && <AppointmentKanban />}
            {currentView === 'gantt' && <AppointmentGantt />}
            {currentView === 'map' && <AppointmentMap />}
          </section>
        </div>

        {/* Statistics */}
        <section className="mt-6">
          <AppointmentStats />
        </section>
      </main>

      {/* New Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
          onSubmit={handleNewAppointment}
        />
      )}
    </div>
  );
}