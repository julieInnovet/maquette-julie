import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Brain,
  BarChart2,
  Calendar,
  MapPin,
  Calculator,
  Percent,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Target,
  Download
} from 'lucide-react';

type Period = 'day' | 'week' | 'month' | 'year';
type ServiceType = 'consultation' | 'surgery' | 'emergency' | 'products';

interface FinancialStats {
  revenue: number;
  profitability: number;
  averagePaymentTime: number;
  unpaidRate: number;
}

interface ServiceStats {
  type: ServiceType;
  revenue: number;
  cost: number;
  profitability: number;
  count: number;
}

export function FinancialManagementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const [showFilters, setShowFilters] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Mock data
  const stats: FinancialStats = {
    revenue: 15800,
    profitability: 68.5,
    averagePaymentTime: 12,
    unpaidRate: 3.2
  };

  const services: ServiceStats[] = [
    {
      type: 'consultation',
      revenue: 8500,
      cost: 2550,
      profitability: 70,
      count: 85
    },
    {
      type: 'surgery',
      revenue: 4200,
      cost: 1470,
      profitability: 65,
      count: 12
    },
    {
      type: 'emergency',
      revenue: 2100,
      cost: 840,
      profitability: 60,
      count: 8
    },
    {
      type: 'products',
      revenue: 1000,
      cost: 300,
      profitability: 70,
      count: 45
    }
  ];

  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case 'consultation':
        return FileText;
      case 'surgery':
        return AlertCircle;
      case 'emergency':
        return Clock;
      case 'products':
        return DollarSign;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Calculator className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Gestion financière</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-navy-600 transition-colors"
              >
                <Filter size={20} />
                Filtres
              </button>
              <button
                onClick={() => setShowAIAnalysis(!showAIAnalysis)}
                className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600"
              >
                <Brain size={20} />
                Analyse IA
              </button>
            </div>
          </div>

          {/* Period Selection */}
          <div className="mt-6 flex gap-4">
            {[
              { value: 'day', label: "Aujourd'hui" },
              { value: 'week', label: 'Cette semaine' },
              { value: 'month', label: 'Ce mois' },
              { value: 'year', label: 'Cette année' }
            ].map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value as Period)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-navy-50 text-navy-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Chiffre d'affaires</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.revenue}€</p>
                </div>
                <div className="p-3 bg-navy-50 rounded-full">
                  <DollarSign className="w-6 h-6 text-navy-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                <span>+8% vs période précédente</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Rentabilité</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.profitability}%</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Percent className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                <span>+2.5% vs période précédente</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Délai moyen de paiement</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.averagePaymentTime}j</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-yellow-600">
                <Clock size={16} />
                <span>-2j vs période précédente</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Taux d'impayés</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.unpaidRate}%</p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
                <TrendingUp size={16} />
                <span>+0.5% vs période précédente</span>
              </div>
            </div>
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
                    <AlertCircle size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de prestation
                    </label>
                    <div className="space-y-2">
                      {['Consultation', 'Chirurgie', 'Urgence', 'Produits'].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`type-${type}`}
                            className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profitability Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rentabilité
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Min %"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max %"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                      />
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

          {/* Main Analysis Area */}
          <div className={showFilters ? 'col-span-9' : 'col-span-12'}>
            {/* Services Analysis */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Analyse par prestation</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {services.map((service) => (
                  <div key={service.type} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-navy-50 rounded-lg">
                          {React.createElement(getServiceIcon(service.type), {
                            className: 'w-6 h-6 text-navy-600'
                          })}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 capitalize">{service.type}</h3>
                          <p className="text-sm text-gray-500">{service.count} actes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-sm text-gray-500">CA</p>
                          <p className="font-medium text-gray-900">{service.revenue}€</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coût</p>
                          <p className="font-medium text-gray-900">{service.cost}€</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rentabilité</p>
                          <p className="font-medium text-green-600">{service.profitability}%</p>
                        </div>
                        <button
                          onClick={() => setExpandedService(expandedService === service.type ? null : service.type)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          {expandedService === service.type ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedService === service.type && (
                      <div className="mt-4 pl-16">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-4">Évolution du CA</h4>
                            <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                              <p className="text-gray-500">Graphique d'évolution</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-4">Répartition des coûts</h4>
                            <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                              <p className="text-gray-500">Graphique de répartition</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Analysis */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Analyse des déplacements</h3>
                  <button className="text-sm text-navy-600">
                    Voir détails
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Distance totale</span>
                    </div>
                    <span className="font-medium text-gray-900">450 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Coût total</span>
                    </div>
                    <span className="font-medium text-gray-900">225€</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Temps total</span>
                    </div>
                    <span className="font-medium text-gray-900">8h30</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Objectifs financiers</h3>
                  <button className="text-sm text-navy-600 flex items-center gap-2">
                    <Plus size={16} />
                    Définir un objectif
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">CA mensuel</span>
                      <span className="text-gray-900">15 800€ / 20 000€</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[79%] bg-turquoise-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Rentabilité</span>
                      <span className="text-gray-900">68.5% / 70%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[97%] bg-turquoise-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Réduction des impayés</span>
                      <span className="text-gray-900">3.2% / 2%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[40%] bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            {showAIAnalysis && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-navy-600" />
                    <h3 className="font-medium text-gray-900">Analyse IA</h3>
                  </div>
                  <button className="text-sm text-navy-600">
                    Exporter le rapport
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="font-medium text-navy-600 mb-2">Prévisions de trésorerie</h4>
                    <p className="text-sm text-gray-600">
                      Basé sur les tendances actuelles, nous prévoyons une augmentation du CA de 12% pour le prochain trimestre.
                      Les principaux facteurs de croissance sont les consultations (+15%) et les chirurgies (+8%).
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-600 mb-2">Optimisation des tarifs</h4>
                    <p className="text-sm text-gray-600">
                      Une augmentation de 5% des tarifs des consultations spécialisées pourrait améliorer la rentabilité de 2%
                      sans impact significatif sur la demande.
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-600 mb-2">Alertes et recommandations</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-yellow-600" />
                        Le taux d'impayés des urgences est supérieur à la moyenne
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-yellow-600" />
                        3 prestations montrent une rentabilité inférieure à 50%
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}