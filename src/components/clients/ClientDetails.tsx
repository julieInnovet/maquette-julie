import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, MessageCircle, FileText, PlusCircle, Brain } from 'lucide-react';
import { Client, Animal } from '../../types/client';

interface ClientDetailsProps {
  client: Client;
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'animals' | 'history' | 'stats'>('info');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {client.firstName} {client.lastName}
            </h2>
            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                {client.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {client.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {client.address.street}, {client.address.postalCode} {client.address.city}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
              <MessageCircle size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
              <Calendar size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
              <FileText size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-6">
          {[
            { id: 'info', label: 'Informations' },
            { id: 'animals', label: 'Animaux' },
            { id: 'history', label: 'Historique' },
            { id: 'stats', label: 'Statistiques' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-navy-50 text-navy-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences de communication</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(client.communicationPreferences).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-lg ${
                      value ? 'bg-turquoise-50 text-turquoise-700' : 'bg-gray-50 text-gray-500'
                    }`}
                  >
                    <span className="font-medium capitalize">{key}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Consentements</h3>
              <div className="space-y-2">
                {Object.entries(client.consents).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium capitalize">{key.replace('_', ' ')}</span>
                    <span className={value ? 'text-green-600' : 'text-red-600'}>
                      {value ? 'Accepté' : 'Refusé'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                <button className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-700">
                  <PlusCircle size={16} />
                  Ajouter une note
                </button>
              </div>
              <div className="space-y-4">
                {client.notes.map((note) => (
                  <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                        {note.type}
                      </span>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'animals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Animaux ({client.animals.length})</h3>
              <button className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-700">
                <PlusCircle size={16} />
                Ajouter un animal
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {client.animals.map((animal) => (
                <div key={animal.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{animal.name}</h4>
                      <p className="text-sm text-gray-500">
                        {animal.breed} • {animal.species}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        animal.careStatus === 'up_to_date'
                          ? 'bg-green-100 text-green-800'
                          : animal.careStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {animal.careStatus === 'up_to_date'
                        ? 'À jour'
                        : animal.careStatus === 'pending'
                        ? 'En attente'
                        : 'En retard'}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-navy-50 text-navy-600 rounded-lg hover:bg-navy-100 transition-colors">
                      Voir le dossier
                    </button>
                    <button className="flex-1 px-3 py-2 bg-turquoise-50 text-turquoise-600 rounded-lg hover:bg-turquoise-100 transition-colors">
                      Planifier un RDV
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}