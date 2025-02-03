import express from 'express';
import cors from 'cors';
import sequelize from './db';
import motocicletasRoutes from './routes/motocicletas';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/motocicletas', motocicletasRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

export default app;