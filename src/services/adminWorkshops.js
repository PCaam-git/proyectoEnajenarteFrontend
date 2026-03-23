import { useEffect, useState } from 'react'
import { getAllWorkshops } from '../../services/adminService'

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([])

  useEffect(() => {
    loadWorkshops()
  }, [])

  async function loadWorkshops() {
    const data = await getAllWorkshops()
    setWorkshops(data)
  }

  return (
    <section className="page-card">
      <h1 className="page-title">Workshops</h1>

      <div className="list-grid mt-6">
        {workshops.map((w) => (
          <div key={w.id} className="item-card">
            <h2>{w.name}</h2>
            <p>{w.description}</p>
            <p>{new Date(w.startDate).toLocaleDateString()}</p>
            <p>{w.price} €</p>
            <p>{w.isOnline ? 'Online' : 'Presencial'}</p>
            <p>{w.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}