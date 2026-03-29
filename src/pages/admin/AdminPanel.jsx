import { Link } from 'react-router-dom'

export default function AdminPanel() {
  return (
    <section className="page-card">
      <h1 className="page-title">Panel de administración</h1>
      <p className="page-text">
        Desde aquí puedes acceder a la gestión principal del sistema.
      </p>
      <div className="section-grid mt-6">
        <Link to="/admin/usuarios" className="info-box">
          <h2 className="card-title">Usuarios</h2>
          <p className="page-text mt-2">
            Consultar el listado de usuarios registrados.
          </p>
        </Link>

        <Link to="/admin/eventos" className="info-box">
          <h2 className="card-title">Eventos</h2>
          <p className="page-text mt-2">
            Consultar el listado de eventos disponibles.
          </p>
        </Link>

        <Link to="/admin/talleres" className="info-box">
          <h2 className="card-title">Talleres</h2>
          <p className="page-text mt-2">
            Consultar el listado de talleres disponibles.
          </p>
        </Link>

        <Link to="/admin/programas" className="info-box">
          <h2 className="card-title">Programas</h2>
          <p className="page-text mt-2">
            Consultar el listado de programas disponibles.
          </p>
        </Link>

        <Link to="/admin/inscripciones" className="info-box">
          <h2 className="card-title">Inscripciones</h2>
          <p className="page-text mt-2">
            Consultar inscripciones y actualizar el estado de pago.
          </p>
        </Link>

        <Link to="/admin/calendario" className="info-box">
          <h2 className="card-title">Calendario admin</h2>
          <p className="page-text mt-2">
            Consultar y gestionar la planificación interna.
          </p>
        </Link>
      </div>
    </section>
  )
}