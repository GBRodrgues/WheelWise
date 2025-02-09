import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), './backend/.env') });

// Padrão Singleton para instanciar apenas uma conexão ao banco de dados
class Database {
  constructor() {
    if (!Database.instance) {
      this._sequelize = new Sequelize(
        process.env.DATABASE, 
        process.env.DB_USER, 
        process.env.PASS, 
        {
          host: process.env.HOST,
          dialect: 'postgres',
          port: 5432,
          logging: false, // Desativa logs do Sequelize
        }
      );
      this._sequelize.authenticate()
        .then(() => console.log(' Conexão bem-sucedida ao banco de dados.'))
        .catch(err => console.error(' Erro ao conectar ao banco:', err));

      Database.instance = this;
    }

    return Database.instance;
  }

  getSequelize() {
    return this._sequelize;
  }
}

// Criando e exportando a instância única do banco
export default new Database().getSequelize();
