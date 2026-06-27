import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

// Layouts
const UserLayout = ({ children }) => (
  <div className="container" style={{ paddingBottom: '80px' }}>
    {children}
    {/* Bottom Nav Placeholder */}
  </div>
);

const BusinessLayout = ({ children }) => (
  <div className="container">{children}</div>
);

// Pages (will be imported, putting placeholders for now)
import Landing from './pages/common/Landing';
import Onboarding from './pages/user/Onboarding';
import Dashboard from './pages/user/Dashboard';
import ExpandedRadar from './pages/user/ExpandedRadar';
import BusinessDashboard from './pages/business/BusinessDashboard';
import MenuManagement from './pages/business/MenuManagement';

const AppRoutes = () => {
  const { appMode, userData } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* User Routes */}
      {appMode === 'user' && (
        <>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={
            userData ? <UserLayout><Dashboard /></UserLayout> : <Navigate to="/onboarding" />
          } />
          <Route path="/radar" element={
            userData ? <UserLayout><ExpandedRadar /></UserLayout> : <Navigate to="/onboarding" />
          } />
        </>
      )}

      {/* Business Routes */}
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