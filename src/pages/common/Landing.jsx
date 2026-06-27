import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Utensils, Store } from 'lucide-react';

const Landing = () => {
  const { loginAsUser, loginAsBusiness, appMode, userData } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (appMode === 'user') {
      navigate(userData ? '/dashboard' : '/onboarding');
    } else if (appMode === 'business') {
      navigate('/business');
    }
  }, [appMode, userData, navigate]);

  return (
    <div className="container flex flex-col items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="glass-panel text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nutrinearby</h1>
        <p className="text-muted mb-6">Encuentra tus macros en cualquier lugar.</p>
        
        <div className="flex flex-col gap-4 mt-6">
          <button 
            className="btn btn-primary"
            onClick={() => {
              loginAsUser();
              navigate('/onboarding');
            }}
          >
            <Utensils size={20} />
            Entrar como Usuario
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => {
              loginAsBusiness();
              navigate('/business');
            }}
          >
            <Store size={20} />
            Entrar como Negocio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
