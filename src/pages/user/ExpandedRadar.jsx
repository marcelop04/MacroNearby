import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useDragScroll } from '../../hooks/useDragScroll';
import { Star, ShoppingBag, Lock, Sparkles, MapPin, Compass } from 'lucide-react';

const ExpandedRadar = () => {
  const { isPremium, addConsumption, menuItems, businessLocation, defaultRestaurants, getAIMatch } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedRest, setSelectedRest] = useState(null);

  // Map panning states
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Hook up horizontal dragging for sliders
  const filterDrag = useDragScroll();
  const listDrag = useDragScroll();

  const filters = ['Todos', 'Saludable', 'Vegano', 'Carnes', 'Italiana', 'Criolla'];

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

  const filteredRestaurants = allRestaurants.filter(r => {
    if (selectedFilter === 'Todos') return true;
    return r.type === selectedFilter;
  });

  const handleOrder = (meal) => {
    addConsumption(meal);
    alert(`¡Pedido realizado! Comisión del 10% cobrada. Has pagado S/ ${meal.price.toFixed(2)} por la app. Macros agregados!`);
    setSelectedRest(null);
  };

  const handlePremiumFilter = () => {
    if (isPremium) {
      alert("Filtro inteligente activado: Mostrando opciones premium bajas en grasas.");
      setSelectedFilter('Saludable');
    } else {
      alert("Filtros avanzados requieren Nutri+ Premium. Actívalo en el Dashboard.");
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
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
          background: '#070a13', 
          display: 'flex', 
          flexDirection: 'column',
          cursor: isPanning ? 'grabbing' : 'grab'
        }}
      >
        
        {/* Panning Wrapper container */}
        <div style={{ transform: `translate(${pan.x}px, ${pan.y}px)`, width: '100%', height: '100%', position: 'absolute', transition: isPanning ? 'none' : 'transform 0.1s ease-out' }}>
          
          {/* Grid Background Mock */}
          <div style={{ position: 'absolute', inset: -500, opacity: 0.12, backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Radar Circles */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '220px', height: '220px', border: '1.5px dashed rgba(139, 92, 246, 0.15)', borderRadius: '50%', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '420px', height: '420px', border: '1px solid rgba(139, 92, 246, 0.06)', borderRadius: '50%', pointerEvents: 'none' }}></div>

          {/* User Marker Dot */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 15px var(--accent)', zIndex: 5 }}>
            <div style={{ position: 'absolute', top: '-8px', left: '-8px', right: '-8px', bottom: '-8px', border: '1.5px solid var(--accent)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
          </div>

          {/* Restaurant Pins */}
          {filteredRestaurants.map((rest) => {
            const isSelected = selectedRest?.id === rest.id;
            return (
              <button
                key={rest.id}
                onClick={() => setSelectedRest(rest)}
                style={{
                  position: 'absolute',
                  left: rest.position.x,
                  top: rest.position.y,
                  transform: 'translate(-50%, -50%)',
                  background: rest.ad 
                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                    : isSelected ? 'var(--secondary)' : 'var(--primary)',
                  border: '2px solid white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                  zIndex: 6,
                  cursor: 'pointer'
                }}
              >
                <MapPin size={16} color={rest.ad ? '#000' : '#fff'} />
              </button>
            );
          })}
        </div>

        {/* Map Header Floating Overlay - Placed at the top */}
        <div className="glass-panel" style={{ position: 'absolute', top: '0.5rem', left: '0.75rem', right: '0.75rem', zIndex: 10, padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)' }}>
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-gradient" />
            <h3 style={{ margin: 0, fontSize: '0.9rem' }}>Radar Nutricional</h3>
          </div>
          <span className="badge badge-ad" style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem' }}>Arrastra el mapa</span>
        </div>

        {/* Cravings Filters - MOVED TO THE TOP (below map header) to avoid overlapping the cards completely */}
        <div 
          className="horizontal-slider" 
          ref={filterDrag.ref}
          {...filterDrag.props}
          style={{ 
            ...filterDrag.props.style, 
            position: 'absolute', 
            top: '4.25rem', // Placed at the top area, below map header
            left: '0.75rem', 
            right: '0.75rem', 
            zIndex: 15, 
            display: 'flex', 
            gap: '0.4rem', 
            overflowX: 'auto', 
            padding: '0.2rem 0' 
          }}
        >
          {filters.map(f => (
            <button 
              key={f} 
              className={`badge ${selectedFilter === f ? 'btn-primary' : 'glass-panel'}`} 
              style={{ padding: '0.45rem 0.85rem', whiteSpace: 'nowrap', border: selectedFilter === f ? 'none' : '1px solid var(--border-color)', fontSize: '0.75rem', background: selectedFilter === f ? '' : 'rgba(15,23,42,0.95)' }} 
              onClick={() => setSelectedFilter(f)}
            >
              {f}
            </button>
          ))}
          <button 
            className="badge glass-panel flex items-center gap-1 text-xs" 
            style={{ whiteSpace: 'nowrap', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.4)', padding: '0.45rem 0.85rem', background: 'rgba(15,23,42,0.95)' }}
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
            return (
              <div 
                key={rest.id} 
                className="glass-panel flex-col flex" 
                style={{ 
                  minWidth: '220px', 
                  maxWidth: '220px',
                  padding: '0.85rem', 
                  cursor: 'pointer', 
                  background: 'rgba(15, 23, 42, 0.95)', 
                  border: hasAiMatch ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)' 
                }} 
                onClick={() => setSelectedRest(rest)}
              >
                <div className="flex justify-between items-start">
                  {rest.ad ? (
                    <span className="badge badge-ad mb-1" style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem' }}>Patrocinado</span>
                  ) : hasAiMatch ? (
                    <span className="badge btn-primary mb-1" style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem', background: 'var(--accent)' }}>Recomendado AI</span>
                  ) : <div style={{ height: '15px' }}></div>}
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
                return (
                  <div 
                    key={index} 
                    className="glass-panel" 
                    style={{ 
                      background: 'rgba(139, 92, 246, 0.04)', 
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
