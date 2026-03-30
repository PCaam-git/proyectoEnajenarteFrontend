import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAllAdminCalendar,
  deleteAdminCalendar
} from '../../services/adminService'

// Componente para la gestión del calendario en el panel de administración
export default function AdminCalendar() {
  const [calendarEntries, setCalendarEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    loadCalendarEntries()
  }, [])

  // Función para cargar las entradas del calendario desde el backend
  async function loadCalendarEntries() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllAdminCalendar()
      setCalendarEntries(data || [])
    } catch (error) {
      setError('No se ha podido cargar el calendario.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  // Función para eliminar una entrada del calendario
  async function handleDelete(entryId) {
    const confirmed = window.confirm('¿Quieres eliminar esta entrada?')
    if (!confirmed) return

    try {
      await deleteAdminCalendar(entryId)
      loadCalendarEntries()
    } catch (error) {
      setError('No se ha podido eliminar la entrada.')
      console.error(error)
    }
  }

  // Función para normalizar una fecha a medianoche (00:00:00) para comparaciones
  function normalizeDate(dateValue) {
    const normalizedDate = new Date(dateValue)
    normalizedDate.setHours(0, 0, 0, 0)
    return normalizedDate
  }

  // Función para obtener las entradas del calendario que corresponden a una fecha específica
  function getEntriesForDate(dateValue) {
    const currentDate = normalizeDate(dateValue)

    return calendarEntries.filter((entry) => {
      const startDate = normalizeDate(entry.startDate)
      const endDate = normalizeDate(entry.endDate)

      return currentDate >= startDate && currentDate <= endDate
    })
  }

  // Función para determinar si una entrada del calendario abarca varios días
  function isMultiDayEntry(entry) {
    return entry.startDate !== entry.endDate
  }

  // Función para obtener el color del marcador según la categoría de la entrada
  function getMarkerColor(category) {
    if (category === 'WORKSHOP') return '#F72C5B'
    if (category === 'PROGRAM') return '#A7D477'
    if (category === 'EVENT') return '#FFB347'
    if (category === 'PERSONAL') return '#6B7280'
    return '#9CA3AF'
  }

  // Función para obtener la etiqueta legible de la categoría
  function getCategoryLabel(category) {
    if (category === 'WORKSHOP') return 'Taller'
    if (category === 'PROGRAM') return 'Programa'
    if (category === 'EVENT') return 'Evento'
    if (category === 'PERSONAL') return 'Personal'
    return 'Desconocido'
  }

  // Función para comparar dos entradas del calendario por su hora para ordenarlas
  function compareEntriesByHour(firstEntry, secondEntry) {
    const firstHour = firstEntry.hour || ' '
    const secondHour = secondEntry.hour || ' '

    return firstHour.localeCompare(secondHour)
  }

  // Función para abrir una entrada del calendario en Google Calendar
  function openInGoogleCalendar(entry) {
    const startDateTime = `${entry.startDate}T${entry.hour}:00`
    const startDate = new Date(startDateTime)

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + entry.durationMinutes)

    // Función para formatear una fecha en el formato requerido por Google Calendar
    function formatGoogleDate(dateValue) {
      const year = dateValue.getFullYear()
      const month = String(dateValue.getMonth() + 1).padStart(2, '0')
      const day = String(dateValue.getDate()).padStart(2, '0')
      const hours = String(dateValue.getHours()).padStart(2, '0')
      const minutes = String(dateValue.getMinutes()).padStart(2, '0')
      const seconds = String(dateValue.getSeconds()).padStart(2, '0')

      return `${year}${month}${day}T${hours}${minutes}${seconds}`
    }

    const googleUrl = new URL('https://www.google.com/calendar/render')
    googleUrl.searchParams.set('action', 'TEMPLATE')
    googleUrl.searchParams.set('text', entry.title || 'Entrada de calendario')
    googleUrl.searchParams.set(
      'dates',
      `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`
    )
    googleUrl.searchParams.set('details', entry.description || '')
    googleUrl.searchParams.set('location', entry.speakerName || '')

    window.open(googleUrl.toString(), '_blank')
  }

  // Función para renderizar los marcadores en el calendario según las entradas del día
  function renderCalendarMarkers(dateValue, view) {
    if (view !== 'month') return null

    const entriesForDate = getEntriesForDate(dateValue)

    if (entriesForDate.length === 0) return null

    return (
      <div className="mt-1 flex justify-center gap-1">
        {entriesForDate.slice(0, 2).map((entry) => {
          const markerColor = getMarkerColor(entry.category)

          return isMultiDayEntry(entry) ? (
            <span
              key={entry.id}
              className="inline-block h-1 w-3 rounded"
              style={{ backgroundColor: markerColor }}
            ></span>
          ) : (
            <span
              key={entry.id}
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: markerColor }}
            ></span>
          )
        })}

        {entriesForDate.length > 2 && (
          <span className="text-[10px] text-gray-600">
            +{entriesForDate.length - 2}
          </span>
        )}
      </div>
    )
  }

  // Obtener las entradas del calendario para la fecha seleccionada y ordenarlas por hora
  const selectedDateEntries = getEntriesForDate(selectedDate).sort(compareEntriesByHour)

  if (loading) {
    return <p className="empty-message">Cargando calendario...</p>
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Calendario</h1>

        <Link to="/admin/calendario/nuevo" className="primary-button">
          Añadir entrada
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!error && calendarEntries.length === 0 && (
        <p className="empty-message">No hay entradas en el calendario.</p>
      )}

      {!error && calendarEntries.length > 0 && (
        <>
          <div className="mt-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date, view }) => renderCalendarMarkers(date, view)}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: '#F72C5B' }}
              ></span>
              Taller
            </div>

            <div className="flex items-center gap-1">
              <span
                className="h-1 w-3 rounded"
                style={{ backgroundColor: '#A7D477' }}
              ></span>
              Programa
            </div>

            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: '#6B7280' }}
              ></span>
              Personal
            </div>

            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: '#FFB347' }}
              ></span>
              Evento
            </div>
          </div>

          {selectedDateEntries.length === 0 && (
            <p className="empty-message mt-6">
              No hay entradas para la fecha seleccionada.
            </p>
          )}

          {selectedDateEntries.length > 0 && (
            <div className="list-grid mt-6">
              {selectedDateEntries.map((entry) => (
                <article key={entry.id} className="item-card">
                  <h2 className="card-title">{entry.title}</h2>

                  <div className="item-data">
                    {entry.category === 'WORKSHOP' && (
                      <>
                        <p>
                          <span className="item-label">Fecha:</span>{' '}
                          {new Date(entry.startDate).toLocaleDateString('es-ES')}
                        </p>
                        <p>
                          <span className="item-label">Hora:</span> {entry.hour}
                        </p>
                        <p>
                          <span className="item-label">Duración:</span>{' '}
                          {entry.durationMinutes} min
                        </p>
                      </>
                    )}

                    {entry.category === 'PROGRAM' && (
                      <>
                        <p>
                          <span className="item-label">Inicio:</span>{' '}
                          {new Date(entry.startDate).toLocaleDateString('es-ES')}
                        </p>
                        <p>
                          <span className="item-label">Fin:</span>{' '}
                          {new Date(entry.endDate).toLocaleDateString('es-ES')}
                        </p>
                        <p>
                          <span className="item-label">Hora:</span> {entry.hour}
                        </p>
                      </>
                    )}

                    {entry.category === 'EVENT' && (
                      <>
                        <p>
                          <span className="item-label">Fecha:</span>{' '}
                          {new Date(entry.startDate).toLocaleDateString('es-ES')}
                        </p>
                        <p>
                          <span className="item-label">Hora:</span> {entry.hour}
                        </p>
                      </>
                    )}

                    {entry.category === 'PERSONAL' && (
                      <>
                        <p>
                          <span className="item-label">Inicio:</span>{' '}
                          {new Date(entry.startDate).toLocaleDateString('es-ES')}
                        </p>
                        <p>
                          <span className="item-label">Fin:</span>{' '}
                          {new Date(entry.endDate).toLocaleDateString('es-ES')}
                        </p>
                        <p>
                          <span className="item-label">Hora:</span> {entry.hour}
                        </p>
                        <p>
                          <span className="item-label">Duración:</span>{' '}
                          {entry.durationMinutes} min
                        </p>
                      </>
                    )}

                    <p>
                      <span className="item-label">Tipo:</span>{' '}
                      {getCategoryLabel(entry.category)}
                    </p>

                    {entry.speakerName && (
                      <p>
                        <span className="item-label">Ponente:</span>{' '}
                        {entry.speakerName}
                      </p>
                    )}
                  </div>

                  <div className="admin-actions">
                    <Link
                      to={`/admin/calendario/editar/${entry.id}`}
                      className="primary-button"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => openInGoogleCalendar(entry)}
                    >
                      Google Calendar
                    </button>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}