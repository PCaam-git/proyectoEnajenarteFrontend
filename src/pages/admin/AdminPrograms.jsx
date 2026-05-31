import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProgram, getAllPrograms } from "../../services/adminService";

// Página de administración de programas
export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPrograms();
  }, []);

  // Cargar programas
  async function loadPrograms() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllPrograms();
      setPrograms(data || []);
    } catch (error) {
      setError("No se han podido cargar los programas.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Eliminar programa
  async function handleDelete(programId) {
    const confirmed = window.confirm("¿Quieres eliminar este programa?");
    if (!confirmed) return;

    try {
      await deleteProgram(programId);
      loadPrograms();
    } catch (error) {
      setError("No se ha podido eliminar el programa.");
      console.error(error);
    }
  }

  // Se muestra un mensaje de carga, error o una lista de programas con opciones para editar o eliminar cada programa.
  return (
    <section className="page-card">
      <div className="admin-header">
        <h1 className="page-title">Programas</h1>

        <Link to="/admin/programas/nuevo" className="primary-button">
          Crear programa
        </Link>
      </div>

      {loading && <p className="empty-message">Cargando programas...</p>}
      {!loading && error && <p className="error-message">{error}</p>}
      {!loading && !error && programs.length === 0 && (
        <p className="empty-message">No hay programas disponibles.</p>
      )}

      {!loading && !error && programs.length > 0 && (
        <div className="list-grid mt-6">
          {programs.map((program) => (
            <article key={program.id} className="item-card">
              <h2 className="card-title">{program.name}</h2>

              <p className="page-text mt-2">{program.description}</p>

              <div className="item-data">
                <p>
                  <span className="item-label">Inicio:</span>{" "}
                  {new Date(program.initDate).toLocaleDateString("es-ES")}
                </p>

                <p>
                  <span className="item-label">Fin:</span>{" "}
                  {new Date(program.finishDate).toLocaleDateString("es-ES")}
                </p>

                <p>
                  <span className="item-label">Hora:</span> {program.hour}
                </p>

                <p>
                  <span className="item-label">Duración:</span>{" "}
                  {program.durationMinutes} min
                </p>

                <p>
                  <span className="item-label">Capacidad:</span>{" "}
                  {program.minimumParticipants}  {program.maxCapacity} plazas
                </p>
                <p>
                  <span className="item-label">Precio: </span>
                  {program.price} €
                </p>

                <p>
                  <span className="item-label">Ubicación:</span>{" "}
                  {program.location}
                </p>

                <p>
                  <span className="item-label">Modalidad:</span>{" "}
                  {program.isOnline ? "Online" : "Presencial"}
                </p>

                <p>
                  <span className="item-label">Estado:</span> {program.status}
                </p>

                <p>
                  <span className="item-label">Ponente:</span>{" "}
                  {program.speakerName || "Sin asignar"}
                </p>
              </div>

              <div className="admin-actions">
                <Link
                  to={`/admin/programas/editar/${program.id}`}
                  className="primary-button"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDelete(program.id)}
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
