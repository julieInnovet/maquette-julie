import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

export function AppointmentCalendar() {
  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Entrez le titre du rendez-vous:');
    if (title) {
      selectInfo.view.calendar.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Voulez-vous supprimer le rendez-vous '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
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
        select={handleDateSelect}
        eventClick={handleEventClick}
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
        initialEvents={[
          {
            title: 'Consultation - Spirit',
            start: new Date().setHours(10, 0),
            end: new Date().setHours(11, 0),
          }
        ]}
      />
    </div>
  );
}