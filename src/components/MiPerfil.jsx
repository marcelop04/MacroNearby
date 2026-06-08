export default function MiPerfil() {
  return (
    <div className="panel perfil-panel">
      <h2>Mi Perfil Dinámico</h2>
      <p className="subtitle">
        Ajusta tus metas nutricionales para que el radar filtre correctamente.
      </p>

      <div className="perfil-grid">
        <div className="info-box">
          <h3>Objetivo Actual</h3>
          <p className="highlight">Recomposición corporal acelerada</p>
          <span className="premium-badge">🌟 Plan Premium Activo</span>
        </div>

        <div className="info-box">
          <h3>Meta Calórica Diaria</h3>
          <p className="highlight">2800 kcal</p>
          <p className="detalle">Enfoque: Alto en proteína (Hipertrofia)</p>
        </div>
      </div>

      <div className="preferencias">
        <h3>Preferencias Alimenticias</h3>
        <ul>
          <li>✔ Sin restricciones de alimentos</li>
          <li>✔ Priorizar opciones altas en proteína</li>
          <li>✔ Mostrar mercados locales y tiendas de conveniencia</li>
        </ul>
      </div>

      <button className="btn activo" style={{ marginTop: "20px" }}>
        Actualizar Macros
      </button>
    </div>
  );
}
