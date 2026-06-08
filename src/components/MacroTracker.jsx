function MacroTracker({ macros }) {
  const porcentaje = (macros.consumidasKcal / macros.metaKcal) * 100;

  return (
    <div className="macro-tracker panel">
      <h2>Resumen del Día</h2>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${porcentaje}%` }}></div>
      </div>
      <p>
        {macros.consumidasKcal} kcal consumidas de {macros.metaKcal} kcal
      </p>

      <div className="macros-detalles">
        <div className="macro-item">
          <span>Proteína faltante:</span>
          <strong>{macros.proteinaRestante}g</strong>
        </div>
        <div className="macro-item">
          <span>Carbohidratos faltantes:</span>
          <strong>{macros.carbosRestantes}g</strong>
        </div>
        <div className="macro-item">
          <span>Grasas faltantes:</span>
          <strong>{macros.grasasRestantes}g</strong>
        </div>
      </div>
    </div>
  );
}

export default MacroTracker;
