import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Brain, 
  CheckCircle, 
  XCircle,
  FileText,
  Download,
  Mail
} from 'lucide-react';

interface ConsultationReportProps {
  consultation: any;
}

export function ConsultationReport({ consultation }: ConsultationReportProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{id: string, text: string}>>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('default');

  const templates = [
    { id: 'default', name: 'Consultation standard' },
    { id: 'vaccination', name: 'Vaccination' },
    { id: 'surgery', name: 'Chirurgie' },
    { id: 'followup', name: 'Suivi post-opératoire' }
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would integrate with the Web Speech API or another speech recognition service
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle de rapport
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
          >
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-600 rounded-lg hover:bg-navy-100">
            <FileText size={20} />
            Gérer les modèles
          </button>
        </div>
      </div>

      {/* Dictation Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Dictée vocale</h3>
          <button
            onClick={toggleRecording}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isRecording
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-turquoise-500 text-white hover:bg-turquoise-600'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff size={20} />
                Arrêter la dictée
              </>
            ) : (
              <>
                <Mic size={20} />
                Commencer la dictée
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            placeholder="La transcription apparaîtra ici..."
          />
          {isRecording && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-red-500">
              <span className="animate-pulse">●</span>
              Enregistrement en cours...
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="text-navy-600" size={20} />
            <h3 className="font-medium text-gray-900">Suggestions de l'IA</h3>
          </div>
        </div>
        <div className="space-y-3">
          {suggestions.map(suggestion => (
            <div key={suggestion.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200">
              <p className="flex-1 text-sm text-gray-700">{suggestion.text}</p>
              <div className="flex gap-2">
                <button className="text-green-600 hover:text-green-700">
                  <CheckCircle size={20} />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          ))}
          {suggestions.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              Les suggestions apparaîtront ici pendant la dictée...
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <Download size={20} />
            Exporter en PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <Mail size={20} />
            Envoyer par email
          </button>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
          <Send size={20} />
          Finaliser le rapport
        </button>
      </div>
    </div>
  );
}