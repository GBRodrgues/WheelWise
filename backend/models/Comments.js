import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Comments = sequelize.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  moto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  timestamps: true
});

export default Comments;
