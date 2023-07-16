exports.index = (req, res) => {
  const username = req.session.usuario;
  const successMessage = req.flash('success')[0]; // Obtém a mensagem de sucesso da sessão

  // Renderiza a página principal com o nome da pessoa
  res.render('telaPrincipal/telaPrincipal', { username,  successMessage });
};

    