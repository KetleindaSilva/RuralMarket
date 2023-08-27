const User = require('../models/pessoaModel');
const Anuncio = require('../models/anuncioModel')


const authController = {
  login(req, res) {
    const { message } = req.query; // Recupere a mensagem da query string, se existir
    const pessoaLogada = req.session.username; // Verifique se há uma pessoa logada
    
    res.render('telaPrincipal/login', { message, pessoaLogada });
  },
  cadastro(req, res) {
    const { message } = req.query; 
    const pessoaLogada = req.session.username;
    
    res.render('telaPrincipal/cadastro', { message, pessoaLogada });
  },
  detalhes(req, res) {
    const anuncio = Anuncio.getDetalhes(Anuncio);
    res.render('telaPrincipal/detalhesProduto',{anuncio});
  }
};


module.exports = authController;
