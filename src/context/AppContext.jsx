import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

const defaultMenu = [
  { id: 101, name: "Super Bowl Proteico", price: 14.50, calories: 650, protein: 50, carbs: 65, fats: 18, type: "Saludable" },
  { id: 102, name: "Wrap Keto de Pavo", price: 11.20, calories: 420, protein: 35, carbs: 12, fats: 26, type: "Saludable" },
  { id: 103, name: "Waffles Avena & Berries", price: 8.90, calories: 350, protein: 18, carbs: 55, fats: 6, type: "Saludable" }
];

const defaultRestaurantsData = [
  {
    id: 2,
    name: "Green Corner",
    type: "Vegano",
    distance: "300m",
    position: { x: '65%', y: '30%' },
    meals: [
      { name: "Wrap de Tofu Ahumado", calories: 390, protein: 22, carbs: 48, fats: 12, price: 9.50, isVegan: true, isGlutenFree: false },
      { name: "Ensalada de Garbanzos y Palta", calories: 450, protein: 16, carbs: 55, fats: 18, price: 11.00, isVegan: true, isGlutenFree: true },
      { name: "Smoothie Proteico de Espinaca", calories: 280, protein: 20, carbs: 35, fats: 4, price: 8.00, isVegan: true, isGlutenFree: true }
    ]
  },
  {
    id: 3,
    name: "SteakHouse Lite",
    type: "Carnes",
    distance: "500m",
    position: { x: '50%', y: '65%' },
    meals: [
      { name: "Lomo Magro + Ensalada Mixta", calories: 520, protein: 52, carbs: 8, fats: 22, price: 18.00, isVegan: false, isGlutenFree: true },
      { name: "Pechuga Rústica con Camote", calories: 480, protein: 44, carbs: 42, fats: 10, price: 14.50, isVegan: false, isGlutenFree: true },
      { name: "Brochetas Fit de Res", calories: 390, protein: 36, carbs: 12, fats: 15, price: 13.00, isVegan: false, isGlutenFree: true }
    ]
  },
  {
    id: 4,
    name: "Bella Italia Fit",
    type: "Italiana",
    distance: "750m",
    position: { x: '75%', y: '60%' },
    meals: [
      { name: "Pasta Integral al Pesto Casero", calories: 540, protein: 18, carbs: 68, fats: 16, price: 13.50, isVegan: true, isGlutenFree: false },
      { name: "Pizza Fit con Masa de Avena", calories: 590, protein: 40, carbs: 58, fats: 18, price: 16.00, isVegan: false, isGlutenFree: false }
    ]
  },
  {
    id: 5,
    name: "Chifa Wok & Roll",
    type: "Criolla",
    distance: "900m",
    position: { x: '25%', y: '70%' },
    meals: [
      { name: "Lomo Saltado Fit (Poco Aceite)", calories: 510, protein: 42, carbs: 32, fats: 16, price: 16.50, isVegan: false, isGlutenFree: true },
      { name: "Pollo Chijaukay Keto", calories: 560, protein: 46, carbs: 12, fats: 24, price: 15.00, isVegan: false, isGlutenFree: false }
    ]
  }
];

