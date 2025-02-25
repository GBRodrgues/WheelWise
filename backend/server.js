// Padrões implementados nesse arquivo:
// - Singleton (GoF): Onde: A criação da instância do Express com const app = express();.
// - Facade (GoF): Onde: A função setupRoutes() que simplifica a interface para inicializar e configurar o servidor.
// - Controller (GRASP): O próprio arquivo server.js atua como o ponto central de orquestração.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import motocicletasRoutes from './routes/motocicletas.js';
import authRoutes from './routes/auth.js'
import commentRoutes from "./routes/comments.js"

dotenv.config(); // Carrega variáveis de ambiente do .env

// Singleton: Garantir que o servidor Express seja uma única instância
const app = express();
app.use(cors());
app.use(express.json());

// Facade: Simplificar a interface para inicializar e configurar o servidor
function setupRoutes() {
  app.use('/motocicletas', motocicletasRoutes);
  app.use('/auth', authRoutes);
  app.use('/comment', commentRoutes);
}

const PORT = process.env.PORT || 3000;

// Iniciar o servidor apenas se a conexão com o banco for bem-sucedida
async function startServer() {
  try {
    await sequelize.authenticate(); // Testa a conexão com o banco
    console.log('✅ Conexão bem-sucedida ao banco de dados.');

    await sequelize.sync(); // Sincroniza os modelos do banco

    setupRoutes(); // Configurar rotas

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
  }
}

startServer();

export default app;
