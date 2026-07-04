import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useDragScroll } from '../../hooks/useDragScroll';
import { Star, ShoppingBag, Lock, Sparkles, MapPin, Compass, Crown } from 'lucide-react';

const ExpandedRadar = () => {
  const { 
    isPremium, addConsumption, menuItems, businessLocation, defaultRestaurants, 
    getAIMatch, showAlert, hasBusinessSubscription, flashDiscountActive 
  } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedRest, setSelectedRest] = useState(null);

  // Map panning states
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Hook up horizontal dragging for sliders
  const filterDrag = useDragScroll();
  const listDrag = useDragScroll();

  const filters = [
    'Todos', 'Saludable', 'Vegano', 'Carnes', 'Italiana', 'Criolla', 'Chifa',
    ...(isPremium ? ['Alto Proteína', 'Bajo Sodio', 'Sin Azúcar', 'Sin Gluten'] : [])
  ];

  const userB2B = {
    id: 1,
    name: "FitBowl (Patrocinado)",
    type: "Saludable",
    distance: "120m",
    ad: true,
    position: businessLocation,
    meals: menuItems
  };

  const allRestaurants = [userB2B, ...defaultRestaurants];
  const aiMatch = getAIMatch();

  // Filter restaurants AND meals inside them based on selected filter
  const filteredRestaurantsData = allRestaurants.map(r => {
    let matchingMeals = r.meals;

    // Apply Precision Filters if selected (Premium only)
    if (selectedFilter === 'Alto Proteína') {
      matchingMeals = matchingMeals.filter(m => m.protein >= 30);
    } else if (selectedFilter === 'Bajo Sodio') {
      matchingMeals = matchingMeals.filter(m => m.isLowSodium);
    } else if (selectedFilter === 'Sin Azúcar') {
      matchingMeals = matchingMeals.filter(m => m.isZeroSugar);
    } else if (selectedFilter === 'Sin Gluten') {
      matchingMeals = matchingMeals.filter(m => m.isGlutenFree);
    } else if (selectedFilter !== 'Todos') {
      // Basic type filter
      if (r.type !== selectedFilter) {
        matchingMeals = [];
      }
    }

    return {
      ...r,
      meals: matchingMeals
    };
  }).filter(r => r.meals.length > 0);

  // Boost Premium Business (FitBowl id=1) to the very top if it meets filter criteria
  const filteredRestaurants = [...filteredRestaurantsData].sort((a, b) => {
    const aBoost = a.id === 1 && hasBusinessSubscription;
    const bBoost = b.id === 1 && hasBusinessSubscription;
    if (aBoost && !bBoost) return -1;
    if (!aBoost && bBoost) return 1;
    return 0;
  });

  const handleOrder = (meal) => {
    addConsumption(meal);
    showAlert(`¡Pedido realizado! Comisión del 10% cobrada. Has pagado S/ ${meal.price.toFixed(2)} por la app. Macros agregados!`);
    setSelectedRest(null);
  };

  const handlePremiumFilter = () => {
    if (isPremium) {
      showAlert("Filtro inteligente activado: Mostrando opciones premium bajas en grasas.");
      setSelectedFilter('Saludable');
    } else {
      showAlert("Filtros avanzados requieren Nutri+ Premium. Actívalo en el Dashboard.");
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (e.target.closest('.horizontal-slider')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(844px - 44px - 72px - 2rem)', margin: '-1rem', position: 'relative' }}>
      
      {/* Map Main Canvas Viewport */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden', 
          background: '#f1f5f9', 
          display: 'flex', 
          flexDirection: 'column',
          cursor: isPanning ? 'grabbing' : 'grab'
        }}
      >
        
        {/* Panning Wrapper container */}
        <div style={{ transform: `translate(${pan.x}px, ${pan.y}px)`, width: '100%', height: '100%', position: 'absolute', transition: isPanning ? 'none' : 'transform 0.1s ease-out' }}>
                  {/* Grid Background Mock */}
          <div style={{ position: 'absolute', inset: -500, opacity: 0.8, backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
          
          {/* Radar Circles */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '220px', height: '220px', border: '1.5px dashed rgba(16, 185, 129, 0.2)', borderRadius: '50%', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '420px', height: '420px', border: '1px solid rgba(16, 185, 129, 0.08)', borderRadius: '50%', pointerEvents: 'none' }}></div>

          {/* User Marker Dot */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 15px var(--accent)', zIndex: 5 }}>
            <div style={{ position: 'absolute', top: '-8px', left: '-8px', right: '-8px', bottom: '-8px', border: '1.5px solid var(--accent)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
          </div>

          {/* Restaurant Pins */}
          {filteredRestaurants.map((rest) => {
            const isSelected = selectedRest?.id === rest.id;
            const isBoosted = rest.id === 1 && hasBusinessSubscription;
            return (
              <button
                key={rest.id}
                onClick={() => setSelectedRest(rest)}
                style={{
                  position: 'absolute',
                  left: rest.position.x,
                  top: rest.position.y,
                  transform: 'translate(-50%, -50%)',
                  background: isBoosted 
                    ? 'linear-gradient(135deg, #fbbf24, #d97706)' 
                    : rest.ad 
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                      : isSelected ? 'var(--secondary)' : 'var(--primary)',
                  border: isBoosted ? '3px solid #fff' : '2px solid white',
                  borderRadius: '50%',
                  width: isBoosted ? '38px' : '32px',
                  height: isBoosted ? '38px' : '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isBoosted ? '0 0 15px rgba(245, 158, 11, 0.6)' : '0 4px 10px rgba(0,0,0,0.5)',
                  zIndex: isBoosted ? 8 : isSelected ? 7 : 6,
                  cursor: 'pointer'
                }}
              >
                {isBoosted ? <Crown size={16} color="#fff" /> : <MapPin size={16} color={rest.ad ? '#000' : '#fff'} />}
              </button>
            );
          })}
        </div>

        {/* Map Header Floating Overlay - Placed at the top */}
        <div className="glass-panel" style={{ position: 'absolute', top: '0.5rem', left: '0.75rem', right: '0.75rem', zIndex: 10, padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-gradient" />
            <h3 style={{ margin: 0, fontSize: '0.9rem' }}>Radar Nutricional</h3>
          </div>
        </div>

        {/* Cravings Filters - MOVED TO THE TOP (below map header) to avoid overlapping the cards completely */}
        <div 
          className="horizontal-slider" 
          ref={filterDrag.ref}
          {...filterDrag.props}
          style={{ 
            ...filterDrag.props.style, 
            position: 'absolute', 
            top: '5.0rem', // Placed at the top area, below map header with more breathing space
            left: '0.75rem', 
            right: '0.75rem', 
            zIndex: 15, 
            display: 'flex', 
            gap: '0.4rem', 
            overflowX: 'auto', 
            padding: '0.2rem 0' 
          }}
        >
          {filters.map(f => {
            const isSelected = selectedFilter === f;
            return (
              <button 
                key={f} 
                className="badge" 
                style={{ 
                  padding: '0.45rem 0.85rem', 
                  whiteSpace: 'nowrap', 
                  fontSize: isSelected ? '0.78rem' : '0.7rem', 
                  fontWeight: isSelected ? '700' : '600',
                  color: isSelected ? '#ffffff' : 'var(--text-color)',
                  background: isSelected ? 'var(--primary)' : 'var(--surface)', 
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)', 
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                  boxShadow: isSelected ? '0 4px 10px rgba(16, 185, 129, 0.25)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }} 
                onClick={() => setSelectedFilter(f)}
              >
                {f}
              </button>
            );
          })}
          <button 
            className="badge" 
            style={{ 
              whiteSpace: 'nowrap', 
              color: '#fbbf24', 
              border: '1px solid rgba(251, 191, 36, 0.4)', 
              padding: '0.45rem 0.85rem', 
              background: 'var(--surface)',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={handlePremiumFilter}
          >
            {isPremium ? <Sparkles size={10} /> : <Lock size={10} />} Macros Exactos
          </button>
        </div>

        {/* Restaurant Card Slider - Left at the bottom */}
        <div 
          className="horizontal-slider" 
          ref={listDrag.ref}
          {...listDrag.props}
          style={{ 
            ...listDrag.props.style, 
            position: 'absolute', 
            bottom: '10px', 
            left: '0.75rem', 
            right: '0.75rem', 
            zIndex: 10, 
            display: 'flex', 
            gap: '0.6rem', 
            overflowX: 'auto', 
            paddingBottom: '0.2rem' 
          }}
        >
          {filteredRestaurants.map((rest) => {
            const hasAiMatch = aiMatch && rest.meals.some(m => m.name === aiMatch.meal.name);
            const isBoosted = rest.id === 1 && hasBusinessSubscription;
            return (
              <div 
                key={rest.id} 
                className="glass-panel flex-col flex" 
                style={{ 
                  minWidth: '220px', 
                  maxWidth: '220px',
                  padding: '0.85rem', 
                  cursor: 'pointer', 
                  background: 'var(--surface)', 
                  border: isBoosted ? '2px solid #fbbf24' : hasAiMatch ? '2px solid var(--accent)' : '1px solid var(--border-color)' 
                }} 
                onClick={() => setSelectedRest(rest)}
              >
                <div className="flex justify-between items-start">
                  {isBoosted ? (
                    <span className="badge btn-premium mb-1" style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem' }}>★ Socio Premium</span>
                  ) : rest.ad ? (
                    <span className="badge badge-ad mb-1" style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem' }}>Patrocinado</span>
                  ) : hasAiMatch ? (
                    <span className="badge btn-primary mb-1" style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem', background: 'var(--accent)' }}>Recomendado AI</span>
                  ) : <div style={{ height: '15px' }}></div>}
                  {rest.id === 1 && flashDiscountActive && (
                    <span className="badge btn-primary mb-1 text-xs" style={{ background: 'var(--secondary)', color: 'white', fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>20% OFF</span>
                  )}
                </div>
                <h4 style={{ fontSize: '0.85rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rest.name}</h4>
                <p className="text-xs text-muted mb-1">{rest.type} • {rest.distance}</p>
                <span className="text-xs text-muted">{rest.meals.length} comidas disponibles</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Restaurant Modal Bottom Sheet */}
      {selectedRest && (
        <div className="modal-overlay" onClick={() => setSelectedRest(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="m-0" style={{ fontSize: '1.15rem' }}>{selectedRest.name}</h3>
                <p className="text-xs text-muted">{selectedRest.type} • {selectedRest.distance}</p>
              </div>
              {selectedRest.ad && <span className="badge badge-ad">Socio</span>}
            </div>

            <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '2px' }}>
              {selectedRest.meals.map((meal, index) => {
                const isAiRecommended = aiMatch && aiMatch.meal.name === meal.name;
                const isFitBowlPromo = selectedRest.id === 1 && flashDiscountActive;
                return (
                  <div 
                    key={index} 
                    className="glass-panel" 
                    style={{ 
                      background: 'var(--bg-color)', 
                      borderColor: isAiRecommended ? 'var(--accent)' : 'var(--border-color)', 
                      padding: '1rem', 
                      gap: '0.4rem',
                      borderWidth: isAiRecommended ? '2px' : '1px'
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h4 style={{ fontSize: '0.85rem', margin: 0 }}>{meal.name}</h4>
                      {isAiRecommended && <span className="badge text-xs" style={{ background: 'var(--accent)', color: 'white', fontSize: '0.65rem' }}>Match {aiMatch.matchPercentage}%</span>}
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>{meal.calories} kcal</span>
                      <span>P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fats}g</span>
                    </div>
                    <button 
                      className="btn btn-primary w-full flex justify-center items-center gap-1.5" 
                      style={{ padding: '0.55rem', borderRadius: '0.5rem', fontSize: '0.8rem' }}
                      onClick={() => handleOrder(meal)}
                    >
                      <ShoppingBag size={14} />
                      Pedir por la App (${meal.price.toFixed(2)})
                      {isFitBowlPromo && (
                        <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.75rem', marginLeft: '6px' }}>
                          ${(meal.price / 0.8).toFixed(2)}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
              {selectedRest.meals.length === 0 && (
                <p className="text-xs text-muted py-6 text-center">Este local no ha publicado platos aún.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded styles for ping/animation keyframe */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ExpandedRadar;
