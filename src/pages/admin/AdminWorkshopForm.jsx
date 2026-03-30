import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createWorkshop,
  getAllSpeakers,
  getWorkshopById,
  updateWorkshop,
} from '../../services/adminService'

export default function AdminWorkshopForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    hour: '',
    confirmationDeadline: '',
    durationMinutes: '',
    price: '',
    minimumParticipants: '',
    maxCapacity: '',
    isOnline: false,
    speakerId: '',
  })

  const [error, setError] = useState('')
  const [speakers, setSpeakers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSpeakers()

    if (isEditMode) {
      loadWorkshop()
    }
  }, [id])

  async function loadSpeakers() {
    try {
      const data = await getAllSpeakers()
      setSpeakers(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  async function loadWorkshop() {
    try {
      setLoading(true)
      setError('')

      const data = await getWorkshopById(id)

      setFormData({
        name: data.name || '',
        description: data.description || '',
        startDate: data.startDate || '',
        hour: data.hour || '',
        confirmationDeadline: data.confirmationDeadline || '',
        durationMinutes: data.durationMinutes || '',
        price: data.price || '',
        minimumParticipants: data.minimumParticipants || '',
        maxCapacity: data.maxCapacity ||'',
        isOnline: data.isOnline,
        speakerId: data.speakerId || '',
      })
    } catch (error) {
      setError('No se ha podido cargar el taller.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      const payload = {
        ...formData,
        durationMinutes: Number(formData.durationMinutes),
        price: Number(formData.price),
        minimumParticipants: Number(formData.minimumParticipants),
        maxCapacity: Number(formData.maxCapacity),
        speakerId: Number(formData.speakerId),
      }

      if (isEditMode) {
        await updateWorkshop(id, payload)
      } else {
        await createWorkshop(payload)
      }

      navigate('/admin/talleres')
    } catch (error) {
    console.error(error)

    const backendError = error.response?.data

    if (backendError?.message) {
      setError(backendError.message)
    } else if (backendError?.errors) {
      const firstError = Object.values(backendError.errors)[0]
     setError(firstError || 'No se ha podido guardar el taller.')
    } else {
      setError('No se ha podido guardar el taller.')
    }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? 'Editar taller' : 'Crear taller'}
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
          <label>Fecha de inicio</label>
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Hora de inicio</label>
          <input
            name="hour"
            type="time"
            value={formData.hour}
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
          <label>Participantes mínimos</label>
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
          <label htmlFor="isOnline">Taller online</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}
