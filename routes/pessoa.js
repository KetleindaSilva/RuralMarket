const express = require('express');
const pessoaController = require('../controllers/pessoaController');
const router = express.Router();
const flash = require('express-flash');
const session = require('express-session');
// Configuração do middleware de sessão
router.use(
  session({
    secret: '12345',
    resave: false,
    saveUninitialized: false
  })
);
// Configuração do middleware do Express Flash
router.use(flash());
router.use((req, res, next) => {
  res.locals.success = req.flash('success');
  next();
});
// Rota para criar uma nova pessoa
router.post('/cadastro', pessoaController.criarPessoa);
// Rota para exibir a página de login
router.get('/login', (req, res) => {
  const message = req.query.message; // Obtenha a mensagem da query string
  res.render('telaPrincipal/login', { message });
});
// Rota para lidar com o envio do formulário de login
router.post('/login', pessoaController.login);
// Rota para exibir a página principal
router.get('/', pessoaController.renderTelaPrincipal);

// Rota para fazer logout
router.get('/logout', pessoaController.logout);

module.exports = router;