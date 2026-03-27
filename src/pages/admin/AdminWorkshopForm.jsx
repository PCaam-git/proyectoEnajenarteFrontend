import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createWorkshop,
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
    confirmationDeadline: '',
    durationMinutes: '',
    price: '',
    minimumParticipants: '',
    maxCapacity: '',
    isOnline: false,
    speakerId: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      loadWorkshop()
    }
  }, [id])

  async function loadWorkshop() {
    try {
      setLoading(true)
      setError('')

      const data = await getWorkshopById(id)

      setFormData({
        name: data.name || '',
        description: data.description || '',
        startDate: data.startDate || '',
        confirmationDeadline: data.confirmationDeadline || '',
        durationMinutes: data.durationMinutes || '',
        price: data.price || '',
        minimumParticipants: '',
        maxCapacity: '',
        isOnline: data.isOnline,
        speakerId: data.speakerId || '',
      })
    } catch (err) {
      setError('No se ha podido cargar el workshop.')
      console.error(err)
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
    } catch (err) {
      setError('No se ha podido guardar el workshop.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? 'Editar workshop' : 'Crear workshop'}
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
          <label>Speaker ID</label>
          <input
            name="speakerId"
            type="number"
            value={formData.speakerId}
            onChange={handleChange}
          />
        </div>

        <div className="checkbox-field">
          <input
            id="isOnline"
            name="isOnline"
            type="checkbox"
            checked={formData.isOnline}
            onChange={handleChange}
          />
          <label htmlFor="isOnline">Workshop online</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}