// categoriaModel.js

const mysql = require('mysql2');

// Crie uma conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '02092005',
    database: 'ruralmarket'
  });
  connection.connect();
  
const Categoria = {
  // Função para obter todas as categorias do banco de dados
  getAllCategorias: (callback) => {
    const query = 'SELECT * FROM categoria';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao obter as categorias:', err);
        return callback(err, null);
      }

      return callback(null, results);
    });
  },
};
module.exports = Categoria;
