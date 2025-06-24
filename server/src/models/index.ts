import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'rehearsal_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: parseInt(dbPort, 10),
  dialect: 'postgres',
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export { sequelize };

// Import models
import User from './user.model';
import Band from './band.model';
import BandMember from './bandMember.model';
import MemberAvailability from './memberAvailability.model';
import Venue from './venue.model';
import Rehearsal from './rehearsal.model';
import RehearsalAttendance from './rehearsalAttendance.model';
import Setlist from './setlist.model';
import Song from './song.model';
import SetlistSong from './setlistSong.model';
import RehearsalSetlist from './rehearsalSetlist.model';
import Notification from './notification.model';

// Define associations
User.hasMany(BandMember, { foreignKey: 'userId', as: 'memberships' });
BandMember.belongsTo(User, { foreignKey: 'userId' });

Band.hasMany(BandMember, { foreignKey: 'bandId', as: 'members' });
BandMember.belongsTo(Band, { foreignKey: 'bandId' });

User.hasMany(MemberAvailability, { foreignKey: 'userId', as: 'availabilities' });
MemberAvailability.belongsTo(User, { foreignKey: 'userId' });

Band.hasMany(MemberAvailability, { foreignKey: 'bandId', as: 'memberAvailabilities' });
MemberAvailability.belongsTo(Band, { foreignKey: 'bandId' });

Band.hasMany(Rehearsal, { foreignKey: 'bandId', as: 'rehearsals' });
Rehearsal.belongsTo(Band, { foreignKey: 'bandId' });

Venue.hasMany(Rehearsal, { foreignKey: 'venueId', as: 'rehearsals' });
Rehearsal.belongsTo(Venue, { foreignKey: 'venueId' });

User.hasMany(Rehearsal, { foreignKey: 'createdBy', as: 'createdRehearsals' });
Rehearsal.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Rehearsal.hasMany(RehearsalAttendance, { foreignKey: 'rehearsalId', as: 'attendances' });
RehearsalAttendance.belongsTo(Rehearsal, { foreignKey: 'rehearsalId' });

User.hasMany(RehearsalAttendance, { foreignKey: 'userId', as: 'attendances' });
RehearsalAttendance.belongsTo(User, { foreignKey: 'userId' });

Band.hasMany(Setlist, { foreignKey: 'bandId', as: 'setlists' });
Setlist.belongsTo(Band, { foreignKey: 'bandId' });

Band.hasMany(Song, { foreignKey: 'bandId', as: 'songs' });
Song.belongsTo(Band, { foreignKey: 'bandId' });

Setlist.hasMany(SetlistSong, { foreignKey: 'setlistId', as: 'songs' });
SetlistSong.belongsTo(Setlist, { foreignKey: 'setlistId' });

Song.hasMany(SetlistSong, { foreignKey: 'songId', as: 'setlistAppearances' });
SetlistSong.belongsTo(Song, { foreignKey: 'songId' });

Rehearsal.belongsToMany(Setlist, { through: RehearsalSetlist, foreignKey: 'rehearsalId' });
Setlist.belongsToMany(Rehearsal, { through: RehearsalSetlist, foreignKey: 'setlistId' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId' });

export {
  User,
  Band,
  BandMember,
  MemberAvailability,
  Venue,
  Rehearsal,
  RehearsalAttendance,
  Setlist,
  Song,
  SetlistSong,
  RehearsalSetlist,
  Notification
};