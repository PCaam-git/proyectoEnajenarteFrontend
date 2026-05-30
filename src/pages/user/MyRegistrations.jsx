import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getUserRegistrations } from '../../services/userService'

export default function MyRegistrations() {
  const { user } = useAuth()

  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRegistrations()
  }, [])

  async function loadRegistrations() {
    try {
      setLoading(true)
      setError('')

      const data = await getUserRegistrations(user.id)
      
      setRegistrations(data)
    } catch (err) {
      setError('No se han podido cargar las inscripciones.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-card">
      <h1 className="page-title">Mis inscripciones</h1>

      {loading && <p className="empty-message">Cargando inscripciones...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && registrations.length === 0 && (
        <p className="empty-message">
          No tienes inscripciones registradas en este momento.
        </p>
      )}

      {!loading && !error && registrations.length > 0 && (
        <div className="list-grid mt-6">
          {registrations.map((registration) => (
            <article key={registration.registrationId} className="item-card">
              <h2 className="card-title">{registration.workshopName}</h2>

              <div className="item-data">
                <p>
                  <span className="item-label">ID inscripción:</span>{' '}
                  {registration.registrationId}
                </p>
                <p>
                  <span className="item-label">Fecha de inscripción:</span>{' '}
                  {new Date(registration.registrationDate).toLocaleDateString('es-ES')}
                </p>
                <p>
                  <span className="item-label">Estado inscripción:</span>{' '}
                  {registration.status}
                </p>
                <p>
                  <span className="item-label">Estado de pago:</span>{' '}
                  {registration.paymentStatus || 'Pendiente'}
                </p>
                <p>
                  <span className="item-label">ID workshop:</span>{' '}
                  {registration.workshopId}
                </p>
                <p>
                  <span className="item-label">Fecha de inicio:</span>{' '}
                  {new Date(registration.workshopStartDate).toLocaleDateString('es-ES')}
                </p>
                <p>
                  <span className="item-label">Estado workshop:</span>{' '}
                  {registration.workshopStatus}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}