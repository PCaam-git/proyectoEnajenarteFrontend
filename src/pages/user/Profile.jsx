import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getUserByUsername } from '../../services/userService'

export default function Profile() {
  const { user } = useAuth()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
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

      setProfile(data)
    } catch (err) {
      setError('No se ha podido cargar el perfil del usuario.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-card">
      <h1 className="page-title">Perfil</h1>

      {loading && <p className="empty-message">Cargando perfil...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && profile && (
        <div className="item-data mt-4">
          <p>
            <span className="item-label">Nombre completo:</span> {profile.fullName}
          </p>
          <p>
            <span className="item-label">Usuario:</span> {profile.username}
          </p>
          <p>
            <span className="item-label">Email:</span> {profile.email}
          </p>
          <p>
            <span className="item-label">Rol:</span> {profile.role}
          </p>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={() => window.location.href = '/perfil/editar'}
          className="primary-button"
        >
          Editar perfil
        </button>
      </div>
    </section>
  )
}