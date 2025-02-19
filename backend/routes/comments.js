import express from 'express';
const router = express.Router();
import { sequelize, Motocicleta, User, Comments} from '../models/index.js'; // Importando os modelos corretamente

sequelize.sync({ force: false }) // Sincronizar os modelos com o banco de dados
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));


// Rota para obter todas as motocicletas
router.get('/', async (req, res) => {
  try {
    console.log(req.params)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Rota para adicionar um novo comentário
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const novoComentario = await Comments.create(req.body); // Padrão Creator (GRASP)
    res.json(novoComentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;