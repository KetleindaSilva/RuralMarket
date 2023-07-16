const express = require('express');
const app = express();
const db = require('./models/db');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const anuncioRoutes = require('./routes/anuncio');
const pessoaRoutes = require('./routes/pessoa');

// Configuração do Body Parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando o EJS como view engine
app.set('view engine', 'ejs');

// Configurando o diretório estático
app.use(express.static(__dirname + '/public'));

// Importando os controllers
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');

app.use(session({
  // Configurações da sessão
  resave: false,
    saveUninitialized: false,
    secret: '123456',
  
}));

app.use(flash());


// Configurando as rotas
app.get('/', mainController.index);
app.get('/login', authController.login);
app.get('/cadastro', authController.cadastro);
app.get('/detalhes', authController.detalhes);
app.use('/', pessoaRoutes);
app.use('/', anuncioRoutes);
// Rota principal


app.get('/', (req, res) => {
  res.render('telaPrincipal/telaPrincipal');
});


// Configuração do servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
