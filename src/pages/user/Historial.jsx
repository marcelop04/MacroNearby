import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Calendar, RefreshCw, Award, FastForward, Clock } from 'lucide-react';

const Historial = () => {
  const { dailyProgress, resetDaily, streak, advanceDay, consumedMeals } = useAppContext();

  const hasConsumption = consumedMeals.length > 0;

  return (
    <div className="flex flex-col gap-4" style={{ paddingTop: '0.5rem' }}>
      
      <div className="flex justify-between items-center">
        <h2>Historial de Hoy</h2>
        <button 
          className="btn btn-secondary flex items-center gap-1.5" 
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem', borderRadius: '0.5rem' }}
          onClick={resetDaily}
        >
          <RefreshCw size={12} />
          Reiniciar Día
        </button>
      </div>

      {/* Summary Box */}
      <div className="glass-panel text-center" style={{ padding: '1.25rem' }}>
        <div className="flex justify-around items-center" style={{ gap: '0.25rem' }}>
          <div className="flex flex-col flex-1 text-center">
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--warning)' }}>{dailyProgress.consumedCalories}</span>
            <span className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>Kcal</span>
          </div>
          <div style={{ height: '25px', width: '1px', background: 'var(--border-color)' }}></div>
          <div className="flex flex-col flex-1 text-center">
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{dailyProgress.consumedProtein}g</span>
            <span className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>Proteína</span>
          </div>
          <div style={{ height: '25px', width: '1px', background: 'var(--border-color)' }}></div>
          <div className="flex flex-col flex-1 text-center">
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--accent)' }}>{dailyProgress.consumedCarbs}g</span>
            <span className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>Carbos</span>
          </div>
          <div style={{ height: '25px', width: '1px', background: 'var(--border-color)' }}></div>
          <div className="flex flex-col flex-1 text-center">
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--warning)' }}>{dailyProgress.consumedFats}g</span>
            <span className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>Grasas</span>
          </div>
        </div>
      </div>

      {/* Streak Panel */}
      <div className="glass-panel" style={{ borderLeft: '4px solid var(--accent)', padding: '1.25rem' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={18} color="var(--accent)" />
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Racha de Consistencia</h4>
          </div>
          <span className="badge btn-primary" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>{streak} Días</span>
        </div>
        <p className="text-xs text-muted mt-2">
          Continúa tu racha registrando comidas y alcanzando tus objetivos de macros diarios.
        </p>
      </div>

      {/* Simulator Time Advancement */}
      <div className="glass-panel" style={{ background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--success)', margin: 0 }}>Simulador de Tiempo</h4>
        <p className="text-xs text-muted mt-1 mb-3">Reinicia el diario e incrementa tu racha de días activos simulados.</p>
        <button 
          className="btn btn-secondary w-full flex items-center justify-center gap-2" 
          style={{ padding: '0.65rem', borderRadius: '0.5rem', color: 'var(--success)', borderColor: 'rgba(16, 185, 129, 0.25)' }}
          onClick={advanceDay}
        >
          <FastForward size={14} /> Simular Avanzar de Día
        </button>
      </div>

      {/* Logged Dishes Detailed Output */}
      <h3 className="mt-2" style={{ fontSize: '1.05rem' }}>Comidas Consumidas</h3>
      
      <div className="flex flex-col gap-3" style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '2px' }}>
        {hasConsumption ? (
          consumedMeals.map((meal, index) => (
            <div key={index} className="glass-panel flex-col flex" style={{ padding: '1rem', gap: '0.4rem' }}>
              <div className="flex justify-between items-center">
                <h4 style={{ fontSize: '0.85rem', margin: 0 }}>{meal.name}</h4>
                <span className="badge btn-primary" style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem' }}>+{meal.calories} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted">{meal.restaurant || 'FitBowl'}</span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <Clock size={10} /> {meal.time}
                </span>
              </div>
              
              {/* Spaced out macro values using justifyContent: 'space-between' */}
              <div className="flex text-xs text-muted" style={{ fontSize: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.45rem', marginTop: '0.2rem', justifyContent: 'space-between' }}>
                <span>Prot: <strong style={{ color: 'var(--text-color)' }}>{meal.protein}g</strong></span>
                <span>Carb: <strong style={{ color: 'var(--text-color)' }}>{meal.carbs}g</strong></span>
                <span>Grasa: <strong style={{ color: 'var(--text-color)' }}>{meal.fats}g</strong></span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted">
            <Calendar size={28} className="mb-2" style={{ opacity: 0.4, margin: '0 auto' }} />
            <p className="text-sm">Aún no has registrado consumos hoy.</p>
            <p className="text-xs mt-1">Usa el radar o las sugerencias en tu Dashboard.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Historial;
