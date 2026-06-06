import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteSpeaker, getAllSpeakers } from '../../services/adminService'

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSpeakers()
  }, [])

  async function loadSpeakers() {
    try {
      setLoading(true)
      setError('')
      const data = await getAllSpeakers()
      setSpeakers(data || [])
    } catch (err) {
      setError('No se han podido cargar los ponentes.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('¿Quieres eliminar este ponente?')

    if (!confirmed) {
      return
    }

    try {
      await deleteSpeaker(id)
      setError('')
      await loadSpeakers()
    } catch (err) {
      if (err.response?.status === 409) {
        setError('No se puede eliminar el ponente porque tiene eventos o talleres asociados.')
      } else {
        setError('No se ha podido eliminar el ponente.')
      }
      console.error(err)
    }
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Ponentes</h1>

        <Link to="/admin/ponentes/nuevo" className="primary-button">
          Crear ponente
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando ponentes...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && speakers.length === 0 && (
        <p className="empty-message">No hay ponentes disponibles.</p>
      )}

      {!loading && speakers.length > 0 && (
        <div className="list-grid mt-6">
          {speakers.map((speaker) => (
            <article key={speaker.id} className="item-card">
              <div className="item-data">
                <p>
                  <span className="item-label">Nombre:</span> {speaker.firstName} {speaker.lastName}
                </p>
                <p>
                  <span className="item-label">Email:</span> {speaker.email}
                </p>
                <p>
                  <span className="item-label">Especialidad:</span> {speaker.speciality}
                </p>
                <p>
                  <span className="item-label">Experiencia:</span> {speaker.yearsExperience} años
                </p>
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/ponentes/editar/${speaker.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(speaker.id)}
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