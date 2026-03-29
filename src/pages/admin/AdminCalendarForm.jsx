import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createAdminCalendar,
  getAdminCalendarById,
  updateAdminCalendar
} from '../../services/adminService'

export default function AdminCalendarForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    hour: '',
    durationMinutes: '',
    category: '',
    description: '',
    speakerName: ''
  })

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      loadAdminCalendar()
    }
  }, [id])

  async function loadAdminCalendar() {
    try {
      setLoading(true)
      setError('')

      const data = await getAdminCalendarById(id)

      setForm({
        title: data.title || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        hour: data.hour || '',
        durationMinutes: data.durationMinutes || '',
        category: data.category || '',
        description: data.description || '',
        speakerName: data.speakerName || ''
      })
    } catch (err) {
      setError('No se ha podido cargar el calendario.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSaving(true)
      setError('')

      const payload = {
        ...form,
        durationMinutes: Number(form.durationMinutes)
      }

      if (isEdit) {
        await updateAdminCalendar(id, payload)
      } else {
        await createAdminCalendar(payload)
      }

      navigate('/admin/calendario')
    } catch (error) {
      console.error(error)

      const backendError = error.response?.data

      if (backendError?.message) {
        setError(backendError.message)
      } else if (backendError?.errors) {
        const firstError = Object.values(backendError.errors)[0]
        setError(firstError || 'No se ha podido guardar la entrada en el calendario.')
      } else {
        setError('No se ha podido guardar la entrada en el calendario.')
      }
    } finally {
      setSaving(false)
  }
}

  if (loading) {
    return <p className="empty-message">Cargando entradas del calendario...</p>
  }

  return (
    <section className="page-card max-w-3xl">
      <h1 className="page-title">
        {isEdit ? 'Editar calendario' : 'Nuevo calendario'}
      </h1>

      {error && <p className="error-message mt-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="form-label">Fecha de inicio</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="form-label">Fecha de fin</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="form-label">Hora</label>
          <input
            type="text"
            name="hour"
            value={form.hour}
            onChange={handleChange}
            className="input"
            placeholder="11:00"
            required
          />
        </div>

        <div>
          <label className="form-label">Duración (minutos)</label>
          <input
            type="number"
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            className="input"
            min="1"
            required
          />
        </div>

        <div>
          <label className="form-label">Categoría</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="WORKSHOP">Taller</option>
            <option value="PROGRAM">Programa</option>
            <option value="EVENT">Evento</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>

        <div>
          <label className="form-label">Ponente</label>
          <input
            type="text"
            name="speakerName"
            value={form.speakerName}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input"
            rows="4"
          />
        </div>

        <button type="submit" className="primary-button" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}