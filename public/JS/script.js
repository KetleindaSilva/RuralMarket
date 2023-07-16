$(document).ready(function() {
    // Máscara para o campo de telefone
    $('#telefone').mask('(00) 0000-0000');
  
    // Máscara para o campo de CEP
    $('#cep').mask('00000-000');
  
    // Máscara para o campo de UF
    $('#uf').mask('AA');
  
    // Outras máscaras podem ser adicionadas para os campos restantes conforme necessário
  
    // Exemplo de validação de email usando expressão regular
    function validacaoEmail(email) {
      // Expressão regular para validar o formato do email
      var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!regexEmail.test(email)) {
        alert('Email inválido');
      }
    }
});


  
