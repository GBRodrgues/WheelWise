import sequelize from '../db.js';
import Fabricantes from './Fabricantes.js';
import Motocicleta from './Motocicleta.js';
import Img_motocicletas from './Img_motocicleta.js';
import setupAssociations from './associations.js';
import User from './Users.js';

// Inicializar as associações corretamente
setupAssociations();

export { sequelize, Fabricantes, Motocicleta, Img_motocicletas, User};