export const AppProvider = ({ children }) => {
  const [appMode, setAppMode] = useLocalStorage('nutri_app_mode', null);
  
  // User Profile and Progress
  const [userData, setUserData] = useLocalStorage('nutri_user_data', null);
  const [isPremium, setIsPremium] = useLocalStorage('nutri_user_premium', false);
  const [streak, setStreak] = useLocalStorage('nutri_user_streak', 3);
  const [dailyProgress, setDailyProgress] = useLocalStorage('nutri_daily_progress', {
    consumedCalories: 0,
    consumedProtein: 0,
    consumedCarbs: 0,
    consumedFats: 0
  });
  const [consumedMeals, setConsumedMeals] = useLocalStorage('nutri_consumed_meals', []);

  // Business / Merchant Mode
  const [menuItems, setMenuItems] = useLocalStorage('nutri_menu_items', defaultMenu);
  const [businessLocation, setBusinessLocation] = useLocalStorage('nutri_business_location', { x: '35%', y: '40%' });
  const [hasBusinessSubscription, setHasBusinessSubscription] = useLocalStorage('nutri_business_sub', false);

  const loginAsUser = () => setAppMode('user');
  const loginAsBusiness = () => setAppMode('business');
  const logout = () => setAppMode(null);

  const addConsumption = (meal) => {
    setDailyProgress(prev => ({
      consumedCalories: prev.consumedCalories + meal.calories,
      consumedProtein: prev.consumedProtein + meal.protein,
      consumedCarbs: prev.consumedCarbs + meal.carbs,
      consumedFats: prev.consumedFats + meal.fats
    }));
    setConsumedMeals(prev => [
      ...prev,
      {
        ...meal,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const resetDaily = () => {
    setDailyProgress({
      consumedCalories: 0,
      consumedProtein: 0,
      consumedCarbs: 0,
      consumedFats: 0
    });
    setConsumedMeals([]);
  };

  const advanceDay = () => {
    resetDaily();
    setStreak(prev => prev + 1);
  };

  // Menu Management CRUD
  const addMenuItem = (item) => setMenuItems([...menuItems, { ...item, id: Date.now() }]);
  const updateMenuItem = (id, updatedItem) => setMenuItems(menuItems.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  const deleteMenuItem = (id) => setMenuItems(menuItems.filter(item => item.id !== id));

  // AI Recommendation engine based on User daily deficit / remaining macros
  const getAIMatch = () => {
    if (!userData) return null;
    const { profile, metrics } = userData;

    // Calculate remaining macronutrients to hit daily target
    const remainingCals = Math.max(0, metrics.target - dailyProgress.consumedCalories);
    const remainingProtein = Math.max(0, metrics.macros.protein - dailyProgress.consumedProtein);
    const remainingCarbs = Math.max(0, metrics.macros.carbs - dailyProgress.consumedCarbs);
    const remainingFats = Math.max(0, metrics.macros.fats - dailyProgress.consumedFats);

    // If day is completed (all budgets satisfied or exceeded)
    if (remainingCals <= 0) {
      return {
        meal: { name: "Snack Ligero / Té de Hierbas", calories: 0, protein: 0, carbs: 0, fats: 0, price: 0.00, restaurant: "FitBowl (Tu Local)" },
        matchPercentage: 99,
        reason: "Has completado tus calorías del día. Te recomendamos descansar tu digestión con infusiones calientes."
      };
    }

    // Gather all meals
    const allAvailableMeals = [];
    menuItems.forEach(item => {
      allAvailableMeals.push({
        ...item,
        restaurant: "FitBowl (Tu Local)",
        isVegan: profile.allergies.includes('Vegano'),
        isGlutenFree: !profile.allergies.includes('Celiaco')
      });
    });
    defaultRestaurantsData.forEach(rest => {
      rest.meals.forEach(meal => {
        allAvailableMeals.push({
          ...meal,
          restaurant: rest.name
        });
      });
    });

    // Filter by allergies
    let filteredMeals = allAvailableMeals;
    if (profile.allergies.includes('Vegano')) {
      filteredMeals = filteredMeals.filter(m => m.isVegan);
    }
    if (profile.allergies.includes('Celiaco')) {
      filteredMeals = filteredMeals.filter(m => m.isGlutenFree);
    }
    if (filteredMeals.length === 0) {
      filteredMeals = allAvailableMeals;
    }

    // Scoring system prioritizing what is MISSING to complete the daily target
    let bestMeal = filteredMeals[0];
    let topScore = -999;
    let explanation = "";

    filteredMeals.forEach(meal => {
      let score = 50; // base

      // 1. Calories check: Avoid going over remaining calories
      if (meal.calories > remainingCals) {
        score -= 50; // Heavy penalty if it exceeds budget
      } else {
        score += 15;
      }

      // 2. Protein check: If protein is needed, value high-protein options
      if (remainingProtein > 0) {
        if (meal.protein >= remainingProtein) {
          score += 25; // satisfies the remaining protein
        } else if (meal.protein > 15) {
          score += 15; // helps reach the protein target
        }
      } else if (meal.protein > 10) {
        // If protein target already hit, don't over-prioritize heavy protein
        score -= 10;
      }

      // 3. Carbs check
      if (remainingCarbs > 0) {
        if (meal.carbs > remainingCarbs + 10) {
          score -= 30; // too much carbs
        } else {
          score += 10;
        }
      } else if (meal.carbs > 15) {
        score -= 20;
      }

      // 4. Fats check
      if (remainingFats > 0) {
        if (meal.fats > remainingFats + 5) {
          score -= 25;
        } else {
          score += 10;
        }
      } else if (meal.fats > 8) {
        score -= 20;
      }

      if (score > topScore) {
        topScore = score;
        bestMeal = meal;
      }
    });

    // Determine target-driven descriptions
    if (remainingProtein > 25) {
      explanation = `NutriAI te aconseja este plato de ${bestMeal.restaurant} porque te faltan ${remainingProtein}g de proteínas para cumplir tu meta hoy, y esta opción te aporta ${bestMeal.protein}g saludables.`;
    } else if (remainingCals < 500) {
      explanation = `NutriAI te aconseja este plato ligero de ${bestMeal.restaurant} ya que te quedan pocas calorías restantes (${remainingCals} kcal) para cerrar el día de manera óptima.`;
    } else {
      explanation = `NutriAI te aconseja este plato balanceado de ${bestMeal.restaurant} para complementar tu requerimiento de macros diarios restantes de forma limpia.`;
    }

    return {
      meal: bestMeal,
      matchPercentage: Math.max(60, Math.min(topScore + 50, 99)),
      reason: explanation
    };
  };

  return (
    <AppContext.Provider
      value={{
        appMode, loginAsUser, loginAsBusiness, logout,
        userData, setUserData, isPremium, setIsPremium, streak, setStreak,
        dailyProgress, addConsumption, resetDaily, advanceDay, consumedMeals,
        menuItems, addMenuItem, updateMenuItem, deleteMenuItem,
        businessLocation, setBusinessLocation,
        defaultRestaurants: defaultRestaurantsData,
        getAIMatch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
