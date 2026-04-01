import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

      const data = await loginUser(formData)
      login(data)

      const from = location.state?.from

      if (from) {
        navigate(from)
      } else if (data.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/perfil')
      } 
      
    } catch (error) {
      setError('Usuario o contraseña incorrectos.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <div className="text-center">
        <span className="hero-tag">Acceso</span>
        <h1 className="page-title mt-4">Inicia sesión en EnajenArte</h1>
        <p className="page-text mt-4">
          Accede a tu espacio personal para consultar tu perfil y gestionar tus
          inscripciones.
        </p>
      </div>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Tu nombre de usuario"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Tu contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="auth-text">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </section>
  )
}