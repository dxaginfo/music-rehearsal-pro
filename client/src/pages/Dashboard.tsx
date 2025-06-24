import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddIcon from '@mui/icons-material/Add';

import { RootState } from '../store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // These would come from your Redux store in a real implementation
  const upcomingRehearsals = [
    { id: '1', title: 'Weekly Band Practice', date: '2025-06-25T19:00:00', band: 'The Rockers' },
    { id: '2', title: 'Song Writing Session', date: '2025-06-27T18:30:00', band: 'The Rockers' },
    { id: '3', title: 'Pre-gig Rehearsal', date: '2025-06-30T20:00:00', band: 'Jazz Ensemble' },
  ];

  const myBands = [
    { id: '1', name: 'The Rockers', role: 'Leader', members: 5 },
    { id: '2', name: 'Jazz Ensemble', role: 'Member', members: 7 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back, {user?.firstName}! Here's what's happening with your bands.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonthIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  {upcomingRehearsals.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Rehearsals
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <GroupsIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  {myBands.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  My Bands
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <MusicNoteIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Songs in Rehearsal
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Rehearsals */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Upcoming Rehearsals
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={() => navigate('/rehearsals/new')}
              >
                New Rehearsal
              </Button>
            </Box>
            <List>
              {upcomingRehearsals.map((rehearsal, index) => (
                <React.Fragment key={rehearsal.id}>
                  {index > 0 && <Divider />}
                  <ListItem button onClick={() => navigate(`/rehearsals/${rehearsal.id}`)}>
                    <ListItemText
                      primary={rehearsal.title}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {rehearsal.band}
                          </Typography>
                          {` — ${new Date(rehearsal.date).toLocaleString()}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
              {upcomingRehearsals.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No upcoming rehearsals"
                    secondary="Schedule a new rehearsal to get started"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* My Bands */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                My Bands
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={() => navigate('/bands/new')}
              >
                New Band
              </Button>
            </Box>
            <List>
              {myBands.map((band, index) => (
                <React.Fragment key={band.id}>
                  {index > 0 && <Divider />}
                  <ListItem button onClick={() => navigate(`/bands/${band.id}`)}>
                    <ListItemText
                      primary={band.name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {band.role}
                          </Typography>
                          {` — ${band.members} members`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
              {myBands.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No bands yet"
                    secondary="Create or join a band to get started"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;