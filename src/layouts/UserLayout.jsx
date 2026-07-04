import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Home, MapPin, Calendar, Users, User, LogOut, Wifi, Battery } from 'lucide-react';

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, customAlert, closeAlert } = useAppContext();

  // Get current active tab from pathname
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="phone-frame">
      {/* Mock status bar */}
      <div className="phone-status-bar">
        <span>22:45</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Wifi size={12} />
          <Battery size={14} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="phone-content">
        {children}
      </div>

      {/* Bottom Navigation Tabs */}
      <div className="phone-nav-bar">
        <button 
          className={`nav-tab ${currentPath === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`nav-tab ${currentPath === '/radar' ? 'active' : ''}`}
          onClick={() => navigate('/radar')}
        >
          <MapPin size={20} />
          <span>Radar</span>
        </button>

        <button 
          className={`nav-tab ${currentPath === '/historial' ? 'active' : ''}`}
          onClick={() => navigate('/historial')}
        >
          <Calendar size={20} />
          <span>Historial</span>
        </button>

        <button 
          className={`nav-tab ${currentPath === '/comunidad' ? 'active' : ''}`}
          onClick={() => navigate('/comunidad')}
        >
          <Users size={20} />
          <span>Comunidad</span>
        </button>

        <button 
          className={`nav-tab ${currentPath === '/perfil' ? 'active' : ''}`}
          onClick={() => navigate('/perfil')}
        >
          <User size={20} />
          <span>Perfil</span>
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

export default UserLayout;
