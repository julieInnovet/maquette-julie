import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Syringe, 
  AlertCircle, 
  Weight, 
  Clock, 
  Plus,
  Upload,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Patient, MedicalRecord, Vaccination } from '../../types/patient';

interface PatientDetailsProps {
  patient: Patient;
}

export function PatientDetails({ patient }: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'medical' | 'vaccinations' | 'documents'>('info');
  const [showAllergies, setShowAllergies] = useState(true);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <div className="mt-2 text-sm text-gray-500">
              <p>{patient.species} - {patient.breed}</p>
              <p>Propriétaire : {patient.owner.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
              <Calendar size={20} />
              Planifier RDV
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-6">
          {[
            { id: 'info', label: 'Informations' },
            { id: 'medical', label: 'Dossier médical' },
            { id: 'vaccinations', label: 'Vaccinations' },
            { id: 'documents', label: 'Documents' },
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
            {/* Alert for allergies */}
            {patient.medicalInfo.allergies.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-3" size={24} />
                  <div>
                    <h3 className="text-red-800 font-medium">Allergies</h3>
                    <p className="text-red-700 mt-1">
                      {patient.medicalInfo.allergies.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Âge</span>
                    <span className="font-medium">
                      {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} ans
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Poids</span>
                    <span className="font-medium">{patient.weight} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Transpondeur</span>
                    <span className="font-medium">{patient.transponderNumber}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Lieu de détention</h3>
                <address className="not-italic">
                  {patient.detentionAddress.street}<br />
                  {patient.detentionAddress.postalCode} {patient.detentionAddress.city}
                </address>
              </div>
            </div>

            {/* Meat Exclusion */}
            {patient.medicalInfo.meatExclusion && (
              <div className="mt-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-yellow-800">Exclusion de la filière bouchère</h3>
                  <div className="mt-2 space-y-2">
                    {patient.medicalInfo.meatExclusionHistory.map((entry, index) => (
                      <div key={index} className="text-sm text-yellow-700">
                        <p>Déclaré le {new Date(entry.date).toLocaleDateString()} par {entry.declaredBy}</p>
                        <p>Motif : {entry.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center gap-2 p-4 bg-navy-50 text-navy-600 rounded-lg hover:bg-navy-100">
                  <Plus size={20} />
                  Ajouter une note médicale
                </button>
                <button className="flex items-center gap-2 p-4 bg-turquoise-50 text-turquoise-600 rounded-lg hover:bg-turquoise-100">
                  <Upload size={20} />
                  Ajouter un document
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Historique médical</h3>
              <button className="flex items-center gap-2 text-navy-600">
                <FileText size={20} />
                Exporter le dossier
              </button>
            </div>

            {/* Timeline of medical records would go here */}
            <div className="space-y-4">
              {/* Example record */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Consultation de routine</h4>
                    <p className="text-sm text-gray-500">15 février 2024 - Dr. Martin</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vaccinations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Vaccinations</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg">
                <Syringe size={20} />
                Nouvelle vaccination
              </button>
            </div>

            {/* Vaccination records would go here */}
            <div className="space-y-4">
              {/* Example vaccination */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Grippe équine</h4>
                    <p className="text-sm text-gray-500">Administré le 15/01/2024</p>
                    <p className="text-sm text-gray-500">Prochain rappel : 15/07/2024</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    À jour
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg">
                <Upload size={20} />
                Ajouter un document
              </button>
            </div>

            {/* Document list would go here */}
            <div className="grid grid-cols-2 gap-4">
              {/* Example document */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Radiographie - Membre antérieur</h4>
                    <p className="text-sm text-gray-500">Ajouté le 15/02/2024</p>
                  </div>
                  <button className="text-navy-600">
                    <FileText size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}