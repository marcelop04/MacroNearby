import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { calculateTDEE } from '../../utils/tdee';

const Onboarding = () => {
  const { setUserData } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    age: 25,
    weight: 70, // kg
    height: 170, // cm
    activityLevel: 'sedentary',
    goal: 'maintain',
    allergies: []
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

  const handleSubmit = (e) => {
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
      profile: {
        ...formData,
        name: formData.name.trim() || (formData.gender === 'male' ? 'Guerrero' : 'Guerrera')
      },
      metrics: metrics
    });

    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full" style={{ padding: '1rem 0' }}>
      <div className="w-full">
        <h2 className="text-gradient text-center" style={{ fontSize: '1.8rem' }}>Tu Perfil Nutricional</h2>
        <p className="text-center text-sm mb-6">Calcularemos tus macros exactos para tu objetivo.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-xs">Nombre Completo</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Ej. Marcelo" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-col flex w-full">
              <label className="mb-1 text-xs">Sexo</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
            </div>
            <div className="flex-col flex w-full">
              <label className="mb-1 text-xs">Edad</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="100" required />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-col flex w-full">
              <label className="mb-1 text-xs">Peso (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} min="30" max="250" required />
            </div>
            <div className="flex-col flex w-full">
              <label className="mb-1 text-xs">Altura (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} min="100" max="250" required />
            </div>
          </div>

          <div className="flex-col flex w-full">
            <label className="mb-1 text-xs">Nivel de Actividad</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
              <option value="sedentary">Sedentario (Sin ejercicio)</option>
              <option value="light">Ligero (1-3 días/semana)</option>
              <option value="moderate">Moderado (3-5 days/week)</option>
              <option value="active">Activo (6-7 días/semana)</option>
              <option value="very_active">Muy Activo (Ejercicio extremo)</option>
            </select>
          </div>

          <div className="flex-col flex w-full">
            <label className="mb-1 text-xs">Objetivo</label>
            <select name="goal" value={formData.goal} onChange={handleChange}>
              <option value="lose">Perder Peso (Déficit Saludable)</option>
              <option value="maintain">Mantenimiento / Recomposición</option>
              <option value="gain">Aumentar Masa Muscular</option>
            </select>
          </div>

          <div className="flex-col flex w-full">
            <label className="mb-1 text-xs">Restricciones y Alergias</label>
            <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
              {['Vegano', 'Celiaco', 'Lactosa', 'Frutos Secos'].map(allergy => (
                <button
                  type="button"
                  key={allergy}
                  className={`badge ${formData.allergies.includes(allergy) ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ border: 'none', padding: '0.4rem 0.8rem', cursor: 'pointer' }}
                  onClick={() => handleAllergyToggle(allergy)}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-full text-center" style={{ padding: '0.9rem' }}>
            Calcular mi TDEE y Empezar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
