import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { RootState } from '../../store';

const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onMenuClick={handleDrawerToggle} />
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        {isAuthenticated && (
          <Sidebar 
            mobileOpen={mobileOpen} 
            handleDrawerToggle={handleDrawerToggle} 
          />
        )}
        
        <Box 
          component="main" 
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: isAuthenticated ? `calc(100% - 240px)` : '100%' }
          }}
        >
          <Box sx={{ height: { xs: 56, sm: 64 } }} /> {/* Toolbar spacer */}
          <Outlet />
        </Box>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;