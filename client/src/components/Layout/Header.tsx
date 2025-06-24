import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <MusicNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Music Rehearsal Pro
          </Typography>

          {/* Menu icon for authenticated users on mobile */}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onMenuClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Logo for mobile */}
          <MusicNoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MRP
          </Typography>

          {/* Main navigation for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated ? (
              <>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Dashboard
                </Button>
                <Button
                  component={RouterLink}
                  to="/calendar"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Calendar
                </Button>
                <Button
                  component={RouterLink}
                  to="/bands"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Bands
                </Button>
                <Button
                  component={RouterLink}
                  to="/rehearsals"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Rehearsals
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Home
                </Button>
              </>
            )}
          </Box>

          {/* User menu or login/register buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                      alt={user?.firstName} 
                      src={user?.avatarUrl || undefined} 
                      sx={{ bgcolor: 'secondary.main' }}
                    >
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile" 
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button 
                  component={RouterLink} 
                  to="/login" 
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="contained" 
                  color="secondary"
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;