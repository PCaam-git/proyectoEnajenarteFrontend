import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEvent,
  getEventById,
  updateEvent,
} from "../../services/adminService";
import { getAllSpeakers } from "../../services/speakerService";

export default function AdminEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    eventDate: "",
    entryFee: "",
    isPublic: true,
    expectedAttendance: "",
    speakerId: "",
  });

  const [speakers, setSpeakers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSpeakers();

    if (isEditMode) {
      loadEvent();
    }
  }, [id]);

  async function loadSpeakers() {
    try {
      const data = await getAllSpeakers();
      setSpeakers(data);
    } catch (err) {
      setError("No se han podido cargar los ponentes.");
      console.error(err);
    }
  }

  async function loadEvent() {
    try {
      setLoading(true);
      setError("");

      const data = await getEventById(id);

      setFormData({
        title: data.title ?? "",
        location: data.location ?? "",
        eventDate: data.eventDate ? data.eventDate.slice(0, 16) : "",
        entryFee: data.entryFee ?? "",
        isPublic: data.isPublic ?? false,
        expectedAttendance: data.expectedAttendance ?? "",
        speakerId: data.speakerId ?? "",
      });

    } catch (err) {
      setError("No se ha podido cargar el evento.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...formData,
        entryFee: Number(formData.entryFee),
        expectedAttendance: Number(formData.expectedAttendance),
        speakerId: Number(formData.speakerId),
      };

      if (isEditMode) {
        await updateEvent(id, payload);
      } else {
        await createEvent(payload);
      }

      navigate("/admin/eventos");
    } catch (err) {
      setError("No se ha podido guardar el evento.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? "Editar evento" : "Crear evento"}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Título</label>
          <input name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Ubicación</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Fecha y hora</label>
          <input
            name="eventDate"
            type="datetime-local"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Precio</label>
          <input
            name="entryFee"
            type="number"
            step="0.01"
            value={formData.entryFee}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Asistencia esperada</label>
          <input
            name="expectedAttendance"
            type="number"
            value={formData.expectedAttendance}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Ponente</label>
          <select
            name="speakerId"
            value={formData.speakerId}
            onChange={handleChange}
          >
            <option value="">Selecciona un ponente</option>
            {speakers.map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.firstName} {speaker.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="checkbox-field">
          <input
            id="isPublic"
            name="isPublic"
            type="checkbox"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          <label htmlFor="isPublic">Evento público</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
}
