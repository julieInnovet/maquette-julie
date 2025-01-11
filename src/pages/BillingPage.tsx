import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Printer,
  Plus,
  BarChart2,
  Archive
} from 'lucide-react';

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export function BillingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [sortField, setSortField] = useState<keyof Invoice>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      clientName: 'Jean Dupont',
      date: new Date('2024-03-20'),
      dueDate: new Date('2024-04-19'),
      amount: 150.00,
      status: 'pending',
      items: [
        {
          description: 'Consultation standard',
          quantity: 1,
          unitPrice: 50.00,
          total: 50.00
        },
        {
          description: 'Radiographie',
          quantity: 1,
          unitPrice: 100.00,
          total: 100.00
        }
      ]
    },
    {
      id: '2',
      number: 'INV-2024-002',
      clientName: 'Marie Martin',
      date: new Date('2024-03-19'),
      dueDate: new Date('2024-04-18'),
      amount: 75.00,
      status: 'paid',
      items: [
        {
          description: 'Vaccination',
          quantity: 1,
          unitPrice: 75.00,
          total: 75.00
        }
      ]
    }
  ];

  const stats = {
    totalInvoiced: 15800,
    totalPaid: 12500,
    totalPending: 3300,
    averagePaymentTime: 12,
    overdueRate: 5.2
  };

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <DollarSign className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Suivi des factures</h1>
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
                Nouvelle facture
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-5 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total facturé</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalInvoiced}€</p>
                </div>
                <div className="p-3 bg-navy-50 rounded-full">
                  <DollarSign className="w-6 h-6 text-navy-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Payé</p>
                  <p className="text-2xl font-semibold text-green-600">{stats.totalPaid}€</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">En attente</p>
                  <p className="text-2xl font-semibold text-yellow-600">{stats.totalPending}€</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Délai moyen</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.averagePaymentTime}j</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Taux d'impayés</p>
                  <p className="text-2xl font-semibold text-red-600">{stats.overdueRate}%</p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Period Selection */}
          <div className="mt-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une facture par numéro, client..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
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
                    <XCircle size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <div className="space-y-2">
                      {['Payée', 'En attente', 'En retard', 'Annulée'].map((status) => (
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

                  {/* Amount Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Période
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                      />
                      <input
                        type="date"
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

          {/* Invoices List */}
          <div className={showFilters ? 'col-span-9' : 'col-span-12'}>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N° Facture
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'émission
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Échéance
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.clientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.date.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dueDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.amount.toFixed(2)}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                            {invoice.status === 'paid' ? 'Payée' :
                             invoice.status === 'pending' ? 'En attente' :
                             invoice.status === 'overdue' ? 'En retard' : 'Annulée'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button className="text-gray-400 hover:text-navy-600">
                              <FileText size={20} />
                            </button>
                            <button className="text-gray-400 hover:text-navy-600">
                              <Download size={20} />
                            </button>
                            <button className="text-gray-400 hover:text-navy-600">
                              <Mail size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Évolution du CA</h3>
              <button className="text-sm text-navy-600">
                Voir détails
              </button>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">Graphique d'évolution du CA</p>
            </div>
          </div>

          {/* Payment Times */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Délais de paiement</h3>
              <button className="text-sm text-navy-600">
                Voir détails
              </button>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">Graphique des délais de paiement</p>
            </div>
          </div>

          {/* Top Clients */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Top Clients</h3>
              <button className="text-sm text-navy-600">
                Voir tous
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Jean Dupont', amount: 2500 },
                { name: 'Marie Martin', amount: 1800 },
                { name: 'Pierre Durand', amount: 1500 }
              ].map((client, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{client.name}</span>
                  <span className="font-medium text-gray-900">{client.amount}€</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}