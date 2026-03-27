import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createRegistration,
  getRegistrationById,
  updateRegistration,
} from '../../services/adminService'

export default function AdminRegistrationForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({
    numberOfTickets: '',
    userId: '',
    workshopId: '',
    paymentStatus: 'PENDING',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      loadRegistration()
    }
  }, [id])

  async function loadRegistration() {
    try {
      setLoading(true)
      setError('')

      const data = await getRegistrationById(id)

      setFormData({
        numberOfTickets: data.numberOfTickets || '',
        userId: data.userId || '',
        workshopId: data.workshopId || '',
        paymentStatus: data.paymentStatus || 'PENDING',
      })
    } catch (err) {
      setError('No se ha podido cargar la inscripción.')
      console.error(err)
    } finally {
      setLoading(false)
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

      const payload = {
        numberOfTickets: Number(formData.numberOfTickets),
        userId: Number(formData.userId),
        workshopId: Number(formData.workshopId),
        paymentStatus: formData.paymentStatus,
      }

      if (isEditMode) {
        await updateRegistration(id, payload)
      } else {
        await createRegistration(payload)
      }

      navigate('/admin/inscripciones')
    } catch (err) {
      setError('No se ha podido guardar la inscripción.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? 'Editar inscripción' : 'Crear inscripción'}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Número de entradas</label>
          <input
            name="numberOfTickets"
            type="number"
            value={formData.numberOfTickets}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>

        <div className="form-field">
          <label>User ID</label>
          <input
            name="userId"
            type="number"
            value={formData.userId}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>

        <div className="form-field">
          <label>Workshop ID</label>
          <input
            name="workshopId"
            type="number"
            value={formData.workshopId}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>

        <div className="form-field">
          <label>Estado de pago</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}