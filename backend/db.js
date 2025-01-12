const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Conexão bem-sucedida ao banco de dados.'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;
