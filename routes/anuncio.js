const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/anuncioController');
const multer = require('multer');

// Defina o diretório de destino para salvar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Imagens'); // Substitua com o diretório desejado
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  // Inicialize o middleware do multer com a configuração definida acima
const upload = multer({ storage: storage });
  
// Rota para exibir o formulário de anúncio
router.get('/anuncio/novo', anuncioController.exibirFormulario);

// Rota para salvar o anúncio
router.post('/anuncio', upload.single('imagem'), anuncioController.salvarAnuncio);

// Rota para exibir os detalhes do anúncio
router.get('/anuncio/detalhes/:anuncioId', anuncioController.detalhes);



module.exports = router;



