import React from 'react';
import { Phone, Mail, Paperclip, Reply, Archive, AlertCircle } from 'lucide-react';
import { Communication } from '../../types/communication';

interface CommunicationDetailsProps {
  communication: Communication;
}

export function CommunicationDetails({ communication }: CommunicationDetailsProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Jean Dupont - Spirit
            </h2>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Mail size={16} />
                jean.dupont@email.com
              </span>
              <span className="flex items-center gap-1">
                <Phone size={16} />
                0123456789
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
              <Reply size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
              <Archive size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
              <AlertCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                  <span className="text-navy-600 font-medium">JD</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Jean Dupont</h3>
                  <p className="text-sm text-gray-500">Aujourd'hui à 10:30</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              Bonjour,
              <br /><br />
              J'ai une question concernant le traitement de Spirit. Les symptômes persistent malgré la prise des médicaments depuis 3 jours.
              <br /><br />
              Cordialement,
              <br />
              Jean Dupont
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                <Paperclip size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">photo-spirit.jpg</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                <Paperclip size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">ordonnance.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Box */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4">
            <textarea
              placeholder="Écrire une réponse..."
              className="w-full min-h-[100px] resize-none border-0 focus:ring-0 p-0"
            />
          </div>
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-navy-600 rounded-lg hover:bg-gray-100">
                <Paperclip size={20} />
              </button>
            </div>
            <button className="px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}