import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteWorkshop, getAllWorkshops } from "../../services/adminService";
import { getStatusLabel } from "../../utils/statusLabels";

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWorkshops();
  }, []);

  async function loadWorkshops() {
    try {
      setLoading(true);
      setError("");
      const data = await getAllWorkshops();
      setWorkshops(data || []);
    } catch (err) {
      setError("No se han podido cargar los talleres.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Quieres eliminar este taller?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteWorkshop(id);
      setError("");
      loadWorkshops();
    } catch (err) {
      if (err.response?.status === 409) {
        setError(
          "No se puede eliminar el taller porque tiene inscripciones asociadas.",
        );
      } else {
        setError("No se ha podido eliminar el taller.");
      }

      console.error(err);
    }
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Talleres</h1>
        <Link to="/admin/talleres/nuevo" className="primary-button">
          Crear taller
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando talleres...</p>}
      {!loading && error && <p className="error-message">{error}</p>}
      {!loading && workshops.length === 0 && (
        <p className="empty-message">No hay talleres disponibles.</p>
      )}

      {!loading && workshops.length > 0 && (
        <div className="list-grid mt-6">
          {workshops.map((workshop) => (
            <article key={workshop.id} className="item-card">
              <h2 className="card-title">{workshop.name}</h2>
              <p className="page-text mt-2">{workshop.description}</p>

              <div className="item-data">
                <p>
                  <span className="item-label">Inicio:</span>{" "}
                  {new Date(workshop.startDate).toLocaleDateString("es-ES")}
                </p>
                {workshop.confirmationDeadline && (
                  <p>
                    <span className="item-label">Confirmación:</span>{" "}
                    {new Date(workshop.confirmationDeadline).toLocaleDateString(
                      "es-ES",
                    )}
                  </p>
                )}
                <p>
                  <span className="item-label">Hora:</span> {workshop.hour}
                </p>
                <p>
                  <span className="item-label">Duración:</span>{" "}
                  {workshop.durationMinutes} min
                </p>
                <p>
                  <span className="item-label">Precio:</span> {workshop.price} €
                </p>
                <p>
                  <span className="item-label">Capacidad:</span>{" "}
                  {workshop.minimumParticipants} - {workshop.maxCapacity} plazas
                </p>
                <p>
                  <span className="item-label">Ubicación:</span>{" "}
                  {workshop.location}
                </p>
                <p>
                  <span className="item-label">Modalidad:</span>{" "}
                  {workshop.isOnline ? "Online" : "Presencial"}
                </p>
                <p>
                  <span className="item-label">Ponente:</span>{" "}
                  {workshop.speakerName || "Sin asignar"}
                </p>
                <p>
                  <span className="item-label">Estado:</span>{" "}
                  {getStatusLabel(workshop.status)}
                </p>
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/talleres/editar/${workshop.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(workshop.id)}
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
