import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRegistration,
  getRegistrationById,
  updateRegistration,
} from "../../services/adminService";
import { getAllUsers } from "../../services/userService";
import { getAllWorkshops } from "../../services/adminService";

export default function AdminRegistrationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    numberOfTickets: "",
    userId: "",
    workshopId: "",
    paymentStatus: "PENDING",
  });

  const [users, setUsers] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFormData();

    if (isEditMode) {
      loadRegistration();
    }
  }, [id]);

  async function loadFormData() {
    try {
      const usersData = await getAllUsers();
      const workshopsData = await getAllWorkshops();

      setUsers(usersData);
      setWorkshops(workshopsData);
    } catch (err) {
      setError("No se han podido cargar los datos del formulario.");
      console.error(err);
    }
  }

  async function loadRegistration() {
    try {
      setLoading(true);
      setError("");

      const data = await getRegistrationById(id);

      setFormData({
        numberOfTickets: data.numberOfTickets || "",
        userId: data.userId || "",
        workshopId: data.workshopId || "",
        paymentStatus: data.paymentStatus || "PENDING",
      });
    } catch (err) {
      setError("No se ha podido cargar la inscripción.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        numberOfTickets: Number(formData.numberOfTickets),
        userId: Number(formData.userId),
        workshopId: Number(formData.workshopId),
        paymentStatus: formData.paymentStatus,
      };

      if (isEditMode) {
        await updateRegistration(id, payload);
      } else {
        await createRegistration(payload);
      }

      navigate("/admin/inscripciones");
    } catch (err) {
      setError("No se ha podido guardar la inscripción.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? "Editar inscripción" : "Crear inscripción"}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Número de entradas</label>
          <input
            name="numberOfTickets"
            type="number"
            value={formData.numberOfTickets}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>

        <div className="form-field">
          <label>Usuario</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            disabled={isEditMode}
          >
            <option value="">Selecciona un usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName} ({user.username})
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Taller</label>
          <select
            name="workshopId"
            value={formData.workshopId}
            onChange={handleChange}
            disabled={isEditMode}
          >
            <option value="">Selecciona un taller</option>
            {workshops.map((workshop) => (
              <option key={workshop.id} value={workshop.id}>
                {workshop.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Estado de pago</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
}
