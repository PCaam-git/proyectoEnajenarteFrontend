import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/userService'
import { loginUser } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    age: '',
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

      const registerPayload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        fullName: formData.fullName,
        age: Number(formData.age),
      }

      await registerUser(registerPayload)

      const loginPayload = {
        username: formData.username,
        password: formData.password,
      }

      const authData = await loginUser(loginPayload)
      login(authData)

      if (authData.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/perfil')
      }
    } catch (err) {
      if (err?.errors) {
        const messages = Object.values(err.errors).join(', ')
        setError(messages)
      } else {
        setError('Usuario creado correctamente, pero no se pudo iniciar sesión automáticamente. Por favor, intenta iniciar sesión manualmente.')
      }

      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">Registro</h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="fullName">Nombre completo</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="form-field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-field">
          <label htmlFor="age">Edad</label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Tu edad"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <p className="auth-text">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  )
}