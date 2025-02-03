import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const user = process.env.DB_USER;
const pass = process.env.PASS;
const database = process.env.DATABASE;
const host = process.env.HOST;
const sequelize = new Sequelize(database, user , pass, {
  host: host,
  dialect: 'postgres',
  port: '5432',
  schema: 'public'
});
sequelize.authenticate()
  .then(() => console.log('Conexão bem-sucedida ao banco de dados.'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));
export default sequelize;