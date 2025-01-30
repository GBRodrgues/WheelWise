const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
// Modelo information express (GRASP)
const Fabricantes = sequelize.define('fabricantes', {
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
  nacionalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_fundacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_insercao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
});

Fabricantes.removeAttribute('createdAt')
Fabricantes.removeAttribute('updatedAt')

module.exports = Fabricantes;
