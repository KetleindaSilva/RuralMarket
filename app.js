const express = require('express');
const app = express();
const db = require('./models/db');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const multer = require('multer');

const anuncioRoutes = require('./routes/anuncio');
const pessoaRoutes = require('./routes/pessoa');
const mainController = require('./controllers/mainController')

const authController = require('./controllers/authController');


// Configuração do Body Parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando o EJS como view engine
app.set('view engine', 'ejs');

// Configurando o diretório estático
app.use(express.static(__dirname + '/public'));
app.use(express.static('uploads'));

// Configuração do Multer para salvar as imagens na pasta "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('imagem'), (req, res) => {
  const nomeArquivo = req.file.filename;
  res.send(`Arquivo ${nomeArquivo} enviado com sucesso!`);
});
app.use(session({
  // Configurações da sessão
  resave: false,
    saveUninitialized: false,
    secret: '123456',
  
}));

app.use(flash());


app.get('/', (req, res) => {
  res.render('telaPrincipal/telaPrincipal');
});
// Configurando as rotas
app.get('/', mainController.index);
app.get('/login', authController.login);
app.get('/cadastro', authController.cadastro);
app.get('/detalhes', authController.detalhes);
app.use('/', pessoaRoutes);
app.use('/', anuncioRoutes);
// Rota principal




// Configuração do servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
