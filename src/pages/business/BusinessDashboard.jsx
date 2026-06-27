import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { TrendingUp, Users, MapPin, Settings } from 'lucide-react';

const BusinessSubscriptionModal = ({ onClose }) => {
  const { setHasBusinessSubscription } = useAppContext();
  
  return (
    <div className="modal-overlay">
      <div className="modal-content text-center">
        <h2 className="text-gradient mb-4">NutriBusiness Pro</h2>
        <p className="text-muted mb-6">Desbloquea analíticas avanzadas, retargeting de clientes y posicionamiento prioritario en el radar de usuarios por solo $49/mes.</p>
        
        <div className="flex flex-col gap-4">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setHasBusinessSubscription(true);
              onClose();
            }}
          >
            Suscribirse a Pro
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Quizás más tarde
          </button>
        </div>
      </div>
    </div>
  );
};

const BusinessDashboard = () => {
  const { hasBusinessSubscription, logout } = useAppContext();
  const navigate = useNavigate();
  const [showSubModal, setShowSubModal] = useState(!hasBusinessSubscription);

  return (
    <div className="flex flex-col gap-6" style={{ paddingTop: '2rem' }}>
      
      <div className="flex justify-between items-center glass-panel">
        <div>
          <h2>Panel de Restaurante</h2>
          <p className="text-sm text-muted">FitBowl Centro</p>
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => { logout(); navigate('/'); }}>
          Salir
        </button>
      </div>

      <div className="flex gap-4">
        <div className="glass-panel flex-1 flex flex-col items-center justify-center text-center">
          <MapPin size={24} color="var(--primary)" className="mb-2" />
          <h3 className="text-xl">1,245</h3>
          <span className="text-xs text-muted">Apariciones en Radar</span>
        </div>
        <div className="glass-panel flex-1 flex flex-col items-center justify-center text-center">
          <TrendingUp size={24} color="var(--success)" className="mb-2" />
          <h3 className="text-xl">$450</h3>
          <span className="text-xs text-muted">Ventas (Comisión app)</span>
        </div>
      </div>

      <div className="glass-panel relative overflow-hidden" style={!hasBusinessSubscription ? { filter: 'grayscale(1)', opacity: 0.7 } : {}}>
        {!hasBusinessSubscription && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(2px)' }}>
            <button className="btn btn-primary" onClick={() => setShowSubModal(true)}>Desbloquear Analíticas Pro</button>
          </div>
        )}
        <h3 className="mb-4">Demografía de Clientes</h3>
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} /> <span className="text-sm">70% Buscan Pérdida de Peso</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
          <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} /> <span className="text-sm">30% Buscan Ganancia Muscular</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div className="bg-secondary h-2 rounded-full" style={{ width: '30%' }}></div>
        </div>
      </div>

      <button className="btn btn-primary w-full" onClick={() => navigate('/business/menu')}>
        <Settings size={20} />
        Gestionar Menú y Macros
      </button>

      {showSubModal && <BusinessSubscriptionModal onClose={() => setShowSubModal(false)} />}
    </div>
  );
};

export default BusinessDashboard;
