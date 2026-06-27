import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Map, Crown, Zap, Flame } from 'lucide-react';

const CircularProgress = ({ value, max, color, label }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
          <circle cx="40" cy="40" r={radius} stroke={color} strokeWidth="6" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{value}g</span>
        </div>
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

const Dashboard = () => {
  const { userData, dailyProgress, isPremium } = useAppContext();
  const navigate = useNavigate();

  if (!userData) return null;

  const { metrics } = userData;
  const remainingCals = metrics.target - dailyProgress.consumedCalories;

  return (
    <div className="flex flex-col gap-6" style={{ paddingTop: '2rem' }}>
      
      {/* Header */}
      <div className="flex justify-between items-center glass-panel">
        <div>
          <h2 className="text-gradient">Hola, {userData.profile.gender === 'male' ? 'Guerrero' : 'Guerrera'}</h2>
          <p className="text-sm">Tu objetivo: {metrics.target} kcal / día</p>
        </div>
        {!isPremium && (
          <button className="btn btn-premium badge" onClick={() => alert('Modal Premium: Compra Nutri+ por $4.99/mes')}>
            <Crown size={14} /> Nutri+
          </button>
        )}
      </div>

      {/* Main Calories Card */}
      <div className="glass-panel text-center relative overflow-hidden">
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.3, borderRadius: '50%' }}></div>
        <h3 className="mb-2 text-muted">Calorías Restantes</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame color="var(--warning)" size={32} />
          <span style={{ fontSize: '3.5rem', fontWeight: '800' }}>{remainingCals}</span>
        </div>
        <div className="flex justify-between text-sm text-muted mt-4">
          <span>Consumidas: {dailyProgress.consumedCalories}</span>
          <span>Meta: {metrics.target}</span>
        </div>
        {/* Simple Progress Bar */}
        <div className="w-full mt-2 rounded-full h-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="h-2 rounded-full" style={{ width: `${Math.min((dailyProgress.consumedCalories / metrics.target) * 100, 100)}%`, background: 'var(--warning)' }}></div>
        </div>
      </div>

      {/* Macros */}
      <div className="glass-panel flex justify-around">
        <CircularProgress value={dailyProgress.consumedProtein} max={metrics.macros.protein} color="var(--secondary)" label="Proteínas" />
        <CircularProgress value={dailyProgress.consumedCarbs} max={metrics.macros.carbs} color="var(--accent)" label="Carbos" />
        <CircularProgress value={dailyProgress.consumedFats} max={metrics.macros.fats} color="var(--warning)" label="Grasas" />
      </div>

      {/* Action to Map */}
      <button 
        className="btn btn-primary w-full" 
        style={{ padding: '1.25rem', fontSize: '1.1rem' }}
        onClick={() => navigate('/radar')}
      >
        <Map size={24} />
        Abrir Radar de Comida
      </button>

      {/* Premium Exclusive Promo Mock */}
      <div className="glass-panel" style={{ borderLeft: '4px solid #fbbf24', background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.1) 0%, transparent 100%)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap size={18} color="#fbbf24" />
          <h4 style={{ color: '#fbbf24' }}>Promo Exclusiva</h4>
        </div>
        <p className="text-sm text-muted mb-4">20% de descuento en "Healthy Bowls" solo para usuarios Premium.</p>
        <button className="btn btn-secondary w-full" onClick={() => alert(isPremium ? 'Cupón aplicado' : 'Debes ser Premium para acceder a esto.')}>
          {isPremium ? 'Reclamar Cupón' : 'Hazte Premium para reclamar'}
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
