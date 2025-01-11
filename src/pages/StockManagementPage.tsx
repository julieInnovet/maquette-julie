import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  Brain,
  TrendingUp,
  AlertCircle,
  Calendar,
  DollarSign,
  Archive,
  ChevronDown,
  ChevronUp,
  Truck,
  FileText,
  Download,
  BarChart2,
  Pill,
  Box,
  Syringe,
  Clock
} from 'lucide-react';

type ProductCategory = 'medication' | 'consumable' | 'equipment';
type ProductStatus = 'normal' | 'critical' | 'expired';

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  quantity: number;
  minQuantity: number;
  expiryDate?: Date;
  supplier: string;
  unitPrice: number;
  status: ProductStatus;
}

interface Supplier {
  id: string;
  name: string;
  reliability: number;
  avgDeliveryTime: number;
  lastOrder: Date;
}

export function StockManagementPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  // Mock data
  const stats = {
    totalValue: 45800,
    criticalItems: 12,
    expiringItems: 8,
    mostConsumed: 'Vaccins'
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Vaccin antirabique',
      category: 'medication',
      quantity: 25,
      minQuantity: 30,
      expiryDate: new Date('2024-05-15'),
      supplier: 'MedVet Supply',
      unitPrice: 45.00,
      status: 'critical'
    },
    {
      id: '2',
      name: 'Seringues 5ml',
      category: 'consumable',
      quantity: 150,
      minQuantity: 50,
      supplier: 'MedEquip',
      unitPrice: 0.50,
      status: 'normal'
    }
  ];

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'MedVet Supply',
      reliability: 95,
      avgDeliveryTime: 3,
      lastOrder: new Date('2024-03-15')
    },
    {
      id: '2',
      name: 'MedEquip',
      reliability: 92,
      avgDeliveryTime: 4,
      lastOrder: new Date('2024-03-10')
    }
  ];

  const getCategoryIcon = (category: ProductCategory) => {
    switch (category) {
      case 'medication':
        return Pill;
      case 'consumable':
        return Box;
      case 'equipment':
        return Syringe;
    }
  };

  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'critical':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
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
              <Package className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Gestion des stocks</h1>
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
                Nouveau produit
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Valeur totale</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalValue}€</p>
                </div>
                <div className="p-3 bg-navy-50 rounded-full">
                  <DollarSign className="w-6 h-6 text-navy-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Stock critique</p>
                  <p className="text-2xl font-semibold text-yellow-600">{stats.criticalItems} produits</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Expiration {'<'} 30j</p>
                  <p className="text-2xl font-semibold text-red-600">{stats.expiringItems} produits</p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Plus consommé</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.mostConsumed}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
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
                placeholder="Rechercher un produit par nom, catégorie ou fournisseur..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              <option value="medication">Médicaments</option>
              <option value="consumable">Consommables</option>
              <option value="equipment">Matériel</option>
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
                    <AlertCircle size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <div className="space-y-2">
                      {['Stock normal', 'Stock critique', 'Expiré'].map((status) => (
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

                  {/* Supplier */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fournisseur
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent">
                      <option value="">Tous les fournisseurs</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Expiry Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date d'expiration
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

          {/* Products List */}
          <div className={showFilters ? 'col-span-9' : 'col-span-12'}>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Liste des produits</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                      <Download size={20} />
                      Exporter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                      <Archive size={20} />
                      Archiver
                    </button>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {products.map((product) => (
                  <div key={product.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-navy-50 rounded-lg">
                          {React.createElement(getCategoryIcon(product.category), {
                            className: 'w-6 h-6 text-navy-600'
                          })}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            {product.supplier} • {product.unitPrice}€/unité
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className="font-medium text-gray-900">{product.quantity} unités</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Seuil min.</p>
                          <p className="font-medium text-gray-900">{product.minQuantity} unités</p>
                        </div>
                        {product.expiryDate && (
                          <div>
                            <p className="text-sm text-gray-500">Expiration</p>
                            <p className="font-medium text-gray-900">
                              {product.expiryDate.toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                          {product.status === 'normal' ? 'Stock normal' :
                           product.status === 'critical' ? 'Stock critique' : 'Expiré'}
                        </span>
                        <button
                          onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          {expandedProduct === product.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedProduct === product.id && (
                      <div className="mt-4 pl-16">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-4">Historique des mouvements</h4>
                            <div className="space-y-2">
                              {[
                                { date: '2024-03-20', type: 'Sortie', quantity: 5, reason: 'Consultation' },
                                { date: '2024-03-19', type: 'Entrée', quantity: 20, reason: 'Réapprovisionnement' }
                              ].map((movement, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-500">{movement.date}</span>
                                  <span className={movement.type === 'Entrée' ? 'text-green-600' : 'text-red-600'}>
                                    {movement.type === 'Entrée' ? '+' : '-'}{movement.quantity} unités
                                  </span>
                                  <span className="text-gray-600">{movement.reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-4">Consommation mensuelle</h4>
                            <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                              <p className="text-gray-500">Graphique de consommation</p>
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

        {/* AI Analysis */}
        {showAIAnalysis && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-navy-600" />
                <h3 className="font-medium text-gray-900">Analyse et recommandations IA</h3>
              </div>
              <button className="text-sm text-navy-600">
                Exporter le rapport
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-navy-50 rounded-lg p-4">
                <h4 className="font-medium text-navy-600 mb-2">Prévisions de consommation</h4>
                <p className="text-sm text-gray-600">
                  Basé sur les tendances actuelles, nous prévoyons une augmentation de la consommation de vaccins de 15%
                  pour le prochain trimestre. Suggestion de réapprovisionnement anticipé.
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-600 mb-2">Alertes stock</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-yellow-600" />
                    3 produits atteindront leur date d'expiration dans 30 jours
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-yellow-600" />
                    5 produits sont en stock critique
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-600 mb-2">Optimisation des commandes</h4>
                <p className="text-sm text-gray-600">
                  Regrouper les commandes des fournisseurs MedVet et MedEquip pourrait réduire les coûts de livraison de 12%.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}