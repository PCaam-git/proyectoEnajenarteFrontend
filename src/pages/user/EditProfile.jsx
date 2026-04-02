import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getUserByUsername, updateUser } from '../../services/userService'

export default function EditProfile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    gender: '',
    ageGroup: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      setLoading(true)
      setError('')

      const data = await getUserByUsername(user.username)

      if (!data) {
        setError('No se ha podido cargar el perfil del usuario.')
        return
      }

      setFormData({
        username: data.username || '',
        password: '',
        email: data.email || '',
        fullName: data.fullName || '',
        phone: data.phone || '',
        gender: mapGenderToEnum(data.gender),
        ageGroup: mapAgeGroupToEnum(data.ageGroup),
      })
    } catch (error) {
      setError('No se ha podido cargar el perfil del usuario.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function mapGenderToEnum(gender) {
    switch (gender) {
      case 'Femenino':
        return 'FEMALE'
      case 'Masculino':
        return 'MALE'
      case 'Otro':
        return 'OTHER'
      case 'Prefiero no contestar':
        return 'PREFER_NOT_TO_SAY'
      default:
        return ''
    }
  }

  function mapAgeGroupToEnum(ageGroup) {
    switch (ageGroup) {
      case 'Menos de 18':
        return 'UNDER_18'
      case '18-24':
        return 'BETWEEN_18_24'
      case '25-34':
        return 'BETWEEN_25_34'
      case '35-44':
        return 'BETWEEN_35_44'
      case '45-54':
        return 'BETWEEN_45_54'
      case '55-64':
        return 'BETWEEN_55_64'
      case '65 o más':
        return 'OVER_65'
      case 'Prefiero no contestar':
        return 'PREFER_NOT_TO_SAY'
      default:
        return ''
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
      setSaving(true)
      setError('')

      const payload = {
        ...formData,
        phone: Number(formData.phone),
      }

      await updateUser(user.id, payload)
      navigate('/perfil')
    } catch (error) {
      const backendError = error.response?.data

      if (backendError?.message) {
        setError(backendError.message)
      } else if (backendError?.errors) {
        const firstError = Object.values(backendError.errors)[0]
        setError(firstError || 'No se ha podido actualizar el perfil.')
      } else {
        setError('No se ha podido actualizar el perfil.')
      }

      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">Editar perfil</h1>

      {loading && <p className="empty-message">Cargando perfil...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && (
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
            <label>Teléfono</label>
            <input
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Género</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="FEMALE">Femenino</option>
              <option value="MALE">Masculino</option>
              <option value="OTHER">Otro</option>
              <option value="PREFER_NOT_TO_SAY">Prefiero no contestar</option>
            </select>
          </div>

          <div className="form-field">
            <label>Rango de edad</label>
            <select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="UNDER_18">Menos de 18</option>
              <option value="BETWEEN_18_24">18-24</option>
              <option value="BETWEEN_25_34">25-34</option>
              <option value="BETWEEN_35_44">35-44</option>
              <option value="BETWEEN_45_54">45-54</option>
              <option value="BETWEEN_55_64">55-64</option>
              <option value="OVER_65">65 o más</option>
              <option value="PREFER_NOT_TO_SAY">Prefiero no contestar</option>
            </select>
          </div>

          <div className="form-field">
            <label>Nueva contraseña</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Introduce tu contraseña"
            />
          </div>

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      )}
    </section>
  )
}