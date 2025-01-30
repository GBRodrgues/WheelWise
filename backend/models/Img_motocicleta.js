const { DataTypes } = require('sequelize');
const sequelize = require('../db');
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
});

Img_motocicletas.removeAttribute('createdAt')
Img_motocicletas.removeAttribute('updatedAt')

module.exports = Img_motocicletas;
