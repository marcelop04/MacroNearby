import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';

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
  };

  return (
    <div className="flex flex-col gap-6" style={{ paddingTop: '2rem' }}>
      
      <div className="flex items-center gap-4 glass-panel">
        <button onClick={() => navigate('/business')} style={{ background: 'transparent', color: 'white' }}><ArrowLeft /></button>
        <h2 className="m-0">Gestión de Menú</h2>
      </div>

      {!isAdding ? (
        <button className="btn btn-primary w-full" onClick={() => setIsAdding(true)}>
          <Plus size={20} /> Agregar Nuevo Plato
        </button>
      ) : (
        <div className="glass-panel">
          <h3 className="mb-4">Nuevo Plato</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Nombre del Plato" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="number" placeholder="Precio ($)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required step="0.01" />
            
            <div className="flex gap-2">
              <input type="number" className="w-full" placeholder="Kcal" value={formData.calories} onChange={e => setFormData({...formData, calories: e.target.value})} required />
              <input type="number" className="w-full" placeholder="Prot (g)" value={formData.protein} onChange={e => setFormData({...formData, protein: e.target.value})} required />
            </div>
            <div className="flex gap-2">
              <input type="number" className="w-full" placeholder="Carbs (g)" value={formData.carbs} onChange={e => setFormData({...formData, carbs: e.target.value})} required />
              <input type="number" className="w-full" placeholder="Grasas (g)" value={formData.fats} onChange={e => setFormData({...formData, fats: e.target.value})} required />
            </div>
            
            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary flex-1">Guardar</button>
              <button type="button" className="btn btn-secondary flex-1" onClick={() => setIsAdding(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="glass-panel flex justify-between items-center">
            <div>
              <h4>{item.name}</h4>
              <p className="text-sm text-muted">${item.price.toFixed(2)} • {item.calories} kcal</p>
              <p className="text-xs text-muted mt-1">P: {item.protein}g | C: {item.carbs}g | G: {item.fats}g</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.5rem', color: 'var(--danger)' }} onClick={() => deleteMenuItem(item.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {menuItems.length === 0 && !isAdding && (
          <p className="text-center text-muted mt-8">Tu menú está vacío. Agrega platos para aparecer en el radar.</p>
        )}
      </div>

    </div>
  );
};

export default MenuManagement;
