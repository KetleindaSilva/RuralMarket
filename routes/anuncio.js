const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/anuncioController');
const mainController = require('../controllers/mainController');
// Importar o modelo de anúncio
const Anuncio = require('../models/anuncioModel');
const multer = require('multer');
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
router.get('/anuncio/novo', anuncioController.exibirFormulario);
// Rota para salvar o anúncio
router.post('/anuncio', upload.single('imagem'), anuncioController.salvarAnuncio);


// Rota para exibir a página principal
router.get('/telaPrincipal', anuncioController.exibirTelaPrincipal);

// Rota para exibir a página principal
router.get('/', mainController.index);



module.exports = router;