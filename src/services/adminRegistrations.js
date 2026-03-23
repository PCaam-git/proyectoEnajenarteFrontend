import { useEffect, useState } from 'react'
import {
  getAllRegistrations,
  updateRegistration,
} from '../../services/adminService'

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    loadRegistrations()
  }, [])

  async function loadRegistrations() {
    const data = await getAllRegistrations()
    setRegistrations(data)
  }

  async function changePaymentStatus(reg, newStatus) {
    const updated = { ...reg, paymentStatus: newStatus }

    await updateRegistration(updated)
    loadRegistrations()
  }

  return (
    <section className="page-card">
      <h1 className="page-title">Inscripciones</h1>

      <div className="list-grid mt-6">
        {registrations.map((r) => (
          <div key={r.id} className="item-card">
            <p><strong>ID:</strong> {r.id}</p>
            <p><strong>User:</strong> {r.userId}</p>
            <p><strong>Workshop:</strong> {r.workshopId}</p>
            <p><strong>Tickets:</strong> {r.numberOfTickets}</p>
            <p><strong>Estado:</strong> {r.status}</p>
            <p><strong>Pago:</strong> {r.paymentStatus}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => changePaymentStatus(r, 'PAID')}
                className="primary-button"
              >
                Marcar pagado
              </button>

              <button
                onClick={() => changePaymentStatus(r, 'PENDING')}
                className="primary-button"
              >
                Pendiente
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}