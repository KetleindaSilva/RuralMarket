const User = require('../models/pessoaModel');

const authController = {
  login(req, res) {
    const { message } = req.query; // Recupere a mensagem da query string, se existir
    
    res.render('telaPrincipal/login', { message });
  },
  cadastro(req, res) {
    const { message } = req.query; 
    res.render('telaPrincipal/cadastro', { message });
  },
  detalhes(req, res) {
    res.render('telaPrincipal/detalhesProduto');
  }
};

module.exports = authController;
