import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { TrendingUp, Plus, Store, Sparkles, MapPin, Target, Zap } from 'lucide-react';

const BusinessSubscriptionModal = ({ onClose }) => {
  const { setHasBusinessSubscription } = useAppContext();
  
  return (
    <div className="modal-overlay">
      <div className="modal-content text-center" style={{ padding: '1.5rem' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(251,191,36,0.1)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
          <Sparkles size={20} color="#fbbf24" />
        </div>
        <h2 className="text-gradient mb-2" style={{ fontSize: '1.25rem' }}>NutriMerchant Pro</h2>
        <p className="text-sm text-muted mb-4" style={{ lineHeight: '1.4' }}>
          Consigue posicionamiento patrocinado prioritario en el radar de usuarios y accede a estadísticas de demanda oculta en tiempo real.
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            className="btn btn-premium w-full"
            style={{ padding: '0.8rem' }}
            onClick={() => {
              setHasBusinessSubscription(true);
              onClose();
            }}
          >
            Suscribirse a Pro
          </button>
          <button 
            className="btn btn-secondary w-full" 
            style={{ padding: '0.8rem' }}
            onClick={onClose}
          >
            Seguir en Plan Básico
          </button>
        </div>
      </div>
    </div>
  );
};

const BusinessDashboard = () => {
  const { 
    hasBusinessSubscription, setHasBusinessSubscription, menuItems, businessLocation, 
    setBusinessLocation, flashDiscountActive, toggleFlashDiscount, showAlert 
  } = useAppContext();
  const navigate = useNavigate();
  const [showSubModal, setShowSubModal] = useState(false);
  const mapRef = useRef(null);

  const handleMapClick = (e) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Convert to percentage strings
    const percentX = Math.round((clickX / rect.width) * 100) + '%';
    const percentY = Math.round((clickY / rect.height) * 100) + '%';
    
    setBusinessLocation({ x: percentX, y: percentY });
  };

  return (
    <div className="flex flex-col gap-5" style={{ paddingTop: '0.5rem' }}>
      
      {/* Header */}
      <div className="flex justify-between items-center glass-panel">
        <div>
          <h2 className="text-gradient" style={{ fontSize: '1.2rem', margin: 0 }}>Gestión de Local</h2>
          <p className="text-xs" style={{ margin: 0 }}>FitBowl Centro</p>
        </div>
        <button 
          className={`badge ${hasBusinessSubscription ? 'btn-premium' : 'btn-secondary text-muted'}`}
          onClick={() => {
            if (hasBusinessSubscription) {
              setHasBusinessSubscription(false);
              showAlert("Suscripción Pro cancelada. Has vuelto al plan básico.");
            } else {
              setShowSubModal(true);
            }
          }}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          {hasBusinessSubscription ? 'Pro Activo' : 'Subir a Pro'}
        </button>
      </div>

      {/* Interactive visual Map Coordinates Selector */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Target size={16} color="var(--primary)" />
          Ubicación de tu Local
        </h3>
        <p className="text-xs text-muted mb-3" style={{ lineHeight: '1.3' }}>
          Haz clic en cualquier punto del mapa para mudar el pin de tu restaurante en el radar de los clientes:
        </p>

        {/* Visual Map Box Grid */}
        <div 
          ref={mapRef}
          onClick={handleMapClick}
          style={{
            height: '150px',
            width: '100%',
            background: '#f1f5f9',
            border: '1.5px solid var(--border-color)',
            borderRadius: '0.75rem',
            position: 'relative',
            cursor: 'crosshair',
            overflow: 'hidden'
          }}
        >
          {/* Grid markings */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
          
          {/* Circular radar rings for aesthetic matching */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90px', height: '90px', border: '1px dashed rgba(16, 185, 129, 0.25)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '50%' }}></div>
          <span className="text-xs text-muted" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.6rem' }}>Cliente</span>

          {/* Current restaurant coordinates pin */}
          {businessLocation && (
            <div 
              style={{
                position: 'absolute',
                left: businessLocation.x,
                top: businessLocation.y,
                transform: 'translate(-50%, -50%)',
                color: '#fbbf24',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <MapPin size={18} fill="#fbbf24" stroke="#000" />
              <span className="badge badge-ad" style={{ padding: '0.05rem 0.25rem', fontSize: '0.55rem', transform: 'translateY(-2px)' }}>Aquí</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="glass-panel text-center" style={{ padding: '1rem', alignItems: 'center' }}>
          <Store size={20} color="var(--primary)" />
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '0.25rem' }}>1,482</span>
          <span className="text-xs text-muted">Apariciones</span>
        </div>
        <div className="glass-panel text-center" style={{ padding: '1rem', alignItems: 'center' }}>
          <TrendingUp size={20} color="var(--success)" />
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '0.25rem' }}>$354.20</span>
          <span className="text-xs text-muted">Venta Mensual</span>
        </div>
      </div>

      {/* Subscription Demo switch */}
      <div className="glass-panel" style={{ border: '1px solid rgba(139, 92, 246, 0.2)', background: 'rgba(139, 92, 246, 0.03)', padding: '1rem 1.25rem' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={14} color="var(--primary)" />
            <span className="text-xs font-semibold">Demo: Activar Pro</span>
          </div>
          <input 
            type="checkbox" 
            checked={hasBusinessSubscription} 
            onChange={(e) => {
              setHasBusinessSubscription(e.target.checked);
              showAlert(e.target.checked ? "NutriMerchant Pro activado. Desbloqueadas las herramientas flash y analíticas." : "Plan Merchant básico restablecido.");
            }} 
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Promociones Flash - Premium Only */}
      {hasBusinessSubscription && (
        <div className="glass-panel" style={{ padding: '1.25rem', border: '1px dashed var(--secondary)', background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 100%)', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} color="var(--secondary)" fill="var(--secondary)" />
            Promociones Flash por Proximidad
          </h3>
          <p className="text-xs text-muted" style={{ margin: 0, lineHeight: '1.3' }}>
            Lanza una promoción relámpago con un 20% de descuento automático en tu menú para atraer clientes a menos de 500 metros.
          </p>
          <button 
            className={`btn w-full`}
            style={{ 
              padding: '0.65rem', 
              fontSize: '0.8rem', 
              background: flashDiscountActive ? 'var(--secondary)' : 'rgba(16,185,129,0.1)', 
              color: flashDiscountActive ? '#fff' : 'var(--secondary)',
              border: flashDiscountActive ? 'none' : '1px solid var(--secondary)'
            }}
            onClick={() => {
              toggleFlashDiscount();
              showAlert(flashDiscountActive 
                ? "Promoción desactivada. Tus precios han vuelto a la normalidad." 
                : "¡Descuento Relámpago Activado! Se ha enviado una notificación push a 45 usuarios a menos de 500 metros a la redonda.");
            }}
          >
            {flashDiscountActive ? '★ Detener Descuento Relámpago' : '⚡ Lanzar Descuento Relámpago (20% OFF)'}
          </button>
        </div>
      )}

      {/* Merchant Analytics & Demanda Oculta */}
      <div className="glass-panel relative overflow-hidden" style={{ minHeight: '180px', padding: '1.25rem', gap: '0.75rem' }}>
        {!hasBusinessSubscription ? (
          <>
            <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(3px)', gap: '0.75rem', padding: '1rem' }}>
              <p className="text-xs text-center text-muted" style={{ color: '#fff' }}>Desbloquea analíticas de conversión de clientes y demanda oculta para tu local.</p>
              <button className="btn btn-premium" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => setShowSubModal(true)}>
                Subir a Pro
              </button>
            </div>
            <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Perfil de tus Clientes</h3>
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Búsqueda de Pérdida de Peso</span>
                  <span style={{ fontWeight: 'bold' }}>68%</span>
                </div>
                <div style={{ width: '100%', background: 'rgba(15, 23, 42, 0.08)', borderRadius: '999px', height: '6px' }}>
                  <div style={{ background: 'var(--primary)', width: '68%', height: '6px', borderRadius: '999px' }}></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} color="var(--primary)" />
              Demanda Oculta en tu Zona
            </h3>
            
            <div className="flex flex-col gap-2" style={{ background: 'rgba(14,165,233,0.03)', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.75rem' }}>
              <div className="flex items-start gap-2">
                <span style={{ fontSize: '1rem' }}>💡</span>
                <div>
                  <span className="text-xs" style={{ fontWeight: '700', color: 'var(--primary)' }}>Sugerencia de Menú Inteligente:</span>
                  <p className="text-xs text-muted" style={{ margin: 0, lineHeight: '1.3' }}>
                    A la 1 PM, 80 usuarios buscaron almuerzos altos en proteína cerca de ti. ¡Destaca un plato de pechuga extra para captarlos!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs text-muted font-semibold">Términos buscados hoy (Sin coincidencia):</span>
              
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>Alto Proteico (más de 30g)</span>
                    <span style={{ fontWeight: 'bold' }}>82 búsquedas</span>
                  </div>
                  <div style={{ width: '100%', background: 'rgba(15, 23, 42, 0.08)', borderRadius: '999px', height: '5px' }}>
                    <div style={{ background: 'var(--secondary)', width: '85%', height: '5px', borderRadius: '999px' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>Bajo en Sodio / Cardio</span>
                    <span style={{ fontWeight: 'bold' }}>45 búsquedas</span>
                  </div>
                  <div style={{ width: '100%', background: 'rgba(15, 23, 42, 0.08)', borderRadius: '999px', height: '5px' }}>
                    <div style={{ background: 'var(--accent)', width: '48%', height: '5px', borderRadius: '999px' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>Cero Azúcar / Keto</span>
                    <span style={{ fontWeight: 'bold' }}>31 búsquedas</span>
                  </div>
                  <div style={{ width: '100%', background: 'rgba(15, 23, 42, 0.08)', borderRadius: '999px', height: '5px' }}>
                    <div style={{ background: 'var(--warning)', width: '33%', height: '5px', borderRadius: '999px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Menu Actions */}
      <button 
        className="btn btn-primary w-full"
        onClick={() => navigate('/business/menu')}
      >
        <Plus size={18} />
        Gestionar Platos y Precios ({menuItems.length})
      </button>

      {showSubModal && <BusinessSubscriptionModal onClose={() => setShowSubModal(false)} />}
    </div>
  );
};

export default BusinessDashboard;
