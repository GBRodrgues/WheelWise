import Fabricantes from './Fabricantes.js';
import Motocicleta from './Motocicleta.js';
import Img_motocicletas from './Img_motocicleta.js';

// Definição das associações após carregar os modelos
Fabricantes.hasMany(Motocicleta, { foreignKey: 'id_fabricante', as: 'motocicletas' });
Motocicleta.belongsTo(Fabricantes, { foreignKey: 'id_fabricante', as: 'fabricante' });

Motocicleta.hasMany(Img_motocicletas, { foreignKey: 'id_motocicleta', as: 'imagens' });
Img_motocicletas.belongsTo(Motocicleta, { foreignKey: 'id_motocicleta', as: 'motocicleta' });

export default function setupAssociations() {
  console.log("Associações configuradas.");
}
