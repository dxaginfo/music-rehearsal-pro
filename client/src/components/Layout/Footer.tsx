import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Music Rehearsal Pro. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Link component={RouterLink} to="/privacy" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" variant="body2">
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" variant="body2">
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;