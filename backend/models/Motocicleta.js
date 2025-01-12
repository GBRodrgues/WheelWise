const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// Modelo information express (GRASP)
const Motocicleta = sequelize.define('Motocicleta', {
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fabricante: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cilindrada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  potencia: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  peso: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Motocicleta;
