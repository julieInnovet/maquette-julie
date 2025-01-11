import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Plus, Search } from 'lucide-react';

interface ResultsProps {
  consultation: any;
}

export function Results({ consultation }: ResultsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const results = [
    {
      id: '1',
      type: 'Radiographie',
      name: 'Radio membre antérieur gauche',
      date: '2024-03-20',
      status: 'completed',
      url: '#'
    },
    {
      id: '2',
      type: 'Analyse sanguine',
      name: 'NFS + Biochimie',
      date: '2024-03-20',
      status: 'pending',
      url: '#'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Résultats</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
          <Plus size={20} />
          Ajouter un résultat
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher dans les résultats..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-turquoise-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-navy-50 rounded-lg">
                <FileText className="w-6 h-6 text-navy-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{result.name}</h4>
                <p className="text-sm text-gray-500">
                  {result.type} • {result.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
                <Download size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-turquoise-600 hover:bg-turquoise-700">
              <Upload className="-ml-1 mr-2 h-5 w-5" />
              Téléverser des fichiers
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            PNG, JPG, PDF jusqu'à 10MB
          </p>
        </div>
      </div>
    </div>
  );
}