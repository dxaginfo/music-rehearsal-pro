import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

interface BandAttributes {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BandInstance extends Model<BandAttributes>, BandAttributes {}

const Band = sequelize.define<BandInstance>('Band', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'bands',
  timestamps: true
});

export default Band;