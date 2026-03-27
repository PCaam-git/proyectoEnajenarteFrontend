import { useEffect, useState } from 'react'
import { sendContactMessage } from '../../services/contactService'
import { getAllWorkshops } from '../../services/workshopService'
import { getAllPrograms } from '../../services/programService'

export default function Contact() {

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    category: 'WORKSHOP',
    referenceId: '',
    message: ''
  })

  const [workshops, setWorkshops] = useState([])
  const [programs, setPrograms] = useState([])

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadWorkshops()
    loadPrograms()
  }, [])

  async function loadWorkshops() {
    try {
      const data = await getAllWorkshops()
      setWorkshops(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  async function loadPrograms() {
    try {
      const data = await getAllPrograms()
      setPrograms(data || [])
    } catch (err) {
      console.error(err)
    }
}

  function handleChange(e) {
    const { name, value } = e.target

    if (name === 'category') {
       setForm({
        ...form,
        category: value,
        referenceId: ''
       })
       return
  }

  setForm({ ...form, [name]: value })
}

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      await sendContactMessage(form)

      setSuccess('Mensaje enviado correctamente')
      setForm({
        fullName: '',
        email: '',
        category: 'WORKSHOP',
        referenceId: '',
        message: ''
      })

    } catch (err) {
      setError('No se ha podido enviar el mensaje')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const currentList = form.category === 'WORKSHOP' ? workshops : programs

  return (
    <section className="page-card max-w-xl mx-auto">
      <h1 className="page-title">Contacto</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          value={form.fullName}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
        >
          <option value="WORKSHOP">Taller</option>
          <option value="PROGRAM">Programa</option>
        </select>

        <select
          name="referenceId"
          value={form.referenceId}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Selecciona una opción</option>
          {currentList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Escribe tu mensaje"
          value={form.message}
          onChange={handleChange}
          className="input"
          required
        />

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  )
}