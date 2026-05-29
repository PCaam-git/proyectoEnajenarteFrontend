import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../services/adminService";

export default function AdminUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    prone: "",
    gender: "",
    ageGroup: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      loadUser();
    }
  }, [id]);

  async function loadUser() {
    try {
      setLoading(true);
      setError("");

      const data = await getUserById(id);

      setFormData({
        username: data.username || "",
        password: "",
        email: data.email || "",
        fullName: data.fullName || "",
        phone: data.phone || "",
        gender: mapGenderToEnum(data.gender),
        ageGroup: mapAgeGroupToEnum(data.ageGroup),
      });
    } catch (err) {
      setError("No se ha podido cargar el usuario.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function mapGenderToEnum(gender) {
    switch (gender) {
      case "Femenino":
        return "FEMALE";
      case "Masculino":
        return "MALE";
      case "Otro":
        return "OTHER";
      case "Prefiero no contestar":
        return "PREFER_NOT_TO_SAY";
      default:
        return "";
    }
  }

  function mapAgeGroupToEnum(ageGroup) {
    switch (ageGroup) {
      case "Menos de 18":
        return "UNDER_18";
      case "18-24":
        return "BETWEEN_18_24";
      case "25-34":
        return "BETWEEN_25_34";
      case "35-44":
        return "BETWEEN_35_44";
      case "45-54":
        return "BETWEEN_45_54";
      case "55-64":
        return "BETWEEN_55_64";
      case "65 o más":
        return "OVER_65";
      case "Prefiero no contestar":
        return "PREFER_NOT_TO_SAY";
      default:
        return "";
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
        password: formData.password.trim() === "" ? null : formData.password,
        email: formData.email,
        fullName: formData.fullName,
        phone: Number(formData.phone),
        gender: formData.gender,
        ageGroup: formData.ageGroup,
      };

      if (isEditMode) {
        await updateUser(id, commonData);
      } else {
        await createUser({
          username: formData.username,
          ...commonData,
        });
      }

      navigate("/admin/usuarios");
    } catch (err) {
      setError("No se ha podido guardar el usuario.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {isEditMode ? "Editar usuario" : "Crear usuario"}
      </h1>

      <form className="simple-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Usuario</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>

        <div className="form-field">
          <label>{isEditMode ? "Nueva contraseña" : "Contraseña"}</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              isEditMode
                ? "Deja el campo vacío para conservar la contraseña actual"
                : ""
            }
            required={!isEditMode}
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Nombre completo</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Teléfono</label>
          <input
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Género</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="FEMALE">Femenino</option>
            <option value="MALE">Masculino</option>
            <option value="OTHER">Otro</option>
            <option value="PREFER_NOT_TO_SAY">Prefiero no contestar</option>
          </select>
        </div>

        <div className="form-field">
          <label>Rango de edad</label>
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="UNDER_18">Menos de 18</option>
            <option value="BETWEEN_18_24">18-24</option>
            <option value="BETWEEN_25_34">25-34</option>
            <option value="BETWEEN_35_44">35-44</option>
            <option value="BETWEEN_45_54">45-54</option>
            <option value="BETWEEN_55_64">55-64</option>
            <option value="OVER_65">65 o más</option>
            <option value="PREFER_NOT_TO_SAY">Prefiero no contestar</option>
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
