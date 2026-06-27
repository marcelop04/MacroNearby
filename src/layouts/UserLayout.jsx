import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Home, MapPin, Calendar, Users, User, LogOut, Wifi, Battery } from 'lucide-react';

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAppContext();

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
    </div>
  );
};

export default UserLayout;
