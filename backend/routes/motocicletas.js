import express from 'express';
const router = express.Router();
import { sequelize, Fabricantes, Motocicleta, Img_motocicletas } from '../models/index.js'; 

sequelize.sync({ force: false }) 
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

// Padrão controller graps, pois as rotas atuam como controller


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
          attributes: ['id', 'url'],
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
    let target = req.query.target;
    if (!target) {
      return res.status(400).json({ error: "Parâmetro target['motos','fabricantes'] não informado"});
    }
    let resposta = {};
    if (target == 'motos'){
      const motos = await Motocicleta.findAll({
        attributes: ['nome'],
        raw: true 
      });
  
      resposta = {
        nomes: motos.map(moto => moto.nome)
      };

    } else if (target == 'fabricantes'){
      const fabricantes = await Fabricantes.findAll({
        attributes: ['nome', 'id'],
        raw: true
      });

      resposta = fabricantes.reduce((acc, fabricante) => {
        acc[fabricante.id] = fabricante.nome;
        return acc;
      }, {});

    }

    res.json(resposta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar uma nova motocicleta
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const novaMoto = await Motocicleta.createMotocicleta(req.body); // Padrão Creator (GRASP)
    res.json(novaMoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar um novo Fabricante
router.post('/fabricante', async (req, res) => {
  try {
    console.log(req.body)
    const novo_fabricante = await Fabricantes.createFabricante(req.body); // Padrão Creator (GRASP)
    res.json(novo_fabricante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar uma nova imagem de moto
router.post('/img', async (req, res) => {
  try {
    const moto = await Motocicleta.getMotocicleta(req.body.id_motocicleta);
    console.log(moto.id)
    if (!moto) {
      return res.status(404).json({ error: 'Motocicleta não encontrada' });
    }
    const img = moto.addImage(req.body); // Padrão information expert (GRASP)

    if (!img) {
      return res.status(500).json({ error: 'Erro ao adicionar imagem' });
    }else{
      res.json({message: 'Imagem adicionada com sucesso'});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;