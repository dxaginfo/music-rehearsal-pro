import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

// Layout components
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import DashboardPage from './pages/Dashboard';
import CalendarPage from './pages/Calendar';
import BandsPage from './pages/Bands/BandsList';
import BandDetailsPage from './pages/Bands/BandDetails';
import RehearsalsPage from './pages/Rehearsals/RehearsalsList';
import RehearsalDetailsPage from './pages/Rehearsals/RehearsalDetails';
import ProfilePage from './pages/Profile';
import NotFoundPage from './pages/NotFound';

// Guards
import PrivateRoute from './guards/PrivateRoute';
import { RootState } from './store';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
          
          {/* Protected routes */}
          <Route path="dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
          <Route path="bands" element={<PrivateRoute><BandsPage /></PrivateRoute>} />
          <Route path="bands/:id" element={<PrivateRoute><BandDetailsPage /></PrivateRoute>} />
          <Route path="rehearsals" element={<PrivateRoute><RehearsalsPage /></PrivateRoute>} />
          <Route path="rehearsals/:id" element={<PrivateRoute><RehearsalDetailsPage /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
