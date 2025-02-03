import { DataTypes } from 'sequelize';
import sequelize from '../db';
// Modelo information express (GRASP)
const Img_motocicletas = sequelize.define('img_motocicletas', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_motocicleta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_insercao: {
    type: DataTypes.DATE,
    allowNull: false,
  }
},{
  timestamps: false  
});

export default Img_motocicletas;