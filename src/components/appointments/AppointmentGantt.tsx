import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8h to 18h

// Mock data pour la démonstration
const appointments = [
  {
    id: '1',
    veterinarian: 'Dr Julie Samama',
    client: 'Jean Dupont',
    patient: 'Spirit',
    type: 'Examen annuel',
    time: '14:00',
    duration: 60 // minutes
  },
  {
    id: '2',
    veterinarian: 'Dr Bernard',
    client: 'Marie Martin',
    patient: 'Luna',
    type: 'Urgence',
    time: '15:30',
    duration: 45 // minutes
  }
];

export function AppointmentGantt() {
  const getAppointmentStyle = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startHour = hours + minutes / 60;
    const width = `${(duration / 60) * 100}%`;
    const left = `${((startHour - 8) / 10) * 100}%`;
    return { left, width };
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Timeline Header */}
          <div className="flex border-b">
            <div className="w-48 p-4 font-medium text-gray-700">Vétérinaire</div>
            <div className="flex-1 flex">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="flex-1 p-4 text-center border-l text-sm text-gray-600"
                >
                  {`${hour}:00`}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows */}
          {['Dr Julie Samama', 'Dr Bernard'].map((vet) => (
            <div key={vet} className="flex border-b hover:bg-gray-50">
              <div className="w-48 p-4 font-medium text-gray-900">{vet}</div>
              <div className="flex-1 flex relative">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="flex-1 border-l"
                  />
                ))}
                
                {appointments
                  .filter(app => app.veterinarian === vet)
                  .map(appointment => (
                    <div
                      key={appointment.id}
                      className="absolute top-2 bg-[#e6f4f7] rounded p-2 text-sm"
                      style={getAppointmentStyle(appointment.time, appointment.duration)}
                    >
                      <div className="font-medium text-[#2b7385]">{appointment.client}</div>
                      <div className="text-[#2b7385]">
                        {appointment.patient} - {appointment.type}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}