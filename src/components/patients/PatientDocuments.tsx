import React from 'react';
import { FileText, Download, Trash2, Upload } from 'lucide-react';
import { PatientDocument } from '../../types/patient';

interface PatientDocumentsProps {
  documents: PatientDocument[];
  onUpload: () => void;
  onDelete: (id: string) => void;
  onDownload: (document: PatientDocument) => void;
}

export function PatientDocuments({ documents, onUpload, onDelete, onDownload }: PatientDocumentsProps) {
  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'radiography':
        return 'Radiographie';
      case 'analysis':
        return 'Analyse';
      case 'certificate':
        return 'Certificat';
      case 'prescription':
        return 'Ordonnance';
      case 'surgery_report':
        return 'Rapport chirurgical';
      default:
        return 'Document';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <button
              onClick={onUpload}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-turquoise-600 hover:bg-turquoise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500"
            >
              <Upload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Ajouter des documents
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            PNG, JPG, PDF jusqu'à 10MB
          </p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {documents.map((document) => (
          <div
            key={document.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="focus:outline-none">
                <p className="text-sm font-medium text-gray-900">
                  {getDocumentTypeIcon(document.type)}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {document.name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(document.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 space-x-2">
              <button
                onClick={() => onDownload(document)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(document.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}