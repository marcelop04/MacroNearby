import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Store, Settings, LogOut, Wifi, Battery, Landmark } from 'lucide-react';

const BusinessLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAppContext();

  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="phone-frame" style={{ borderColor: '#334155' }}>
      {/* Merchant Status Bar Mock */}
      <div className="phone-status-bar" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
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
      <div className="phone-nav-bar" style={{ background: 'rgba(30, 41, 59, 0.95)' }}>
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
    </div>
  );
};

export default BusinessLayout;
