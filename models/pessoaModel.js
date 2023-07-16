
const connection = require('./db');

const Pessoa = {
  salvarPessoa: (pessoaData, callback) => {
    // Criação da consulta SQL para inserir os dados na tabela "pessoa"
    const query = `
      INSERT INTO pessoa (nome, email, usuario, senha, bairro, cep, cidade, uf, telefone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execução da consulta SQL
    connection.query(query, Object.values(pessoaData), (err, results) => {
      if (err) {
        console.error('Erro ao inserir a pessoa:', err);
        return callback(err, null);
      }

      const pessoaId = results.insertId;
      return callback(null, pessoaId);
    });
  }
};

module.exports = Pessoa;
