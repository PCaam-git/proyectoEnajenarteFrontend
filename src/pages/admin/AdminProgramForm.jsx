import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createProgram,
  getAllSpeakers,
  getProgramById,
  updateProgram,
} from '../../services/adminService'

// Página de administración para crear o editar un programa
export default function AdminProgramForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  // Estado para el formulario, lista de ponentes, error y carga
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    initDate: '',
    finishDate: '',
    hour: '',
    durationMinutes: '',
    confirmationDeadline: '',
    price: '',
    minimumParticipants: '',
    maxCapacity: '',
    isOnline: false,
    speakerId: '',
  })

  // Estado para la lista de ponentes, error y carga
  const [speakers, setSpeakers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Cargar ponentes y programa (si es modo edición) al montar el componente
  useEffect(() => {
    loadSpeakers()

    if (isEditMode) {
      loadProgram()
    }
  }, [id])

  // Cargar ponentes para el select
  async function loadSpeakers() {
    try {
      const data = await getAllSpeakers()
      setSpeakers(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  // Cargar datos del programa para editar
  async function loadProgram() {
    try {
      setLoading(true)
      setError('')

      const data = await getProgramById(id)

      // Mapear datos del programa al estado del formulario
      setFormData({
        name: data.name || '',
        description: data.description || '',
        location: data.location || '',
        initDate: data.initDate || '',
        finishDate: data.finishDate || '',
        hour: data.hour || '',
        durationMinutes: data.durationMinutes || '',
        confirmationDeadline: data.confirmationDeadline || '',
        price: data.price || '',
        minimumParticipants: data.minimumParticipants || '',
        maxCapacity: data.maxCapacity || '',
        isOnline: data.isOnline,
        speakerId: data.speakerId || '',
      })
    } catch (error) {
      setError('No se ha podido cargar el programa.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Manejar cambios en los campos del formulario
  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // Manejar envío del formulario para crear o actualizar el programa
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      // Preparar payload para enviar al backend, asegurando que los campos numéricos se envíen como números
      const payload = {
        ...formData,
        durationMinutes: Number(formData.durationMinutes),
        price: Number(formData.price),
        minimumParticipants: Number(formData.minimumParticipants),
        maxCapacity: Number(formData.maxCapacity),
        speakerId: Number(formData.speakerId),
      }

      // Llamar a la API para crear o actualizar el programa según el modo
      if (isEditMode) {
        await updateProgram(id, payload)
      } else {
        await createProgram(payload)
      }

      navigate('/admin/programas')
    } catch (error) {
      console.error(error)

      // Manejar errores del backend, mostrando el mensaje de error específico si está disponible
      const backendError = error.response?.data

      if (backendError?.message) {
        setError(backendError.message)
      } else if (backendError?.errors) {
        const firstError = Object.values(backendError.errors)[0]
        setError(firstError || 'No se ha podido guardar el programa.')
      } else {
        setError('No se ha podido guardar el programa.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Renderizar el formulario con campos para el programa, mostrando errores y estado de carga
  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? 'Editar programa' : 'Crear programa'}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="form-field">
          <label>Ubicación</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Fecha de inicio</label>
          <input
            name="initDate"
            type="date"
            value={formData.initDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Fecha de fin</label>
          <input
            name="finishDate"
            type="date"
            value={formData.finishDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Hora</label>
          <input
            name="hour"
            type="time"
            value={formData.hour}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Duración (minutos)</label>
          <input
            name="durationMinutes"
            type="number"
            value={formData.durationMinutes}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Fecha límite de confirmación</label>
          <input
            name="confirmationDeadline"
            type="date"
            value={formData.confirmationDeadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Número mínimo de participantes</label>
          <input
            name="minimumParticipants"
            type="number"
            value={formData.minimumParticipants}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Capacidad máxima</label>
          <input
            name="maxCapacity"
            type="number"
            value={formData.maxCapacity}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Ponente</label>
          <select
            name="speakerId"
            value={formData.speakerId}
            onChange={handleChange}
          >
            <option value="">Selecciona un ponente</option>
            {speakers.map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.firstName} {speaker.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="checkbox-field">
          <input
            id="isOnline"
            name="isOnline"
            type="checkbox"
            checked={formData.isOnline}
            onChange={handleChange}
          />
          <label htmlFor="isOnline">Programa online</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}