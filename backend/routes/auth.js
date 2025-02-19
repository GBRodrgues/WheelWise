import express from 'express';
const router = express.Router();
import { sequelize, User } from '../models/index.js'; // Importando os modelos corretamente
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

sequelize.sync({ force: false }) // Sincronizar os modelos com o banco de dados
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

// Rota para registra um usuário
router.post('/registerUsr', async (req, res) => {
    try {
      const { nome, email, senha, idade, isAdmin, UF} = req.body;
  
      // Verificar se o usuário já existe
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
  
      // Criar usuário sem permissão de admin
      const newUser = await User.create({
        nome,
        email,
        senha,
        idade,
        isAdmin: isAdmin,
        UF
      });
  
      res.status(201).json({ message: 'Registro bem-sucedido', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  });

 // Rota de login (gera um token JWT)
router.post('/login', async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      }
  
      // Verifica a senha
      const senhaCorreta = await bcrypt.compare(senha, user.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      }
  
      // Gera um token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Login bem-sucedido', token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
  });

export default router;