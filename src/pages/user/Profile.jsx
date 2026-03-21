import { useAuth } from '../../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <section className="page-card">
      <h1 className="page-title">Perfil</h1>

      <div className="item-data mt-4">
        <p>
          <span className="item-label">Usuario:</span> {user?.username || 'No disponible'}
        </p>
      </div>
    </section>
  )
}