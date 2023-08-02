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

  // Verifique se a categoria com o ID fornecido existe no banco de dados
  const categoriaExiste = await Categoria.getCategoriaById(categoriaId);
  if (!categoriaExiste) {
    return res.status(400).json({ error: 'Categoria não encontrada' });
  }

  try {
    // Crie o anúncio no banco de dados, passando o ID da categoria
    const anuncio = await Anuncio.criarAnuncio({ titulo, descricao, preco, categoriaId });

    // Aqui você pode fazer o que for necessário após salvar o anúncio, como redirecionar o usuário, enviar uma resposta JSON, etc.
    res.redirect('/'); // Por exemplo, redirecionando para a página principal após salvar o anúncio
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
  const { titulo, descricao, preco, contato } = req.body;
  const pessoa_idpessoa = req.session.pessoa_idpessoa;
  const anuncioData = {
    imagem,
    titulo,
    descricao,
    preco,
    categoria_nome,
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
  // Obter os anúncios por categoria usando o modelo "Anuncio"
  Anuncio.getAnunciosPorCategoria((err, anunciosPorCategoria) => {
    if (err) {
      console.error('Erro ao obter os anúncios por categoria:', err);
      // Tratar o erro de acordo com a lógica da sua aplicação
      return res.status(500).json({ error: 'Erro ao obter os anúncios por categoria' });
    }

    console.log('Valor de anunciosPorCategoria:', anunciosPorCategoria); // Adicione este log para verificar o valor de anunciosPorCategoria

    // Renderizar a página "telaPrincipal" com os dados dos anúncios por categoria
    res.render('telaPrincipal/telaPrincipal', { anunciosPorCategoria });
  });
};

exports.detalhes = (req, res) => {
  const { id, message } = req.query; // Obter o ID do anúncio e a mensagem da query string

  // Lógica para obter os detalhes do anúncio com base no ID
  const anuncio = Anuncio.getDetalhes(id);

  if (!anuncio) {
    return res.status(404).render('error', { message: 'Anúncio não encontrado' });
  }
  const messagee = 'Anúncio salvo com sucesso'; // Mensagem de sucesso
  res.render('anuncio/detalhesAnuncio', { anuncio, messagee}); // Passar os detalhes do anúncio e a mensagem para a visualização
};
