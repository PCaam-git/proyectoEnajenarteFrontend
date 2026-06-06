import { useEffect, useState } from 'react'
import { getAllEvents } from '../../services/adminService'

export default function AdminEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    const data = await getAllEvents()
    setEvents(data)
  }

  return (
    <section className="page-card">
      <h1 className="page-title">Eventos</h1>

      <div className="list-grid mt-6">
        {events.map((event) => (
          <div key={event.id} className="item-card">
            <h2>{event.title}</h2>
            <p>{event.location}</p>
            <p>{new Date(event.eventDate).toLocaleString()}</p>
            <p>{event.entryFee} €</p>
            <p>{event.isPublic ? 'Público' : 'Privado'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}