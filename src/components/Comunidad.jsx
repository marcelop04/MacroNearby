export default function Comunidad() {
  // Configuración de las redes con sus colores oficiales fijos
  const redesSociales = [
    { nombre: "Discord", url: "https://discord.gg/tu-servidor", color: "#5865F2", icono: "💬" },
    { nombre: "Facebook", url: "https://facebook.com/tu-pagina", color: "#1877F2", icono: "👥" },
    { nombre: "Reddit", url: "https://reddit.com/r/tu-comunidad", color: "#FF4500", icono: "🤖" },
  ];

  return (
    <div className="panel comunidad-panel" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      
      {/* SECCIÓN DE ENLACES SOCIALES */}
      <div className="redes-simulacion" style={{ borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>Únete a nuestras redes oficiales</h3>
        <p className="subtitle" style={{ marginBottom: "15px" }}>
          Participa en debates a fondo y encuentra más compañeros.
        </p>
        
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {redesSociales.map((red) => (
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn" // Jala tu clase 'btn' de tu CSS
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                backgroundColor: red.color, // Color fijo de la red social
                color: "#fff",             // Texto blanco siempre legible
                fontWeight: "600",
                fontSize: "0.9rem",
                transition: "all 0.25s ease-in-out",
                border: "none"
              }}
              // SIMULACIÓN DE ILUMINACIÓN (Efecto Glow / Brillo)
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.2)"; // Vuelve el color un 20% más brillante
                e.currentTarget.style.boxShadow = `0 0 12px ${red.color}`; // Aplica el resplandor exterior
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";      // Quita el brillo
                e.currentTarget.style.boxShadow = "none";    // Quita el resplandor
              }}
            >
              <span>{red.icono}</span>
              {red.nombre}
            </a>
          ))}
        </div>
      </div>

      {/* TU FEED ORIGINAL INTACTO */}
      <div>
        <h2>Comunidad Interactive</h2>
        <p className="subtitle">
          Conecta, comparte rutinas, retos y consejos con otros usuarios.
        </p>

        <div className="feed-comunidad" style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "15px" }}>
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

    </div>
  );
}