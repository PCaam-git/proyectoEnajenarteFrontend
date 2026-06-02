import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
    gender: "",
    ageGroup: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const registerPayload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        fullName: formData.fullName,
        phone: Number(formData.phone),
        gender: formData.gender,
        ageGroup: formData.ageGroup,
      };

      await registerUser(registerPayload);

      const loginPayload = {
        username: formData.username,
        password: formData.password,
      };

      const authData = await loginUser(loginPayload);
      login(authData);

      if (authData.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } catch (error) {
      if (error?.errors) {
        const messages = Object.values(error.errors).join(", ");
        setError(messages);
      } else {
        setError(
          "Usuario creado correctamente, pero no se pudo iniciar sesión automáticamente. Por favor, intenta iniciar sesión manualmente.",
        );
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.2fr] lg:items-start">
      <div className="relative hidden overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 shadow-sm lg:block">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[var(--color-primary-soft)]/25" />
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[var(--color-secondary-soft)]/80" />

        <div className="relative z-10">
          <span className="hero-tag w-fit">Comunidad</span>
          <h2 className="page-title mt-5">Forma parte de EnajenArte</h2>
          <p className="page-text mt-4">
            Regístrate para acceder a tu espacio personal y poder apuntarte a
            las propuestas de EnajenArte.
          </p>
        </div>
      </div>

      <div className="auth-card">
        <div className="text-center">
          <span className="hero-tag">Registro</span>
        </div>

        <form className="simple-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="fullName">Nombre completo</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="form-field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tu nombre de usuario"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Tu teléfono"
            />
          </div>

          <div className="form-field">
            <label htmlFor="gender">Género</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="FEMALE">Femenino</option>
              <option value="MALE">Masculino</option>
              <option value="OTHER">Otro</option>
              <option value="PREFER_NOT_TO_SAY">Prefiero no contestar</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="ageGroup">Grupo de edad</label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
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

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="auth-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </section>
  );
}
