import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

interface BandMemberAttributes {
  id: string;
  bandId: string;
  userId: string;
  role: 'leader' | 'admin' | 'member';
  joinDate?: Date;
  status: 'active' | 'inactive' | 'pending';
}

interface BandMemberInstance extends Model<BandMemberAttributes>, BandMemberAttributes {}

const BandMember = sequelize.define<BandMemberInstance>('BandMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bandId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'bands',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('leader', 'admin', 'member'),
    allowNull: false,
    defaultValue: 'member'
  },
  joinDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  tableName: 'band_members',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['band_id', 'user_id']
    }
  ]
});

export default BandMember;