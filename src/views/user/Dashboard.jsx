import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useDragScroll } from '../../hooks/useDragScroll';
import { Map, Crown, Zap, Flame, Sparkles, ShoppingBag, Brain } from 'lucide-react';

const CircularProgress = ({ value, max, color, label }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: 'relative', width: '68px', height: '68px' }}>
        <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="34" cy="34" r={radius} stroke="rgba(15, 23, 42, 0.08)" strokeWidth="4.5" fill="transparent" />
          <circle cx="34" cy="34" r={radius} stroke={color} strokeWidth="4.5" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{value}g</span>
        </div>
      </div>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
};

const Dashboard = () => {
  const { 
    userData, dailyProgress, isPremium, setIsPremium, menuItems, addConsumption, 
    getAIMatch, defaultRestaurants, showAlert,
    extraBurnedCalories, syncSmartwatch, routeZones, setRouteZones 
  } = useAppContext();
  const navigate = useNavigate();
  
  // Drag scroll hooks
  const sponsoredDrag = useDragScroll();
  const recommendationDrag = useDragScroll();

  if (!userData) return null;

  const { metrics, profile } = userData;
  const remainingCals = metrics.target + extraBurnedCalories - dailyProgress.consumedCalories;

  // Retrieve AI recommendation matching user goal/allergies
  const aiMatch = getAIMatch();

  const handleQuickOrder = (meal) => {
    addConsumption(meal);
    showAlert(`¡Plato '${meal.name}' ordenado! Comisión de venta del 10% cobrada. Macros registrados.`);
  };

  // Compile other secondary recommended meals
  const sponsoredItems = menuItems.filter(item => item.isPromoted);
  const regularItems = menuItems.filter(item => !item.isPromoted);

  const otherRecommendedMeals = [];
  defaultRestaurants.forEach(rest => {
    rest.meals.forEach(meal => {
      if (!aiMatch || meal.name !== aiMatch.meal.name) {
        otherRecommendedMeals.push({
          ...meal,
          restaurant: rest.name
        });
      }
    });
  });

  return (
    <div className="flex flex-col gap-5" style={{ paddingTop: '0.5rem' }}>
      
      {/* Header Info */}
      <div className="flex justify-between items-center glass-panel" style={{ padding: '1.25rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '1.2rem', margin: 0 }}>Hola, {profile.name}</h2>
          <p className="text-xs" style={{ margin: 0 }}>
            Meta Diaria: {metrics.target} {extraBurnedCalories > 0 ? `+ ${extraBurnedCalories} (Activas)` : ''} Kcal
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button 
            className={`badge ${isPremium ? 'btn-premium' : 'btn-secondary text-xs'}`}
            style={{ border: 'none', cursor: 'pointer', background: isPremium ? '' : 'rgba(15, 23, 42, 0.05)' }}
            onClick={() => {
              setIsPremium(!isPremium);
              showAlert(!isPremium ? "¡Tema Premium Activado! Disfruta de la planificación de ruta, filtros de precisión e integración smartwatch." : "Modo básico activado.");
            }}
          >
            <Crown size={12} /> {isPremium ? 'Nutri+ Activo' : 'Probar Premium'}
          </button>
        </div>
      </div>

      {/* Main Calories Progress Card */}
      <div className="glass-panel text-center relative overflow-hidden" style={{ padding: '1.5rem 1.25rem' }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '120px', height: '120px', background: 'var(--primary)', filter: 'blur(70px)', opacity: 0.12, borderRadius: '50%' }}></div>
        <h3 className="text-xs mb-1 text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calorías Restantes</h3>
        <div className="flex items-center justify-center gap-1">
          <Flame color="var(--warning)" size={24} />
          <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>{remainingCals}</span>
        </div>
        <div className="flex justify-between text-xs text-muted mt-3">
          <span>Consumido: {dailyProgress.consumedCalories} Kcal</span>
          <span>Meta: {metrics.target + extraBurnedCalories} Kcal</span>
        </div>
        <div class="w-full mt-2 rounded-full h-1.5" style={{ background: 'rgba(15, 23, 42, 0.08)' }}>
          <div className="h-1.5 rounded-full" style={{ width: `${Math.min((dailyProgress.consumedCalories / (metrics.target + extraBurnedCalories)) * 100, 100)}%`, background: 'var(--warning)' }}></div>
        </div>
      </div>

      {/* Smartwatch Sync - Premium Only */}
      {isPremium && (
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', border: '1px dashed var(--accent)', background: 'linear-gradient(135deg, rgba(14,165,233,0.05) 0%, transparent 100%)', gap: '0.5rem' }}>
          <div className="flex flex-col gap-0.5" style={{ flex: 1 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: extraBurnedCalories > 0 ? 'var(--success)' : 'var(--accent)', borderRadius: '50%', animation: extraBurnedCalories > 0 ? 'ping 1.5s infinite' : 'none' }}></span>
              Sincronizar Smartwatch
            </span>
            <span className="text-xs text-muted">
              {extraBurnedCalories > 0 ? 'Activo: +400 kcal registradas' : 'Detectado: Fitbit/Apple Watch'}
            </span>
          </div>
          <button 
            className={`btn ${extraBurnedCalories > 0 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', background: extraBurnedCalories > 0 ? 'var(--success)' : '', color: extraBurnedCalories > 0 ? '#fff' : '' }}
            onClick={() => {
              syncSmartwatch();
              showAlert(extraBurnedCalories > 0 ? "Smartwatch desconectado. Meta de calorías restablecida." : "¡Smartwatch Sincronizado! Se agregaron +400 kcal de gasto de entrenamiento a tu presupuesto diario de hoy.");
            }}
          >
            {extraBurnedCalories > 0 ? 'Desconectar' : 'Sincronizar'}
          </button>
        </div>
      )}

      {/* Macros Circles - FORCE flex-direction row to list them horizontally! */}
      <div className="glass-panel" style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '1rem 0.5rem', gap: '0' }}>
        <CircularProgress value={dailyProgress.consumedProtein} max={metrics.macros.protein} color="var(--secondary)" label="Proteínas" />
        <CircularProgress value={dailyProgress.consumedCarbs} max={metrics.macros.carbs} color="var(--accent)" label="Carbos" />
        <CircularProgress value={dailyProgress.consumedFats} max={metrics.macros.fats} color="var(--warning)" label="Grasas" />
      </div>

      {/* Route Planner - Premium Only */}
      {isPremium && (
        <div className="glass-panel" style={{ padding: '1.25rem', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Map size={16} color="var(--primary)" />
            Planificación de Ruta (Día Completo)
          </h3>
          <p className="text-xs text-muted" style={{ margin: 0, lineHeight: '1.3' }}>
            Indica dónde estarás hoy y te planificaremos tus comidas ideales en base a la ubicación de los locales.
          </p>
          
          <div className="flex gap-2 mt-1">
            <div className="flex flex-col flex-1">
              <label className="text-xs text-muted mb-1" style={{ fontSize: '0.65rem' }}>Zona A (Almuerzo)</label>
              <select 
                value={routeZones.zoneA} 
                onChange={e => setRouteZones({ ...routeZones, zoneA: e.target.value })}
                style={{ padding: '0.5rem 0.65rem', fontSize: '0.75rem', borderRadius: '0.5rem' }}
              >
                <option value="">-- Seleccionar --</option>
                <option value="San Isidro">San Isidro</option>
                <option value="Miraflores">Miraflores</option>
                <option value="Surco">Surco</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xs text-muted mb-1" style={{ fontSize: '0.65rem' }}>Zona B (Cena)</label>
              <select 
                value={routeZones.zoneB} 
                onChange={e => setRouteZones({ ...routeZones, zoneB: e.target.value })}
                style={{ padding: '0.5rem 0.65rem', fontSize: '0.75rem', borderRadius: '0.5rem' }}
              >
                <option value="">-- Seleccionar --</option>
                <option value="San Isidro">San Isidro</option>
                <option value="Miraflores">Miraflores</option>
                <option value="Surco">Surco</option>
              </select>
            </div>
          </div>

          {/* Planned Recommendations Results */}
          {(routeZones.zoneA || routeZones.zoneB) && (
            <div className="flex flex-col gap-2 mt-2" style={{ padding: '0.75rem', background: 'rgba(16,185,129,0.03)', border: '1px dashed var(--border-color)', borderRadius: '0.75rem' }}>
              <span className="text-xs" style={{ fontWeight: '700', color: 'var(--primary)' }}>Rutas sugeridas:</span>
              
              {routeZones.zoneA && (
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span style={{ fontWeight: '600' }}>🥗 Almuerzo en {routeZones.zoneA}:</span>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.65rem' }}>
                      {routeZones.zoneA === 'San Isidro' ? 'Green Corner - Ensalada Garbanzo (11.00 USD • 450 kcal)' : 
                       routeZones.zoneA === 'Miraflores' ? 'El Horno de la Estancia - Pechuga Rústica (14.50 USD • 480 kcal)' : 
                       'Sweet Bakery - Muffin Chocolate (5.50 USD • 210 kcal)'}
                    </p>
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>A 3 min</span>
                </div>
              )}

              {routeZones.zoneB && (
                <div className="flex justify-between items-start text-xs" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                  <div>
                    <span style={{ fontWeight: '600' }}>🥩 Cena en {routeZones.zoneB}:</span>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.65rem' }}>
                      {routeZones.zoneB === 'Miraflores' ? 'La Leña y Carbón - Bife Angosto (19.50 USD • 490 kcal)' : 
                       routeZones.zoneB === 'San Isidro' ? 'Trattoria Bella Italia - Pasta Pesto (13.50 USD • 540 kcal)' : 
                       'Pasta Lab - Spaghetti de Calabacín (11.50 USD • 290 kcal)'}
                    </p>
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>A 5 min</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 1. TOP: Platos Patrocinados / Promocionados */}
      <div>
        <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} color="#fbbf24" fill="#fbbf24" />
          <span>Platos Patrocinados</span>
        </h3>
        
        <div 
          className="horizontal-slider" 
          ref={sponsoredDrag.ref}
          {...sponsoredDrag.props}
          style={{ ...sponsoredDrag.props.style, display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}
        >
          {sponsoredItems.length > 0 ? sponsoredItems.map(item => (
            <div 
              key={item.id} 
              className="glass-panel" 
              style={{ minWidth: '200px', maxWidth: '200px', background: 'rgba(251, 191, 36, 0.04)', padding: '1rem', border: '1px solid rgba(251, 191, 36, 0.2)', gap: '0.4rem' }}
            >
              <div className="flex justify-between items-center">
                <span className="badge badge-ad" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>Ad</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>${item.price.toFixed(2)}</span>
              </div>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '92px', objectFit: 'cover', borderRadius: '0.6rem', border: '1px solid var(--border-color)' }} />
              ) : (
                <div style={{ width: '100%', height: '92px', borderRadius: '0.6rem', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  Imagen del plato
                </div>
              )}
              <h4 style={{ fontSize: '0.8rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
              <p className="text-xs text-muted">FitBowl</p>
              <div className="flex justify-between text-xs mt-1" style={{ fontSize: '0.65rem' }}>
                <span>{item.calories} kcal</span>
                <span>P: {item.protein}g | C: {item.carbs}g</span>
              </div>
              <button 
                className="btn btn-primary w-full flex items-center justify-center gap-1 mt-1" 
                style={{ padding: '0.4rem', fontSize: '0.75rem', borderRadius: '0.5rem' }}
                onClick={() => handleQuickOrder(item)}
              >
                <ShoppingBag size={12} /> Pedir
              </button>
            </div>
          )) : (
            <div className="text-xs text-muted" style={{ padding: '0.5rem 0' }}>
              Aún no hay platos destacados para mostrar como patrocinados.
            </div>
          )}
        </div>
      </div>

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
          {[...sponsoredItems, ...regularItems, ...otherRecommendedMeals].slice(0, 8).map((meal, index) => (
            <div 
              key={`${meal.id || meal.name}-${index}`} 
              className="glass-panel" 
              style={{ minWidth: '180px', maxWidth: '180px', padding: '0.85rem', gap: '0.35rem', background: 'var(--surface)', border: '1px solid var(--border-color)' }}
            >
              {meal.imageUrl ? (
                <img src={meal.imageUrl} alt={meal.name} style={{ width: '100%', height: '78px', objectFit: 'cover', borderRadius: '0.55rem', border: '1px solid var(--border-color)', marginBottom: '0.35rem' }} />
              ) : (
                <div style={{ width: '100%', height: '78px', borderRadius: '0.55rem', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
                  Plato
                </div>
              )}
              <h4 style={{ fontSize: '0.8rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meal.name}</h4>
              <p className="text-xs text-muted" style={{ fontSize: '0.7rem' }}>{meal.restaurant || 'FitBowl'}</p>
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
