import express from 'express';
const router = express.Router();
import { sequelize, Fabricantes, Motocicleta, Img_motocicletas} from './models/index.js'; // Importando os modelos corretamente

const app = express();

sequelize.sync({ force: false }) // Sincronizar os modelos com o banco de dados
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});



// Padrão controller graps, pois a rota atua como controller

// Rota para obter todas as motocicletas


function inserir_img(data){
  console.log(data)
}


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


export default router;