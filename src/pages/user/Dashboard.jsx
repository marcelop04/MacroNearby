export { default } from '../../views/user/Dashboard';

      {/* 2. MIDDLE: Recomendado por NutriAI Assistant Highlight */}
      {aiMatch && (
        <div className="glass-panel" style={{ border: '2px solid var(--accent)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, transparent 100%)', padding: '1.25rem', gap: '0.5rem' }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain size={18} color="var(--accent)" />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--accent)' }}>Asistente NutriAI</h4>
            </div>
            <span className="badge btn-primary" style={{ background: 'var(--accent)', fontSize: '0.7rem' }}>Match {aiMatch.matchPercentage}%</span>
          </div>

          <div style={{ margin: '0.25rem 0' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{aiMatch.meal.name}</h3>
            <p className="text-xs text-muted">{aiMatch.meal.restaurant} • S/. {aiMatch.meal.price.toFixed(2)}</p>
          </div>

          <p className="text-xs text-muted" style={{ lineHeight: '1.4', background: 'rgba(15, 23, 42, 0.03)', padding: '0.65rem', borderRadius: '0.5rem' }}>
            {aiMatch.reason}
          </p>

          <div className="flex justify-between text-xs text-muted mt-1" style={{ fontSize: '0.75rem' }}>
            <span>Calorías: <strong>{aiMatch.meal.calories} kcal</strong></span>
            <span>P: {aiMatch.meal.protein}g | C: {aiMatch.meal.carbs}g | G: {aiMatch.meal.fats}g</span>
          </div>

          <button 
            className="btn btn-primary w-full flex items-center justify-center gap-1.5 mt-2" 
            style={{ padding: '0.65rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, var(--accent), var(--primary))', boxShadow: 'none' }}
            onClick={() => handleQuickOrder(aiMatch.meal)}
          >
            <ShoppingBag size={14} /> Pedir Recomendado
          </button>
        </div>
      )}

      {/* 3. BOTTOM: Otras Recomendaciones */}
      <div>
        <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Otras Recomendaciones</h3>
        
        <div 
          className="horizontal-slider" 
          ref={recommendationDrag.ref}
          {...recommendationDrag.props}
          style={{ ...recommendationDrag.props.style, display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}
        >
          {otherRecommendedMeals.map((meal, index) => (
            <div 
              key={index} 
              className="glass-panel" 
              style={{ minWidth: '180px', maxWidth: '180px', padding: '0.85rem', gap: '0.35rem', background: 'var(--surface)', border: '1px solid var(--border-color)' }}
            >
              <h4 style={{ fontSize: '0.8rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meal.name}</h4>
              <p className="text-xs text-muted" style={{ fontSize: '0.7rem' }}>{meal.restaurant}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="badge" style={{ background: 'rgba(15, 23, 42, 0.05)', padding: '0.15rem 0.35rem', fontSize: '0.65rem' }}>{meal.calories} kcal</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>S/. {meal.price.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-secondary w-full flex items-center justify-center gap-1 mt-2" 
                style={{ padding: '0.4rem', fontSize: '0.7rem', borderRadius: '0.5rem' }}
                onClick={() => handleQuickOrder(meal)}
              >
                Pedir
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Open Radar Map Action Button */}
      <button 
        className="btn btn-primary w-full" 
        style={{ padding: '0.9rem', fontSize: '0.95rem' }}
        onClick={() => navigate('/radar')}
      >
        <Map size={16} />
        Abrir Radar Completo
      </button>

    </div>
  );
};

export default Dashboard;
