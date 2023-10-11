const Anuncio = require('../models/anuncioModel');
const Categoria = require('../models/categoriaModel');

exports.index = async (req, res) => {
  const pessoaLogada = req.session.username;
  const successMessage = req.flash('success')[0];

  try {
    Categoria.getAllCategorias((err, categorias) => {
      if (err) {
        console.error('Erro ao obter as categorias:', err);
        return res.status(500).json({ error: 'Erro ao buscar as categorias' });
      }

      // Obtém os anúncios da pessoa logada usando o ID da pessoa
      Anuncio.getAnunciosPorPessoa(req.session.pessoa_idpessoa, (err, anunciosPorPessoa) => {
        if (err) {
          console.error('Erro ao obter os anúncios da pessoa:', err);
          return res.status(500).json({ error: 'Erro ao buscar os anúncios da pessoa' });
        }

        // Obtém os anúncios por categoria
        Anuncio.getAnunciosPorCategoria((err, anunciosPorCategoria) => {
          if (err) {
            console.error('Erro ao obter os anúncios por categoria:', err);
            return res.status(500).json({ error: 'Erro ao buscar os anúncios por categoria' });
          }

          // Renderiza a página principal com as informações necessárias
          res.render('telaPrincipal/telaPrincipal', {
            pessoaLogada,
            successMessage,
            categorias,
            anunciosPorPessoa,
            anunciosPorCategoria
          });
        });
      });
    });
  } catch (err) {
    console.error('Erro ao obter as categorias:', err);
    res.status(500).json({ error: 'Erro ao buscar as categorias' });
  }
};