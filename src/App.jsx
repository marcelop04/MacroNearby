import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

// Layouts
import UserLayout from './layouts/UserLayout';
import BusinessLayout from './layouts/BusinessLayout';

// Views
import Landing from './views/common/Landing';
import Onboarding from './views/user/Onboarding';
import Dashboard from './views/user/Dashboard';
import ExpandedRadar from './views/user/ExpandedRadar';
import Historial from './views/user/Historial';
import Comunidad from './views/user/Comunidad';
import Perfil from './views/user/Perfil';
import BusinessDashboard from './views/business/BusinessDashboard';
import MenuManagement from './views/business/MenuManagement';

const AppRoutes = () => {
  const { appMode, userData } = useAppContext();

  return (
    <Routes>
      {/* Landing page wrapped in phone-frame for aesthetics */}
      <Route path="/" element={
        <div className="phone-frame">
          <div className="phone-status-bar">
            <span>22:45</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span>100%</span>
            </div>
          </div>
          <div className="phone-content" style={{ paddingBottom: 0 }}>
            <Landing />
          </div>
        </div>
      } />
      
      {/* User Routes */}
      {appMode === 'user' && (
        <>
          <Route path="/onboarding" element={
            <div className="phone-frame">
              <div className="phone-status-bar">
                <span>22:45</span>
              </div>
              <div className="phone-content" style={{ paddingBottom: 0 }}>
                <Onboarding />
              </div>
            </div>
          } />
          
          <Route path="/dashboard" element={
            userData ? <UserLayout><Dashboard /></UserLayout> : <Navigate to="/onboarding" />
          } />
          <Route path="/radar" element={
            userData ? <UserLayout><ExpandedRadar /></UserLayout> : <Navigate to="/onboarding" />
          } />
          <Route path="/historial" element={
            userData ? <UserLayout><Historial /></UserLayout> : <Navigate to="/onboarding" />
          } />
          <Route path="/comunidad" element={
            userData ? <UserLayout><Comunidad /></UserLayout> : <Navigate to="/onboarding" />
          } />
          <Route path="/perfil" element={
            userData ? <UserLayout><Perfil /></UserLayout> : <Navigate to="/onboarding" />
          } />
        </>
      )}

      {/* Business Routes - Wrapped in BusinessLayout Mobile frame! */}
      {appMode === 'business' && (
        <>
          <Route path="/business" element={<BusinessLayout><BusinessDashboard /></BusinessLayout>} />
          <Route path="/business/menu" element={<BusinessLayout><MenuManagement /></BusinessLayout>} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;