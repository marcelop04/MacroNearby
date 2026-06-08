export default function Comunidad() {
  return (
    <div className="panel comunidad-panel">
      <h2>Comunidad Interactiva</h2>
      <p className="subtitle">
        Conecta, comparte rutinas, retos y consejos con otros usuarios.
      </p>

      <div className="feed-comunidad">
        <div className="post">
          <div className="post-header">
            <strong>@UsuarioFitness</strong>{" "}
            <span className="badge-validacion">Creación Colectiva</span>
          </div>
          <p>
            Acabo de validar la información nutricional del nuevo menú en "El
            Huerto". ¡Las macros del pollo a la plancha están precisas! 💪
          </p>
          <button className="btn-small">👍 24</button>
        </div>

        <div className="post">
          <div className="post-header">
            <strong>@AtletaUNMSM</strong>{" "}
            <span className="badge-reto">Reto Saludable</span>
          </div>
          <p>
            ¿Alguien para compartir rutinas de calistenia cerca al campus? Busco
            lugares con barras para entrenar después de clases.
          </p>
          <button className="btn-small">👍 15</button>
        </div>
      </div>
    </div>
  );
}
