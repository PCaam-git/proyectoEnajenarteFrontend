import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteRegistration,
  getAllRegistrations,
} from "../../services/adminService";
import {
  getStatusLabel,
  getPaymentStatusLabel,
} from "../../utils/statusLabels";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function loadRegistrations() {
    try {
      setLoading(true);
      setError("");
      const data = await getAllRegistrations();
      setRegistrations(data || []);
    } catch (err) {
      setError("No se han podido cargar las inscripciones.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Quieres eliminar esta inscripción?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteRegistration(id);
      loadRegistrations();
    } catch (err) {
      setError("No se ha podido eliminar la inscripción.");
      console.error(err);
    }
  }

  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Inscripciones</h1>
        <Link to="/admin/inscripciones/nuevo" className="primary-button">
          Crear inscripción
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando inscripciones...</p>}
      {!loading && error && <p className="error-message">{error}</p>}
      {!loading && !error && registrations.length === 0 && (
        <p className="empty-message">No hay inscripciones disponibles.</p>
      )}

      {!loading && !error && registrations.length > 0 && (
        <div className="list-grid mt-6">
          {registrations.map((registration) => (
            <article key={registration.id} className="item-card">
              <div className="item-data">
                <p>
                  <span className="item-label">Usuario:</span>{" "}
                  {registration.username || "Sin usuario"}
                </p>

                <p>
                  <span className="item-label">Taller:</span>{" "}
                  {registration.workshopName || "Sin taller"}
                </p>
                <p>
                  <span className="item-label">Fecha:</span>{" "}
                  {new Date(registration.registrationDate).toLocaleDateString(
                    "es-ES",
                  )}
                </p>
                <p>
                  <span className="item-label">Código:</span>{" "}
                  {registration.confirmationCode}
                </p>
                <p>
                  <span className="item-label">Entradas:</span>{" "}
                  {registration.numberOfTickets}
                </p>
                <p>
                  <span className="item-label">Importe:</span>{" "}
                  {registration.amountPaid} €
                </p>
                <p>
                  <span className="item-label">Estado:</span>{" "}
                  {getStatusLabel(registration.status)}
                </p>
                <p>
                  <span className="item-label">Estado de pago:</span>{" "}
                  {getPaymentStatusLabel(registration.paymentStatus)}
                </p>
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/inscripciones/editar/${registration.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(registration.id)}
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
