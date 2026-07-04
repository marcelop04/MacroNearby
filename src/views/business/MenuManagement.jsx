import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, Plus, Trash2, Edit3, Sparkles, Image as ImageIcon } from 'lucide-react';

const emptyForm = {
  name: '',
  price: '',
  calories: '',
  protein: '',
  carbs: '',
  fats: '',
  imageUrl: ''
};

const MenuManagement = () => {
  const { rawMenuItems: menuItems, addMenuItem, updateMenuItem, deleteMenuItem, showAlert } = useAppContext();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPromotionsOnly, setShowPromotionsOnly] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      price: Number(formData.price),
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fats: Number(formData.fats),
      imageUrl: formData.imageUrl.trim(),
      isPromoted: false
    };

    if (!payload.name || Number.isNaN(payload.price) || Number.isNaN(payload.calories) || Number.isNaN(payload.protein) || Number.isNaN(payload.carbs) || Number.isNaN(payload.fats)) {
      showAlert('Completa todos los campos para guardar el plato.');
      return;
    }

    if (editingId) {
      updateMenuItem(editingId, payload);
      showAlert('Plato actualizado con éxito.');
    } else {
      addMenuItem(payload);
      showAlert('¡Plato guardado con éxito! Ahora los clientes podrán verlo en su radar y Dashboard de inmediato.');
    }

    resetForm();
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setIsAdding(true);
    setFormData({
      name: item.name || '',
      price: item.price?.toString() || '',
      calories: item.calories?.toString() || '',
      protein: item.protein?.toString() || '',
      carbs: item.carbs?.toString() || '',
      fats: item.fats?.toString() || '',
      imageUrl: item.imageUrl || ''
    });
  };

  const togglePromotion = (item) => {
    updateMenuItem(item.id, { isPromoted: !item.isPromoted });
    showAlert(item.isPromoted ? 'Promoción quitada del plato.' : 'Plato marcado como promoción.');
  };

  const visibleItems = showPromotionsOnly ? menuItems.filter(item => item.isPromoted) : menuItems;

  return (
    <div className="flex flex-col gap-4" style={{ paddingTop: '0.5rem' }}>
      <div className="flex items-center gap-3 glass-panel" style={{ padding: '1rem' }}>
        <button onClick={() => navigate('/business')} style={{ background: 'transparent', color: 'var(--text-color)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </button>
        <h3 className="m-0" style={{ fontSize: '1.05rem' }}>Gestionar Menú</h3>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary flex-1" onClick={() => { setIsAdding(true); setEditingId(null); setFormData(emptyForm); }} style={{ padding: '0.85rem' }}>
          <Plus size={18} /> Agregar Plato
        </button>
        <button className="btn btn-secondary flex-1" onClick={() => setShowPromotionsOnly(prev => !prev)} style={{ padding: '0.85rem' }}>
          <Sparkles size={16} /> {showPromotionsOnly ? 'Ver todos' : 'Promociones'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontSize: '1rem', margin: 0 }}>{editingId ? 'Editar Plato' : 'Nuevo Plato'}</h3>
            {editingId && <span className="badge btn-secondary">Editando</span>}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">Imagen (simulada por URL)</label>
              <input
                type="url"
                placeholder="https://ejemplo.com/plato.jpg"
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
              />
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Vista previa" style={{ width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '96px', border: '1px dashed var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-muted)' }}>
                  <div className="text-center">
                    <ImageIcon size={18} style={{ margin: '0 auto 0.3rem' }} />
                    <span className="text-xs">Agrega una URL para simular la imagen</span>
                  </div>
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Nombre de plato"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            />
            <input
              type="number"
              placeholder="Precio ($)"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
              step="0.01"
              style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            />

            <div className="flex gap-2">
              <input type="number" className="w-full" placeholder="Kcal" value={formData.calories} onChange={e => setFormData({ ...formData, calories: e.target.value })} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
              <input type="number" className="w-full" placeholder="Prot (g)" value={formData.protein} onChange={e => setFormData({ ...formData, protein: e.target.value })} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
            </div>
            <div className="flex gap-2">
              <input type="number" className="w-full" placeholder="Carbs (g)" value={formData.carbs} onChange={e => setFormData({ ...formData, carbs: e.target.value })} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
              <input type="number" className="w-full" placeholder="Grasas (g)" value={formData.fats} onChange={e => setFormData({ ...formData, fats: e.target.value })} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }} />
            </div>

            <div className="flex gap-2 mt-1">
              <button type="submit" className="btn btn-primary flex-1" style={{ padding: '0.65rem' }}>{editingId ? 'Actualizar' : 'Guardar'}</button>
              <button type="button" className="btn btn-secondary flex-1" style={{ padding: '0.65rem' }} onClick={resetForm}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-3" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '2px' }}>
        {visibleItems.map(item => (
          <div key={item.id} className="glass-panel flex justify-between items-start gap-3" style={{ padding: '1rem' }}>
            <div className="flex gap-3 flex-1">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '0.75rem', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
              ) : (
                <div style={{ width: '64px', height: '64px', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}>
                  <ImageIcon size={18} />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{item.name}</h4>
                  {item.isPromoted && <span className="badge btn-premium" style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem' }}>Promoción</span>}
                </div>
                <p className="text-xs text-muted" style={{ marginTop: '2px' }}>${item.price.toFixed(2)} • {item.calories} kcal</p>
                <p className="text-xs text-muted" style={{ fontSize: '0.7rem', marginTop: '4px' }}>
                  P: {item.protein}g | C: {item.carbs}g | G: {item.fats}g
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem' }} onClick={() => startEditing(item)}>
                <Edit3 size={14} /> Editar
              </button>
              <button className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem' }} onClick={() => togglePromotion(item)}>
                <Sparkles size={14} /> {item.isPromoted ? 'Quitar promo' : 'Promocionar'}
              </button>
              <button className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem', color: 'var(--danger)' }} onClick={() => deleteMenuItem(item.id)}>
                <Trash2 size={14} /> Borrar
              </button>
            </div>
          </div>
        ))}
        {visibleItems.length === 0 && !isAdding && (
          <p className="text-center text-xs text-muted mt-8">No hay platos para mostrar en esta vista.</p>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;