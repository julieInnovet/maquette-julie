import React from 'react';
import { Calendar, User, Paperclip } from 'lucide-react';
import { Communication, CommunicationType } from '../../types/communication';

interface CommunicationListProps {
  type: CommunicationType;
  onSelect: (communication: Communication) => void;
  selectedId: string | null;
}

export function CommunicationList({ type, onSelect, selectedId }: CommunicationListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Communications</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Example communication item */}
        <button
          className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
            selectedId === '1' ? 'bg-turquoise-50' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Jean Dupont</h3>
                <span className="text-sm text-gray-500">10:30</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                Question sur le traitement de Spirit...
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Paperclip size={12} />
                  2 fichiers
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  En attente
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}