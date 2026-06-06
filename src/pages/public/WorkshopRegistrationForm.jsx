import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createWorkshopRegistration } from '../../services/registrationService'
import { getWorkshopById } from '../../services/workshopService'
import { useAuth } from '../../context/AuthContext'

export default function WorkshopRegistrationForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [workshop, setWorkshop] = useState(null)
  const [formData, setFormData] = useState({
    numberOfTickets: 1,
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingWorkshop, setLoadingWorkshop] = useState(true)

  useEffect(() => {
    loadWorkshop()
  }, [id])

  async function loadWorkshop() {
    try {
      setLoadingWorkshop(true)
      setError('')

      const data = await getWorkshopById(id)

      if(!data) {
        setWorkshop(null)
        setError('No se ha encontrado el taller.')
        return
      }

      setWorkshop(data)
    } catch (error) {
      setWorkshop(null)
      setError('No se ha podido cargar la información del taller.')
      console.error(error)
    } finally {
      setLoadingWorkshop(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      if (!isAuthenticated() || !user?.id) {
        navigate('/login', {
          state: {
            from: `/talleres/inscripcion/${id}`,
          },
        })
        return
      }

      if (!workshop) {
        setError('No se ha podido cargar la información del taller.')
        return
      }

      const payload = {
        numberOfTickets: Number(formData.numberOfTickets),
        userId: user.id,
        workshopId: Number(id),
        paymentStatus: 'PENDING',
      }

      await createWorkshopRegistration(payload)
      setSuccess('Inscripción realizada correctamente. Ya puedes consultarla en el apartado Mis inscripciones de tu perfil.')
    } catch (error) {
      const backendError = error.response?.data

      if (backendError?.message) {
        setError(backendError.message)
      } else {
        setError('No se ha podido realizar la inscripción.')
      }

      console.error(error)
    } finally {
      setLoading(false)
    }
  }

    return (
    <section className="auth-card">
      <div className="text-center">
        <span className="hero-tag">Inscripción</span>
        <h1 className="page-title mt-4">{workshop ? workshop.name : 'Taller'}</h1>
       </div>

      {loadingWorkshop && (
        <p className="page-text mt-6 text-center">Cargando información del taller...</p>
      )}

      {!loadingWorkshop && error && !workshop && (
        <p className="error-message mt-6">{error}</p>
      )}

      {!loadingWorkshop && workshop && (
        <form className="simple-form mt-6" onSubmit={handleSubmit}>
          <div className="page-card space-y-3">
            <h2 className="card-title">Resumen de la inscripción</h2>

            <div className="item-data">
              <p>
                <span className="item-label">Actividad:</span> {workshop.name}
              </p>

              <p>
                <span className="item-label">Tipo:</span> Taller
              </p>

              <p>
                <span className="item-label">Fecha:</span>{' '}
                {new Date(workshop.startDate).toLocaleDateString('es-ES')}
              </p>

              {workshop.hour && (
                <p>
                  <span className="item-label">Hora:</span> {workshop.hour}
                </p>
              )}

              <p>
                <span className="item-label">Duración:</span> {workshop.durationMinutes} min
              </p>

              <p>
                <span className="item-label">Modalidad:</span>{' '}
                {workshop.isOnline ? 'Online' : 'Presencial'}
              </p>

              <p>
                <span className="item-label">Precio:</span> {workshop.price} €
              </p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="numberOfTickets">Número de plazas</label>
            <input
              id="numberOfTickets"
              name="numberOfTickets"
              type="number"
              min="1"
              max="5"
              value={formData.numberOfTickets}
              onChange={handleChange}
            />
            <p className="page-text mt-2">
              Puedes reservar entre una y cinco plazas en una misma inscripción. Si necesitas reservar más plazas, por favor contacta con nosotros a través del formulario de contacto.
            </p>
          </div>

          {error && <p className="error-message">{error}</p>}

          {success && (
            <div className="space-y-3">
              <p className="text-green-600">{success}</p>
              <Link to="/mis-inscripciones" className="primary-button">
                Ver mis inscripciones
              </Link>
            </div>
          )}

          {!success && (
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Realizando inscripción...' : 'Confirmar inscripción'}
            </button>
          )}
        </form>
      )}
    </section>
  )
}