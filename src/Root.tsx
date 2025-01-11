import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ClientsPage } from './pages/ClientsPage';
import { PatientsPage } from './pages/PatientsPage';
import { ClientCommunicationPage } from './pages/ClientCommunicationPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { AssistantsIA } from './pages/AssistantsIA';
import { BillingPage } from './pages/BillingPage';
import { FinancialManagementPage } from './pages/FinancialManagementPage';
import { StockManagementPage } from './pages/StockManagementPage';
import { EquipmentManagementPage } from './pages/EquipmentManagementPage';
import { Sidebar } from './components/Sidebar';

// Mock user data
const user = {
  name: 'Dr Julie Samama',
  specialty: 'Vétérinaire Équin'
};

const clinicName = 'SELARL Julie SAMAMA';

function Root() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar user={user} />
        <div className="flex-1 pl-64">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-[#1b2e4d]">
                {clinicName || 'Cabinet Vétérinaire'}
              </h1>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/client-communication" element={<ClientCommunicationPage />} />
            <Route path="/consultations" element={<ConsultationPage />} />
            <Route path="/ai-assistant" element={<AssistantsIA />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/finance" element={<FinancialManagementPage />} />
            <Route path="/inventory" element={<StockManagementPage />} />
            <Route path="/equipment" element={<EquipmentManagementPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Root;