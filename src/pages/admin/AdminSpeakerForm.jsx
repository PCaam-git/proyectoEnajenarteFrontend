import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createSpeaker,
  getSpeakerById,
  updateSpeaker,
} from '../../services/adminService'

export default function AdminSpeakerForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    speciality: '',
    yearsExperience: '',
    workshopHoursTotal: '',
    available: true,
    joinDate: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      loadSpeaker()
    }
  }, [id])

  async function loadSpeaker() {
    try {
      setLoading(true)
      setError('')

      const data = await getSpeakerById(id)

      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        speciality: data.speciality || '',
        yearsExperience: data.yearsExperience || '',
        workshopHoursTotal: '',
        available: true,
        joinDate: '',
      })
    } catch (err) {
      setError('No se ha podido cargar el ponente.')
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
        yearsExperience: Number(formData.yearsExperience),
        workshopHoursTotal: Number(formData.workshopHoursTotal),
      }

      if (isEditMode) {
        await updateSpeaker(id, payload)
      } else {
        await createSpeaker(payload)
      }

      navigate('/admin/ponentes')
    } catch (err) {
      setError('No se ha podido guardar el ponente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? 'Editar ponente' : 'Crear ponente'}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Apellidos</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Especialidad</label>
          <input
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Años de experiencia</label>
          <input
            name="yearsExperience"
            type="number"
            value={formData.yearsExperience}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Horas totales de workshop</label>
          <input
            name="workshopHoursTotal"
            type="number"
            value={formData.workshopHoursTotal}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Fecha de incorporación</label>
          <input
            name="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={handleChange}
          />
        </div>

        <div className="checkbox-field">
          <input
            id="available"
            name="available"
            type="checkbox"
            checked={formData.available}
            onChange={handleChange}
          />
          <label htmlFor="available">Disponible</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}