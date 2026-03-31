import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllEvents } from '../../services/eventService'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllEvents()
      setEvents(data || [])
    } catch (error) {
      setError('No se han podido cargar los eventos.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Eventos</span>

        <h1 className="page-title mt-4">
          Encuentros para compartir, inspirar y conectar
        </h1>

        <p className="page-text mt-4">
          Los eventos de EnajenArte reúnen creatividad, expresión y encuentro en
          espacios pensados para abrir conversaciones, generar comunidad y poner
          en valor el bienestar emocional.
        </p>

        <p className="page-text mt-4">
          Son experiencias que invitan a participar, escuchar y compartir desde
          una mirada cercana, sensible y transformadora.
        </p>
      </section>

      <section className="page-card mt-8">
        {loading && <p className="empty-message">Cargando eventos...</p>}

        {!loading && error && <p className="error-message">{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p className="empty-message">
            No hay eventos disponibles en este momento.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group h-[420px] w-full max-w-xs [perspective:1200px]"
              >
                <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm [backface-visibility:hidden]">
                    <span className="service-label">Evento</span>

                    <h2 className="card-title mt-3">{event.title}</h2>

                    <p className="page-text mt-4 line-clamp-5">
                      {event.location}
                    </p>

                    <p className="mt-4 text-sm text-[var(--color-text-soft)]">
                      Gira la tarjeta para ver los detalles.
                    </p>

                    <div className="mt-6">
                      <Link to="/contacto" className="primary-button">
                        Me apunto
                      </Link>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h3 className="card-title">Detalles</h3>

                    <div className="mt-4 max-h-[260px] overflow-y-auto pr-2">
                      <div className="item-data">
                        <p>
                          <span className="item-label">Ubicación:</span>{' '}
                          {event.location}
                        </p>

                        <p>
                          <span className="item-label">Fecha:</span>{' '}
                          {new Date(event.eventDate).toLocaleString('es-ES')}
                        </p>

                        <p>
                          <span className="item-label">Precio:</span>{' '}
                          {event.entryFee} €
                        </p>

                        <p>
                          <span className="item-label">Público:</span>{' '}
                          {event.isPublic ? 'Sí' : 'No'}
                        </p>

                        {event.speakerName && (
                          <p>
                            <span className="item-label">Ponente:</span>{' '}
                            {event.speakerName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link to="/contacto" className="primary-button">
                        Me apunto
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}