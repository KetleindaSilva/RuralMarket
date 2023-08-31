const Anuncio = require('../models/anuncioModel');
const Categoria = require('../models/categoriaModel');

exports.exibirFormulario = async (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login'); // Redirecionar para a página de login
  }
  

  try {
    const categorias = await Categoria.getAllCategorias(); // Obter todas as categorias do banco de dados
    const message = req.query.message; // Obter a mensagem da query string

    res.render('anuncio/anuncioForm', { message, categorias });
  } catch (err) {
    console.error('Erro ao obter categorias:', err);
    return res.status(500).json({ error: 'Erro ao obter categorias' });
  }
};

exports.criarAnuncio = async (req, res) => {
  // Obtenha as informações do anúncio do req.body
  const { titulo, descricao, preco, categoriaId } = req.body;

  // Verifica se a categoria com o ID fornecido existe no banco de dados
  const categoriaExiste = await Categoria.getCategoriaById(categoriaId);
  if (!categoriaExiste) {
    return res.status(400).json({ error: 'Categoria não encontrada' });
  }

  try {
    // Crie o anúncio no banco de dados, passando o ID da categoria
    const anuncio = await Anuncio.criarAnuncio({ titulo, descricao, preco, categoriaId });

    res.redirect('/'); 
  } catch (err) {
    console.error('Erro ao criar o anúncio:', err);
    return res.status(500).json({ error: 'Erro ao criar o anúncio' });
  }
};

exports.salvarAnuncio = (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.username) {
    return res.render('anuncio/anuncioForm', { showModal: true });
  }
  const imagem = req.file.filename;
  const { titulo, descricao, preco, categoria, contato } = req.body;
  const pessoa_idpessoa = req.session.pessoa_idpessoa;
  const categoria_idcategoria = parseInt(categoria);

  const anuncioData = {
    imagem,
    titulo,
    descricao,
    preco,
    categoria_idcategoria,
    contato,
    pessoa_idpessoa,
  };

  Anuncio.saveAnuncio(anuncioData, (err) => {
    if (err) {
      console.error('Erro ao salvar o anúncio:', err);
      return res.status(500).json({ mensagem: 'Ocorreu um erro ao salvar o anúncio' });
    }
    console.log('Anúncio salvo com sucesso');
    
    return res.redirect('/');  // Redirecionar para a página principal com a mensagem de sucesso
  });
};

exports.exibirTelaPrincipal = (req, res) => {
  // Obter todos os anúncios usando o modelo "Anuncio"
  Anuncio.getTodosAnuncios((err, todosAnuncios) => {
    if (err) {
      console.error('Erro ao obter todos os anúncios:', err);
      // Tratar o erro de acordo com a lógica da sua aplicação
      return res.status(500).json({ error: 'Erro ao obter os anúncios' });
    }

    console.log('Todos os anúncios:', todosAnuncios); // Adicione este log para verificar os anúncios obtidos

    // Renderizar a página "telaPrincipal" com os dados de todos os anúncios
    res.render('telaPrincipal/telaPrincipal', { anunciosPorCategoria: todosAnuncios });
  });
};


exports.exibirDetalhesAnuncio = async (req, res) => {
  const anuncioId = req.params.id;

  try {
    // Obter os detalhes do anúncio com base no ID
    const anuncioDetalhado = await Anuncio.getDetalhesDoAnuncio(anuncioDetalhado.anuncioId);

    // Obter mais anúncios do mesmo produtor
    const anunciosDoProdutor = await Anuncio.getAnunciosDoMesmoProdutor(anuncioDetalhado.pessoa_id);

    // Aqui, anunciosPorPessoa não é necessário, você pode removê-lo

    res.render('anuncio/detalhesAnuncio', { anuncioDetalhado, anunciosDoProdutor });
  } catch (err) {
    console.error('Erro ao obter os detalhes do anúncio:', err);
    res.status(500).json({ error: 'Erro ao obter os detalhes do anúncio' });
  }
};
