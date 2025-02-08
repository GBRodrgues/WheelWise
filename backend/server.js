import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import motocicletasRoutes from './routes/motocicletas.js';

dotenv.config(); // Carrega variáveis de ambiente do .env

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/motocicletas', motocicletasRoutes);

const PORT = process.env.PORT || 3000; // Porta padrão caso não esteja no .env

// Iniciar o servidor apenas se a conexão com o banco for bem-sucedida
async function startServer() {
  try {
    await sequelize.authenticate(); // Testa a conexão com o banco
    console.log('✅ Conexão bem-sucedida ao banco de dados.');

    await sequelize.sync(); // Sincroniza os modelos do banco

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
  }
}

startServer();

export default app;
