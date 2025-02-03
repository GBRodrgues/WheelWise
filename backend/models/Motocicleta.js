import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db';
// Modelo information express (GRASP)
const Motocicleta = sequelize.define('motocicleta', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano_fabricacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_fabricante: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  json_motor: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  json_dimensoes: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  json_performance: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  data_insercao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
},{
  timestamps: false  
});

export default Motocicleta;