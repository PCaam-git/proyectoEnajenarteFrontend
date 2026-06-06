import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEvents } from "../../services/adminService";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");
      const data = await getAllEvents();
      setEvents(data || []);
    } catch (err) {
      setError("No se han podido cargar los eventos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Quieres eliminar este evento?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteEvent(id);
      setError("");
      await loadEvents();
    } catch (err) {
      setError("No se ha podido eliminar el evento.");
      console.error(err);
    }
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Eventos</h1>
        <Link to="/admin/eventos/nuevo" className="primary-button">
          Crear evento
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando eventos...</p>}
      {!loading && error && <p className="error-message">{error}</p>}
      {!loading && events.length === 0 && (
        <p className="empty-message">No hay eventos disponibles.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="list-grid mt-6">
          {events.map((event) => (
            <article key={event.id} className="item-card">
              <h2 className="card-title">{event.title}</h2>

              <div className="item-data">
                <p>
                  <span className="item-label">Ubicación:</span>{" "}
                  {event.location}
                </p>
                <p>
                  <span className="item-label">Fecha:</span>{" "}
                  {new Date(event.eventDate).toLocaleString("es-ES")}
                </p>
                <p>
                  <span className="item-label">Precio:</span> {event.entryFee} €
                </p>
                <p>
                  <span className="item-label">Asistencia esperada:</span>{" "}
                  {event.expectedAttendance}
                </p>
                <p>
                  <span className="item-label">Ponente:</span>{" "}
                  {event.speakerName || "Sin asignar"}
                </p>
                <p>
                  <span className="item-label">Acceso:</span>{" "}
                  {event.isPublic ? "Público" : "Privado"}
                </p>
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/eventos/editar/${event.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(event.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
