import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';

const MenuManagement = () => {
  const { menuItems, addMenuItem, deleteMenuItem } = useAppContext();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMenuItem({
      name: formData.name,
      price: Number(formData.price),
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fats: Number(formData.fats)
    });
    setIsAdding(false);
    setFormData({ name: '', price: '', calories: '', protein: '', carbs: '', fats: '' });
    alert("¡Plato guardado con éxito! Ahora los clientes podrán verlo en su radar y Dashboard de inmediato.");
  };

  return (
    <div className="flex flex-col gap-4" style={{ paddingTop: '0.5rem' }}>
      
      <div className="flex items-center gap-3 glass-panel" style={{ padding: '1rem' }}>
        <button onClick={() => navigate('/business')} style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </button>
        <h3 className="m-0" style={{ fontSize: '1.05rem' }}>Gestionar Menú</h3>
      </div>

      {!isAdding ? (
        <button className="btn btn-primary w-full" onClick={() => setIsAdding(true)} style={{ padding: '0.85rem' }}>
          <Plus size={18} /> Agregar Plato
        </button>
      ) : (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Nuevo Plato</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Nombre de plato" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
              style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            />
            <input 
              type="number" 
              placeholder="Precio ($)" 
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})} 
              required 
              step="0.01" 
              style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            />
            
            <div className="flex gap-2">
              <input type="number" className="w-full" placeholder="Kcal" value={formData.calories} onChange={e => setFormData({...formData, calories: e.target.value})} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
              <input type="number" className="w-full" placeholder="Prot (g)" value={formData.protein} onChange={e => setFormData({...formData, protein: e.target.value})} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
            </div>
            <div className="flex gap-2">
              <input type="number" className="w-full" placeholder="Carbs (g)" value={formData.carbs} onChange={e => setFormData({...formData, carbs: e.target.value})} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
              <input type="number" className="w-full" placeholder="Grasas (g)" value={formData.fats} onChange={e => setFormData({...formData, fats: e.target.value})} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
            </div>
            
            <div className="flex gap-2 mt-1">
              <button type="submit" className="btn btn-primary flex-1" style={{ padding: '0.65rem' }}>Guardar</button>
              <button type="button" className="btn btn-secondary flex-1" style={{ padding: '0.65rem' }} onClick={() => setIsAdding(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Plates List */}
      <div className="flex flex-col gap-3" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '2px' }}>
        {menuItems.map(item => (
          <div key={item.id} className="glass-panel flex justify-between items-center" style={{ padding: '1rem' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{item.name}</h4>
              <p className="text-xs text-muted" style={{ marginTop: '2px' }}>${item.price.toFixed(2)} • {item.calories} kcal</p>
              <p className="text-xs text-muted" style={{ fontSize: '0.7rem', marginTop: '4px' }}>
                P: {item.protein}g | C: {item.carbs}g | G: {item.fats}g
              </p>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '0.45rem', color: 'var(--danger)', border: 'none', background: 'transparent' }} 
              onClick={() => deleteMenuItem(item.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {menuItems.length === 0 && !isAdding && (
          <p className="text-center text-xs text-muted mt-8">Tu menú está vacío. Agrega platos para que los clientes te encuentren.</p>
        )}
      </div>

    </div>
  );
};

export default MenuManagement;
