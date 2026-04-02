import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPrograms } from '../../services/programService'

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    loadPrograms()
  }, [])

  async function loadPrograms() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllPrograms()
      setPrograms(data || [])
    } catch (error) {
      setError('No se han podido cargar los programas.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Programas</span>

        <h1 className="page-title mt-4">
          Procesos de bienestar para explorar y transformar
        </h1>

        <p className="page-text mt-4">
          En EnajenArte entendemos los programas como recorridos de
          acompañamiento en los que emoción, pensamiento, creatividad y vínculo
          se integran para abrir procesos de reflexión, cuidado y crecimiento.
        </p>

        <p className="page-text mt-4">
          Son propuestas pensadas para crear experiencias significativas,
          sostenidas en el tiempo y adaptables a distintos contextos, siempre
          desde una mirada cercana, humana y transformadora.
        </p>
      </section>

      <section className="page-card mt-8">
        {loading && <p className="empty-message">Cargando programas...</p>}

        {!loading && error && <p className="error-message">{error}</p>}

        {!loading && !error && programs.length === 0 && (
          <p className="empty-message">
            No hay programas disponibles en este momento.
          </p>
        )}

        {!loading && !error && programs.length > 0 && (
          <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.id}
                className="group h-[440px] w-full max-w-xs [perspective:1200px]"
              >
                <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm [backface-visibility:hidden]">
                    <span className="service-label">Programa</span>

                    <h2 className="card-title mt-3">{program.name}</h2>

                    <p className="page-text mt-4 line-clamp-5">
                      {program.description}
                    </p>

                    <p className="mt-4 text-sm text-[var(--color-text-soft)]">
                      Gira la tarjeta para ver los detalles.
                    </p>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => 
                          navigate(`/programas/inscripcion/${program.id}`, {
                            state: { name: program.name },
                          })
                        }  
                      >
                        Me apunto
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h3 className="card-title">Detalles</h3>

                    <div className="mt-4 max-h-[280px] overflow-y-auto pr-2">
                      <p className="page-text mt-2">{program.description}</p>

                      <div className="item-data mt-4">
                        <p>
                          <span className="item-label">Inicio:</span>{' '}
                          {new Date(program.initDate).toLocaleDateString('es-ES')}
                        </p>

                        <p>
                          <span className="item-label">Fin:</span>{' '}
                          {new Date(program.finishDate).toLocaleDateString('es-ES')}
                        </p>

                        <p>
                          <span className="item-label">Hora de inicio:</span> {program.hour}
                        </p>

                        <p>
                          <span className="item-label">Duración:</span>{' '}
                          {program.durationMinutes} min
                        </p>

                        <p>
                          <span className="item-label">Precio mensual:</span> {program.price} €
                        </p>

                        <p>
                          <span className="item-label">Modalidad:</span>{' '}
                          {program.isOnline ? 'Online' : 'Presencial'}
                        </p>

                        <p>
                          <span className="item-label">Estado:</span> {program.status}
                        </p>

                        {program.speakerName && (
                          <p>
                            <span className="item-label">Ponente:</span>{' '}
                            {program.speakerName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => 
                          navigate(`/programas/inscripcion/${program.id}`, {
                            state: { name: program.name },
                          })
                        }
                      >
                        Me apunto
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}