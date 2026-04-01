import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sendContactMessage } from '../../services/contactService'
import { getAllWorkshops } from '../../services/workshopService'
import { getAllPrograms } from '../../services/programService'

export default function Contact() {
  const location = useLocation()
  const topicParam = new URLSearchParams(location.search).get('tema')

  const staticTopic =
    topicParam === 'biblioteca-viva'
      ? 'Biblioteca Viva'
      : topicParam === 'salud-l-mental'
        ? 'Salud L-Mental'
        : ''

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    category: staticTopic ? 'PROGRAM' : 'WORKSHOP',
    referenceId: '',
    message: staticTopic
      ? `Quiero solicitar más información sobre ${staticTopic}.`
      : '',
  })

  const [workshops, setWorkshops] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!staticTopic) {
    loadWorkshops()
    loadPrograms()
    }
  }, [staticTopic])

  async function loadWorkshops() {
    try {
      const data = await getAllWorkshops()
      setWorkshops(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  async function loadPrograms() {
    try {
      const data = await getAllPrograms()
      setPrograms(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  const isStaticContact = staticTopic !== ''

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'category') {
      setForm({
        ...form,
        category: value,
        referenceId: '',
      })
      return
    }

    setForm({
      ...form,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      const payload = isStaticContact
        ? {
            ...form,
            category: 'PROGRAM',
            referenceId: '',
          }
        : form

      await sendContactMessage(payload)

      setSuccess('Mensaje enviado correctamente.')
      setForm({
        fullName: '',
        email: '',
        category: isStaticContact ? 'PROGRAM' : 'WORKSHOP',
        referenceId: '',
        message: isStaticContact
          ? `Quiero solicitar más información sobre ${staticTopic}.`
          : '',
      })
    } catch (error) {
      setError('No se ha podido enviar el mensaje.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const currentList = form.category === 'WORKSHOP' ? workshops : programs

  return (
    <section className="page-card max-w-3xl mx-auto">
      <div className="text-center">
        <span className="hero-tag">Contacto</span>
        <h1 className="page-title mt-4">Cuéntanos en qué podemos ayudarte</h1>
        <p className="page-text mt-4">
          Puedes escribirnos para consultar información sobre talleres,
          programas y propuestas de EnajenArte. Te responderemos de forma
          cercana y personalizada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="form-field">
          <label>Nombre completo</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="input"
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input"
            placeholder="tu@email.com"
            required
          />
        </div>

        {isStaticContact ? (
          <div className="form-field">
            <label>Tema de consulta</label>
            <input type="text" value={staticTopic} className="input" readOnly />
          </div>
        ) : (
          <>
            <div className="form-field">
              <label>Tipo de consulta</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input"
              >
                <option value="WORKSHOP">Taller</option>
                <option value="PROGRAM">Programa</option>
              </select>
            </div>

            <div className="form-field">
              <label>Selecciona una opción</label>
              <select
                name="referenceId"
                value={form.referenceId}
                onChange={handleChange}
                className="input"
                required={!isStaticContact}
              >
                <option value="">Selecciona una opción</option>
                {currentList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="form-field">
          <label>Mensaje</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Escribe tu mensaje"
            required
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  )
}