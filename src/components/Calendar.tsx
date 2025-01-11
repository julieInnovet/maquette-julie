import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent, AppointmentRequest } from '../types';
import frLocale from '@fullcalendar/core/locales/fr';

interface CalendarViewProps {
  appointments: AppointmentRequest[];
  onScheduleAppointment: (appointment: AppointmentRequest, start: Date) => void;
  selectedAppointment: AppointmentRequest | null;
}

export function CalendarView({ appointments, onScheduleAppointment, selectedAppointment }: CalendarViewProps) {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>(
    appointments
      .filter(app => app.status === 'scheduled')
      .map(app => ({
        id: app.id,
        title: `${app.horseName} - ${app.clientName}`,
        start: app.preferredDateTime || '',
        end: app.preferredDateTime ? new Date(new Date(app.preferredDateTime).getTime() + 60 * 60 * 1000).toISOString() : '',
        status: 'scheduled'
      }))
  );

  const handleDateSelect = (selectInfo: any) => {
    if (selectedAppointment) {
      const title = `${selectedAppointment.horseName} - ${selectedAppointment.clientName}`;
      
      if (window.confirm(`Planifier le rendez-vous pour ${title} le ${selectInfo.start.toLocaleDateString()} à ${selectInfo.start.toLocaleTimeString()} ?`)) {
        onScheduleAppointment(selectedAppointment, selectInfo.start);
        
        setCurrentEvents([...currentEvents, {
          id: selectedAppointment.id,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          status: 'scheduled'
        }]);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={currentEvents}
        select={handleDateSelect}
        height="auto"
        locale={frLocale}
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '08:00',
          endTime: '19:00',
        }}
      />
    </div>
  );
}