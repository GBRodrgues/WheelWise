import express from 'express';
const router = express.Router();
import { sequelize, Motocicleta, User, Comments } from '../models/index.js'; // Importando os modelos corretamente
import { where } from 'sequelize';

sequelize.sync({ force: false }) // Sincronizar os modelos com o banco de dados
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));


router.get('/', async (req, res) => {
  try {
    let moto_id = req.query.moto_id;

    // Verifica se a moto existe
    const moto = await Motocicleta.getMotocicleta(moto_id);

    if (!moto) {
      return res.status(401).json({ error: "Motocicleta não registrada" });
    }

    // Busca os comentários da moto
    const comentarios = await Comments.findAll({
      include: {
        model: User,
        as: 'users',
        attributes: ['nome', 'UF']
      },
      where: {
        moto_id: moto_id,
        status: true  // Filtra apenas os comentários com status true
      },
      order: [['id', 'ASC']]
    });

    // Verifica se há comentários
    if (!comentarios.length) {
      return res.status(401).json({ error: `Nenhum comentário cadastrado para a moto de id ${moto_id}` });
    }

    // Formata a resposta
    const formattedComments = comentarios.map(comentario => {
      return {
        id: comentario.id,
        user_id: comentario.user_id,
        user_name: comentario.users.nome,
        user_uf: comentario.users.UF,
        content: comentario.content,
        createdAt: comentario.createdAt
      };
    });

    // Retorna no formato desejado
    res.status(200).json({
      status: 200,
      moto_id: moto_id,
      comments: formattedComments
    });

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

router.put('/', async (req, res) => {
  try {
    const alteracao = await Comments.update(
      { status: req.body.status },
      { where: { id: req.body.id_comentario } }
    );
    if (alteracao != 0) {
      return res.status(200).json({ msg: `Registro de id ${req.body.id_comentario} atualizado com sucesso` });
    }
    return res.status(401).json({ error: `Erro ao atualizar o registro de id ${req.body.id_comentario}.` })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;