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
  getAllCategorias: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM categoria';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao obter categorias:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = Categoria;
