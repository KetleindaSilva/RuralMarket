
const Anuncio = require('../models/anuncioModel');


exports.index = async (req, res) => {
  const username = req.session.username;
  const successMessage = req.flash('success')[0]; // Obtém a mensagem de sucesso da sessão

  try {
    // Obter a lista de categorias e anúncios
    Anuncio.getAnunciosPorCategoria((err, anunciosPorCategoria) => {
      if (err) {
        console.error('Erro ao obter os anúncios por categoria:', err);
        return res.status(500).json({ error: 'Erro ao buscar os anúncios' });
      }

      // Renderiza a página principal com o nome da pessoa e a lista de categorias e anúncios
      res.render('telaPrincipal/telaPrincipal', { username, successMessage, anunciosPorCategoria });
    });
  } catch (err) {
    console.error('Erro ao obter os anúncios por categoria:', err);
    res.status(500).json({ error: 'Erro ao buscar os anúncios' });
  }
};
