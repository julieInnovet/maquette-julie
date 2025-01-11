import React, { useState } from 'react';
import { 
  Calendar, 
  ClipboardList, 
  DollarSign, 
  FileText, 
  PlusCircle,
  Pill,
  Receipt,
  Calculator,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import { DashboardStats, QuickAction, AppointmentRequest } from '../types';
import { CalendarView } from './Calendar';

interface DashboardProps {
  appointments: AppointmentRequest[];
  selectedAppointment: AppointmentRequest | null;
  currentUser: {
    name: string;
    role: 'veterinarian';
    specialty: string;
  };
}

export function Dashboard({ appointments, selectedAppointment, currentUser }: DashboardProps) {
  const pendingAppointments = appointments.filter(app => app.status === 'pending');
  const scheduledAppointments = appointments.filter(app => app.status === 'scheduled');

  const stats: DashboardStats = {
    pendingAppointments: pendingAppointments.length,
    activePatients: 28,
    monthlyRevenue: 15800,
    monthlyExpenses: 4200,
    profitability: ((15800 - 4200) / 15800) * 100
  };

  const quickActions: QuickAction[] = [
    { id: '1', label: 'Nouvelle consultation', icon: 'PlusCircle', href: '/consultation/new' },
    { id: '2', label: 'Planifier RDV', icon: 'Calendar', href: '/appointments/new' },
    { id: '3', label: 'Créer ordonnance', icon: 'Pill', href: '/prescriptions/new' },
    { id: '4', label: 'Nouvelle délivrance', icon: 'ClipboardList', href: '/deliveries/new' },
    { id: '5', label: 'Encoder règlement', icon: 'DollarSign', href: '/payments/new' },
    { id: '6', label: 'Créer devis', icon: 'Calculator', href: '/quotes/new' },
    { id: '7', label: 'Créer facture', icon: 'Receipt', href: '/invoices/new' }
  ];

  const StatCard = ({ title, value, icon: Icon, suffix = '' }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {suffix === '€' ? `${value.toLocaleString()}${suffix}` : 
             suffix === '%' ? `${value.toFixed(1)}${suffix}` :
             value}
          </p>
        </div>
        <div className="p-3 bg-blue-100 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickActions.map(action => (
            <button
              key={action.id}
              className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              {action.icon === 'PlusCircle' && <PlusCircle className="w-6 h-6 text-blue-600 mb-2" />}
              {action.icon === 'Calendar' && <Calendar className="w-6 h-6 text-blue-600 mb-2" />}
              {action.icon === 'Pill' && <Pill className="w-6 h-6 text-blue-600 mb-2" />}
              {action.icon === 'ClipboardList' && <ClipboardList className="w-6 h-6 text-blue-600 mb-2" />}
              {action.icon === 'DollarSign' && <DollarSign className="w-6 h-6 text-blue-600 mb-2" />}
              {action.icon === 'Calculator' && <Calculator className="w-6 h-6 text-blue-600 mb-2" />}
              {action.icon === 'Receipt' && <Receipt className="w-6 h-6 text-blue-600 mb-2" />}
              <span className="text-sm text-gray-600 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          title="RDV en attente" 
          value={stats.pendingAppointments}
          icon={Calendar}
        />
        <StatCard 
          title="Patients actifs" 
          value={stats.activePatients}
          icon={Users}
        />
        <StatCard 
          title="Facturation du mois" 
          value={stats.monthlyRevenue}
          icon={DollarSign}
          suffix="€"
        />
        <StatCard 
          title="Dépenses du mois" 
          value={stats.monthlyExpenses}
          icon={TrendingUp}
          suffix="€"
        />
        <StatCard 
          title="Rentabilité" 
          value={stats.profitability}
          icon={Activity}
          suffix="%"
        />
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Tâches</h2>
          <button className="text-sm text-[#61beae] hover:text-[#4a9589]">
            + Nouvelle tâche
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="rounded border-gray-300 text-[#61beae] focus:ring-[#61beae]" />
              <span className="text-gray-700">Appeler le propriétaire de Spirit pour suivi post-consultation</span>
            </div>
            <span className="text-sm text-gray-500">Aujourd'hui</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="rounded border-gray-300 text-[#61beae] focus:ring-[#61beae]" />
              <span className="text-gray-700">Commander vaccins grippe équine</span>
            </div>
            <span className="text-sm text-gray-500">Demain</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="rounded border-gray-300 text-[#61beae] focus:ring-[#61beae]" />
              <span className="text-gray-700">Mettre à jour les dossiers médicaux</span>
            </div>
            <span className="text-sm text-gray-500">Cette semaine</span>
          </div>
        </div>
      </div>

      {/* Pending Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Salle d'attente</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Voir tout
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cheval
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date souhaitée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.horseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.consultationReason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.preferredDateTime ? 
                      new Date(appointment.preferredDateTime).toLocaleDateString() : 
                      'Non spécifié'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      En attente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-2">
                      <Calendar className="w-4 h-4" />
                      Planifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Agenda</h2>
        </div>
        <CalendarView
          appointments={appointments}
          onScheduleAppointment={() => {}}
          selectedAppointment={selectedAppointment}
        />
      </div>
    </div>
  );
}