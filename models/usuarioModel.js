

class Usuario {
    constructor(idpessoa, idusuario, senha) {
        this.senha = senha;
        this.idpessoa = idpessoa;
        this.idusuario = idusuario;
    }

}

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '02092005',
  database: 'tcc',
});

connection.connect();


module.exports = Usuario;