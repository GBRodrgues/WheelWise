import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Img_motocicletas from './Img_motocicleta.js';


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
  }
},{
  timestamps: true  
});


// Método de fábrica para criar uma nova motocicleta
Motocicleta.createMotocicleta = async function(data) {
  const motocicleta = await Motocicleta.create(data);
  return motocicleta;
};

// Método de fábrica para buscar instancia de motocicleta
Motocicleta.getMotocicleta = async function(id) {
  const motocicleta = await Motocicleta.findByPk(
    id
  );
  return motocicleta;
};

// Método para adicionar uma imagem à motocicleta
Motocicleta.prototype.addImage = async function(imageData) {
  const image = await Img_motocicletas.create({
    id_motocicleta: this.id,
    ...imageData
  });
  if (!image) {
    throw new Error('Erro ao adicionar imagem');
  }
  return image;
};

export default Motocicleta;