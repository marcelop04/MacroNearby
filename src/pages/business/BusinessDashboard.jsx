export { default } from '../../views/business/BusinessDashboard';
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
