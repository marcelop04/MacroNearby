import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, Filter, Navigation, Lock, Star, ShoppingBag } from 'lucide-react';

const mockRestaurants = [
  { id: 1, name: "FitBowl (Patrocinado)", type: "Saludable", distance: "0.2 km", ad: true, meal: { name: "Bowl Pollo Teriyaki", calories: 550, protein: 45, carbs: 60, fats: 15, price: 12.99 } },
  { id: 2, name: "Green Corner", type: "Vegano", distance: "0.5 km", ad: false, meal: { name: "Wrap de Tofu", calories: 400, protein: 20, carbs: 50, fats: 12, price: 9.50 } },
  { id: 3, name: "SteakHouse Lite", type: "Carnes", distance: "1.2 km", ad: false, meal: { name: "Lomo Magro + Ensalada", calories: 600, protein: 65, carbs: 10, fats: 25, price: 18.00 } }
];

const ExpandedRadar = () => {
  const { isPremium, addConsumption } = useAppContext();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedRest, setSelectedRest] = useState(null);

  const filters = ['Todos', 'Saludable', 'Vegano', 'Carnes'];

  const handleOrder = (meal) => {
    addConsumption({ calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fats: meal.fats });
    alert(`Comisión procesada. Has pagado $${meal.price} por la app. Macros agregados a tu día!`);
    setSelectedRest(null);
  };

  return (
    <div className="flex flex-col h-screen" style={{ margin: '-1rem', backgroundColor: '#000' }}>
      
      {/* Header Overlay */}
      <div className="glass-panel" style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', color: 'white' }}><ArrowLeft /></button>
        <h3 className="m-0">Radar Nutricional</h3>
        <button style={{ background: 'transparent', color: 'white' }}><Filter /></button>
      </div>

      {/* Mock Map Background */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' }}>
        
        {/* Radar Rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', border: '1px solid rgba(139, 92, 246, 0.1)', borderRadius: '50%' }}></div>
        
        {/* User Marker */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent)', zIndex: 5 }}>
          <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', border: '2px solid var(--accent)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
        </div>

        {/* Filters */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '1rem', right: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {filters.map(f => (
            <button key={f} className={`badge ${selectedFilter === f ? 'btn-primary' : 'glass-panel'}`} style={{ padding: '0.5rem 1rem', whiteSpace: 'nowrap' }} onClick={() => setSelectedFilter(f)}>
              {f}
            </button>
          ))}
          <button className="badge glass-panel flex items-center gap-1 text-muted" onClick={() => alert('Filtro hiper-específico (Keto, Macros exactos) requiere Nutri+.')}>
            <Lock size={12} /> Macros Exactos
          </button>
        </div>

        {/* Restaurant List Overlay */}
        <div style={{ position: 'absolute', bottom: '5rem', left: '1rem', right: '1rem', zIndex: 10, display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {mockRestaurants.filter(r => selectedFilter === 'Todos' || r.type === selectedFilter).map((rest) => (
            <div key={rest.id} className="glass-panel flex-col flex" style={{ minWidth: '280px', cursor: 'pointer' }} onClick={() => setSelectedRest(rest)}>
              {rest.ad && <span className="badge badge-ad mb-2 w-fit">Ad / Patrocinado</span>}
              <h4>{rest.name}</h4>
              <p className="text-sm text-muted mb-2">{rest.type} • {rest.distance}</p>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--primary)' }}>
                <Star size={14} fill="currentColor" /> Recomendado para ti
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sheet for selected restaurant */}
      {selectedRest && (
        <div className="modal-overlay" onClick={() => setSelectedRest(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: 0, borderRadius: '2rem 2rem 0 0', padding: '2rem' }}>
            <h2 className="mb-1">{selectedRest.name}</h2>
            <p className="text-muted mb-6">{selectedRest.distance} • Excelente coincidencia</p>
            
            <div className="glass-panel mb-6" style={{ background: 'rgba(139, 92, 246, 0.1)', borderColor: 'var(--primary)' }}>
              <h4 className="mb-2">{selectedRest.meal.name}</h4>
              <div className="flex justify-between text-sm mb-4">
                <span>{selectedRest.meal.calories} kcal</span>
                <span>P: {selectedRest.meal.protein}g | C: {selectedRest.meal.carbs}g | G: {selectedRest.meal.fats}g</span>
              </div>
              <button className="btn btn-primary w-full" onClick={() => handleOrder(selectedRest.meal)}>
                <ShoppingBag size={18} />
                Pedir y Pagar por la App (${selectedRest.meal.price})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Required Keyframes for pulse effect injected inline for simplicity or assume it's in global css */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ExpandedRadar;
