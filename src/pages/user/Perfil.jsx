import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { calculateTDEE } from '../../utils/tdee';
import { Edit2, Save, X, User } from 'lucide-react';

const Perfil = () => {
  const { userData, setUserData } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: userData?.profile.name || '',
    gender: userData?.profile.gender || 'male',
    age: userData?.profile.age || 25,
    weight: userData?.profile.weight || 70,
    height: userData?.profile.height || 170,
    activityLevel: userData?.profile.activityLevel || 'sedentary',
    goal: userData?.profile.goal || 'maintain',
    allergies: userData?.profile.allergies || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAllergyToggle = (allergy) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy) 
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const metrics = calculateTDEE(
      formData.gender,
      Number(formData.age),
      Number(formData.weight),
      Number(formData.height),
      formData.activityLevel,
      formData.goal
    );

    setUserData({
      profile: formData,
      metrics: metrics
    });
    setIsEditing(false);
  };

  if (!userData) return null;

  return (
    <div className="flex flex-col gap-4" style={{ paddingTop: '1rem' }}>
      <div className="flex justify-between items-center">
        <h2>Mi Perfil</h2>
        {!isEditing ? (
          <button className="btn btn-secondary flex items-center gap-1" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setIsEditing(true)}>
            <Edit2 size={12} /> Editar
          </button>
        ) : (
          <button className="btn btn-secondary flex items-center gap-1" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setIsEditing(false)}>
            <X size={12} /> Cancelar
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="flex flex-col gap-4">
          <div className="glass-panel text-center flex flex-col items-center">
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
              <User size={40} className="text-muted" />
            </div>
            <h3>{userData.profile.name}</h3>
            <p className="text-sm text-muted">{userData.profile.gender === 'male' ? 'Hombre' : 'Mujer'} • {userData.profile.age} años</p>
          </div>

          <div className="glass-panel flex flex-col gap-3">
            <div className="flex justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Meta Diaria</span>
              <span style={{ fontWeight: 'bold' }}>{userData.metrics.target} Kcal</span>
            </div>
            <div className="flex justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Peso Actual</span>
              <span>{userData.profile.weight} kg</span>
            </div>
            <div className="flex justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Altura</span>
              <span>{userData.profile.height} cm</span>
            </div>
            <div className="flex justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Actividad</span>
              <span style={{ textTransform: 'capitalize' }}>{userData.profile.activityLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted text-sm">Objetivo</span>
              <span style={{ textTransform: 'capitalize' }}>{userData.profile.goal === 'lose' ? 'Perder peso' : userData.profile.goal === 'gain' ? 'Ganar músculo' : 'Mantener'}</span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="glass-panel flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <label className="text-xs text-muted mb-1">Sexo</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xs text-muted mb-1">Edad</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <label className="text-xs text-muted mb-1">Peso (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xs text-muted mb-1">Altura (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} required />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Actividad</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
              <option value="sedentary">Sedentario</option>
              <option value="light">Ligero</option>
              <option value="moderate">Moderado</option>
              <option value="active">Activo</option>
              <option value="very_active">Muy Activo</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            <Save size={16} /> Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default Perfil;
