import express from 'express';
const router = express.Router();
import { sequelize, Fabricantes, Motocicleta, Img_motocicletas } from '../models/index.js'; // Importando os modelos corretamente

const app = express();

sequelize.sync({ force: false }) // Sincronizar os modelos com o banco de dados
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});



// Padrão controller graps, pois a rota atua como controller

// Rota para obter todas as motocicletas
router.get('/', async (req, res) => {
  try {
    const motos = await Motocicleta.findAll({
      include: [
        {
          model: Fabricantes,
          as: 'fabricante',
          attributes: ['id', 'nome', 'nacionalidade', 'data_fundacao'],
        },
        {
          model: Img_motocicletas,
          as: 'imagens',
          attributes: ['id', 'url', 'data_insercao'],
        }
      ]
    });

    res.json(motos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Busca a lista de todos os nomes de motocicletas disponíveis
router.get('/list', async (req, res) => {
  try {
    const motos = await Motocicleta.findAll({
      attributes: ['nome'],
      raw: true // Retorna objetos puros sem instância Sequelize
    });

    // Transformar a resposta no formato desejado
    const resposta = {
      nomes: motos.map(moto => moto.nome)
    };

    res.json(resposta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Rota para adicionar uma nova motocicleta
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const novaMoto = await Motocicleta.create(req.body); // Padrão Creator (GRASP)
    res.json(novaMoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar um novo Fabricante
router.post('/fabricante', async (req, res) => {
  try {
    console.log(req.body)
    const novo_fabricante = await Fabricantes.create(req.body); // Padrão Creator (GRASP)
    res.json(novo_fabricante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar uma nova imagem de moto
router.post('/img', async (req, res) => {
  try {
    console.log(req.body)
    const img = await Img_motocicletas.create(req.body); // Padrão Creator (GRASP)
    res.json(img);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;