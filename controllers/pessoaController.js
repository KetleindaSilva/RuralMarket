const Pessoa = require('../models/pessoaModel');
const Anuncio = require('../models/anuncioModel');

const connection = require('../models/db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.criarPessoa = (req, res) => {
  const { nome, email, usuario, senha, bairro, cep, cidade, uf, telefone } = req.body;

  // Criptografar a senha usando bcrypt
  bcrypt.hash(senha, saltRounds, (err, senhaCriptografada) => {
    if (err) {
      console.error('Erro ao criar a pessoa:', err);
      return res.status(500).json({ error: 'Erro ao criar a pessoa' });
    }

    const query = 'INSERT INTO pessoa (nome, email, usuario, senha, bairro, cep, cidade, uf, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nome, email, usuario, senhaCriptografada, bairro, cep, cidade, uf, telefone];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Erro ao criar a pessoa:', err);
        return res.status(500).json({ error: 'Erro ao criar a pessoa' });
      }
      
      req.session.username = usuario;
      const successMessage = `Parabéns, ${usuario}, seu cadastro foi realizado com sucesso!`;
      res.render('telaPrincipal/telaPrincipal', { successMessage });
    });
  });
};


exports.login = (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM pessoa WHERE email = ?';
  const values = [email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao buscar a pessoa:', err);
      return res.status(500).json({ error: 'Erro ao buscar a pessoa' });
    }

    if (results.length === 0) {
      const message = 'Email não cadastrado. Cadastre-se ou insira outro email.';
      return res.render('telaPrincipal/login', { message }); // Renderizar a página de login com a mensagem
    }

    const pessoa = results[0];

    bcrypt.compare(senha, pessoa.senha, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar as senhas:', err);
        return res.status(500).json({ error: 'Erro ao realizar o login' });
      }

      if (isMatch) {
        req.session.username = pessoa.usuario;
        req.session.pessoa_idpessoa = pessoa.idpessoa;
    
        // Obter os anúncios da pessoa logada usando o ID da pessoa
        Anuncio.getAnunciosPorPessoa(pessoa.idpessoa, (err, anuncios) => {
          if (err) {
            console.error('Erro ao obter os anúncios da pessoa:', err);
            return res.status(500).json({ error: 'Erro ao realizar o login' });
          }
    
          console.log(anuncios); // Verificar a estrutura da variável anuncios
    
          const successMessage = `Parabéns, ${pessoa.usuario}, você está logado!`;
          res.render('telaPrincipal/telaPrincipal', { successMessage, pessoaLogada: true, anuncios });
        });
      } else {
        const message = 'Senha incorreta';
        res.render('telaPrincipal/login', { message }); // Renderizar a página de login com a mensagem
      }
    });
  });
};
exports.renderTelaPrincipal = (req, res) => {
  // Obter os anúncios por categoria usando o modelo "Anuncio"
  Anuncio.getAnunciosPorCategoria((err, anunciosPorCategoria) => {
    if (err) {
      console.error('Erro ao obter os anúncios por categoria:', err);
      // Tratar o erro de acordo com a lógica da sua aplicação
      return res.status(500).json({ error: 'Erro ao obter os anúncios por categoria' });
    }
    console.log(anunciosPorCategoria); // Adicione esta linha para verificar os dados
    // Renderizar a página "telaPrincipal" com os dados dos anúncios por categoria
    res.render('telaPrincipal/telaPrincipal', { anunciosPorCategoria: anunciosPorCategoria });
 // Verifique se a variável "anunciosPorCategoria" está sendo passada corretamente aqui
  });
};








