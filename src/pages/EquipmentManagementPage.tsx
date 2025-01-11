import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Filter,
  Plus,
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  Settings,
  Scissors,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Printer,
  Stethoscope,
  Brain,
  BarChart2,
  Microscope,
  Syringe
} from 'lucide-react';

type EquipmentCategory = 'imaging' | 'surgical' | 'diagnostic' | 'monitoring';
type EquipmentStatus = 'available' | 'in_use' | 'maintenance' | 'defective';

interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  model: string;
  serialNumber: string;
  status: EquipmentStatus;
  lastUsed: Date;
  nextMaintenance: Date;
  location: string;
}

export function EquipmentManagementPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'all'>('all');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);

  // Mock data
  const stats = {
    totalEquipment: 45,
    availableEquipment: 32,
    maintenanceNeeded: 8,
    utilizationRate: 78
  };

  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Échographe portable',
      category: 'imaging',
      model: 'EchoVet Pro',
      serialNumber: 'EV2024001',
      status: 'available',
      lastUsed: new Date('2024-03-19'),
      nextMaintenance: new Date('2024-04-15'),
      location: 'Salle d\'examen 1'
    },
    {
      id: '2',
      name: 'Kit chirurgical',
      category: 'surgical',
      model: 'SurgKit Premium',
      serialNumber: 'SK2024002',
      status: 'in_use',
      lastUsed: new Date('2024-03-20'),
      nextMaintenance: new Date('2024-05-01'),
      location: 'Bloc opératoire'
    }
  ];

  const getCategoryIcon = (category: EquipmentCategory) => {
    switch (category) {
      case 'imaging':
        return Microscope;
      case 'surgical':
        return Scissors;
      case 'diagnostic':
        return Stethoscope;
      case 'monitoring':
        return Settings;
    }
  };

  const getStatusColor = (status: EquipmentStatus) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'defective':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Wrench className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Gestion du matériel</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-navy-600 transition-colors"
              >
                <Filter size={20} />
                Filtres
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
                <Plus size={20} />
                Nouveau matériel
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total équipements</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalEquipment}</p>
                </div>
                <div className="p-3 bg-navy-50 rounded-full">
                  <Wrench className="w-6 h-6 text-navy-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Disponibles</p>
                  <p className="text-2xl font-semibold text-green-600">{stats.availableEquipment}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Maintenance requise</p>
                  <p className="text-2xl font-semibold text-yellow-600">{stats.maintenanceNeeded}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Taux d'utilisation</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.utilizationRate}%</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="mt-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un équipement par nom, modèle ou numéro de série..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as EquipmentCategory | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              <option value="imaging">Imagerie</option>
              <option value="surgical">Chirurgie</option>
              <option value="diagnostic">Diagnostic</option>
              <option value="monitoring">Monitoring</option>
            </select>
            <button
              onClick={() => setShowAIAnalysis(!showAIAnalysis)}
              className="flex items-center gap-2 px-4 py-2 text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100"
            >
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
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-gray-900">Filtres</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                    <AlertTriangle size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <div className="space-y-2">
                      {['Disponible', 'En utilisation', 'En maintenance', 'Défectueux'].map((status) => (
                        <div key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`status-${status}`}
                            className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                          />
                          <label
                            htmlFor={`status-${status}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent">
                      <option value="">Toutes les localisations</option>
                      <option value="exam1">Salle d'examen 1</option>
                      <option value="exam2">Salle d'examen 2</option>
                      <option value="surgery">Bloc opératoire</option>
                      <option value="lab">Laboratoire</option>
                    </select>
                  </div>

                  {/* Maintenance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="maintenance-due"
                          className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                        />
                        <label
                          htmlFor="maintenance-due"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Maintenance à prévoir
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="maintenance-overdue"
                          className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                        />
                        <label
                          htmlFor="maintenance-overdue"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Maintenance en retard
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t flex justify-end space-x-4">
                    <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                      Réinitialiser
                    </button>
                    <button className="px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
                      Appliquer
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Equipment List */}
          <div className={showFilters ? 'col-span-9' : 'col-span-12'}>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Liste des équipements</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                      <Download size={20} />
                      Exporter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                      <Printer size={20} />
                      Imprimer
                    </button>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {equipment.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-navy-50 rounded-lg">
                          {React.createElement(getCategoryIcon(item.category), {
                            className: 'w-6 h-6 text-navy-600'
                          })}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.model} • {item.serialNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-sm text-gray-500">Localisation</p>
                          <p className="font-medium text-gray-900">{item.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Dernière utilisation</p>
                          <p className="font-medium text-gray-900">
                            {item.lastUsed.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Prochaine maintenance</p>
                          <p className="font-medium text-gray-900">
                            {item.nextMaintenance.toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                          {item.status === 'available' ? 'Disponible' :
                           item.status === 'in_use' ? 'En utilisation' :
                           item.status === 'maintenance' ? 'En maintenance' : 'Défectueux'}
                        </span>
                        <button
                          onClick={() => setExpandedEquipment(expandedEquipment === item.id ? null : item.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          {expandedEquipment === item.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedEquipment === item.id && (
                      <div className="mt-4 pl-16">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-4">Historique d'utilisation</h4>
                            <div className="space-y-2">
                              {[
                                { date: '2024-03-20', type: 'Consultation', duration: '45 min' },
                                { date: '2024-03-19', type: 'Maintenance', duration: '2h' }
                              ].map((usage, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-500">{usage.date}</span>
                                  <span className="text-gray-900">{usage.type}</span>
                                  <span className="text-gray-600">{usage.duration}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-4">Maintenance</h4>
                            <div className="space-y-2">
                              {[
                                { date: '2024-02-15', type: 'Révision complète', cost: '350€' },
                                { date: '2023-11-10', type: 'Calibrage', cost: '150€' }
                              ].map((maintenance, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-500">{maintenance.date}</span>
                                  <span className="text-gray-900">{maintenance.type}</span>
                                  <span className="text-gray-600">{maintenance.cost}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}