import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { RootState } from '../store';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const features = [
    {
      icon: <EventIcon fontSize="large" color="primary" />,
      title: 'Smart Scheduling',
      description: 'Automatically find the best rehearsal times based on band member availability.',
    },
    {
      icon: <MusicNoteIcon fontSize="large" color="primary" />,
      title: 'Setlist Management',
      description: 'Create and manage rehearsal setlists to keep your band organized.',
    },
    {
      icon: <GroupIcon fontSize="large" color="primary" />,
      title: 'Attendance Tracking',
      description: 'Track attendance and manage RSVPs for all your rehearsal sessions.',
    },
    {
      icon: <AssessmentIcon fontSize="large" color="primary" />,
      title: 'Progress Reporting',
      description: 'Monitor your band\'s progress with detailed rehearsal reports and analytics.',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Music Rehearsal Pro
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Take the hassle out of scheduling band rehearsals. Optimize your practice time with
          our intelligent scheduling, attendance tracking, and setlist management tools.
        </Typography>
        <Box sx={{ mt: 4 }}>
          {isAuthenticated ? (
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="contained"
              size="large"
              color="primary"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Box>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                color="primary"
                sx={{ mx: 1 }}
              >
                Sign Up
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                size="large"
                color="primary"
                sx={{ mx: 1 }}
              >
                Log In
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.paper', p: 6, textAlign: 'center', borderRadius: 2, mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Optimize Your Band Rehearsals?
        </Typography>
        <Typography variant="body1" paragraph>
          Join thousands of bands that have improved their practice efficiency with Music Rehearsal Pro.
        </Typography>
        {!isAuthenticated && (
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            size="large"
            color="primary"
          >
            Get Started Free
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
