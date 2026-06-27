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
    allergies: userData?.profile.allergies || [],
    healthCondition: userData?.profile.healthCondition || '',
    dietType: userData?.profile.dietType || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "goal" && !["health", "diet"].includes(value)) {
      setFormData(prev => ({
        ...prev,
        goal: value,
        healthCondition: '',
        dietType: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
      formData.goal,
      formData
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
            <div className="flex justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Meta Diaria</span>
              <span style={{ fontWeight: 'bold' }}>{userData.metrics.target} Kcal</span>
            </div>
            <div className="flex justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Peso Actual</span>
              <span>{userData.profile.weight} kg</span>
            </div>
            <div className="flex justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Altura</span>
              <span>{userData.profile.height} cm</span>
            </div>
            <div className="flex justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span className="text-muted text-sm">Actividad</span>
              <span style={{ textTransform: 'capitalize' }}>{userData.profile.activityLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted text-sm">Objetivo</span>
              <span>
                {userData.profile.goal === 'lose' ? 'Pérdida de peso (Déficit)' : 
                 userData.profile.goal === 'gain' ? 'Ganancia de masa (Superávit)' : 
                 userData.profile.goal === 'recomp' ? 'Recomposición corporal' : 
                 userData.profile.goal === 'maintain' ? 'Mantenimiento de peso' : 
                 userData.profile.goal === 'health' ? `Salud (${userData.profile.healthCondition === 'celiac' ? 'Sin Gluten' : userData.profile.healthCondition === 'diabetes' ? 'Diabético' : 'Hipertensión'})` : 
                 `Dieta (${userData.profile.dietType === 'keto' ? 'Keto' : userData.profile.dietType === 'vegan' ? 'Vegano' : 'Vegetariano'})`}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="glass-panel flex flex-col gap-3" style={{ padding: '1.25rem', maxHeight: '550px', overflowY: 'auto' }}>
          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '0.65rem 0.85rem' }} />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Sexo</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: '0.65rem 0.85rem' }}>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Edad (años)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required style={{ padding: '0.65rem 0.85rem' }} />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Peso (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required style={{ padding: '0.65rem 0.85rem' }} />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Altura (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required style={{ padding: '0.65rem 0.85rem' }} />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Actividad</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} style={{ padding: '0.65rem 0.85rem' }}>
              <option value="sedentary">Sedentario (Sin ejercicio)</option>
              <option value="light">Ligero (1-3 días/semana)</option>
              <option value="moderate">Moderado (3-5 días/semana)</option>
              <option value="active">Activo (6-7 días/semana)</option>
              <option value="very_active">Muy Activo (Ejercicio extremo)</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted mb-1">Objetivo Principal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} style={{ padding: '0.65rem 0.85rem' }}>
              <option value="lose">Pérdida de peso (Déficit calórico)</option>
              <option value="gain">Ganancia de masa muscular (Superávit calórico)</option>
              <option value="recomp">Recomposición corporal</option>
              <option value="maintain">Mantenimiento de peso</option>
              <option value="health">Condición de Salud Clínica</option>
              <option value="diet">Restricción / Preferencia Dietética</option>
            </select>
          </div>

          {/* Conditional health field */}
          {formData.goal === 'health' && (
            <div className="flex flex-col">
              <label className="text-xs text-muted mb-1">¿Qué condición debemos cuidar?</label>
              <select name="healthCondition" value={formData.healthCondition} onChange={handleChange} required style={{ padding: '0.65rem 0.85rem' }}>
                <option value="">-- Seleccionar --</option>
                <option value="celiac">Celiaquía / Sin Gluten</option>
                <option value="diabetes">Control de Azúcar / Diabético</option>
                <option value="hypertension">Hipertensión</option>
              </select>
            </div>
          )}

          {/* Conditional diet field */}
          {formData.goal === 'diet' && (
            <div className="flex flex-col">
              <label className="text-xs text-muted mb-1">¿Cuál es tu tipo de alimentación?</label>
              <select name="dietType" value={formData.dietType} onChange={handleChange} required style={{ padding: '0.65rem 0.85rem' }}>
                <option value="">-- Seleccionar --</option>
                <option value="vegan">Vegano</option>
                <option value="vegetarian">Vegetariano</option>
                <option value="keto">Keto</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-2" style={{ padding: '0.75rem' }}>
            <Save size={16} /> Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default Perfil;
