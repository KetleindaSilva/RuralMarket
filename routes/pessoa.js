const express = require('express');
const pessoaController = require('../controllers/pessoaController');
const router = express.Router();


const flash = require('express-flash');
const session = require('express-session');
// Rota para criar uma nova pessoa
router.post('/cadastro', pessoaController.criarPessoa);


router.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    next()})


router.get('/', (req, res) => {
    res.render('telaPrincipal', { success: 'Mensagem de sucesso' });

});

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    const message = req.query.message; // Obtenha a mensagem da query string
    res.render('login', { message } );
  });
  
  // Rota para lidar com o envio do formulário de login
  router.post('/login', pessoaController.login);

module.exports = router;
