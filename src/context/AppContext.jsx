import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global App State
  const [appMode, setAppMode] = useLocalStorage('nutri_app_mode', null); // 'user' | 'business' | null
  
  // User Mode State
  const [userData, setUserData] = useLocalStorage('nutri_user_data', null);
  const [isPremium, setIsPremium] = useLocalStorage('nutri_user_premium', false);
  const [dailyProgress, setDailyProgress] = useLocalStorage('nutri_daily_progress', {
    consumedCalories: 0,
    consumedProtein: 0,
    consumedCarbs: 0,
    consumedFats: 0
  });

  // Business Mode State
  const [businessData, setBusinessData] = useLocalStorage('nutri_business_data', null);
  const [menuItems, setMenuItems] = useLocalStorage('nutri_menu_items', []);
  const [hasBusinessSubscription, setHasBusinessSubscription] = useLocalStorage('nutri_business_sub', false);

  const loginAsUser = () => setAppMode('user');
  const loginAsBusiness = () => setAppMode('business');
  const logout = () => {
    setAppMode(null);
  };

  const addConsumption = (macros) => {
    setDailyProgress(prev => ({
      consumedCalories: prev.consumedCalories + macros.calories,
      consumedProtein: prev.consumedProtein + macros.protein,
      consumedCarbs: prev.consumedCarbs + macros.carbs,
      consumedFats: prev.consumedFats + macros.fats
    }));
  };

  const resetDaily = () => {
    setDailyProgress({
      consumedCalories: 0,
      consumedProtein: 0,
      consumedCarbs: 0,
      consumedFats: 0
    });
  };

  // Mock Menu Management
  const addMenuItem = (item) => setMenuItems([...menuItems, { ...item, id: Date.now() }]);
  const updateMenuItem = (id, updatedItem) => setMenuItems(menuItems.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  const deleteMenuItem = (id) => setMenuItems(menuItems.filter(item => item.id !== id));

  return (
    <AppContext.Provider
      value={{
        appMode, loginAsUser, loginAsBusiness, logout,
        userData, setUserData, isPremium, setIsPremium,
        dailyProgress, addConsumption, resetDaily,
        businessData, setBusinessData, hasBusinessSubscription, setHasBusinessSubscription,
        menuItems, addMenuItem, updateMenuItem, deleteMenuItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
