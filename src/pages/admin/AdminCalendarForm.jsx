import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createAdminCalendar,
  getAdminCalendarById,
  getAllSpeakers,
  updateAdminCalendar
} from '../../services/adminService'

// Componente para crear o editar una entrada del calendario en el panel de administración
export default function AdminCalendarForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  // Estado para manejar los datos del formulario
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

  // Estados para manejar la carga de datos, la lista de ponentes, el estado de guardado y los errores
  const [loading, setLoading] = useState(isEdit)
  const [speakers, setSpeakers] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSpeakers()
  }, [])

  // Si estamos editando una entrada del calendario, cargamos sus datos para mostrarlos en el formulario
  useEffect(() => {
    if (isEdit && speakers.length > 0) {
      loadAdminCalendar()
    }
  }, [id, speakers])

  // Carga los datos de la entrada del calendario para edición
  async function loadAdminCalendar() {
    try {
      setLoading(true)
      setError('')

      // Obtiene los datos de la entrada del calendario por ID y los asigna al formulario
      const data = await getAdminCalendarById(id)

      // Busca el ponente seleccionado en la lista de ponentes para mostrar su nombre en el dropdown
      const savedSpeakerName = data.speakerName || ''

      // Normaliza el nombre del ponente guardado para compararlo con los nombres de los ponentes disponibles
      const matchedSpeaker = speakers.find(
        (speaker) =>
          normalizeText(`${speaker.firstName} ${speaker.lastName}`) ===
        normalizeText(savedSpeakerName)
      )

      setForm({
        title: data.title || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        hour: data.hour || '',
        durationMinutes: data.durationMinutes || '',
        category: data.category || '',
        description: data.description || '',
        speakerName: matchedSpeaker ? `${matchedSpeaker.firstName} ${matchedSpeaker.lastName}`
          : savedSpeakerName
      })

    } catch (err) {
      setError('No se ha podido cargar el calendario.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carga la lista de ponentes para el dropdown
  async function loadSpeakers() {
    try {
      const data = await getAllSpeakers()
      setSpeakers(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  // Normaliza el texto para comparaciones (por ejemplo, al buscar el ponente seleccionado)
  function normalizeText(value) {
    return (value || '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
  }

  // Maneja los cambios en los campos del formulario
  function handleChange(event) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  // Maneja el envío del formulario para crear o actualizar una entrada del calendario
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSaving(true)
      setError('')

      // Prepara el payload para enviar al backend, asegurándose de convertir la duración a número
      const payload = {
        ...form,
        durationMinutes: Number(form.durationMinutes)
      }

      // Si se ha seleccionado un ponente, encuentra su ID para enviarlo al backend
      if (isEdit) {
        await updateAdminCalendar(id, payload)
      } else {
        await createAdminCalendar(payload)
      }

      // Redirige de vuelta a la lista de calendarios después de guardar
      navigate('/admin/calendario')
    } catch (error) {
      console.error(error)

      const backendError = error.response?.data

      // Maneja los errores de la respuesta del backend para mostrar mensajes más específicos
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

  // Muestra un mensaje de carga mientras se obtienen los datos para edición
  if (loading) {
    return <p className="empty-message">Cargando entradas del calendario...</p>
  }

  // Renderiza el formulario para crear o editar una entrada del calendario
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
          <select
            name="speakerName"
            value={form.speakerName}
            onChange={handleChange}
            className="input"
          >
            <option value="">Selecciona un ponente</option>
            {speakers.map((speaker) => (
              <option
                key={speaker.id}
                value={`${speaker.firstName} ${speaker.lastName}`}
              >
                {speaker.firstName} {speaker.lastName}
              </option>
            ))}
          </select>
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
