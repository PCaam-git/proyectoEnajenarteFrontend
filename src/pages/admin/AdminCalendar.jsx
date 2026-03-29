import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAllAdminCalendar,
  deleteAdminCalendar
} from '../../services/adminService'

export default function AdminCalendar() {
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    loadBlocks()
  }, [])

  async function loadBlocks() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllAdminCalendar()
      setBlocks(data || [])
    } catch (err) {
      setError('No se ha podido cargar el calendario.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('¿Quieres eliminar esta entrada?')
    if (!confirmed) return

    try {
      await deleteAdminCalendar(id)
      loadBlocks()
    } catch (err) {
      setError('No se ha podido eliminar la entrada.')
      console.error(err)
    }
  }

  function normalizeDate(date) {
    const normalizedDate = new Date(date)
    normalizedDate.setHours(0, 0, 0, 0)
    return normalizedDate
  }

  function getBlocksForDate(date) {
    const currentDate = normalizeDate(date)

    return blocks.filter((block) => {
      const startDate = normalizeDate(block.startDate)
      const endDate = normalizeDate(block.endDate)

      return currentDate >= startDate && currentDate <= endDate
    })
  }

  function isMultiDayBlock(block) {
    return block.startDate !== block.endDate
  }

  function getMarkerColor(category) {
    if (category === 'WORKSHOP') return '#F72C5B'
    if (category === 'PROGRAM') return '#A7D477'
    if (category === 'EVENT') return '#FFB347'
    if (category === 'PERSONAL') return '#6B7280'
    return '#9CA3AF'
  }

  function compareBlocksByHour(blockA, blockB) {
    const hourA = blockA.hour || ' '
    const hourB = blockB.hour || ' '

    return hourA.localeCompare(hourB)
  }

  function renderCalendarMarkers(date, view) {
    if (view !== 'month') return null

    const markers = getBlocksForDate(date)

    if (markers.length === 0) return null

    return (
      <div className="mt-1 flex justify-center gap-1">
        {markers.slice(0, 2).map((block) => {
          const color = getMarkerColor(block.category)

          return isMultiDayBlock(block) ? (
            <span
              key={block.id}
              className="inline-block h-1 w-3 rounded"
              style={{ backgroundColor: color }}
            ></span>
          ) : (
            <span
              key={block.id}
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
          )
        })}

        {markers.length > 2 && (
          <span className="text-[10px] text-gray-600">
            +{markers.length - 2}
          </span>
        )}
      </div>
    )
  }

  const filteredBlocks = getBlocksForDate(selectedDate).sort(compareBlocksByHour)

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

      {!error && blocks.length === 0 && (
        <p className="empty-message">No hay entradas en el calendario.</p>
      )}

      {!error && blocks.length > 0 && (
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

          {filteredBlocks.length === 0 && (
            <p className="empty-message mt-6">
              No hay entradas para la fecha seleccionada.
            </p>
          )}

          {filteredBlocks.length > 0 && (
            <div className="list-grid mt-6">
              {filteredBlocks.map((block) => (
                <article key={block.id} className="item-card">
                  <h2 className="card-title">{block.title}</h2>

                  <div className="item-data">
                    <p>
                      <span className="item-label">Inicio:</span>{' '}
                      {new Date(block.startDate).toLocaleDateString('es-ES')}
                    </p>

                    <p>
                      <span className="item-label">Fin:</span>{' '}
                      {new Date(block.endDate).toLocaleDateString('es-ES')}
                    </p>

                    <p>
                      <span className="item-label">Hora:</span> {block.hour}
                    </p>

                    <p>
                      <span className="item-label">Duración:</span>{' '}
                      {block.durationMinutes} min
                    </p>

                    <p>
                      <span className="item-label">Tipo:</span> {block.category}
                    </p>

                    {block.speakerName && (
                      <p>
                        <span className="item-label">Ponente:</span>{' '}
                        {block.speakerName}
                      </p>
                    )}
                  </div>

                  <div className="admin-actions">
                    <Link
                      to={`/admin/calendario/editar/${block.id}`}
                      className="primary-button"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDelete(block.id)}
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