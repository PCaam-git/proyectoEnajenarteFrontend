import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWorkshops } from "../../services/workshopService";
import { getStatusLabel } from "../../utils/statusLabels";
import artistas_zen from "../../assets/artistas_zen.png";
import Escritura_emocional from "../../assets/Escritura_emocional.png";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function isWorkshopAvailable(workshop) {
    if (workshop.status === "CANCELLED") {
      return false;
    }

    if (!workshop.startDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const workshopDate = new Date(`${workshop.startDate}T00:00:00`);
    workshopDate.setHours(0, 0, 0, 0);

    return workshopDate >= today;
  }

  useEffect(() => {
    loadWorkshops();
  }, []);

  async function loadWorkshops() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllWorkshops();
      const availableWorkshops = (data || []).filter(isWorkshopAvailable);

      setWorkshops(availableWorkshops);
    } catch (error) {
      setError("No se han podido cargar los talleres.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Talleres</span>

        <h1 className="page-title mt-4">
          Espacios para crear, sentir y compartir
        </h1>

        <p className="page-text mt-4">
          En EnajenArte entendemos los talleres como experiencias de bienestar y
          creatividad en las que la palabra, la emoción, la escucha y la
          expresión artística ayudan a abrir nuevos caminos personales y
          colectivos.
        </p>

        <p className="page-text mt-4">
          Cada propuesta busca acompañar procesos desde una mirada cercana y
          humana, generando espacios seguros en los que poder explorar, pensar,
          sentir y transformar.
        </p>
      </section>

      <section className="page-card relative mt-8 overflow-hidden">
  <img
    src={artistas_zen}
    alt=""
    className="pointer-events-none absolute right-8 top-8 hidden w-24 rotate-6 opacity-80 lg:block"
  />

  <img
    src={Escritura_emocional}
    alt=""
    className="pointer-events-none absolute bottom-8 left-8 hidden w-24 -rotate-6 opacity-80 lg:block"
  />
        {loading && <p className="empty-message">Cargando talleres...</p>}

        {!loading && error && <p className="error-message">{error}</p>}

        {!loading && workshops.length === 0 && (
          <p className="empty-message">
            No hay talleres disponibles en este momento.
          </p>
        )}

        {!loading && workshops.length > 0 && (
          <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-[repeat(auto-fit,minmax(280px,320px))] justify-center gap-8">
            {workshops.map((workshop) => (
              <article
                key={workshop.id}
                className="group h-[460px] w-full max-w-[320px] [perspective:1200px]"
              >
                <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-6 shadow-[0_14px_32px_rgba(0,0,0,0.08)] [backface-visibility:hidden]">
                    <span className="service-label">Taller</span>

                    <h2 className="card-title mt-3">{workshop.name}</h2>

                    <p className="page-text mt-4 line-clamp-5">
                      {workshop.description}
                    </p>

                    <p className="mt-4 text-sm text-[var(--color-text-soft)]">
                      Gira la tarjeta para ver los detalles.
                    </p>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                          navigate(`/talleres/inscripcion/${workshop.id}`, {
                            state: { name: workshop.name },
                          })
                        }
                      >
                        Me apunto
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_14px_32px_rgba(0,0,0,0.08)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h3 className="card-title">Detalles</h3>

                    <div className="mt-4 max-h-[280px] overflow-y-auto pr-2">
                      <p className="page-text">{workshop.description}</p>

                      <div className="item-data mt-4">
                        <p>
                          <span className="item-label">Fecha:</span>{" "}
                          {new Date(workshop.startDate).toLocaleDateString(
                            "es-ES",
                          )}
                        </p>

                        <p>
                          <span className="item-label">Duración:</span>{" "}
                          {workshop.durationMinutes} min
                        </p>

                        <p>
                          <span className="item-label">Precio:</span>{" "}
                          {workshop.price} €
                        </p>

                        <p>
                          <span className="item-label">Modalidad:</span>{" "}
                          {workshop.isOnline ? "Online" : "Presencial"}
                        </p>

                        <p>
                          <span className="item-label">Estado:</span>{" "}
                          {getStatusLabel(workshop.status)}
                        </p>

                        {workshop.speakerName && (
                          <p>
                            <span className="item-label">Ponente:</span>{" "}
                            {workshop.speakerName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                          navigate(`/talleres/inscripcion/${workshop.id}`, {
                            state: { name: workshop.name },
                          })
                        }
                      >
                        Me apunto
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
