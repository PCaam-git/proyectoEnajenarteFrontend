import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAllAdminCalendar,
  deleteAdminCalendar
} from '../../services/adminService'

export default function AdminCalendar() {

  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadBlocks()
  }, [])

  async function loadBlocks() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllAdminCalendar()
      setBlocks(data || [])

    } catch (err) {
      setError('No se ha podido cargar el calendario.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('¿Quieres eliminar este bloque?')
    if (!confirmed) return

    try {
      await deleteAdminCalendar(id)
      loadBlocks()
    } catch (err) {
      setError('No se ha podido eliminar el bloque.')
      console.error(err)
    }
  }

  return (
    <section className="page-card">

      <div className="admin-header">
        <h1 className="page-title">Calendario</h1>

        <Link to="/admin/calendario/nuevo" className="primary-button">
          Crear bloque
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando calendario...</p>}
      {!loading && error && <p className="error-message">{error}</p>}
      {!loading && !error && blocks.length === 0 && (
        <p className="empty-message">No hay bloques en el calendario.</p>
      )}

      {!loading && !error && blocks.length > 0 && (
        <div className="list-grid mt-6">
          {blocks.map((block) => (
            <article key={block.id} className="item-card">

              <h2 className="card-title">{block.title}</h2>

              <div className="item-data">
                <p>
                  <span className="item-label">Inicio:</span>{' '}
                  {new Date(block.startDate).toLocaleDateString('es-ES')}
                </p>

                <p>
                  <span className="item-label">Fin:</span>{' '}
                  {new Date(block.endDate).toLocaleDateString('es-ES')}
                </p>

                <p>
                  <span className="item-label">Hora:</span> {block.hour}
                </p>

                <p>
                  <span className="item-label">Duración:</span> {block.durationMinutes} min
                </p>

                <p>
                  <span className="item-label">Tipo:</span> {block.category}
                </p>

                {block.speakerName && (
                  <p>
                    <span className="item-label">Ponente:</span> {block.speakerName}
                  </p>
                )}
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/calendario/editar/${block.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(block.id)}
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