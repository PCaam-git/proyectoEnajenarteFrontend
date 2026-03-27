import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createUser,
  getUserById,
  updateUser,
} from '../../services/adminService'

export default function AdminUserForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    age: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      loadUser()
    }
  }, [id])

  async function loadUser() {
    try {
      setLoading(true)
      setError('')

      const data = await getUserById(id)

      setFormData({
        username: data.username || '',
        password: '',
        email: data.email || '',
        fullName: data.fullName || '',
        age: '',
      })
    } catch (err) {
      setError('No se ha podido cargar el usuario.')
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
        ...formData,
        age: Number(formData.age),
      }

      if (isEditMode) {
        await updateUser(id, payload)
      } else {
        await createUser(payload)
      }

      navigate('/admin/usuarios')
    } catch (err) {
      setError('No se ha podido guardar el usuario.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? 'Editar usuario' : 'Crear usuario'}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Usuario</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={formData.password}
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
          <label>Nombre completo</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Edad</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </section>
  )
}