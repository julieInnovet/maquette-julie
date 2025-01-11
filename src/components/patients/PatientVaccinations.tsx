import React from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Vaccination } from '../../types/patient';

interface PatientVaccinationsProps {
  vaccinations: Vaccination[];
  onAddVaccination: () => void;
}

export function PatientVaccinations({ vaccinations, onAddVaccination }: PatientVaccinationsProps) {
  const getStatusColor = (nextDue: Date) => {
    const now = new Date();
    const daysUntilDue = Math.floor((nextDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'text-red-600 bg-red-100';
    if (daysUntilDue < 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Vaccinations Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Vaccinations à venir
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>2 vaccinations sont à prévoir dans les 30 prochains jours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vaccination Timeline */}
      <div className="flow-root">
        <ul className="-mb-8">
          {vaccinations.map((vaccination, index) => (
            <li key={vaccination.id}>
              <div className="relative pb-8">
                {index < vaccinations.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      getStatusColor(vaccination.nextDue)
                    }`}>
                      <Clock className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">{vaccination.type}</p>
                      <p className="text-sm text-gray-500">
                        Administré par {vaccination.veterinarian}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={vaccination.date.toISOString()}>
                        {vaccination.date.toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}