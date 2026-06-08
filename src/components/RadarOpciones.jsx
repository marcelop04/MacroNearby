import { useState } from "react";
import { recomendaciones } from "../data/mockData";

function RadarOpciones({ comidaFiltro }) {
  const [vista, setVista] = useState("lista"); // Estado para alternar vistas

  const opcionesFiltradas =
    comidaFiltro === "Todas"
      ? recomendaciones
      : recomendaciones.filter((op) => op.comida === comidaFiltro);

  return (
    <div className="radar-opciones panel">
      <div className="radar-header-top">
        <div>
          <h2>Radar de Opciones Cercanas</h2>
          <p className="subtitle">
            Basado en tu cercanía, precio y macros restantes
          </p>
        </div>
        <div className="toggle-vista">
          <button
            className={`btn-vista ${vista === "lista" ? "activo" : ""}`}
            onClick={() => setVista("lista")}
          >
            📋 Lista
          </button>
          <button
            className={`btn-vista ${vista === "mapa" ? "activo" : ""}`}
            onClick={() => setVista("mapa")}
          >
            🗺️ Mapa
          </button>
        </div>
      </div>

      {vista === "lista" ? (
        <div className="lista-opciones">
          {opcionesFiltradas.length > 0 ? (
            opcionesFiltradas.map((opcion) => (
              <div key={opcion.id} className="opcion-card">
                <div className="card-header">
                  <span className="tipo-badge">{opcion.tipo}</span>
                  <span className="match-badge">{opcion.match} Match</span>
                </div>
                <h3>
                  {opcion.nombre} ({opcion.distancia})
                </h3>
                <p className="instruccion">
                  <strong>Instrucción:</strong> {opcion.descripcion}
                </p>
                <div className="card-footer">
                  <span className="macros-resumen">
                    {opcion.macros.kcal} kcal | P: {opcion.macros.proteina}g |
                    C: {opcion.macros.carbohidratos}g | G:{" "}
                    {opcion.macros.grasas}g
                  </span>
                  <span className="precio">{opcion.precio}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-options">
              No hay opciones registradas para esta categoría.
            </p>
          )}
        </div>
      ) : (
        <div className="mapa-simulado">
          <div className="mapa-canvas">
            {/* Marcador del Usuario */}
            <div className="pin-usuario">
              <div className="pulso"></div>
              📍 Tú
            </div>

            {/* Marcadores Simulados de los Locales */}
            <div className="pin-local" style={{ top: "20%", left: "60%" }}>
              <span className="match-pequeño">95%</span>
              🥗 El Huerto
            </div>
            <div className="pin-local" style={{ top: "65%", left: "20%" }}>
              <span className="match-pequeño">98%</span>
              🏪 Tambo
            </div>
            <div className="pin-local" style={{ top: "80%", left: "70%" }}>
              <span className="match-pequeño">90%</span>
              🛒 D. María
            </div>
          </div>
          <p className="mapa-nota">Simulación de GPS y mapeo del entorno.</p>
        </div>
      )}
    </div>
  );
}

export default RadarOpciones;
