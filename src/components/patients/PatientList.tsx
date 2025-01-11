import React from 'react';
import { ChevronRight, Calendar, Weight, AlertCircle } from 'lucide-react';
import { Patient } from '../../types/patient';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  selectedPatient: Patient | null;
}

export function PatientList({ patients, onSelectPatient, selectedPatient }: PatientListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Liste des patients</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
              selectedPatient?.id === patient.id ? 'bg-turquoise-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {patient.name}
                  </h3>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                  <span>{patient.species} - {patient.breed}</span>
                  <span className="flex items-center gap-1">
                    <Weight size={16} />
                    {patient.weight} kg
                  </span>
                  {patient.medicalInfo.allergies.length > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertCircle size={16} />
                      Allergies
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    patient.careStatus === 'up_to_date'
                      ? 'bg-green-100 text-green-800'
                      : patient.careStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {patient.careStatus === 'up_to_date' ? 'À jour' : 
                     patient.careStatus === 'pending' ? 'En attente' : 'En retard'}
                  </span>
                  {patient.nextAppointment && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={14} />
                      Prochain RDV : {new Date(patient.nextAppointment).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}