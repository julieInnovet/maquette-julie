import React, { useState } from 'react';
import { Save, Brain, Mic, MicOff } from 'lucide-react';

interface NotesSOAPProps {
  consultation: any;
}

export function NotesSOAP({ consultation }: NotesSOAPProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  const handleChange = (field: keyof typeof notes, value: string) => {
    setNotes(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Saving notes:', notes);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Notes SOAP</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isRecording
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            {isRecording ? 'Arrêter' : 'Dicter'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-600 rounded-lg hover:bg-navy-100">
            <Brain size={20} />
            Assistant IA
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subjective */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subjectif (S)
          </label>
          <textarea
            value={notes.subjective}
            onChange={(e) => handleChange('subjective', e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
            placeholder="Motif de consultation, historique, symptômes rapportés..."
          />
        </div>

        {/* Objective */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objectif (O)
          </label>
          <textarea
            value={notes.objective}
            onChange={(e) => handleChange('objective', e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
            placeholder="Examen clinique, constantes, observations..."
          />
        </div>

        {/* Assessment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Analyse (A)
          </label>
          <textarea
            value={notes.assessment}
            onChange={(e) => handleChange('assessment', e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
            placeholder="Diagnostic différentiel, interprétation..."
          />
        </div>

        {/* Plan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan (P)
          </label>
          <textarea
            value={notes.plan}
            onChange={(e) => handleChange('plan', e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
            placeholder="Traitement, examens complémentaires, suivi..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600"
          >
            <Save size={20} />
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}