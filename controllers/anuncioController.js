const Anuncio = require('../models/anuncioModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


exports.exibirFormulario = (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login'); // Redirecionar para a página de login
  }
  const message = req.query.message; // Obter a mensagem da query string
  res.render('anuncio/anuncioForm', {message});
};


exports.salvarAnuncio = (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.username) {
    return res.render('anuncio/anuncioForm', { showModal: true });
  }

  const imagem = req.file.filename;
  const { titulo, descricao, preco, categoria, contato } = req.body;
  const pessoa_idpessoa = req.session.pessoa_idpessoa;

  const anuncioData = {
    imagem,
    titulo,
    descricao,
    preco,
    categoria,
    contato,
    pessoa_idpessoa,
  };

  Anuncio.saveAnuncio(anuncioData, (err, anuncioId) => {
    if (err) {
      console.error('Erro ao salvar o anúncio:', err);
      return res.status(500).json({ mensagem: 'Ocorreu um erro ao salvar o anúncio' });
    }
    console.log('Anúncio salvo com sucesso');
    return res.redirect('/');  // Redirecionar para a página principal com a mensagem de sucesso
});
};

exports.detalhes = (req, res) => {
  const { id, message } = req.query; // Obter o ID do anúncio e a mensagem da query string

  // Lógica para obter os detalhes do anúncio com base no ID
  const anuncio = Anuncio.getDetalhes(id);

  if (!anuncio) {
    return res.status(404).render('error', { message: 'Anúncio não encontrado' });
  }
  const messagee = 'Anúncio salvo com sucesso'; // Mensagem de sucesso
  res.render('anuncio/detalhesAnuncio', { anuncio, messagee }); // Passar os detalhes do anúncio e a mensagem para a visualização
};





