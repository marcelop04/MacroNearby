import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Store, Settings, LogOut, Wifi, Battery, Landmark } from 'lucide-react';

const BusinessLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, customAlert, closeAlert } = useAppContext();

  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="phone-frame" style={{ borderColor: '#334155' }}>
      {/* Merchant Status Bar Mock */}
      <div className="phone-status-bar">
        <span style={{ color: 'var(--warning)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Landmark size={12} /> Mi Restaurante
        </span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Wifi size={12} />
          <Battery size={14} />
        </div>
      </div>

      {/* Merchant Content Area */}
      <div className="phone-content">
        {children}
      </div>

      {/* Merchant Bottom Navigation Bar */}
      <div className="phone-nav-bar">
        <button 
          className={`nav-tab ${currentPath === '/business' ? 'active' : ''}`}
          onClick={() => navigate('/business')}
        >
          <Store size={20} />
          <span>Inicio</span>
        </button>

        <button 
          className={`nav-tab ${currentPath === '/business/menu' ? 'active' : ''}`}
          onClick={() => navigate('/business/menu')}
        >
          <Settings size={20} />
          <span>Menú</span>
        </button>

        <button 
          className="nav-tab"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Salir</span>
        </button>
      </div>

      {customAlert && (
        <div className="modal-overlay" style={{ zIndex: 100, alignItems: 'center', padding: '2rem' }}>
          <div className="modal-content text-center" style={{ padding: '1.5rem', borderRadius: '1.25rem', animation: 'scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <h4 className="text-gradient mb-2" style={{ fontSize: '1.15rem' }}>Nutrinearby</h4>
            <p className="text-sm text-muted mb-4" style={{ lineHeight: '1.4' }}>{customAlert}</p>
            <button className="btn btn-primary w-full" style={{ padding: '0.65rem', fontSize: '0.9rem' }} onClick={closeAlert}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessLayout;
