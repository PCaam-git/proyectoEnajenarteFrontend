import { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/adminService'

export default function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const data = await getAllUsers()
    setUsers(data)
  }

  return (
    <section className="page-card">
      <h1 className="page-title">Usuarios</h1>

      <div className="list-grid mt-6">
        {users.map((user) => (
          <div key={user.id} className="item-card">
            <p><strong>{user.username}</strong></p>
            <p>{user.email}</p>
            <p>{user.fullName}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}