import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

      const data = await loginUser(formData);
      login(data);

      const from = location.state?.from;

      if (from) {
        navigate(from);
      } else if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/mis-inscripciones");
      }
    } catch (error) {
      setError("Usuario o contraseña incorrectos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
      <div className="relative hidden overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 shadow-sm lg:block">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[var(--color-primary-soft)]/25" />
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[var(--color-secondary-soft)]/80" />

        <div className="relative z-10 flex h-full flex-col justify-center">
          <span className="hero-tag w-fit">Tu espacio</span>
          <h2 className="page-title mt-5">Vuelve a tu rincón creativo</h2>
          <p className="page-text mt-5">
            Accede para consultar tus inscripciones, revisar tus actividades y
            mantener actualizados tus datos personales.
          </p>
        </div>
      </div>

      <div className="auth-card">
        <span className="hero-tag">Inicia sesión</span>

        <form className="simple-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Tu nombre de usuario"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-text">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </section>
  );
}
