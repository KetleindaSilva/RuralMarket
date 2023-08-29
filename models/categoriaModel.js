// categoriaModel.js

const mysql = require('mysql2');
const connection =require('./db');

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
