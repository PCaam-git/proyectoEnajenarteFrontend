import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../../services/adminService'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllUsers()
      setUsers(data || [])
    } catch (err) {
      setError('No se han podido cargar los usuarios.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('¿Quieres eliminar este usuario?')
    if (!confirmed) {
      return
    }

    try {
      await deleteUser(id)
      loadUsers()
    } catch (err) {
      if (err.response?.status === 409) {
        setError('No se puede eliminar el usuario porque tiene inscripciones asociadas.')
      } else {
        setError('No se ha podido eliminar el usuario.')
      }
      console.error(err)
    }
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Usuarios</h1>

        <Link to="/admin/usuarios/nuevo" className="primary-button">
          Crear usuario
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando usuarios...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="empty-message">No hay usuarios disponibles.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="list-grid mt-6">
          {users.map((user) => (
            <article key={user.id} className="item-card">
              <div className="item-data">
                <p>
                  <span className="item-label">Usuario:</span> {user.username}
                </p>
                <p>
                  <span className="item-label">Nombre:</span> {user.fullName}
                </p>
                <p>
                  <span className="item-label">Email:</span> {user.email}
                </p>
                <p>
                  <span className="item-label">Rol:</span> {user.role}
                </p>
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/usuarios/editar/${user.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}