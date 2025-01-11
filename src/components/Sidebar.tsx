import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
}

interface User {
  name: string;
  specialty: string;
}

interface SidebarProps {
  user: User;
}

const navigation: NavItem[] = [
  { name: 'Accueil / Tableau de bord', path: '/' },
  { name: 'Rendez-vous', path: '/appointments' },
  { name: 'Clients', path: '/clients' },
  { name: 'Patients', path: '/patients' },
  { name: 'Consultations', path: '/consultations' },
  { name: 'Assistant IA multi-agents', path: '/ai-assistant' },
  { name: 'Communication client', path: '/client-communication' },
  { name: 'Suivi de factures', path: '/billing' },
  { name: 'Gestion financière', path: '/finance' },
  { name: 'Gestion des stocks', path: '/inventory' },
  { name: 'Gestion du matériel', path: '/equipment' },
];

export function Sidebar({ user }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="w-64 h-screen bg-[#1b2e4d] fixed left-0 top-0">
      <div className="h-24 flex flex-col items-center justify-center border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">{user.name}</h2>
        <p className="text-sm text-gray-300">{user.specialty}</p>
      </div>
      <div className="py-4 overflow-y-auto h-[calc(100vh-6rem)]">
        {navigation.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`w-full text-left px-6 py-3 transition-colors duration-150
              ${
                location.pathname === item.path
                  ? 'bg-[#61beae] text-white border-r-4 border-[#61beae]'
                  : 'text-gray-300 hover:bg-[#61beae] hover:text-white'
              }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}