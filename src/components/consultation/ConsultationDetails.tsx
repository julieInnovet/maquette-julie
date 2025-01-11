import React, { useState } from 'react';
import { 
  Calendar,
  FileText,
  MessageCircle,
  Pill,
  Upload,
  Plus,
  Microscope,
  Printer,
  DollarSign,
  Clock,
  Brain,
  Mic,
  MicOff,
  Send,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ConsultationReport } from './ConsultationReport';
import { NotesSOAP } from './NotesSOAP';
import { Results } from './Results';
import { Prescriptions } from './Prescriptions';
import { Billing } from './Billing';

interface ConsultationDetailsProps {
  consultation: any;
}

export function ConsultationDetails({ consultation }: ConsultationDetailsProps) {
  const [activeTab, setActiveTab] = useState<'soap' | 'report' | 'results' | 'prescriptions' | 'billing'>('soap');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">{consultation.title || "Consultation"}</h2>
        <p className="text-sm text-gray-500">
          Propriétaire : {consultation.owner || "Inconnu"} | Patient : {consultation.patient || "Non spécifié"}
        </p>

        {/* Updated Tabs */}
        <div className="flex gap-4 mt-6">
          {[
            { id: 'soap', label: 'Notes SOAP' },
            { id: 'report', label: 'Rapport' },
            { id: 'results', label: 'Résultats' },
            { id: 'prescriptions', label: 'Prescriptions' },
            { id: 'billing', label: 'Facturation' },
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
        {activeTab === 'soap' && <NotesSOAP consultation={consultation} />}
        {activeTab === 'report' && <ConsultationReport consultation={consultation} />}
        {activeTab === 'results' && <Results consultation={consultation} />}
        {activeTab === 'prescriptions' && <Prescriptions consultation={consultation} />}
        {activeTab === 'billing' && <Billing consultation={consultation} />}
        {/* Par défaut, affichez un message si aucun onglet n'est actif */}
        {!['soap', 'report', 'results', 'prescriptions', 'billing'].includes(activeTab) && (
          <div className="text-gray-500 text-center">
            Sélectionnez un onglet pour voir les détails.
          </div>
        )}
      </div>
    </div>
  );
}
