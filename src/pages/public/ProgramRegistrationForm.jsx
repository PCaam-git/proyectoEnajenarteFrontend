import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createProgramRegistration } from '../../services/programRegistrationService'
import { getProgramById } from '../../services/programService'
import { useAuth } from '../../context/AuthContext'

export default function ProgramRegistrationForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  
  const [program, setProgram] = useState(null)
  const [formData, setFormData] = useState({
    numberOfTickets: 1,
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingProgram, setLoadingProgram] = useState(true)

  useEffect(() => {
    loadProgram()
  }, [id])

  async function loadProgram() {
    try {
      setLoadingProgram(true)
      setError('')

      const data = await getProgramById(id)

      if(!data) {
        setProgram(null)
        setError('No se ha encontrado el programa.')
        return
      }

      setProgram(data)
    } catch (error) {
      setProgram(null)
      setError('No se ha podido cargar el programa.')
      console.error(error)
    } finally {
      setLoadingProgram(false)
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
            from: `/programas/inscripcion/${id}`,
          },
        })
        return
      }

      if (!program) {
        setError('No se ha podido cargar la información del programa.')
        return
      }

      const payload = {
        numberOfTickets: Number(formData.numberOfTickets),
        userId: user.id,
        programId: Number(id),
        paymentStatus: 'PENDING',
      }

      await createProgramRegistration(payload)
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
        <h1 className="page-title mt-4">{program ? program.name : 'Programa'}</h1>
      </div>

      {loadingProgram && (
        <p className="page-text mt-6 text-center">Cargando información del programa...</p>
      )}

      {!loadingProgram && error && !program && (
        <p className="error-message mt-6">{error}</p>
      )}

      {!loadingProgram && program && (
        <form className="simple-form mt-6" onSubmit={handleSubmit}>
          <div className="page-card space-y-3">
            <h2 className="card-title">Resumen de la inscripción</h2>

            <div className="item-data">
              <p>
                <span className="item-label">Actividad:</span> {program.name}
              </p>

              <p>
                <span className="item-label">Tipo:</span> Programa
              </p>

              <p>
                <span className="item-label">Inicio:</span>{' '}
                {new Date(program.initDate).toLocaleDateString('es-ES')}
              </p>

              <p>
                <span className="item-label">Fin:</span>{' '}
                {new Date(program.finishDate).toLocaleDateString('es-ES')}
              </p>

              <p>
                <span className="item-label">Hora de inicio:</span> {program.hour}
              </p>

              <p>
                <span className="item-label">Duración:</span> {program.durationMinutes} min
              </p>

              <p>
                <span className="item-label">Modalidad:</span>{' '}
                {program.isOnline ? 'Online' : 'Presencial'}
              </p>

              <p>
                <span className="item-label">Precio mensual:</span> {program.price} €
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