import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import bandRoutes from './band.routes';
import rehearsalRoutes from './rehearsal.routes';
import venueRoutes from './venue.routes';
import setlistRoutes from './setlist.routes';
import songRoutes from './song.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/venues', venueRoutes);
router.use('/setlists', setlistRoutes);
router.use('/songs', songRoutes);

export default router;