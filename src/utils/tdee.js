export const calculateTDEE = (gender, age, weight, height, activityLevel, goal) => {
  // Harris-Benedict BMR Formula
  // Men: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
  // Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)

  let bmr;
  if (gender === "male") {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Activity Multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise/sports 1-3 days/week
    moderate: 1.55, // Moderate exercise/sports 3-5 days/week
    active: 1.725, // Hard exercise/sports 6-7 days a week
    very_active: 1.9, // Very hard exercise/sports & physical job
  };

  const multiplier = activityMultipliers[activityLevel] || 1.2;
  const maintenanceCalories = Math.round(bmr * multiplier);

  // Goal adjustments
  let targetCalories = maintenanceCalories;
  
  if (goal === "lose") {
    targetCalories -= 500; // 500 kcal deficit
  } else if (goal === "gain") {
    targetCalories += 300; // 300 kcal surplus
  }

  // STRICT RULE: No starvation diets. Minimum 1500 kcal for men, 1200 kcal for women (general safe baseline, but we'll enforce 1500 as safe for MVP)
  const MIN_CALORIES = gender === "male" ? 1500 : 1200;
  if (targetCalories < MIN_CALORIES) {
    targetCalories = MIN_CALORIES;
  }

  // Macro calculation (simplified balanced approach: 30% Protein, 40% Carbs, 30% Fat)
  // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
  const protein = Math.round((targetCalories * 0.3) / 4);
  const carbs = Math.round((targetCalories * 0.4) / 4);
  const fats = Math.round((targetCalories * 0.3) / 9);

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
