import { useEffect, useState } from 'react'
import {
  deleteProgramRegistration,
  getAllProgramRegistrations,
} from '../../services/programRegistrationService'

export default function AdminProgramRegistrations() {
  const [programRegistrations, setProgramRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProgramRegistrations()
  }, [])

  async function loadProgramRegistrations() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllProgramRegistrations()
      setProgramRegistrations(data || [])
    } catch (error) {
      setError('No se han podido cargar las inscripciones de programas.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      '¿Quieres eliminar esta inscripción de programa?'
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')
      await deleteProgramRegistration(id)
      loadProgramRegistrations()
    } catch (error) {
      const backendError = error.response?.data

      if (backendError?.message) {
        setError(backendError.message)
      } else {
        setError('No se ha podido eliminar la inscripción de programa.')
      }

      console.error(error)
    }
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Inscripciones de programas</h1>
      </div>

      {loading && (
        <p className="empty-message">Cargando inscripciones de programas...</p>
      )}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && programRegistrations.length === 0 && (
        <p className="empty-message">
          No hay inscripciones de programas disponibles.
        </p>
      )}

      {!loading && !error && programRegistrations.length > 0 && (
        <div className="list-grid mt-6">
          {programRegistrations.map((registration) => (
            <article key={registration.id} className="item-card">
              <div className="item-data">
                <p>
                  <span className="item-label">Fecha:</span>{' '}
                  {new Date(registration.registrationDate).toLocaleDateString(
                    'es-ES'
                  )}
                </p>

                <p>
                  <span className="item-label">Código:</span>{' '}
                  {registration.confirmationCode}
                </p>

                <p>
                  <span className="item-label">Usuario:</span>{' '}
                  {registration.fullName}
                </p>

                <p>
                  <span className="item-label">Programa:</span>{' '}
                  {registration.programName}
                </p>

                <p>
                  <span className="item-label">Pagado:</span>{' '}
                  {registration.isPaid ? 'Sí' : 'No'}
                </p>

                <p>
                  <span className="item-label">Número de plazas:</span>{' '}
                  {registration.numberOfTickets}
                </p>

                <p>
                  <span className="item-label">Importe:</span>{' '}
                  {registration.amountPaid} €
                </p>

                <p>
                  <span className="item-label">Estado:</span>{' '}
                  {registration.status}
                </p>

                <p>
                  <span className="item-label">Estado de pago:</span>{' '}
                  {registration.paymentStatus}
                </p>
              </div>

              <div className="admin-actions">
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(registration.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}