const User = require('../models/pessoaModel');

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
    res.render('telaPrincipal/detalhesProduto');
  }
};


module.exports = authController;
