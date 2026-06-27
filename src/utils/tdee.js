export const calculateTDEE = (gender, age, weight, height, activityLevel, goal, extraFields = {}) => {
  // Harris-Benedict BMR Formula
  let bmr;
  if (gender === "male") {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Activity Multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.2;
  const maintenanceCalories = Math.round(bmr * multiplier);

  // Goal adjustments
  let targetCalories = maintenanceCalories;
  
  if (goal === "lose") {
    targetCalories = Math.round(maintenanceCalories * 0.80); // TDEE - 20%
  } else if (goal === "gain") {
    targetCalories = Math.round(maintenanceCalories * 1.15); // TDEE + 15%
  } else if (goal === "recomp" || goal === "maintain" || goal === "health" || goal === "diet") {
    targetCalories = maintenanceCalories;
  }

  // Minimum calories safeguards
  const MIN_CALORIES = gender === "male" ? 1500 : 1200;
  if (targetCalories < MIN_CALORIES) {
    targetCalories = MIN_CALORIES;
  }

  // Macro calculation
  let protein, carbs, fats;

  // Check if Keto is selected in restrictions (Keto diet)
  const isKeto = goal === "diet" && extraFields.dietType === "keto";

  if (isKeto) {
    carbs = 30; // Max 30g carbs
    protein = Math.round((targetCalories * 0.25) / 4); // 25% protein
    fats = Math.max(10, Math.round((targetCalories - (protein * 4) - (carbs * 4)) / 9)); // Rest is fats
  } else if (goal === "recomp") {
    protein = Math.round(2.2 * weight); // 2.2g per kg
    const remainingCals = targetCalories - (protein * 4);
    carbs = Math.max(10, Math.round((remainingCals * 0.55) / 4));
    fats = Math.max(10, Math.round((remainingCals * 0.45) / 9));
  } else {
    // Standard balanced approach (30% Protein, 40% Carbs, 30% Fat)
    protein = Math.round((targetCalories * 0.3) / 4);
    carbs = Math.round((targetCalories * 0.4) / 4);
    fats = Math.round((targetCalories * 0.3) / 9);
  }

  return {
    maintenance: maintenanceCalories,
    target: targetCalories,
    macros: {
      protein,
      carbs,
      fats
    }
  };
};
