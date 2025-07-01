import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';


const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  // Open Add Event Modal
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setNewEventTitle('');
    setShowAddModal(true);
  };

  // Add Event
  const handleAddEvent = () => {
    if (newEventTitle.trim()) {
      setEvents([
        ...events,
        {
          title: newEventTitle,
          start: selectedDate,
          allDay: true,
          backgroundColor: '#3B82F6',
          borderColor: '#3B82F6',
          textColor: '#fff',
        },
      ]);
    }
    setShowAddModal(false);
  };

  // Open Delete Confirmation
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setShowDeleteModal(true);
  };

  // Delete Event
  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.start !== selectedEvent.startStr || event.title !== selectedEvent.title));
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Calendrier</h2>

      {/* FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
          
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        locales={[frLocale]}
        locale="fr"
      />

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Ajouter un événement</h3>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Titre de l'événement"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                onClick={() => setShowAddModal(false)}
              >
                Annuler
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleAddEvent}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Supprimer l'événement</h3>
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer "<strong>{selectedEvent.title}</strong>" ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleDeleteEvent}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
