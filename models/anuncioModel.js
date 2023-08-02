// Importe o módulo mysql2
const mysql = require('mysql2');
const connection = require('./db');

// Crie uma conexão com o banco de dados
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '02092005',
  database: 'ruralmarket'
});*/

const Anuncio = {
  saveAnuncio: (anuncioData, callback) => {
    const { imagem, titulo, descricao, preco, categoria_idcategoria, contato, pessoa_idpessoa } = anuncioData;

    const query = 'INSERT INTO anuncio (imagem, titulo, descricao, preco, categoria_idcategoria, contato, pessoa_idpessoa) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [imagem, titulo, descricao, preco, categoria_idcategoria, contato, pessoa_idpessoa];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Erro ao salvar o anúncio no banco de dados:', err);
        return callback(err);
      }

      // Anúncio salvo com sucesso
      return callback(null);
    });
  },
  
  getAnunciosPorCategoria : function (callback) {
      const query = 'SELECT anuncio.*, categoria.nome AS categoria_nome FROM anuncio JOIN categoria ON anuncio.categoria_idcategoria = categoria.idcategoria';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao obter os anúncios por categoria:', err);
          return callback(err);
        }
    
        // Organize os anúncios por categoria antes de retornar
        const anunciosPorCategoria = {};
    
        results.forEach((anuncio) => {
          const { categoria_nome, ...rest } = anuncio;
          if (!anunciosPorCategoria[categoria_nome]) {
            anunciosPorCategoria[categoria_nome] = [rest];
          } else {
            anunciosPorCategoria[categoria_nome].push(rest);
          }
        });
    
        return callback(null, anunciosPorCategoria);
      });
  },
  
  getAnunciosPorPessoa: (pessoaId, callback) => {
    const query = 'SELECT * FROM anuncio WHERE pessoa_idpessoa = ?';
    const values = [pessoaId];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Erro ao obter os anúncios da pessoa:', err);
        return callback(err, null);
      }

      // Retorne os anúncios da pessoa
      callback(null, results);
    });
  },
  getDetalhes: (id, callback) => {
    // Lógica para obter os detalhes do anúncio com base no ID
    const query = 'SELECT * FROM anuncio WHERE idanuncio = ?';
    const values = [id];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Erro ao obter detalhes do anúncio:', err);
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, null); // Anúncio não encontrado
      }

      const anuncio = results[0];
      return callback(null, anuncio);
    });
  },
  findById: async (anuncioId) => {
    return new Promise((resolve, reject) => {
      // Execute a lógica para consultar o banco de dados ou acessar uma API e obter os detalhes do anúncio com o ID fornecido
      // Por exemplo, você pode usar o módulo mysql2 para consultar o banco de dados
      connection.query('SELECT * FROM anuncio WHERE idanuncio = ?', [anuncioId], (err, results) => {
        if (err) {
          console.error('Erro ao obter detalhes do anúncio:', err);
          return reject(err);
        }

        // Verifique se o anúncio foi encontrado
        if (results.length === 0) {
          return resolve(null); // Retorna null caso o anúncio não seja encontrado
        }

        const anuncio = results[0]; // Obtenha o primeiro resultado como detalhes do anúncio
        return resolve(anuncio);
      });
    });
  },

};


module.exports = Anuncio;


